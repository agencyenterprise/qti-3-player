import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: AssessmentTestDType
 * An assessment test is a group of assessmentItems with an associated set of rules that det-
 * ermine which of the items the candidate sees, in what order, and in what way the candidate
 * interacts with them. The rules describe the valid paths through the test, when responses
 * are submitted for response processing and when (if at all) feedback is to be given. Asses-
 * sment tests are composed of one or more test parts.
 */
export class AssessmentTest extends BaseQtiElement {
  static readonly elementNames = ['qti-assessment-test'];
  static readonly canBeRoot = true;
  static readonly contextElement = true;

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    const identifier = this.getIdentifier();
    container.className = 'qti-assessment-test';
    container.setAttribute('data-identifier', identifier);

    renderer.processElementChildren(this.element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
