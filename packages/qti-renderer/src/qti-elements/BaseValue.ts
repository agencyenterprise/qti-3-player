import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { BaseValueType, ValueElement } from '../types';

/**
 * XML Schema type: BaseValueDType
 * One of the QTI expression functions. The simplest expression returns a single value from
 * the set defined by the given base-type.
 */
export class BaseValue extends BaseQtiElement {
  static readonly elementNames = ['qti-base-value'];

  process(renderer: QtiRenderer): ValueElement {
    const baseType = this.getBaseType();
    const value = this.element.textContent;

    return {
      type: 'value',
      value: value,
      valueType: baseType,
      cardinality: 'single',
    };
  }
}
