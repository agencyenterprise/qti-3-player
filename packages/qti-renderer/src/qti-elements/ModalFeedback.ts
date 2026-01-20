import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: ModalFeedbackDType
 * Modal feedback is shown to the candidate directly following response processing. The value
 * of an outcome variable is used in conjunction with the showHide and identifier characteri-
 * stics to determine whether or not the feedback is shown. The content of the modalFeedback
 * must not contain any interactions.
 */
export class ModalFeedback extends BaseQtiElement {
  static readonly elementNames = ['qti-modal-feedback'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    const outcomeIdentifier = this.element.getAttribute('outcome-identifier') || '';
    const identifier = this.getIdentifier();

    container.className = 'qti-modal-feedback';
    container.setAttribute('data-outcome-identifier', outcomeIdentifier);
    container.setAttribute('data-identifier', identifier);

    this.innerRender(renderer, container);
    document.addEventListener('qti-submit', (event) => {
      container.innerHTML = '';
      this.innerRender(renderer, container);
    });

    return {
      type: 'visual',
      element: container,
    };
  }

  innerRender(renderer: QtiRenderer, container: HTMLElement): void {
    const outcomeIdentifier = this.element.getAttribute('outcome-identifier') || '';
    const identifier = this.getIdentifier();
    const showHide = this.element.getAttribute('show-hide');

    const outcomeValue = renderer.getOutcomeValue(outcomeIdentifier);
    if (
      showHide === 'show' &&
      outcomeValue.type === 'value' &&
      outcomeValue.valueType === 'identifier' &&
      outcomeValue.cardinality === 'single' &&
      outcomeValue.value === identifier
    ) {
      renderer.processElementChildren(this.element, container);
    }
  }
}
