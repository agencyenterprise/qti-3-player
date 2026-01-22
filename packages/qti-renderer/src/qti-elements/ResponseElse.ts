import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { ValueElement } from '../types';

/**
 * XML Schema type: ResponseElseDType
 * This provides the 'Else' clause of the 'If..Then..Else' for the response processing funct-
 * ionality. If the expression given in a responseIf or responseElseIf evaluates to 'true' t-
 * hen the sub-rules contained within it are followed and any following responseElseIf or re-
 * sponseElse parts are ignored for this response condition. If the expression given in a re-
 * sponseIf or responseElseIf does not evaluate to 'true' then consideration passes to the n-
 * ext responseElseIf or, if there are no more responseElseIf parts then the sub-rules of the
 * responseElse are followed (if specified).
 */
export class ResponseElse extends BaseQtiElement {
  static readonly elementNames = ['qti-response-else'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): ValueElement {
    renderer.processElementChildren(this.element, null);
    return {
      type: 'value',
      value: true,
      valueType: 'boolean',
      cardinality: 'single',
    };
  }
}
