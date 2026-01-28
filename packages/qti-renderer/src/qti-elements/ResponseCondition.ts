import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { EmptyElement } from '../types';

/**
 * XML Schema type: ResponseConditionDType
 * This enables the 'If..Then..Else' rules to be defined for the response processing. If the
 * expression given in a responseIf or responseElseIf evaluates to 'true' then the sub-rules
 * contained within it are followed and any following responseElseIf or responseElse parts a-
 * re ignored for this response condition. If the expression given in a responseIf or respon-
 * seElseIf does not evaluate to 'true' then consideration passes to the next responseElseIf
 * or, if there are no more responseElseIf parts then the sub-rules of the responseElse are
 * followed (if specified).
 */
export class ResponseCondition extends BaseQtiElement {
  static readonly elementNames = ['qti-response-condition'];

  process(renderer: QtiRenderer): EmptyElement {
    const ifElement = renderer.querySelectorLocal(this.element, 'qti-response-if');

    if (ifElement) {
      const ifResult = renderer.processElement(ifElement);
      if (
        ifResult.type !== 'value' ||
        ifResult.valueType !== 'boolean' ||
        ifResult.cardinality !== 'single'
      ) {
        console.warn('ResponseCondition: ifResult is not a boolean value', ifResult);
      } else if (ifResult.value === true) {
        return {
          type: 'empty',
        };
      }
    }

    const elseIfElements = renderer.querySelectorAllLocal(this.element, 'qti-response-else-if');

    for (const elseIfElement of elseIfElements) {
      const elseIfResult = renderer.processElement(elseIfElement);
      if (
        elseIfResult.type !== 'value' ||
        elseIfResult.valueType !== 'boolean' ||
        elseIfResult.cardinality !== 'single'
      ) {
        console.warn('ResponseCondition: elseIfResult is not a boolean value', elseIfResult);
      } else if (elseIfResult.value === true) {
        return {
          type: 'empty',
        };
      }
    }

    const elseElement = renderer.querySelectorLocal(this.element, 'qti-response-else');
    if (elseElement) {
      const elseResult = renderer.processElement(elseElement);
      if (
        elseResult.type !== 'value' ||
        elseResult.valueType !== 'boolean' ||
        elseResult.cardinality !== 'single'
      ) {
        console.warn('ResponseCondition: elseResult is not a boolean value', elseResult);
      }
    }
    return {
      type: 'empty',
    };
  }
}
