import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: AssessmentSectionDType
 * An assessment section groups together individual item references and/or sub-sections. A s-
 * ection can be composed of any hierarchy/combination of items and sections. A section can
 * only reference an item using a qti-assessment-item-ref object but it may contain or refer-
 * ence other sections. The grouping of the sections/items depends upon the nature of the pa-
 * rent section i.e. each section can be used for different grouping criteria e.g. organizat-
 * ional, pedagogic, etc.
 */
export class AssessmentSection extends BaseQtiElement {
  static readonly elementNames = ['qti-assessment-section'];
  static readonly canBeRoot = true;
  static readonly contextElement = true;

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    const identifier = this.getIdentifier();
    container.className = 'qti-assessment-section';
    container.setAttribute('data-identifier', identifier);

    renderer.processElementChildren(this.element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
