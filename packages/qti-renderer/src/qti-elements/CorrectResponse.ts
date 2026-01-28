import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { BaseValueType, CardinalityType, EmptyElement, ValueElement } from '../types';

/**
 * XML Schema type: CorrectResponseDType
 * This class is used to define, as part of the response declaration, the values(s) for the
 * correct response.
 */
export class CorrectResponse extends BaseQtiElement {
  static readonly elementNames = ['qti-correct-response'];

  process(renderer: QtiRenderer): ValueElement {
    const processedValues = renderer
      .processElementChildren(this.element, null)
      .filter((result) => result.type === 'value') as ValueElement[];
    const multiple = processedValues.length > 1;

    const cardinality: CardinalityType = multiple ? 'multiple' : 'single';
    const valueType: BaseValueType = 'string';
    const value: any = multiple
      ? processedValues.map((value) => value.value)
      : processedValues[0].value;

    return {
      type: 'value',
      value,
      valueType,
      cardinality,
    };
  }
}
