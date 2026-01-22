import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { EmptyElement, ValueElement } from '../types';

/**
 * XML Schema type: CorrectResponseDType
 * This class is used to define, as part of the response declaration, the values(s) for the
 * correct response.
 */
export class CorrectResponse extends BaseQtiElement {
  static readonly elementNames = ['qti-correct-response'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): ValueElement {
    const values = renderer.querySelectorAllLocal(this.element, 'qti-value');
    const stringValues = values.map((value) => value.textContent);
    const multiple = stringValues.length > 1;
    return {
      type: 'value',
      value: multiple ? stringValues : stringValues[0],
      valueType: 'string',
      cardinality: multiple ? 'multiple' : 'single',
    };
  }
}
