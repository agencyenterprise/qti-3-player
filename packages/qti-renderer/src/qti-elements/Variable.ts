import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { EmptyElement, ValueElement } from '../types';

/**
 * XML Schema type: VariableDType
 * This is a QTI expression function. This expression looks up the value of an item variable
 * that has been declared in a corresponding variable declaration or is one of the built-in
 * variables. The result has the base-type and cardinality declared for the variable subject
 * to the type promotion of weighted outcomes. During outcomes processing, values taken from
 * an individual item session can be looked up by prefixing the name of the item variable wi-
 * th the identifier assigned to the item in the qti-assessment-item-ref, separated by a per-
 * iod character. For example, to obtain the value of the SCORE variable in the item referred
 * to as Q01 you would use a variable instance with identifier Q01.SCORE. In adaptive tests
 * that contain items that are allowed to be replaced (i.e. that have the with-replacement a-
 * ttribute set to "true"), the same item can be instantiated more than once. In order to ac-
 * cess the outcome variable values of each instantiation, a number that denotes the instanc-
 * e's place in the sequence of the item's instantiation is inserted between the item variab-
 * le identifier and the item variable, separated by a period character. For example, to obt-
 * ain the value of the SCORE variable in the item referred to as Q01 in its second instanti-
 * ation you would use a variable instance, prefixed by the instantiation sequence number, p-
 * refixed by an identifier Q01.2.SCORE. When looking up the value of a response variable it
 * always takes the value assigned to it by the candidate's last submission. Unsubmitted res-
 * ponses are not available during expression evaluation. The value of an item variable taken
 * from an item instantiated multiple times from the same qti-assessment-item-ref (through t-
 * he use of selection with-replacement) is taken from the last instance submitted if submis-
 * sion is simultaneous, otherwise it is undefined.
 */
export class Variable extends BaseQtiElement {
  static readonly elementNames = ['qti-variable'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): ValueElement | EmptyElement {
    const identifier = this.element.getAttribute('identifier') || '';
    return renderer.getVariable(identifier);
  }
}
