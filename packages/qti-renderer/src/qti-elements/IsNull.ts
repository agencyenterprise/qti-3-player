import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { ValueElement } from '../types';

/**
 * XML Schema type: LogicSingleDType
 * This is the container for the combination of the single child expression (see the Express-
 * ionGroup abstract class for the details on the permitted expressions).
 */
export class IsNull extends BaseQtiElement {
  static readonly elementNames = ['qti-is-null'];

  process(renderer: QtiRenderer): ValueElement {
    const firstChild = this.element.children[0] as Element;

    const firstValue = renderer.processElement(firstChild);

    return {
      type: 'value',
      value:
        firstValue.type === 'empty' || (firstValue.type === 'value' && firstValue.value === null),
      valueType: 'boolean',
      cardinality: 'single',
    };
  }
}
