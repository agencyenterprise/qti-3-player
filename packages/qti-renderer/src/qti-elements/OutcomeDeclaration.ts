import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { BaseValueType, CardinalityType, EmptyElement } from '../types';

/**
 * XML Schema type: OutcomeDeclarationDType
 * Outcome variables are declared by outcome declarations. Their value is set either from a
 * default given in the declaration itself or by a responseRule during responseProcessing. I-
 * tems that declare a numeric outcome variable representing the candidate's overall perform-
 * ance on the item should use the outcome name 'SCORE' for the variable. SCORE needs to be a
 * float. Items that declare a maximum score (in multiple response choice interactions, for
 * example) should do so by declaring the 'MAXSCORE' variable. MAXSCORE needs to be a float.
 * Items or tests that want to make the fact that the candidate scored above a predefined th-
 * reshold available as a variable should use the 'PASSED' variable. PASSED needs to be a bo-
 * olean. At runtime, outcome variables are instantiated as part of an item session. Their v-
 * alues may be initialized with a default value and/or set during responseProcessing. If no
 * default value is given in the declaration then the outcome variable is initialized to NULL
 * unless the outcome is of a numeric type (integer or float) in which case it is initialized
 * to 0. Declared outcomes with numeric types should indicate their range of possible values
 * using normalMaximum and normalMinimum, especially if this range differs from [0,1].
 */
export class OutcomeDeclaration extends BaseQtiElement {
  static readonly elementNames = ['qti-outcome-declaration'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): EmptyElement {
    const identifier = this.getIdentifier();
    const cardinality = this.getCardinality();
    const baseType = this.getBaseType();
    // TODO: Implement the logic to set the outcome value?
    return {
      type: 'empty',
    };
  }
}
