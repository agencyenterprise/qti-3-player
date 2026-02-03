import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { CustomElement, MappingTagData } from '../types';
import { MapEntry } from './MapEntry';

/**
 * XML Schema type: MappingDType
 * Variable mappings allow outcome variables declared with the name source-identifier in the
 * corresponding item to be treated as if they were declared with the name target-identifier
 * during outcome processing. Use of variable mappings allows more control over the way outc-
 * omes are aggregated when using test variables.
 */
export class Mapping extends BaseQtiElement {
  static readonly elementNames = ['qti-mapping'];

  lowerBound: number = 0;
  upperBound: number = 0;
  defaultValue: number = 0;

  process(renderer: QtiRenderer): CustomElement<MappingTagData> {
    const lowerBound = parseFloat(this.element.getAttribute('lower-bound') || '0');
    const upperBound = parseFloat(this.element.getAttribute('upper-bound') || '0');
    const defaultValue = parseFloat(this.element.getAttribute('default-value') || '0');

    const mapEntriesElements = renderer.querySelectorAllLocal(this.element, 'qti-map-entry');
    const mapEntries = mapEntriesElements.map((element) => {
      const mapEntry = new MapEntry(element);
      return mapEntry.process(renderer).element;
    });

    return {
      type: 'custom',
      element: {
        lowerBound,
        upperBound,
        defaultValue,
        mapEntries,
      },
    };
  }
}
