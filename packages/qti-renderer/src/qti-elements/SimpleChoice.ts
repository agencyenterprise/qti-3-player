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

  isMultiple: boolean = false;
  groupName: string = '';

  process(renderer: QtiRenderer): VisualElement {
    const identifier = this.element.getAttribute('identifier') || `choice-${Math.random().toString(36).substr(2, 9)}`;

    const label = document.createElement('label');
    label.className = 'qti-simple-choice';
    label.setAttribute('for', identifier);

    const input = document.createElement('input');
    input.type = this.isMultiple ? 'checkbox' : 'radio';
    input.name = this.groupName;
    input.id = identifier;
    input.value = identifier;

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

  setIsMultiple(isMultiple: boolean): void {
    this.isMultiple = isMultiple;
  }

  setGroupName(groupName: string): void {
    this.groupName = groupName;
  }
}
