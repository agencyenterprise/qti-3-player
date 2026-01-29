import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * XML Schema type: ItemBodyDType
 * The item body contains the text, graphics, media objects and interactions that describe t-
 * he item's content and information about how it is structured. The body is presented by co-
 * mbining it with stylesheet information, either explicitly or implicitly using the default
 * style rules of the delivery or authoring system.
 * The body must be presented to the candid-
 * ate when the associated item session is in the interacting state. In this state, the cand-
 * idate must be able to interact with each of the visible interactions and therefore set or
 * update the values of the associated response variables. The body may be presented to the
 * candidate when the item session is in the closed or review state. In these states, althou-
 * gh the candidate's responses should be visible, the interactions must be disabled so as to
 * prevent the candidate from setting or updating the values of the associated response vari-
 * ables. Finally, the body may be presented to the candidate in the solution state, in which
 * case the correct values of the response variables must be visible and the associated inte-
 * ractions disabled.
 * The content model employed by this specification uses many concepts ta-
 * ken directly from [XHTML, 10]. In effect, this part of the specification defines a profile
 * of XHTML. Only some of the elements defined in XHTML are allowable in an assessmentItem a-
 * nd of those that are, some have additional constraints placed on their attributes. Only t-
 * hose elements from XHTML that are explicitly defined within this specification can be use-
 * d. See XHTML Elements for details. Finally, this specification defines some new elements
 * which are used to represent the interactions and to control the display of Integrated Fee-
 * dback and content restricted to one or more of the defined content views.
 */
export class ItemBody extends BaseQtiElement {
  static readonly elementNames = ['qti-item-body'];

  process(renderer: QtiRenderer): VisualElement {
    const container = document.createElement('div');
    container.className = 'qti-item-body';

    renderer.processElementChildren(this.element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
