import { BaseQtiElement } from "./BaseQtiElement";
import { QtiRenderer } from "../renderer";
import { EmptyElement, ValueElement } from "../types";

/**
 * XML Schema type: CorrectDType
 * This is a QTI expression. This expression looks up the declaration of a response variable 
 * and returns the associated correctResponse or NULL if no correct value was declared. When 
 * used in outcomes processing item identifier prefixing (see variable) may be used to obtain
 * the correct response from an individual item.
 */
export class Correct extends BaseQtiElement {
  static readonly elementNames = ["qti-correct"];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): ValueElement | EmptyElement {
    const responseIdentifier = this.element.getAttribute("identifier") || "";
    const correctResponse = renderer.getCorrectResponse(responseIdentifier);
    if (correctResponse) {
      return correctResponse;
    }
    return {
      type: 'empty',
    };
  }
}
