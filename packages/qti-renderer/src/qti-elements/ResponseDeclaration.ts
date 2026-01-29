import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { CorrectResponse } from './CorrectResponse';
import { BaseValueType, CardinalityType, EmptyElement } from '../types';

/**
 * XML Schema type: ResponseDeclarationDType
 * Response variables are declared by response declarations and bound to interactions in the
 * itemBody. Each response variable declared may be bound to one and only one interaction. At
 * runtime, response variables are instantiated as part of an item session. Their values are
 * always initialized to NULL (no value) regardless of whether or not a default value is giv-
 * en in the declaration. A response variable with a NULL value indicates that the candidate
 * has not offered a response, either because they have not attempted the item at all or bec-
 * ause they have attempted it and chosen not to provide a response. If a default value has
 * been provided for a response variable then the variable is set to this value at the start
 * of the first attempt. If the candidate never attempts the item, in other words, the item
 * session passes straight from the initial state to the closed state without going through
 * the interacting state, then the response variable remains NULL and the default value is n-
 * ever used.
 */
export class ResponseDeclaration extends BaseQtiElement {
  static readonly elementNames = ['qti-response-declaration'];

  process(renderer: QtiRenderer): EmptyElement {
    const identifier = this.getIdentifier();
    const cardinality = this.getCardinality();
    const baseType = this.getBaseType();

    const correctResponse = renderer.querySelectorLocal(this.element, 'qti-correct-response');
    if (correctResponse) {
      const c = new CorrectResponse(correctResponse);
      const correctValue = c.process(renderer);
      // Correct response always return a value with valueType string since it doesn't have extra conversion data
      if (
        correctValue.type !== 'value' ||
        correctValue.valueType !== 'string' ||
        (correctValue.cardinality !== 'single' && correctValue.cardinality !== 'multiple')
      ) {
        console.warn('ResponseDeclaration: correctValue is not a string value', correctValue);
      } else {
        // TODO: handle all the cases
        if (
          (cardinality === 'single' && correctValue.cardinality === 'single') ||
          ((cardinality === 'multiple' || cardinality === 'ordered') &&
            correctValue.cardinality === 'multiple')
        ) {
          renderer.setCorrectResponse(identifier, {
            type: 'value',
            value: correctValue.value,
            valueType: baseType,
            cardinality: cardinality,
          });
        } else {
          console.warn(
            'ResponseDeclaration: correctResponse was not converted to the response declaration',
            correctValue,
            this.element
          );
        }
      }
    }
    return {
      type: 'empty',
    };
  }
}
