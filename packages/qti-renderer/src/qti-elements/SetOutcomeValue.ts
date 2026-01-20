import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { EmptyElement } from '../types';

/**
 * XML Schema type: SetValueDType
 * The setValue rule sets the value of a variable (response, outcome or template) to the val-
 * ue obtained from the associated expression. A variable can be updated with reference to a
 * previously assigned value, in other words, the variable being set may appear in the expre-
 * ssion where it takes the value previously assigned to it. Special care is required when u-
 * sing the numeric base-types because floating point values can not be assigned to integer
 * variables and vice-versa. The truncate, round or integerToFloat operators must be used to
 * achieve numeric type conversion.
 */
export class SetOutcomeValue extends BaseQtiElement {
  static readonly elementNames = ['qti-set-outcome-value'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): EmptyElement {
    const identifier = this.element.getAttribute('identifier') || '';
    const value = renderer.processElement(this.element.children[0] as Element);
    if (value.type === 'value') {
      renderer.setOutcomeValue(identifier, value);
    }

    return {
      type: 'empty',
    };
  }
}
