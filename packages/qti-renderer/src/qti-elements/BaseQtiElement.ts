import { QtiRenderer } from "../renderer";

/**
 * Base class for all QTI element renderers
 * Each element class should extend this and implement the render method
 */
export abstract class BaseQtiElement {
  /**
   * Element names this renderer handles (e.g., ["assessmentItem", "qti-assessment-item"])
   * These will be used to register the renderer in the render registry
   */
  abstract getElementNames(): string[];

  /**
   * Render the QTI element to an HTML element
   * @param element The XML element to render
   * @param renderer The QTI renderer instance (for accessing helper methods and state)
   * @returns The rendered HTML element
   */
  abstract render(element: Element, renderer: QtiRenderer): HTMLElement;

  /**
   * Register this element class with the renderer
   * This should be called once per element class
   */
  static register(
    this: new () => BaseQtiElement,
    renderRegistry: Map<string, (element: Element, renderer: QtiRenderer) => HTMLElement>
  ): void {
    const instance = new this();
    const elementNames = instance.getElementNames();

    elementNames.forEach((name: string) => {
      renderRegistry.set(name, (element, renderer) => instance.render(element, renderer));
    });
  }
}
