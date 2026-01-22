import { ConcreteQtiElementClass } from "./types";
import * as QtiElements from "./index";
const QtiClasses = Object.values(QtiElements);

export function registerAllElements(
  rendererClassRegistry: Map<string, ConcreteQtiElementClass>
): void {
  QtiClasses.forEach((elementClass) => {
    const Klass = elementClass as ConcreteQtiElementClass;
    Klass.register(
      rendererClassRegistry as Map<string, ConcreteQtiElementClass>
    );
  });
}
