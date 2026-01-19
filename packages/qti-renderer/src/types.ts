import type { ValidationOptions } from './validation';

/**
 * Options for QTI renderer configuration
 */
export interface QtiRendererOptions {
  /**
   * Whether to enable debug logging
   */
  debug?: boolean;
  /**
   * Whether to show feedback immediately after response
   */
  showFeedback?: boolean;
  /**
   * Whether to validate XML against QTI schema
   * @default true
   */
  validateXml?: boolean;
  /**
   * Custom validation options (schema, customSchema, fetchSchema, etc.)
   * Only used if validateXml is true
   * 
   * @example
   * ```typescript
   * // Use custom schema string
   * validationOptions: {
   *   customSchema: '<xs:schema>...</xs:schema>'
   * }
   * 
   * // Use custom schema URL
   * validationOptions: {
   *   schema: 'https://example.com/custom-schema.xsd'
   * }
   * ```
   */
  validationOptions?: ValidationOptions;
}

/**
 * Response data structure
 */
export type ResponseValue = string | string[];

/**
 * Response processing result for a single interaction
 */
export interface ResponseResult {
  /**
   * Whether the response is correct
   */
  correct: boolean;
  /**
   * The user's response
   */
  response: ResponseValue;
  /**
   * The correct answer(s)
   */
  correctResponse: ResponseValue;
}

/**
 * Overall assessment result
 */
export interface AssessmentResult {
  /**
   * Results for each interaction
   */
  results: Record<string, ResponseResult>;
  /**
   * Overall score (0-1)
   */
  score: number;
}
