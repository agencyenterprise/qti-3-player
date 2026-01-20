import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { SimpleChoice } from './SimpleChoice';
import { VisualElement } from '../types';

/**
 * XML Schema type: ChoiceInteractionDType
 * The choice interaction presents a set of choices to the candidate. The candidate's task is
 * to select one or more of the choices, up to a maximum of max-choices. The interaction is
 * always initialized with no choices selected. The ChoiceInteraction must be bound to a res-
 * ponse variable with a base-type of identifier and single or multiple cardinality.
 */
export class ChoiceInteraction extends BaseQtiElement {
  static readonly elementNames = ['qti-choice-interaction'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): VisualElement {
    const responseIdentifier = this.getResponseIdentifier();
    const isMultiple = this.getMaxChoices() > 1;
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'qti-choice-interaction';
    fieldset.setAttribute('data-response-identifier', responseIdentifier);
    fieldset.setAttribute('data-is-multiple', isMultiple.toString());

    this.processPrompt(renderer, fieldset);
    this.processChoices(renderer, fieldset);

    fieldset.addEventListener('change', (event) => {
      const checkboxes = document.getElementsByName(responseIdentifier);

      const values = [];

      for (let i = 0; i < checkboxes.length; i++) {
        const checkboxElement = checkboxes[i] as HTMLInputElement;
        const closestFieldset = checkboxElement.closest('fieldset[data-response-identifier]');
        if (
          closestFieldset &&
          closestFieldset.getAttribute('data-response-identifier') === responseIdentifier
        ) {
          if (checkboxElement.checked) {
            values.push(checkboxElement.value);
          }
        }
      }
      renderer.setVariable(responseIdentifier, {
        type: 'value',
        value: isMultiple ? values : values[0],
        valueType: 'identifier',
        cardinality: isMultiple ? 'multiple' : 'single',
      });
    });

    return {
      type: 'visual',
      element: fieldset,
    };
  }

  getMaxChoices(): number {
    return parseInt(this.element.getAttribute('max-choices') || '1', 10);
  }

  processPrompt(renderer: QtiRenderer, fieldset: HTMLFieldSetElement) {
    const prompt = renderer.querySelectorLocal(this.element, 'qti-prompt');
    if (prompt) {
      const promptElement = renderer.processElement(prompt);
      const legend = document.createElement('legend');
      legend.className = 'qti-prompt';
      if (promptElement.type === 'visual') {
        legend.appendChild(promptElement.element);
      }
      fieldset.appendChild(legend);
    }
  }

  processChoices(renderer: QtiRenderer, fieldset: HTMLFieldSetElement) {
    const choices = renderer.querySelectorAllLocal(this.element, 'qti-simple-choice');

    choices.forEach((choice) => {
      const simpleChoiceRenderer = new SimpleChoice(choice);
      simpleChoiceRenderer.setMaxChoices(this.getMaxChoices());
      simpleChoiceRenderer.setGroupName(this.getResponseIdentifier());
      const renderedChoice = simpleChoiceRenderer.process(renderer);
      if (renderedChoice.type === 'visual') {
        fieldset.appendChild(renderedChoice.element);
      }
    });
  }
}
