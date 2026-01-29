import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { ValueElement } from '../types';

/**
 * XML Schema type: LogicPairDType
 * This is the container for the combination of the two child expressions (see the Expressio-
 * nGroup abstract class for the details on the permitted expressions).
 */
export class Match extends BaseQtiElement {
  static readonly elementNames = ['qti-match'];

  process(renderer: QtiRenderer): ValueElement {
    const firstChild = this.element.children[0] as Element;
    const secondChild = this.element.children[1] as Element;

    const firstValue = renderer.processElement(firstChild);
    const secondValue = renderer.processElement(secondChild);

    if (firstValue.type !== 'value' || secondValue.type !== 'value') {
      console.warn(
        `Match: first expression and/or second expression is not a value: (${firstValue.type}) and (${secondValue.type})`
      );
      return {
        type: 'value',
        value: false,
        valueType: 'boolean',
        cardinality: 'single',
      };
    } else if (firstValue.valueType !== secondValue.valueType) {
      console.debug(
        `Match: first expression and second expression have different types: (${firstValue.valueType}) and (${secondValue.valueType})`
      );
      return {
        type: 'value',
        value: false,
        valueType: 'boolean',
        cardinality: 'single',
      };
    } else if (firstValue.cardinality !== secondValue.cardinality) {
      console.debug(
        `Match: first expression and second expression have different cardinalities: (${firstValue.cardinality}) and (${secondValue.cardinality})`
      );
      return {
        type: 'value',
        value: false,
        valueType: 'boolean',
        cardinality: 'single',
      };
    }
    if (firstValue.cardinality === 'single') {
      return {
        type: 'value',
        value: firstValue.value === secondValue.value,
        valueType: 'boolean',
        cardinality: 'single',
      };
    } else if (firstValue.cardinality === 'multiple') {
      const firstValueValues = firstValue.value as any[];
      const secondValueValues = secondValue.value as any[];
      return {
        type: 'value',
        value:
          firstValueValues.length === secondValueValues.length &&
          firstValueValues.every((value) => secondValueValues.includes(value)) &&
          secondValueValues.every((value) => firstValueValues.includes(value)),
        valueType: 'boolean',
        cardinality: 'single',
      };
    } else if (firstValue.cardinality === 'ordered') {
      const firstValueValues = firstValue.value as any[];
      const secondValueValues = secondValue.value as any[];
      return {
        type: 'value',
        value:
          firstValueValues.length === secondValueValues.length &&
          firstValueValues.every((value, index) => value === secondValueValues[index]) &&
          secondValueValues.every((value, index) => value === firstValueValues[index]),
        valueType: 'boolean',
        cardinality: 'single',
      };
    } else if (firstValue.cardinality === 'record') {
      const firstValueValues = firstValue.value as Record<string, any>;
      const secondValueValues = secondValue.value as Record<string, any>;
      return {
        type: 'value',
        value:
          Object.keys(firstValueValues).every(
            (key) => firstValueValues[key] === secondValueValues[key]
          ) &&
          Object.keys(secondValueValues).every(
            (key) => firstValueValues[key] === secondValueValues[key]
          ),
        valueType: 'boolean',
        cardinality: 'single',
      };
    }
    console.warn('Match: first expression and second expression could not be compared.');
    return {
      type: 'value',
      value: false,
      valueType: 'boolean',
      cardinality: 'single',
    };
  }
}
