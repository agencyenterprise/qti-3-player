import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { CustomElement, MapEntryTagData } from '../types';

/**
 * XML Schema type: MapEntryDType
 * This is a part of the mapping functionality. The map is defined by a set of qti-map-entry,
 * each of which maps a single value from the source set onto a single float.
 */
export class MapEntry extends BaseQtiElement {
  static readonly elementNames = ['qti-map-entry'];

  lowerBound: number = 0;
  upperBound: number = 0;
  defaultValue: number = 0;

  process(renderer: QtiRenderer): CustomElement<MapEntryTagData> {
    const mapKey = this.element.getAttribute('map-key') || '';
    const mappedValue = parseFloat(this.element.getAttribute('mapped-value') || '0');
    const caseSensitive = this.getBooleanAttribute(this.element, 'case-sensitive') || false;

    return {
      type: 'custom',
      element: {
        mapKey: mapKey,
        mappedValue: mappedValue,
        caseSensitive: caseSensitive,
      },
    };
  }
}
