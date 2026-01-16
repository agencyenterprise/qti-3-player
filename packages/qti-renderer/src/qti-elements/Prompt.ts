import { BaseQtiElement } from "./BaseQtiElement";
import { QtiRenderer } from "../renderer";

export class Prompt extends BaseQtiElement {
  getElementNames(): string[] {
    return ["prompt", "qti-prompt"];
  }

  render(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement("div");
    container.className = "qti-prompt";

    Array.from(element.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        container.appendChild(document.createTextNode(node.textContent || ""));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const rendered = renderer.renderElement(node as Element);
        container.appendChild(rendered);
      }
    });

    return container;
  }
}
