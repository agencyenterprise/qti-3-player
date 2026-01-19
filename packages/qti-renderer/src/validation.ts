import { validateXML as xmllintValidateXML, type XMLValidationResult, type XMLValidationError } from 'xmllint-wasm';

/**
 * Validation error details
 */
export interface ValidationError {
  /**
   * Error message
   */
  message: string;
  /**
   * Raw error message from xmllint
   */
  rawMessage?: string;
  /**
   * Line number where error occurred (if available)
   */
  line?: number;
  /**
   * Column number where error occurred (if available)
   */
  column?: number;
  /**
   * File name where error occurred (if available)
   */
  fileName?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /**
   * Whether the XML is valid
   */
  valid: boolean;
  /**
   * Array of validation errors (empty if valid)
   */
  errors: ValidationError[];
}

/**
 * Options for XML validation
 */
export interface ValidationOptions {
  /**
   * XSD schema string or URL to fetch schema from
   * If not provided, will use the local bundled schema by default
   */
  schema?: string;
  /**
   * Custom schema string to use instead of default
   * This takes precedence over schema option
   */
  customSchema?: string;
  /**
   * Whether to fetch schema from URL if schema is a URL
   */
  fetchSchema?: boolean;
  /**
   * Additional schema files to preload (for imports/includes)
   */
  preloadSchemas?: Array<{ fileName: string; contents: string }>;
}

/**
 * Default QTI 3.0 schema location (fallback URL)
 */
export const DEFAULT_QTI_SCHEMA_URL =
  'https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd';

/**
 * Paths to try for local schema file
 */
const LOCAL_SCHEMA_PATHS = [
  './xmlschema-no-annotations.xml',
  '/node_modules/@qti-renderer/core/dist/xmlschema-no-annotations.xml',
  './dist/xmlschema-no-annotations.xml',
];

/**
 * Cache for the local schema content
 */
let localSchemaCache: string | null = null;

/**
 * Load the local schema file
 * Tries multiple methods to load the schema:
 * 1. Try to read from file system (Node.js/test environment)
 * 2. Try to fetch from various paths (browser/bundler)
 * 3. Fall back to remote URL
 */
async function loadLocalSchema(): Promise<string> {
  // Return cached schema if available
  if (localSchemaCache) {
    return localSchemaCache;
  }

  // Try Node.js file system first (for tests/server-side)
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('fs') as typeof import('fs');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const path = require('path') as typeof import('path');
      // Try multiple possible locations
      const possiblePaths = [
        path.join(__dirname, 'xmlschema-no-annotations.xml'),
        path.join(process.cwd(), 'packages/qti-renderer/src/xmlschema-no-annotations.xml'),
        path.join(process.cwd(), 'packages/qti-renderer/dist/xmlschema-no-annotations.xml'),
      ];
      
      for (const schemaPath of possiblePaths) {
        try {
          if (fs.existsSync(schemaPath)) {
            const content = fs.readFileSync(schemaPath, 'utf-8') as string;
            if (content && content.length > 0) {
              localSchemaCache = content;
              return localSchemaCache;
            }
          }
        } catch (error) {
          // Continue to next path
        }
      }
    } catch (error) {
      // File system not available (browser environment), continue to fetch
    }
  }

  // Try to fetch as static asset (browser/bundler)
  for (const schemaPath of LOCAL_SCHEMA_PATHS) {
    try {
      const response = await fetch(schemaPath);
      if (response.ok) {
        localSchemaCache = await response.text();
        return localSchemaCache;
      }
    } catch (error) {
      // Continue to next path
    }
  }

  // Fallback to remote schema
  console.warn('Failed to load local schema, falling back to remote URL');
  return await fetchSchema(DEFAULT_QTI_SCHEMA_URL);
}

/**
 * Fetch schema content from URL
 */
async function fetchSchema(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch schema from ${url}: ${response.statusText}`);
  }
  return await response.text();
}

/**
 * Extract schema location from XML string
 * Looks for xsi:schemaLocation attribute
 */
export function extractSchemaLocation(xml: string): string | null {
  const schemaLocationMatch = xml.match(/xsi:schemaLocation\s*=\s*["']([^"']+)["']/);
  if (schemaLocationMatch) {
    // schemaLocation format is typically "namespace schema-url"
    const parts = schemaLocationMatch[1].trim().split(/\s+/);
    // Return the URL part (usually the second part)
    return parts.length > 1 ? parts[parts.length - 1] : parts[0];
  }
  return null;
}

/**
 * Validate XML against XSD schema
 * 
 * @param xmlString - XML string to validate
 * @param options - Validation options
 * @returns Promise resolving to validation result
 */
export async function validateXml(
  xmlString: string,
  options: ValidationOptions = {}
): Promise<ValidationResult> {
  try {
    let schemaString: string | undefined;

    // Priority 1: Use customSchema if provided
    if (options.customSchema) {
      schemaString = options.customSchema;
    }
    // Priority 2: Use schema option if provided
    else if (options.schema) {
      schemaString = options.schema;
    }
    // Priority 3: Try to extract from XML
    else {
      const schemaLocation = extractSchemaLocation(xmlString);
      if (schemaLocation) {
        schemaString = schemaLocation;
      }
    }

    // If schema is a URL and fetchSchema is enabled, fetch it
    if (schemaString && options.fetchSchema !== false) {
      if (schemaString.startsWith('http://') || schemaString.startsWith('https://')) {
        schemaString = await fetchSchema(schemaString);
      }
    }

    // If still no schema, use local cached schema by default
    if (!schemaString) {
      // Always try to use local cached schema first (fast, no network)
      // Only fetch from URL if explicitly requested via fetchSchema: true
      if (options.fetchSchema === true) {
        // User explicitly wants to fetch from URL
        schemaString = await fetchSchema(DEFAULT_QTI_SCHEMA_URL);
      } else {
        // Default: use local cached schema (fast)
        schemaString = await loadLocalSchema();
      }
    }

    // Prepare files for xmllint-wasm
    const xmlFile = { fileName: 'document.xml', contents: xmlString };
    const schemaFiles = options.preloadSchemas || [];

    // Validate using xmllint-wasm
    const result: XMLValidationResult = await xmllintValidateXML({
      xml: xmlFile,
      schema: schemaString,
      preload: schemaFiles.length > 0 ? schemaFiles : undefined,
    });

    if (result.valid) {
      return {
        valid: true,
        errors: [],
      };
    }

    // Convert xmllint-wasm errors to our ValidationError format
    const errors: ValidationError[] = [];
    if (result.errors && Array.isArray(result.errors)) {
      for (const error of result.errors) {
        const xmlError: XMLValidationError = error as XMLValidationError;
        errors.push({
          message: xmlError.message || xmlError.rawMessage,
          rawMessage: xmlError.rawMessage,
          line: xmlError.loc?.lineNumber,
          fileName: xmlError.loc?.fileName,
        });
      }
    }

    return {
      valid: false,
      errors,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          message:
            error instanceof Error
              ? error.message
              : 'Unknown validation error occurred',
        },
      ],
    };
  }
}

/**
 * Synchronous validation wrapper (for cases where schema is already loaded)
 * Note: This still uses async internally but provides a simpler API
 */
export function validateXmlSync(
  xmlString: string,
  schemaString: string
): ValidationResult {
  // For true sync validation, we'd need a different approach
  // But xmllint-wasm is async, so we'll throw an error suggesting async version
  throw new Error(
    'Synchronous validation not supported. Use validateXml() instead.'
  );
}
