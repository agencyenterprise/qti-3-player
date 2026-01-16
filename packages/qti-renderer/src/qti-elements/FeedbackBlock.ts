import { BaseQtiElement } from "./BaseQtiElement";
import { QtiRenderer } from "../renderer";

export class FeedbackBlock extends BaseQtiElement {
  getElementNames(): string[] {
    return ["qti-feedback-block"];
  }

  render(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement("div");
    container.className = "qti-feedback-block";

    Array.from(element.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text) {
          container.appendChild(document.createTextNode(text));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const nodeEl = node as Element;
        const tagName = nodeEl.localName || nodeEl.tagName.toLowerCase();

        // Create appropriate HTML element
        let htmlEl: HTMLElement;
        if (tagName === "p") {
          htmlEl = document.createElement("p");
        } else if (tagName === "strong" || tagName === "b") {
          htmlEl = document.createElement("strong");
        } else if (tagName === "em" || tagName === "i") {
          htmlEl = document.createElement("em");
        } else {
          htmlEl = document.createElement("div");
        }

        // Copy text content and attributes
        htmlEl.textContent = nodeEl.textContent || "";
        container.appendChild(htmlEl);
      }
    });

    return container;
  }
}
