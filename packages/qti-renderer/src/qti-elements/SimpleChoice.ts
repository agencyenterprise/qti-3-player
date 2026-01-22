import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: SimpleChoiceDType
 * A simpleChoice is a choice that contains flowStatic objects. A simpleChoice must not cont-
 * ain any nested interactions.
 */
export class SimpleChoice extends BaseQtiElement {
  static readonly elementNames = ['qti-simple-choice'];
  static readonly canBeRoot = false;

  maxChoices: number = 1;
  groupName: string = '';
  itemNumber: string = '';

  process(renderer: QtiRenderer): VisualElement {
    const identifier = this.getIdentifier();
    const li = document.createElement('li');
    li.className = 'qti-simple-choice';
    const label = document.createElement('label');
    label.className = 'qti-simple-choice';
    label.setAttribute('for', identifier);

    const input = document.createElement('input');
    input.type = this.maxChoices === 1 ? 'radio' : 'checkbox';
    input.name = this.groupName;
    input.id = identifier;
    input.value = identifier;
    if (this.maxChoices > 1) {
      input.addEventListener('click', (event: MouseEvent) => {
        const clickingCheckbox = event.target as HTMLInputElement;
        if (clickingCheckbox.checked) {
          const fieldset = input.closest('fieldset');
          const checkboxes = fieldset?.querySelectorAll(
            'input[type="checkbox"][name="' + this.groupName + '"]'
          );
          if (checkboxes && checkboxes.length > 0) {
            const values = [];

            for (let i = 0; i < checkboxes.length; i++) {
              const checkboxElement = checkboxes[i] as HTMLInputElement;

              if (checkboxElement.checked) {
                values.push(checkboxElement.value);
              }
            }
            if (values.length > this.maxChoices) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }
        }
      });
    }

    li.appendChild(input);
    li.appendChild(label);

    if (this.itemNumber !== '') {
      const itemNumberElement = document.createElement('span');
      itemNumberElement.className = 'qti-choices-list-item-number';
      itemNumberElement.textContent = this.itemNumber;
      label.appendChild(itemNumberElement);
    }

    const labelContent = document.createElement('span');
    labelContent.className = 'qti-choices-list-item-label';
    renderer.processElementChildren(this.element, labelContent);
    label.appendChild(labelContent);

    return {
      type: 'visual',
      element: li,
    };
  }

  setMaxChoices(maxChoices: number): void {
    this.maxChoices = maxChoices;
  }

  setGroupName(groupName: string): void {
    this.groupName = groupName;
  }

  setItemNumber(itemNumber: string): void {
    this.itemNumber = itemNumber;
  }
}
