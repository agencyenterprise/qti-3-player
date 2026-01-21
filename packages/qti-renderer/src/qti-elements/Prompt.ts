import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: PromptDType
 * This enables an author to define the prompt for the question.  The way in which the prompt
 * is displayed depends upon the rendering system. The prompt should not be used to contain
 * the actual root of the question.
 */
export class Prompt extends BaseQtiElement {
  static readonly elementNames = ['qti-prompt'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    container.className = 'qti-prompt';

    renderer.processElementChildren(this.element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
