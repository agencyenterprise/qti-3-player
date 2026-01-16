import { BaseQtiElement } from "./BaseQtiElement";
import { QtiRenderer } from "../renderer";
import { SimpleChoice } from "./SimpleChoice";

/**
 * Renders the choiceInteraction element
 * Creates a fieldset with radio buttons or checkboxes for each choice
 */
export class ChoiceInteraction extends BaseQtiElement {
  getElementNames(): string[] {
    return ["choiceInteraction", "qti-choice-interaction"];
  }

  render(element: Element, renderer: QtiRenderer): HTMLElement {
    const identifier =
      element.getAttribute("responseIdentifier") ||
      element.getAttribute("response-identifier") ||
      element.getAttribute("identifier") ||
      `choice-${Math.random().toString(36).substr(2, 9)}`;

    const maxChoices = parseInt(
      element.getAttribute("maxChoices") ||
        element.getAttribute("max-choices") ||
        "1",
      10
    );
    const isMultiple = maxChoices > 1;

    const fieldset = document.createElement("fieldset");
    fieldset.className = "qti-choice-interaction";
    fieldset.setAttribute("data-response-identifier", identifier);

    // Render prompt if present (handles namespaces and qti- prefix)
    const prompt =
      renderer.querySelectorLocal(element, "prompt") ||
      renderer.querySelectorLocal(element, "qti-prompt");
    if (prompt) {
      const promptElement = renderer.renderElement(prompt);
      const legend = document.createElement("legend");
      legend.className = "qti-prompt";
      // Move prompt content into legend
      while (promptElement.firstChild) {
        legend.appendChild(promptElement.firstChild);
      }
      fieldset.appendChild(legend);
    }

    // Render choices (handles namespaces and qti- prefix)
    const choices = [
      ...renderer.querySelectorAllLocal(element, "simpleChoice"),
      ...renderer.querySelectorAllLocal(element, "qti-simple-choice"),
    ];
    
    // Create SimpleChoice instance to render choices
    const simpleChoiceRenderer = new SimpleChoice();
    choices.forEach((choice, index) => {
      const choiceId = choice.getAttribute("identifier") || `choice-${index}`;
      // Set data attributes on choice element so SimpleChoice can access context
      choice.setAttribute("data-interaction-id", identifier);
      choice.setAttribute("data-choice-id", choiceId);
      choice.setAttribute("data-is-multiple", isMultiple.toString());
      
      const renderedChoice = simpleChoiceRenderer.render(choice, renderer);
      fieldset.appendChild(renderedChoice);
    });

    // Initialize response state
    renderer.initializeResponse(identifier, isMultiple ? [] : "");

    return fieldset;
  }
}
