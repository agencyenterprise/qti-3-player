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

  process(renderer: QtiRenderer): VisualElement {
    const identifier = this.getIdentifier();
    const label = document.createElement('label');
    label.className = 'qti-simple-choice';
    label.setAttribute('for', identifier);

    const input = document.createElement('input');
    input.type = this.maxChoices > 1 ? 'checkbox' : 'radio';
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

    label.appendChild(input);

    const content = document.createElement('span');
    content.className = 'qti-choice-content';

    renderer.processElementChildren(this.element, content);

    label.appendChild(content);

    return {
      type: 'visual',
      element: label,
    };
  }

  setMaxChoices(maxChoices: number): void {
    this.maxChoices = maxChoices;
  }

  setGroupName(groupName: string): void {
    this.groupName = groupName;
  }
}
