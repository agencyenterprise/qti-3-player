import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { EmptyElement, VisualElement } from '../types';

/**
 * XML Schema type: AssessmentItemRefDType
 * Items are incorporated into the test by reference and not by direct aggregation. Note that
 * the identifier of the reference need not have any meaning outside the test. In particular
 * it is not required to be unique in the context of any catalog, or be represented in the i-
 * tem's metadata.
 */
export class AssessmentItemRef extends BaseQtiElement {
  static readonly elementNames = ['qti-assessment-item-ref'];
  static readonly contextElement = true;

  process(renderer: QtiRenderer): VisualElement | EmptyElement {
    const container = document.createElement('div');
    const identifier = this.getIdentifier();
    const href = this.element.getAttribute('href') || '';
    container.className = 'qti-assessment-item';
    container.setAttribute('data-identifier', identifier);
    container.setAttribute('data-href', href);

    if (href) {
      const referenceContent = renderer.getReferencedXmlElement(href);
      if (referenceContent) {
        const referenceIdentifier = referenceContent.getAttribute('identifier') || '';
        if (referenceIdentifier && referenceIdentifier === identifier) {
          renderer.processElementChildren(referenceContent, container);
          return {
            type: 'visual',
            element: container,
          };
        }
      }
    }

    console.warn(
      `AssessmentItemRef: No reference content found for href: ${href} and identifier: ${identifier}`
    );

    return {
      type: 'empty',
    };
  }
}
