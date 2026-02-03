import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { EmptyElement, MapEntryTagData, Mapping, ValueElement, VisualElement } from '../types';

/**
 * XML Schema type: MapResponseDType
 * This is a QTI expression function. This expression looks up the value of a response varia-
 * ble and then transforms it using the associated mapping, which must have been declared. T-
 * he result is a single float. If the response variable has single cardinality then the val-
 * ue returned is simply the mapped target value from the map. If the response variable has
 * multiple or ordered cardinality then the value returned is the sum of the mapped target v-
 * alues. This expression cannot be applied to variables of record cardinality. For example,
 * if a mapping associates the identifiers {A,B,C,D} with the values {0,1,0.5,0} respectively
 * then mapResponse will map the single value 'C' to the numeric value 0.5 and the set of va-
 * lues {C,B} to the value 1.5. If a container contains multiple instances of the same value
 * then that value is counted once only. To continue the example above {B,B,C} would still m-
 * ap to 1.5 and not 2.5.
 */
export class MapResponse extends BaseQtiElement {
  static readonly elementNames = ['qti-map-response'];

  process(renderer: QtiRenderer): ValueElement {
    const identifier = this.getIdentifier();

    const mapping = renderer.getMapping(identifier);
    if (!mapping) {
      return {
        type: 'value',
        value: 0,
        valueType: 'float',
        cardinality: 'single',
      };
    }

    const currentValue = renderer.getVariable(identifier);
    if (
      currentValue.type === 'empty' ||
      (currentValue.type === 'value' && currentValue.value === null)
    ) {
      let value = mapping.mapping.defaultValue || 0;
      value = this.applyBounds(value, mapping);
      return {
        type: 'value',
        value,
        valueType: 'float',
        cardinality: 'single',
      };
    }

    const value = this.calculateMappingScoreFor(mapping, currentValue);

    return {
      type: 'value',
      value,
      valueType: 'float',
      cardinality: 'single',
    };
  }

  calculateMappingScoreFor(mapping: Mapping, currentValue: ValueElement): number {
    let scoreList = [];
    let answers: string[] = [];
    if (mapping.cardinality === 'multiple' || mapping.cardinality === 'ordered') {
      answers = currentValue.value as string[];
    } else if (mapping.cardinality === 'single') {
      answers = [currentValue.value as string];
    } else {
      console.warn('MapResponse: invalid cardinality', mapping.cardinality);
    }
    for (const answer of answers) {
      for (const mapEntry of mapping.mapping.mapEntries) {
        if (this.fitsMapEntry(answer, mapEntry)) {
          scoreList.push(mapEntry.mappedValue);
          break;
        }
      }
    }

    let score =
      scoreList.length > 0
        ? scoreList.reduce((a, b) => a + b, 0)
        : mapping.mapping.defaultValue || 0;
    score = this.applyBounds(score, mapping);
    return score;
  }

  fitsMapEntry(value: string, mapEntry: MapEntryTagData): boolean {
    if (mapEntry.caseSensitive) {
      return value === mapEntry.mapKey;
    }
    return value.toLowerCase() === mapEntry.mapKey.toLowerCase();
  }

  applyBounds(score: number, mapping: Mapping): number {
    if (mapping.mapping.lowerBound !== null && score < mapping.mapping.lowerBound) {
      score = mapping.mapping.lowerBound;
    }
    if (mapping.mapping.upperBound !== null && score > mapping.mapping.upperBound) {
      score = mapping.mapping.upperBound;
    }
    return score;
  }
}
