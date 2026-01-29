import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: TestPartDType
 * A test is composed of one or more test parts. A test-part represents a major division of
 * the test and is used to control the basic mode parameters that apply to all sections and
 * sub-sections within that part.
 */
export class TestPart extends BaseQtiElement {
  static readonly elementNames = ['qti-test-part'];

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    const identifier = this.getIdentifier();
    container.className = 'qti-test-part';
    container.setAttribute('data-identifier', identifier);

    renderer.processElementChildren(this.element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
