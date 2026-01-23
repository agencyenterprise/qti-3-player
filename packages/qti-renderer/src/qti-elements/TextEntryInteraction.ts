import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: TextEntryInteractionDType
 * A TextEntry Interaction is an inlineInteraction that obtains a simple piece of text from
 * the candidate. Like inlineChoiceInteraction, the delivery engine must allow the candidate
 * to review their choice within the context of the surrounding text. The textEntryInteracti-
 * on must be bound to a response variable with single or record cardinality only. If the re-
 * sponse variable has single cardinality the base-type must be one of string, integer or fl-
 * oat; if it has record cardinality the permitted fields are 'stringValue', 'floatValue', e-
 * tc.
 */
export class TextEntryInteraction extends BaseQtiElement {
  static readonly elementNames = ['qti-text-entry-interaction'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): VisualElement {
    const responseIdentifier = this.getResponseIdentifier();
    const input = document.createElement('input');
    input.className = 'qti-text-entry-interaction';
    input.setAttribute('data-response-identifier', responseIdentifier);
    input.type = 'text';

    const placeholderText = this.element.getAttribute('placeholder-text');
    if (placeholderText) {
      input.placeholder = placeholderText;
    }

    input.addEventListener('input', () => {
      const value = input.value;
      renderer.setVariable(responseIdentifier, {
        type: 'value',
        value: value,
        valueType: 'string',
        cardinality: 'single',
      });
    });

    input.addEventListener('change', () => {
      const value = input.value;
      renderer.setVariable(responseIdentifier, {
        type: 'value',
        value: value,
        valueType: 'string',
        cardinality: 'single',
      });
    });

    return {
      type: 'visual',
      element: input,
    };
  }
}
