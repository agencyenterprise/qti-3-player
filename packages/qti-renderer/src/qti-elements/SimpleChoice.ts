import { BaseQtiElement } from "./BaseQtiElement";
import { QtiRenderer } from "../renderer";

export class SimpleChoice extends BaseQtiElement {
  getElementNames(): string[] {
    return ["simpleChoice", "qti-simple-choice"];
  }

  render(element: Element, renderer: QtiRenderer): HTMLElement {
    let interactionId = element.getAttribute("data-interaction-id");
    let choiceId = element.getAttribute("data-choice-id");
    let isMultiple = element.getAttribute("data-is-multiple") === "true";

    // If not set by parent, try to extract from DOM
    if (!interactionId || !choiceId) {
      const fieldset = element.closest("fieldset[data-response-identifier]");
      interactionId =
        fieldset?.getAttribute("data-response-identifier") || "unknown";

      // Try to find parent choiceInteraction (handles namespaces)
      let parentInteraction: Element | null = null;
      let current: Element | null = element.parentElement;
      while (current && !parentInteraction) {
        const localName = current.localName || current.tagName.toLowerCase();
        if (
          localName === "choiceinteraction" ||
          localName === "choiceInteraction"
        ) {
          parentInteraction = current;
        }
        current = current.parentElement;
      }

      if (parentInteraction) {
        interactionId =
          parentInteraction.getAttribute("responseIdentifier") || interactionId;
        const maxChoices = parseInt(
          parentInteraction.getAttribute("maxChoices") || "1",
          10
        );
        isMultiple = maxChoices > 1;
      }

      choiceId =
        element.getAttribute("identifier") ||
        `choice-${Math.random().toString(36).substr(2, 9)}`;
    }

    const label = document.createElement("label");
    label.className = "qti-simple-choice";
    label.setAttribute("for", `${interactionId}-${choiceId}`);

    // Create input element
    const input = document.createElement("input");
    input.type = isMultiple ? "checkbox" : "radio";
    input.name = interactionId;
    input.id = `${interactionId}-${choiceId}`;
    input.value = choiceId;
    input.setAttribute("data-choice-identifier", choiceId);

    // Handle change events to update response state
    input.addEventListener("change", () => {
      // Clear previous feedback when user changes selection
      renderer.clearFeedback();

      renderer.updateResponse(
        interactionId,
        choiceId,
        input.checked,
        isMultiple
      );

      renderer.triggerFeedbackUpdate();
    });

    label.appendChild(input);

    // Render choice content
    const content = document.createElement("span");
    content.className = "qti-choice-content";

    // Process child nodes (text and elements)
    Array.from(element.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        content.appendChild(document.createTextNode(node.textContent || ""));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const rendered = renderer.renderElement(node as Element);
        content.appendChild(rendered);
      }
    });

    label.appendChild(content);

    return label;
  }
}
