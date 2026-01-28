import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: RubricBlockDType
 * XML Schema type: TestRubricBlockDType
 *
 * All of these types are used to define the rubric block, as a container for other elements.
 */
export class RubricBlock extends BaseQtiElement {
  static readonly elementNames = ['qti-rubric-block'];

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    container.className = 'qti-rubric-block';

    renderer.processElementChildren(this.element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
