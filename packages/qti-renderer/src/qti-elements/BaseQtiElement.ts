import { QtiRenderer } from '../renderer';
import { BaseValueType, CardinalityType, ProcessResult } from '../types';

/**
 * Helper type that defines the required static properties for QTI element classes.
 * This is the common shape that all concrete QTI element classes must have.
 * Exported so it can be reused in other type definitions.
 */
export type BaseQtiElementClassShape<T extends typeof BaseQtiElement> = T & {
  elementNames: readonly string[];
  canBeRoot: boolean;
};

/**
 * Type representing any class that extends BaseQtiElement (but not BaseQtiElement itself)
 * This type ensures that:
 * - BaseQtiElement itself is NOT assignable to BaseQtiElementClass
 * - All subclasses of BaseQtiElement ARE assignable to BaseQtiElementClass
 * - The class must have the required static properties: elementNames and canBeRoot
 *
 * Usage: Use this type as a constraint for function parameters or return types.
 * Example: function register(cls: BaseQtiElementClass) { ... }
 *
 * Note: This is a conditional type that excludes BaseQtiElement itself.
 * When used as a parameter type, TypeScript will infer the generic type parameter.
 */
export type BaseQtiElementClass<T extends typeof BaseQtiElement = typeof BaseQtiElement> =
  T extends typeof BaseQtiElement
    ? [T] extends [typeof BaseQtiElement]
      ? [typeof BaseQtiElement] extends [T]
        ? never // T is exactly typeof BaseQtiElement, exclude it
        : BaseQtiElementClassShape<T>
      : BaseQtiElementClassShape<T>
    : BaseQtiElementClassShape<T>;
/**
 * Base class for all QTI element renderers
 * Each element class should extend this and implement the render method
 */
export abstract class BaseQtiElement {
  element: Element;

  constructor(element: Element) {
    this.element = element;
  }
  /**
   * Element names this renderer handles (e.g., ["assessmentItem", "qti-assessment-item"])
   * These will be used to register the renderer in the render registry
   * Must be defined as a static readonly property in each subclass
   */
  static readonly elementNames: readonly string[];

  /**
   * Whether this element can be a root element in the QTI document
   * Must be defined as a static readonly property in each subclass
   */
  static readonly canBeRoot: boolean;

  /**
   * Render the QTI element to an HTML element
   * @param element The XML element to render
   * @param renderer The QTI renderer instance (for accessing helper methods and state)
   * @returns The rendered HTML element
   */
  abstract process(renderer: QtiRenderer): ProcessResult;

  /**
   * Register this element class with the renderer
   * This should be called once per element class
   */
  static register<T extends typeof BaseQtiElement>(
    this: BaseQtiElementClass<T>,
    rendererClassRegistry: Map<string, new (element: Element) => BaseQtiElement>
  ): void {
    const elementNames = this.elementNames;

    elementNames.forEach((name: string) => {
      rendererClassRegistry.set(name, this as unknown as new (element: Element) => BaseQtiElement);
    });
  }

  getIdentifier(): string {
    return this.element.getAttribute('identifier') || '';
  }

  getResponseIdentifier(): string {
    return this.element.getAttribute('response-identifier') || '';
  }

  getCardinality(): CardinalityType {
    return (this.element.getAttribute('cardinality') || 'single') as CardinalityType;
  }

  getBaseType(): BaseValueType {
    return (this.element.getAttribute('base-type') || 'string') as BaseValueType;
  }
}
