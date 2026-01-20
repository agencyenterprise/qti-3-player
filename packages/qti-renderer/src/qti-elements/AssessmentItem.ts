import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: AssessmentItemDType
 * An assessment item encompasses the information that is presented to a candidate and infor-
 * mation about how to score the item. Scoring takes place when candidate responses are tran-
 * sformed into outcomes by response processing rules. It is sometimes desirable to have sev-
 * eral different items that appear the same to the candidate but which are scored different-
 * ly. In this specification, these are distinct items by definition and must therefore have
 * distinct identifiers. To help facilitate the exchange of items that share significant par-
 * ts of their presentation this specification supports the inclusion of separately managed
 * item fragments (see Item and Test Fragments) in the qti-item-body.
 */
export class AssessmentItem extends BaseQtiElement {
  static readonly elementNames = ['qti-assessment-item'];
  static readonly canBeRoot = true;

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    const identifier = this.getIdentifier();
    container.className = 'qti-assessment-item';
    container.setAttribute('data-identifier', identifier);

    renderer.processElementChildren(this.element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
