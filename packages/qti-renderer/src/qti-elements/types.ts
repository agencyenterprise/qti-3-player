import { BaseQtiElement, BaseQtiElementClassShape } from "./BaseQtiElement";

/**
 * Type representing a concrete QTI element class that extends BaseQtiElement
 * This represents any class that inherits from BaseQtiElement (but not BaseQtiElement itself)
 * and includes the static register method.
 * 
 * This type is used in contexts where the exact subclass type is not known
 * (e.g., in Maps or arrays of element classes). It represents the common shape
 * that all concrete QTI element classes share, derived from BaseQtiElementClass.
 * 
 * The constructor signature ensures that only concrete (non-abstract) classes
 * can be represented, as abstract classes cannot be instantiated.
 */
export type ConcreteQtiElementClass = {
  new (element: Element): BaseQtiElement;
} & BaseQtiElementClassShape<typeof BaseQtiElement> & {
  register: typeof BaseQtiElement.register;
};
