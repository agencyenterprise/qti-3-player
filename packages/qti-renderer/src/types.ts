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
