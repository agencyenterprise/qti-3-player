import * as QtiElements from "./index";
import { QtiRenderer } from "../renderer";

const QtiClasses = Object.values(QtiElements);

export function registerAllElements(
  renderRegistry: Map<string, (element: Element, renderer: QtiRenderer) => HTMLElement>
): void {
  QtiClasses.forEach((elementClass) => {
    elementClass.register(renderRegistry);
  });
}
