import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { ValueElement } from '../types';

/**
 * XML Schema type: ResponseIfDType
 *  This provides the 'If' and 'ElseIf' clauses of the 'If..Then..Else' for the response proc-
 * essing functionality. A responseIf part consists of an expression which must have an effe-
 * ctive base-type of boolean and single cardinality. For more information about the runtime
 * data model employed see Expressions (Section 2). It also contains a set of sub-rules. If
 * the expression is 'true' then the sub-rules are processed, otherwise they are skipped (in-
 * cluding if the expression is NULL) and the following responseElseIf or responseElse parts
 * (if any) are considered instead.
 */
export class ResponseIf extends BaseQtiElement {
  static readonly elementNames = ['qti-response-if', 'qti-response-else-if'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): ValueElement {
    const conditionElement = this.element.children[0] as Element;
    const otherNodes = Array.from(this.element.children).slice(1);
    const renderedCondition = renderer.processElement(conditionElement);
    if (
      renderedCondition.type !== 'value' ||
      renderedCondition.valueType !== 'boolean' ||
      renderedCondition.cardinality !== 'single'
    ) {
      console.warn('ResponseIf: renderedCondition is not a boolean value', renderedCondition);
      return {
        type: 'value',
        value: false,
        valueType: 'boolean',
        cardinality: 'single',
      };
    }
    if (renderedCondition.value === true) {
      for (const node of otherNodes) {
        renderer.processElement(node as Element);
      }
      return {
        type: 'value',
        value: true,
        valueType: 'boolean',
        cardinality: 'single',
      };
    }
    return {
      type: 'value',
      value: false,
      valueType: 'boolean',
      cardinality: 'single',
    };
  }
}
