import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: FeedbackContentBodyDType
 * XML Schema type: FeedbackFlowContentBodyDType
 * XML Schema type: RubricBlockContentBodyDType
 * XML Schema type: RubricBlockTemplateBlockContentBodyDType
 * XML Schema type: TemplateBlockContentBodyDType
 * XML Schema type: TestFeedbackFlowContentBodyDType
 * XML Schema type: TestRubricBlockContentBodyDType
 *
 * All of these types are used to define the content body something, as a container for other elements.
 */
export class ContentBody extends BaseQtiElement {
  static readonly elementNames = ['qti-content-body'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    container.className = 'qti-content-body';

    renderer.processElementChildren(this.element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
