#!/usr/bin/env node

/**
 * Script to download all referenced schemas recursively and update schemaLocation to point to local copies.
 * Also removes xs:annotation tags to reduce file size.
 */

import * as fs from 'fs';
import * as path from 'path';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';

const SCHEMAS_DIR = path.join(__dirname, '../src/schemas');
const MAIN_SCHEMA_PATH = path.join(__dirname, '../src/imsqti_asiv3p0p1_v1p0.xsd');

interface SchemaReference {
  namespace?: string;
  url: string;
  localFileName: string;
  parentUrl?: string; // URL of parent schema for resolving relative paths
}

// Track all discovered schemas to avoid duplicates
const discoveredSchemas = new Map<string, SchemaReference>();
const downloadedSchemas = new Set<string>();

/**
 * Resolve a relative URL against a base URL
 */
function resolveUrl(baseUrl: string, relativeUrl: string): string {
  // If it's already absolute, return as-is
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl;
  }
  
  // Remove filename from base URL to get directory
  const baseDir = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
  return baseDir + relativeUrl;
}

/**
 * Extract filename from URL
 */
function getFileNameFromUrl(url: string): string {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}

/**
 * Download a file from URL and convert to UTF-8
 */
async function downloadFile(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.statusText}`);
  }
  
  // Get the content as ArrayBuffer first to handle encoding
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Try to detect and convert encoding
  // Check for UTF-16 BOM
  if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
    // UTF-16 LE
    return buffer.slice(2).toString('utf16le');
  } else if (buffer.length >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
    // UTF-16 BE
    const utf16le = Buffer.alloc(buffer.length - 2);
    for (let i = 2; i < buffer.length; i += 2) {
      utf16le[i - 2] = buffer[i + 1];
      utf16le[i - 1] = buffer[i];
    }
    return utf16le.toString('utf16le');
  }
  
  // Try UTF-8, fallback to latin1 if needed
  try {
    return buffer.toString('utf8');
  } catch {
    return buffer.toString('latin1');
  }
}

/**
 * Remove all xs:annotation elements from XML string using regex (fallback)
 */
function removeAnnotationsRegex(xmlString: string): string {
  let result = xmlString;
  let changed = true;
  
  while (changed) {
    const before = result;
    result = result.replace(/<xs?:annotation[^>]*>[\s\S]*?<\/xs?:annotation>/gi, '');
    result = result.replace(/<xsd?:annotation[^>]*>[\s\S]*?<\/xsd?:annotation>/gi, '');
    result = result.replace(/<xs?:annotation[^>]*\/\s*>/gi, '');
    result = result.replace(/<xsd?:annotation[^>]*\/\s*>/gi, '');
    changed = before !== result;
  }
  
  return result;
}

/**
 * Remove all xs:annotation elements from XML string
 */
function removeAnnotations(xmlString: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    
    const parseError = doc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
      return removeAnnotationsRegex(xmlString);
    }
    
    // Find all annotation elements (try both xs: and xsd: prefixes)
    const annotationsNS = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'annotation');
    const annotations = doc.getElementsByTagName('annotation');
    
    const annotationsArray = Array.from(annotationsNS);
    const annotationsArrayNoNS = Array.from(annotations);
    const allAnnotations = new Set([...annotationsArray, ...annotationsArrayNoNS]);
    
    allAnnotations.forEach(annotation => {
      const parent = annotation.parentNode;
      if (parent) {
        parent.removeChild(annotation);
      }
    });
    
    const serializer = new XMLSerializer();
    let result = serializer.serializeToString(doc);
    
    if (result.length < xmlString.length * 0.5 || /[\x00-\x08\x0B-\x0C\x0E-\x1F]/.test(result)) {
      return removeAnnotationsRegex(xmlString);
    }
    
    const xmlDeclMatch = xmlString.match(/^<\?xml[^>]*\?>/);
    if (xmlDeclMatch && !result.startsWith('<?xml')) {
      result = xmlDeclMatch[0] + '\n' + result;
    }
    
    return result;
  } catch (error) {
    return removeAnnotationsRegex(xmlString);
  }
}

/**
 * Extract all schema references from XML content (import, include, redefine)
 */
function extractSchemaReferences(schemaContent: string, parentUrl: string): SchemaReference[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(schemaContent, 'text/xml');
  const references: SchemaReference[] = [];
  
  // Find xs:import elements
  const imports = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'import');
  for (let i = 0; i < imports.length; i++) {
    const importElement = imports[i];
    const schemaLocation = importElement.getAttribute('schemaLocation');
    const namespace = importElement.getAttribute('namespace');
    
    if (schemaLocation) {
      const resolvedUrl = resolveUrl(parentUrl, schemaLocation);
      const localFileName = getFileNameFromUrl(resolvedUrl);
      
      references.push({
        namespace: namespace || undefined,
        url: resolvedUrl,
        localFileName,
        parentUrl,
      });
    }
  }
  
  // Find xs:include elements
  const includes = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'include');
  for (let i = 0; i < includes.length; i++) {
    const includeElement = includes[i];
    const schemaLocation = includeElement.getAttribute('schemaLocation');
    
    if (schemaLocation) {
      const resolvedUrl = resolveUrl(parentUrl, schemaLocation);
      const localFileName = getFileNameFromUrl(resolvedUrl);
      
      references.push({
        url: resolvedUrl,
        localFileName,
        parentUrl,
      });
    }
  }
  
  // Find xs:redefine elements
  const redefines = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'redefine');
  for (let i = 0; i < redefines.length; i++) {
    const redefineElement = redefines[i];
    const schemaLocation = redefineElement.getAttribute('schemaLocation');
    
    if (schemaLocation) {
      const resolvedUrl = resolveUrl(parentUrl, schemaLocation);
      const localFileName = getFileNameFromUrl(resolvedUrl);
      
      references.push({
        url: resolvedUrl,
        localFileName,
        parentUrl,
      });
    }
  }
  
  // Also check for xsd: prefix (some schemas use xsd instead of xs)
  const xsdImports = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'import');
  const xsdIncludes = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'include');
  const xsdRedefines = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'redefine');
  
  // Process xsd:import (same namespace, different prefix)
  for (let i = 0; i < xsdImports.length; i++) {
    const importElement = xsdImports[i];
    const schemaLocation = importElement.getAttribute('schemaLocation');
    const namespace = importElement.getAttribute('namespace');
    
    if (schemaLocation && !references.find(r => r.url === resolveUrl(parentUrl, schemaLocation))) {
      const resolvedUrl = resolveUrl(parentUrl, schemaLocation);
      const localFileName = getFileNameFromUrl(resolvedUrl);
      
      references.push({
        namespace: namespace || undefined,
        url: resolvedUrl,
        localFileName,
        parentUrl,
      });
    }
  }
  
  return references;
}

/**
 * Update schemaLocation attributes in XML content to point to local files
 * @param schemaContent - XML content to update
 * @param urlToLocalMap - Map of URLs to local file paths
 * @param isMainSchema - If true, use "schemas/" prefix, otherwise use just filename
 */
function updateSchemaLocationsInContent(schemaContent: string, urlToLocalMap: Map<string, string>, isMainSchema: boolean = false): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(schemaContent, 'text/xml');
  let modified = false;
  
  // Helper to get local path
  const getLocalPath = (schemaLocation: string): string | null => {
    // Try direct match first
    let localPath = urlToLocalMap.get(schemaLocation);
    if (localPath) {
      return isMainSchema ? localPath : localPath.replace('schemas/', '');
    }
    
    // Try to resolve relative URL
    // Check if any URL in the map ends with this schemaLocation
    for (const [url, path] of urlToLocalMap.entries()) {
      if (url.endsWith(schemaLocation) || url.includes(schemaLocation)) {
        return isMainSchema ? path : path.replace('schemas/', '');
      }
    }
    
    return null;
  };
  
  // Update xs:import
  const imports = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'import');
  for (let i = 0; i < imports.length; i++) {
    const importElement = imports[i];
    const schemaLocation = importElement.getAttribute('schemaLocation');
    
    if (schemaLocation) {
      const localPath = getLocalPath(schemaLocation);
      if (localPath) {
        importElement.setAttribute('schemaLocation', localPath);
        modified = true;
      }
    }
  }
  
  // Update xs:include
  const includes = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'include');
  for (let i = 0; i < includes.length; i++) {
    const includeElement = includes[i];
    const schemaLocation = includeElement.getAttribute('schemaLocation');
    
    if (schemaLocation) {
      const localPath = getLocalPath(schemaLocation);
      if (localPath) {
        includeElement.setAttribute('schemaLocation', localPath);
        modified = true;
      }
    }
  }
  
  // Update xs:redefine
  const redefines = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'redefine');
  for (let i = 0; i < redefines.length; i++) {
    const redefineElement = redefines[i];
    const schemaLocation = redefineElement.getAttribute('schemaLocation');
    
    if (schemaLocation) {
      const localPath = getLocalPath(schemaLocation);
      if (localPath) {
        redefineElement.setAttribute('schemaLocation', localPath);
        modified = true;
      }
    }
  }
  
  if (!modified) {
    return schemaContent;
  }
  
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
}

/**
 * Recursively download a schema and all its dependencies
 */
async function downloadSchemaRecursive(ref: SchemaReference, urlToLocalMap: Map<string, string>): Promise<void> {
  // Skip if already downloaded
  if (downloadedSchemas.has(ref.url)) {
    return;
  }
  
  downloadedSchemas.add(ref.url);
  
  console.log(`Downloading ${ref.url}...`);
  
  let content: string;
  try {
    content = await downloadFile(ref.url);
  } catch (error) {
    console.error(`  Error downloading ${ref.url}:`, error);
    throw error;
  }
  
  // Extract nested references before processing
  const nestedRefs = extractSchemaReferences(content, ref.url);
  
  // Remove annotations
  let cleanedContent: string;
  try {
    cleanedContent = removeAnnotations(content);
    if (cleanedContent.includes('<xs:annotation') || cleanedContent.includes('<xsd:annotation') || cleanedContent.includes('<annotation')) {
      cleanedContent = removeAnnotationsRegex(content);
    }
  } catch (error) {
    cleanedContent = removeAnnotationsRegex(content);
  }
  
  // Update schemaLocation attributes to point to local files (nested schemas use just filename)
  cleanedContent = updateSchemaLocationsInContent(cleanedContent, urlToLocalMap, false);
  
  // Save to local file
  const localPath = path.join(SCHEMAS_DIR, ref.localFileName);
  fs.writeFileSync(localPath, cleanedContent, 'utf-8');
  console.log(`  Saved to ${localPath}`);
  
  // Recursively download nested schemas
  for (const nestedRef of nestedRefs) {
    // Resolve URL relative to parent
    const resolvedUrl = resolveUrl(ref.url, nestedRef.url);
    nestedRef.url = resolvedUrl;
    nestedRef.localFileName = getFileNameFromUrl(resolvedUrl);
    
    // Add to map
    urlToLocalMap.set(resolvedUrl, `schemas/${nestedRef.localFileName}`);
    urlToLocalMap.set(nestedRef.url, `schemas/${nestedRef.localFileName}`);
    
    // Also add relative path mapping
    if (nestedRef.url !== resolvedUrl) {
      urlToLocalMap.set(nestedRef.url, `schemas/${nestedRef.localFileName}`);
    }
    
    await downloadSchemaRecursive(nestedRef, urlToLocalMap);
  }
}

/**
 * Map of known schema URLs based on namespace
 */
const KNOWN_SCHEMA_URLS: Record<string, string> = {
  'http://www.w3.org/XML/1998/namespace': 'https://purl.imsglobal.org/spec/w3/2001/schema/xsd/xml.xsd',
  'http://www.w3.org/2001/XInclude': 'https://purl.imsglobal.org/spec/w3/2001/schema/xsd/XInclude.xsd',
  'http://www.w3.org/1998/Math/MathML': 'https://purl.imsglobal.org/spec/mathml/v3p0/schema/xsd/mathml3.xsd',
  'http://www.w3.org/2001/10/synthesis': 'https://purl.imsglobal.org/spec/ssml/v1p1/schema/xsd/ssmlv1p1-core.xsd',
};

/**
 * Extract schema references from the main schema file
 */
function extractMainSchemaReferences(schemaContent: string): SchemaReference[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(schemaContent, 'text/xml');
  const references: SchemaReference[] = [];
  
  const imports = doc.getElementsByTagNameNS('http://www.w3.org/2001/XMLSchema', 'import');
  
  for (let i = 0; i < imports.length; i++) {
    const importElement = imports[i];
    const namespace = importElement.getAttribute('namespace') || '';
    const schemaLocation = importElement.getAttribute('schemaLocation');
    
    if (schemaLocation) {
      const isUrl = schemaLocation.startsWith('http://') || schemaLocation.startsWith('https://');
      const url = isUrl ? schemaLocation : (KNOWN_SCHEMA_URLS[namespace] || schemaLocation);
      const localFileName = isUrl ? getFileNameFromUrl(schemaLocation) : schemaLocation.split('/').pop() || schemaLocation;
      
      references.push({
        namespace,
        url: isUrl ? schemaLocation : url,
        localFileName,
      });
    }
  }
  
  return references;
}

/**
 * Main function
 */
async function main() {
  console.log('Starting schema update process...');
  
  // Read main schema file
  console.log('Reading main schema file...');
  let mainSchemaContent = fs.readFileSync(MAIN_SCHEMA_PATH, 'utf-8');
  
  // Extract schema references from main schema
  console.log('Extracting schema references...');
  const mainReferences = extractMainSchemaReferences(mainSchemaContent);
  console.log(`Found ${mainReferences.length} direct schema references:`);
  mainReferences.forEach(ref => {
    console.log(`  - ${ref.namespace || 'N/A'} -> ${ref.url}`);
  });
  
  // Create schemas directory if it doesn't exist
  if (!fs.existsSync(SCHEMAS_DIR)) {
    fs.mkdirSync(SCHEMAS_DIR, { recursive: true });
    console.log(`Created schemas directory: ${SCHEMAS_DIR}`);
  }
  
  // Build URL to local file mapping
  const urlToLocalMap = new Map<string, string>();
  mainReferences.forEach(ref => {
    urlToLocalMap.set(ref.url, `schemas/${ref.localFileName}`);
  });
  
  // Download all schemas recursively
  console.log('\nDownloading referenced schemas (recursively)...');
  for (const ref of mainReferences) {
    await downloadSchemaRecursive(ref, urlToLocalMap);
  }
  
  // Update schemaLocation attributes in main schema (use "schemas/" prefix)
  console.log('\nUpdating schemaLocation attributes in main schema...');
  mainSchemaContent = updateSchemaLocationsInContent(mainSchemaContent, urlToLocalMap, true);
  
  // Remove annotations from main schema
  console.log('Removing annotations from main schema...');
  mainSchemaContent = removeAnnotations(mainSchemaContent);
  
  // Write updated main schema
  fs.writeFileSync(MAIN_SCHEMA_PATH, mainSchemaContent, 'utf-8');
  console.log(`\nUpdated main schema file: ${MAIN_SCHEMA_PATH}`);
  
  console.log(`\nSchema update completed successfully!`);
  console.log(`Total schemas downloaded: ${downloadedSchemas.size}`);
}

// Run the script
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
