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

export interface QtiRendererParams {
  xml: string;
  options?: QtiRendererOptions;
  context?: {
    referencedXmls?: Map<string, string>;
  };
}

export type BaseValueType =
  | 'boolean'
  | 'directedPair'
  | 'duration'
  | 'file'
  | 'float'
  | 'identifier'
  | 'integer'
  | 'pair'
  | 'point'
  | 'string'
  | 'uri';

export type CardinalityType = 'multiple' | 'ordered' | 'record' | 'single';

export type ViewType = 'author' | 'candidate' | 'proctor' | 'scorer' | 'testConstructor' | 'tutor';

export type EmptyElement = {
  type: 'empty';
};

export type VisualElement = {
  type: 'visual';
  element: HTMLElement | Text;
};

export type ValueElement = {
  type: 'value';
  value: any;
  valueType: BaseValueType;
  cardinality: CardinalityType;
  fieldIdentifier?: string;
};

export type ProcessResult = VisualElement | ValueElement | EmptyElement;
