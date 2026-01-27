import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { ValueElement } from '../types';

/**
 * XML Schema type: ValueDType
 * A class that can represent a single value of any base-type in variable declarations and r-
 * esult reports. The base-type is defined by the 'base-type' attribute of the declaration e-
 * xcept in the case of variables with record cardinality.
 */
export class Value extends BaseQtiElement {
  static readonly elementNames = ['qti-value'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): ValueElement {
    const baseType = this.getBaseType();
    const value = this.element.textContent;
    const fieldIdentifier = this.element.getAttribute('field-identifier') || undefined;

    return {
      type: 'value',
      value: value,
      valueType: baseType,
      cardinality: 'single',
      fieldIdentifier: fieldIdentifier,
    };
  }
}
