import { BaseQtiElement } from "./BaseQtiElement";
import { QtiRenderer } from "../renderer";

export class ItemBody extends BaseQtiElement {
  getElementNames(): string[] {
    return ["itemBody", "qti-item-body"];
  }

  render(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement("div");
    container.className = "qti-item-body";

    Array.from(element.children).forEach((child) => {
      const rendered = renderer.renderElement(child);
      container.appendChild(rendered);
    });

    return container;
  }
}
