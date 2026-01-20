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
};

export type ProcessResult = VisualElement | ValueElement | EmptyElement;
