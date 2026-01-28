import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { EmptyElement, ProcessResult, ValueElement } from '../types';

const isBooleanResult = (result: ProcessResult): boolean => {
  return (
    result.type === 'value' && result.valueType === 'boolean' && result.cardinality === 'single'
  );
};
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
      const isBoolean = isBooleanResult(ifResult);
      if (!isBoolean) {
        console.warn('ResponseCondition: ifResult is not a boolean value', ifResult);
      } else if (isBoolean && (ifResult as ValueElement).value === true) {
        return {
          type: 'empty',
        };
      }
    }

    const elseIfElements = renderer.querySelectorAllLocal(this.element, 'qti-response-else-if');

    for (const elseIfElement of elseIfElements) {
      const elseIfResult = renderer.processElement(elseIfElement);
      const isBoolean = isBooleanResult(elseIfResult);
      if (!isBoolean) {
        console.warn('ResponseCondition: elseIfResult is not a boolean value', elseIfResult);
      } else if (isBoolean && (elseIfResult as ValueElement).value === true) {
        return {
          type: 'empty',
        };
      }
    }

    const elseElement = renderer.querySelectorLocal(this.element, 'qti-response-else');
    if (elseElement) {
      const elseResult = renderer.processElement(elseElement);
      const isBoolean = isBooleanResult(elseResult);
      if (!isBoolean) {
        console.warn('ResponseCondition: elseResult is not a boolean value', elseResult);
      }
    }
    return {
      type: 'empty',
    };
  }
}
