import {
  validateXML as xmllintValidateXML,
  type XMLValidationResult,
  type XMLValidationError,
} from 'xmllint-wasm';

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
   * Custom schema string to use instead of default local schema
   */
  customSchema?: string;
  /**
   * Additional schema files to preload (for imports/includes)
   */
  preloadSchemas?: Array<{ fileName: string; contents: string }>;
}

/**
 * Cache for the main schema content
 */
let mainSchemaCache: string | null = null;

/**
 * Cache for preloaded schemas
 */
let preloadedSchemasCache: Array<{ fileName: string; contents: string }> | null = null;

/**
 * List of all schema files to preload (matching browser-demo-final/logic.js)
 */
const SCHEMA_FILES = [
  'xml.xsd',
  'imsmd_loose_v1p3p2.xsd',
  'imsqtiv3p0_csmv1p1_v1p0.xsd',
  'imsqti_metadatav3p0_v1p0.xsd',
  'imsqtiv3p0_cpextv1p2_v1p0.xsd',
  'imsqtiv3p0_imscpv1p2_v1p0.xsd',
  'imsqtiv3p0_afa3p0drd_v1p0.xsd',
  'mathml3.xsd',
  'mathml3-common.xsd',
  'mathml3-content.xsd',
  'mathml3-presentation.xsd',
  'mathml3-strict-content.xsd',
  'ssmlv1p1-core.xsd',
  'synthesis-nonamespace.xsd',
  'XInclude.xsd',
  'xlink.xsd',
];

/**
 * Load a file from the file system (Node.js) or via fetch (browser)
 */
async function loadFile(filePath: string, relativeTo: string = ''): Promise<string> {
  // Try Node.js file system first (for tests/server-side)
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('fs') as typeof import('fs');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const path = require('path') as typeof import('path');
      
      // Try multiple possible locations
      // Check if we're in the package directory or root
      const cwd = process.cwd();
      const isPackageDir = cwd.endsWith('qti-renderer') || cwd.endsWith('qti-renderer/');
      const distPath = isPackageDir 
        ? path.join(cwd, 'dist', relativeTo, filePath)
        : path.join(cwd, 'packages/qti-renderer/dist', relativeTo, filePath);
      const assetsPath = isPackageDir
        ? path.join(cwd, 'assets', relativeTo, filePath)
        : path.join(cwd, 'packages/qti-renderer/assets', relativeTo, filePath);
      
      const possiblePaths = [
        path.join(__dirname, relativeTo, filePath),
        path.join(__dirname, '..', relativeTo, filePath), // In case __dirname is in a subdirectory
        distPath,
        assetsPath,
      ];
      
      for (const fullPath of possiblePaths) {
        try {
          if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf-8') as string;
            if (content && content.length > 0) {
              return content;
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
  const fetchPaths = [
    `/dist/${relativeTo}${filePath}`,
    `./${relativeTo}${filePath}`,
    `/node_modules/@ae-studio/qti-renderer/dist/${relativeTo}${filePath}`,
    `./dist/${relativeTo}${filePath}`,
    `./node_modules/@ae-studio/qti-renderer/dist/${relativeTo}${filePath}`,
  ];

  // For schemas directory, also try direct /schemas/ path (for Storybook staticDirs mapping)
  if (relativeTo === 'schemas/') {
    fetchPaths.unshift(`/schemas/${filePath}`, `./schemas/${filePath}`);
  }

  const errors: string[] = [];
  for (const fetchPath of fetchPaths) {
    try {
      const response = await fetch(fetchPath);
      if (response.ok) {
        const content = await response.text();
        if (content && content.trim().length > 0) {
          return content;
        }
        errors.push(`${fetchPath}: empty response`);
      } else {
        errors.push(`${fetchPath}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      errors.push(`${fetchPath}: ${error instanceof Error ? error.message : String(error)}`);
      // Continue to next path
    }
  }

  throw new Error(`Failed to load file: ${filePath}. Tried paths: ${fetchPaths.join(', ')}. Errors: ${errors.join('; ')}`);
}

/**
 * Load the main QTI schema file (imsqti_asiv3p0p1_v1p0.xsd)
 */
async function loadMainSchema(): Promise<string> {
  // Return cached schema if available
  if (mainSchemaCache) {
    return mainSchemaCache;
  }

  mainSchemaCache = await loadFile('imsqti_asiv3p0p1_v1p0.xsd');
  return mainSchemaCache;
}

/**
 * Load all schema files for preloading (matching browser-demo-final/logic.js strategy)
 */
async function loadPreloadedSchemas(): Promise<Array<{ fileName: string; contents: string }>> {
  // Return cached schemas if available
  if (preloadedSchemasCache) {
    return preloadedSchemasCache;
  }

  // Load all schema files in parallel (matching browser-demo-final/logic.js)
  const schemaPromises = SCHEMA_FILES.map(async (fileName) => {
    const contents = await loadFile(fileName, 'schemas/');
    return {
      fileName,
      contents,
    };
  });

  preloadedSchemasCache = await Promise.all(schemaPromises);
  return preloadedSchemasCache;
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
    // Use customSchema if provided, otherwise load main schema
    const schemaString = options.customSchema || await loadMainSchema();

    // Verify schema was loaded correctly
    if (!schemaString || schemaString.trim().length === 0) {
      throw new Error('Failed to load QTI schema. The schema file may not be accessible.');
    }

    // Verify schema starts with XML declaration or root element
    if (!schemaString.trim().startsWith('<?xml') && !schemaString.trim().startsWith('<xs:schema') && !schemaString.trim().startsWith('<schema')) {
      throw new Error(`Invalid schema content. Expected XML/XSD but got: ${schemaString.substring(0, 100)}...`);
    }

    // Load preloaded schemas (unless custom ones are provided)
    const schemaFiles = options.preloadSchemas || await loadPreloadedSchemas();

    // Prepare XML file for xmllint-wasm (matching browser-demo-final/logic.js)
    const xmlFile = {
      fileName: 'document.xml',
      contents: xmlString,
    };

    // Pass schema as file object with correct filename (not just string)
    // This ensures xmllint-wasm can resolve schema imports correctly
    const schemaFile = {
      fileName: 'imsqti_asiv3p0p1_v1p0.xsd',
      contents: schemaString,
    };

    // Validate using xmllint-wasm with same settings as browser-demo-final/logic.js
    const result: XMLValidationResult = await xmllintValidateXML({
      xml: xmlFile,
      schema: schemaFile,
      preload: schemaFiles.length > 0 ? schemaFiles : undefined,
      // Memory settings matching browser-demo-final/logic.js
      initialMemoryPages: 256,
      maxMemoryPages: 32768, // 2GiB
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
        
        // Extract readable error message
        let message = '';
        
        // Helper to check if a string is an unhelpful stringified Event/Object
        const isUnhelpfulString = (str: string): boolean => {
          if (!str) return true;
          const unhelpfulPatterns = [
            '[object Event]',
            '[object Object]',
            '{"isTrusted":true}',
            '{"isTrusted":false}',
          ];
          return unhelpfulPatterns.some(pattern => str.includes(pattern));
        };
        
        // Helper to check if a value is usable as an error message
        const isUsableMessage = (val: any): val is string => {
          return typeof val === 'string' && val.length > 0 && !isUnhelpfulString(val);
        };
        
        // Handle Event objects
        if (xmlError instanceof Event) {
          // Event objects don't contain useful error info - will use default message
        }
        // Handle string errors
        else if (typeof xmlError === 'string') {
          if (!isUnhelpfulString(xmlError)) {
            message = xmlError;
          }
        }
        // Handle object errors
        else if (xmlError && typeof xmlError === 'object') {
          const err = xmlError as any;
          
          // Try common error message properties, but skip unhelpful values
          if (!(err.message instanceof Event) && isUsableMessage(err.message)) {
            message = err.message;
          }
          
          if (!message && !(err.rawMessage instanceof Event) && isUsableMessage(err.rawMessage)) {
            message = err.rawMessage;
          }
          
          if (!message && isUsableMessage(err.msg)) {
            message = err.msg;
          }
          
          if (!message && isUsableMessage(err.text)) {
            message = err.text;
          }
          
          // Try to find any useful string property
          if (!message) {
            for (const key in err) {
              if (key !== 'message' && key !== 'rawMessage') {
                const value: any = err[key];
                if (isUsableMessage(value)) {
                  message = value;
                  break;
                }
              }
            }
          }
          
          // Try toString if available
          if (!message && typeof err.toString === 'function') {
            try {
              const str = err.toString();
              if (isUsableMessage(str)) {
                message = str;
              }
            } catch (e) {
              // toString failed
            }
          }
        }
        
        // If no useful message found, provide a descriptive default based on context
        if (!message) {
          // Check if we have location info that can help
          const lineInfo = xmlError.loc?.lineNumber;
          if (lineInfo) {
            message = `XML validation error at line ${lineInfo}. Check the element structure and attribute values at this location.`;
          } else {
            // Generic but more helpful message
            message = 'XML validation failed. Common issues include: missing required attributes (like "identifier"), invalid element structure, or namespace problems. Please verify your XML against the QTI 3.0 specification.';
          }
        }
        
        // Clean up error message for better readability
        message = message
          .replace(/file_0\.xsd:(\d+):/g, 'Line $1:') // Replace file references with "Line X:"
          .replace(/document\.xml:(\d+):/g, 'Line $1:') // Replace document.xml references
          .replace(/file:\/\/\/.*?:\d+:\d+:/g, '') // Remove file:// URLs
          .replace(/element\s+\{[^}]+\}(\w+)/g, '<$1>') // Simplify namespace references to element names
          .replace(/Element\s+\{[^}]+\}(\w+)/g, '<$1>') // Simplify namespace references
          .replace(/\{http:\/\/[^}]+\}/g, '') // Remove namespace URIs in braces
          .replace(/Schemas parser (error|warning)\s*:\s*/gi, '') // Remove parser prefix
          .replace(/warning:\s*/gi, '')
          .replace(/error:\s*/gi, '')
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        errors.push({
          message: message || 'Validation error',
          rawMessage: typeof xmlError.rawMessage === 'string' && !isUnhelpfulString(xmlError.rawMessage)
            ? xmlError.rawMessage 
            : (xmlError instanceof Event 
                ? 'Event object - schema loading may have failed' 
                : undefined),
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
    // Log the error for debugging (only in development)
    if (typeof console !== 'undefined' && console.error) {
      console.error('Validation error:', error);
    }
    
    // Helper to check if a string is an unhelpful stringified Event/Object
    const isUnhelpfulString = (str: string): boolean => {
      if (!str) return true;
      const unhelpfulPatterns = [
        '[object Event]',
        '[object Object]',
        '{"isTrusted":true}',
        '{"isTrusted":false}',
      ];
      return unhelpfulPatterns.some(pattern => str.includes(pattern));
    };
    
    // Extract error message from various error types
    let errorMessage = '';
    
    // Handle Event objects (e.g., from failed worker loading)
    if (error instanceof Event) {
      // Try to extract more info from Event
      const eventType = error.type || 'unknown';
      const target = (error.target as any)?.src || (error.target as any)?.href || '';
      errorMessage = `Validation library failed to initialize (${eventType}). This may be a browser compatibility issue or network error loading the worker file. ${target ? `Failed to load: ${target}` : ''}`;
    } else if (error instanceof Error) {
      const msg = error.message || error.name || '';
      if (!isUnhelpfulString(msg)) {
        errorMessage = msg;
      }
      // Include stack trace in rawMessage for debugging
      if (error.stack && !isUnhelpfulString(error.stack)) {
        errorMessage = errorMessage || error.message || error.name || 'Validation error';
      }
    } else if (error && typeof error === 'object') {
      // Handle error objects that might not be Error instances
      const err = error as any;
      
      // Try to extract useful information
      if (err.message && typeof err.message === 'string' && !isUnhelpfulString(err.message)) {
        errorMessage = err.message;
      } else if (err.name && typeof err.name === 'string' && !isUnhelpfulString(err.name)) {
        errorMessage = err.name;
      } else if (err.toString && typeof err.toString === 'function') {
        try {
          const str = err.toString();
          if (!isUnhelpfulString(str) && str !== '[object Object]') {
            errorMessage = str;
          }
        } catch (e) {
          // toString failed
        }
      }
      
      // Check for common error properties
      if (!errorMessage) {
        for (const key of ['error', 'reason', 'description', 'detail']) {
          if (err[key] && typeof err[key] === 'string' && !isUnhelpfulString(err[key])) {
            errorMessage = err[key];
            break;
          }
        }
      }
    } else if (error && typeof error === 'string') {
      if (!isUnhelpfulString(error)) {
        errorMessage = error;
      }
    }
    
    // Fallback to helpful default message
    if (!errorMessage) {
      errorMessage = 'XML validation failed. This could be due to: a network error loading the validation library, browser compatibility issues, or malformed XML. Please check your XML syntax and try again.';
    }
    
    return {
      valid: false,
      errors: [
        {
          message: errorMessage,
          rawMessage: error instanceof Error ? error.stack : (typeof error === 'object' ? JSON.stringify(error, null, 2) : String(error)),
        },
      ],
    };
  }
}

/**
 * Synchronous validation wrapper (for cases where schema is already loaded)
 * Note: This still uses async internally but provides a simpler API
 */
export function validateXmlSync(xmlString: string, schemaString: string): ValidationResult {
  // For true sync validation, we'd need a different approach
  // But xmllint-wasm is async, so we'll throw an error suggesting async version
  throw new Error('Synchronous validation not supported. Use validateXml() instead.');
}
