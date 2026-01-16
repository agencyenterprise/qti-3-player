import { BaseQtiElement } from "./BaseQtiElement";
import { QtiRenderer } from "../renderer";


export class ModalFeedback extends BaseQtiElement {
  getElementNames(): string[] {
    return ["qti-modal-feedback"];
  }

  render(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement("div");
    container.className = "qti-modal-feedback";

    Array.from(element.children).forEach((child) => {
      const rendered = renderer.renderElement(child);
      container.appendChild(rendered);
    });

    return container;
  }
}
