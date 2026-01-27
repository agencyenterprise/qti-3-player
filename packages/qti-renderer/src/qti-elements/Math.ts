import { BaseQtiElement } from './BaseQtiElement';
import { QtiRenderer } from '../renderer';
import { VisualElement } from '../types';

/**
 * Create a MathML element
 */
export class Math extends BaseQtiElement {
  static readonly elementNames = ['math'];
  static readonly canBeRoot = false;

  process(renderer: QtiRenderer): VisualElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'qti-math-wrapper';
    wrapper.style.display = 'inline-block'; // Default to inline-block for math

    const mathElement = this.processMathElement(this.element);
    wrapper.appendChild(mathElement);
    renderer.setMathContainer(wrapper);

    return {
      type: 'visual',
      element: wrapper,
    };
  }

  private processMathElement(element: Element): Element {
    const namespaceURI = element.namespaceURI;
    const tagName = element.localName || element.tagName.toLowerCase();

    const container = document.createElementNS(namespaceURI, tagName);

    const className = element.getAttribute('class') || '';
    container.setAttribute('class', className);

    const children = Array.from(element.childNodes);
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childElement = this.processMathElement(child as Element);
        container.appendChild(childElement);
      } else {
        const textNode = document.createTextNode(child.textContent || '');
        container.appendChild(textNode);
      }
    }

    return container;
  }
}
