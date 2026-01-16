import { BaseQtiElement } from "./BaseQtiElement";
import { QtiRenderer } from "../renderer";

export class AssessmentItem extends BaseQtiElement {
  getElementNames(): string[] {
    return ["assessmentItem", "qti-assessment-item"];
  }

  render(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement("div");
    container.className = "qti-assessment-item";
    container.setAttribute("role", "article");
    container.setAttribute("aria-label", "Assessment item");

    const itemBody =
      renderer.querySelectorLocal(element, "itemBody") ||
      renderer.querySelectorLocal(element, "qti-item-body");
    if (itemBody) {
      const rendered = renderer.renderElement(itemBody);
      container.appendChild(rendered);
    }

    return container;
  }
}
