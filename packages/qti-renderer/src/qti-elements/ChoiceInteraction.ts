import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { SimpleChoice } from './SimpleChoice';
import { VisualElement } from '../types';

function indexToLetter(index: number): string {
  let letter = '';
  let temp;
  while (index >= 0) {
    temp = index % 26;
    letter = String.fromCharCode(temp + 97) + letter;
    index = Math.floor(index / 26) - 1;
  }
  return letter;
}

/**
 * XML Schema type: ChoiceInteractionDType
 * The choice interaction presents a set of choices to the candidate. The candidate's task is
 * to select one or more of the choices, up to a maximum of max-choices. The interaction is
 * always initialized with no choices selected. The ChoiceInteraction must be bound to a res-
 * ponse variable with a base-type of identifier and single or multiple cardinality.
 */
export class ChoiceInteraction extends BaseQtiElement {
  static readonly elementNames = ['qti-choice-interaction'];

  process(renderer: QtiRenderer): VisualElement {
    const contextIdentifier = renderer.getFullTraversingContext();
    const responseIdentifier = this.getResponseIdentifier();
    const isMultiple = this.getMaxChoices() !== 1;
    const fieldset = document.createElement('fieldset');

    fieldset.className = `qti-choice-interaction ${this.getOrientationClass()}`;
    fieldset.setAttribute('data-response-identifier', responseIdentifier);
    fieldset.setAttribute('data-is-multiple', isMultiple.toString());

    this.processPrompt(renderer, fieldset);
    this.processChoices(renderer, fieldset);

    fieldset.addEventListener('change', () => {
      renderer.withEventContext(contextIdentifier, () => {
        const name = renderer.getTraversingContextVariableName(responseIdentifier);
        const checkboxes = document.getElementsByName(name);
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
    });

    return {
      type: 'visual',
      element: fieldset,
    };
  }

  getOrientationClass(): string {
    if (this.element.classList.contains('qti-orientation-vertical')) {
      return 'qti-orientation-vertical';
    } else if (this.element.classList.contains('qti-orientation-horizontal')) {
      return 'qti-orientation-horizontal';
    }
    // orientation attribute this is deprecated according
    // https://www.imsglobal.org/sites/default/files/spec/qti/v3/info/imsqti_asi_v3p0p1_infomodel_v1p0.html#DataCharacteristic_ChoiceInteraction.Attr_orientation
    // we use the class attribute to determine the orientation
    // this is used when no class for orientation is present
    const orientation = this.element.getAttribute('orientation');
    if (orientation) {
      return `qti-orientation-${orientation}`;
    }
    return '';
  }

  getMaxChoices(): number {
    return parseInt(this.element.getAttribute('max-choices') || '1', 10);
  }

  getStackingNumber(): number {
    const stackingPrefix = 'qti-choices-stacking-';
    for (const className of Array.from(this.element.classList)) {
      if (className.startsWith(stackingPrefix)) {
        const stackingNumber = className.substring(stackingPrefix.length);
        return parseInt(stackingNumber, 10);
      }
    }
    return 1;
  }

  getItemNumber(index: number): string {
    const classes = Array.from(this.element.classList);
    let suffix = '';
    let itemIndex = '';
    if (classes.includes('qti-labels-suffix-period')) {
      suffix = '.';
    } else if (classes.includes('qti-labels-suffix-parenthesis')) {
      suffix = ')';
    }
    if (classes.includes('qti-labels-decimal')) {
      itemIndex = (index + 1).toString();
    } else if (
      classes.includes('qti-labels-lower-alpha') ||
      classes.includes('qti-labels-upper-alpha')
    ) {
      itemIndex = indexToLetter(index);
      if (classes.includes('qti-labels-upper-alpha')) {
        itemIndex = itemIndex.toUpperCase();
      }
    }
    return itemIndex !== '' ? itemIndex + suffix : '';
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

    const ul = document.createElement('ul');
    ul.className = 'qti-choices-list';
    fieldset.appendChild(ul);

    const addEmptyElementAtPosition: number[] = [];
    const numColumns = this.getStackingNumber();
    if (numColumns > 2 && this.getOrientationClass() === 'qti-orientation-vertical') {
      // trick: add empty elements to be rendered and fulfill the stacking properly
      const numChoices = choices.length;
      const numRows = Math.ceil(numChoices / numColumns);
      const insert = numChoices % numColumns === 0 ? 0 : numColumns - (numChoices % numColumns);
      for (let i = 0; i < insert; i++) {
        addEmptyElementAtPosition.push(numColumns * numRows - numRows * i - 1);
      }
    }

    let addedItems = 0;
    choices.forEach((choice, index) => {
      const simpleChoiceRenderer = new SimpleChoice(choice);
      simpleChoiceRenderer.setMaxChoices(this.getMaxChoices());
      simpleChoiceRenderer.setGroupName(
        renderer.getTraversingContextVariableName(this.getResponseIdentifier())
      );
      simpleChoiceRenderer.setItemNumber(this.getItemNumber(index));
      const renderedChoice = simpleChoiceRenderer.process(renderer);
      if (renderedChoice.type === 'visual') {
        if (addEmptyElementAtPosition.includes(addedItems)) {
          const emptyElement = document.createElement('span');
          emptyElement.innerHTML = '&nbsp;';
          emptyElement.className = 'qti-choice-empty';
          ul.appendChild(emptyElement);
          addedItems++;
        }
        ul.appendChild(renderedChoice.element);
        addedItems++;
      }
    });
  }
}
