import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';
import { EventsEnum, onQti3PlayerEvent } from '../events';

/**
 * XML Schema type: FeedbackInlineDType
 * This is feedback that is presented as inline content. Inline feedback that forms part of a
 * Non-adaptive Item must not contain an interaction object, either directly or indirectly.
 * When an interaction is contained in a hidden feedback it must also be hidden. The candida-
 * te must not be able to set or update the value of the associated response variables. Feed-
 * back can be embedded inside each other, with one exception: qti-feedback-inline cannot co-
 * ntain feedback block elements.
 */
export class FeedbackInline extends BaseQtiElement {
  static readonly elementNames = ['qti-feedback-inline'];

  process(renderer: QtiRenderer): VisualElement {
    const contextIdentifier = renderer.getFullTraversingContext();
    const container = document.createElement('span');
    const outcomeIdentifier = this.element.getAttribute('outcome-identifier') || '';
    const identifier = this.getIdentifier();

    container.className = 'qti-feedback-inline';
    container.setAttribute('data-outcome-identifier', outcomeIdentifier);
    container.setAttribute('data-identifier', identifier);

    this.innerRender(renderer, container);
    onQti3PlayerEvent(EventsEnum.SUBMIT_RENDER_EVENT, () => {
      renderer.withEventContext(contextIdentifier, () => {
        container.innerHTML = '';
        this.innerRender(renderer, container);
      });
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
