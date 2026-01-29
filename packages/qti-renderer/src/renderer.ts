import {
  QtiRendererOptions,
  EmptyElement,
  ProcessResult,
  ValueElement,
  QtiRendererParams,
} from './types';
import { registerAllElements } from './qti-elements/register';
import { ConcreteQtiElementClass } from './qti-elements/types';
import { validateXml, type ValidationResult, type ValidationOptions } from './validation';
import {
  dispatchAfterRenderEvent,
  dispatchAfterValidateEvent,
  dispatchSubmitProcessEvent,
} from './events';
import { DebugView } from './debug/DebugView';

export class QtiRenderer {
  private xmlDoc: Document | null = null;
  private xmlString: string;
  private referencedXmlStrings: Map<string, string> = new Map();
  private options: QtiRendererOptions;

  private container: HTMLElement | null = null;
  private rootRenderedElement: ProcessResult | null = null;

  private submissionCount: number = 0;

  /**
   * Context stack for the identifiers of container elements
   */
  private _traversingContext: string[] = [];
  private _eventContext: string[] = [];
  private contextsPaths: string[] = [];
  private showingContextPathIndex: number = 0;
  private rootIdentifier: string = '';

  private outcomeValues: Map<string, ValueElement> = new Map();
  private variables: Map<string, ValueElement> = new Map();
  private correctResponses: Map<string, ValueElement> = new Map();

  private validationResult: ValidationResult | null = null;
  private validationPromise: Promise<ValidationResult> | null = null;
  private isValidated: boolean = false;
  private mathJaxPromises: Promise<void>[] = [];

  private debugView: DebugView | null = null;

  /**
   * Internal registry mapping QTI element names to class constructors
   * Used for validation and content-model lookups
   */
  private rendererClassRegistry: Map<string, ConcreteQtiElementClass> = new Map();

  constructor({ xml, options, context }: QtiRendererParams) {
    this.xmlString = xml;
    if (context?.referencedXmls) {
      this.referencedXmlStrings = context.referencedXmls;
    }
    this.options = {
      debug: options?.debug ?? false,
      showFeedback: options?.showFeedback ?? true,
      validateXml: options?.validateXml ?? true,
      validationOptions: options?.validationOptions ?? {},
    };
    registerAllElements(this.rendererClassRegistry);
    this.parseXml();
  }

  /**
   * Validate the XML against the QTI schema
   * This is a separate async method that can be called independently
   * By default, uses the cached local schema for faster validation
   *
   * @returns Promise resolving to validation result
   */
  async validateXml(): Promise<ValidationResult> {
    // Default: use local cached schema (fast, no network request)
    // User can override via validationOptions to use custom schema or fetch from URL
    const validationOptions: ValidationOptions = {
      // Use local schema by default
      ...this.options.validationOptions,
    };

    this.validationPromise = validateXml(this.xmlString, validationOptions);
    this.validationResult = await this.validationPromise;
    this.isValidated = true;

    if (!this.validationResult.valid) {
      const errorMessages = this.validationResult.errors
        .map((err) => {
          const location = err.line
            ? ` (line ${err.line}${err.fileName ? ` in ${err.fileName}` : ''})`
            : '';
          return `${err.message}${location}`;
        })
        .join('\n');

      if (this.options.debug) {
        console.warn('QTI XML validation failed:', errorMessages);
      }
    }
    dispatchAfterValidateEvent();
    return this.validationResult;
  }

  /**
   * Invalidate the validation state
   * Call this when the XML changes to force re-validation
   */
  invalidateValidation(): void {
    this.isValidated = false;
    this.validationResult = null;
    this.validationPromise = null;
  }

  /**
   * Update the XML content
   * This will invalidate validation and re-parse the XML
   *
   * @param qtiXml - New QTI XML string
   */
  updateXml(qtiXml: string): void {
    this.xmlString = qtiXml;
    this.invalidateValidation();
    this.parseXml();
  }

  /**
   * Get validation result (if validation was performed)
   * Returns null if validation was not performed
   */
  getValidationResult(): ValidationResult | null {
    return this.validationResult;
  }

  /**
   * Check if XML has been validated
   */
  isXmlValidated(): boolean {
    return this.isValidated;
  }

  /**
   * Parse QTI XML string into a Document
   */
  private parseXml(): void {
    const parser = new DOMParser();
    this.xmlDoc = parser.parseFromString(this.xmlString, 'text/xml');

    // Check for parsing errors
    const parseError = this.xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error(`Failed to parse QTI XML: ${parseError.textContent}`);
    }
  }

  /**
   * Helper to find elements by local name (handles namespaces)
   */
  findElementByLocalName(parent: Document | Element, localName: string): Element | null {
    const elements = parent.getElementsByTagNameNS('*', localName);
    return elements.length > 0 ? elements[0] : null;
  }

  /**
   * Helper to query selector that works with or without namespaces
   */
  querySelectorLocal(element: Element | Document, localName: string): Element | null {
    // Try with namespace first
    const nsElement = this.findElementByLocalName(element, localName);
    if (nsElement) return nsElement;

    // Fallback to regular querySelector (without namespace)
    return element.querySelector(localName);
  }

  /**
   * Helper to query all elements by local name
   * Returns an array for consistent iteration
   */
  querySelectorAllLocal(element: Element | Document, localName: string): Element[] {
    // Try with namespace first
    const nsElements = element.getElementsByTagNameNS('*', localName);
    if (nsElements.length > 0) {
      return Array.from(nsElements);
    }

    // Fallback: try regular querySelectorAll
    const regular = element.querySelectorAll(localName);
    if (regular.length > 0) {
      return Array.from(regular);
    }

    // Last resort: use getElementsByTagName
    const tagElements = element.getElementsByTagName(localName);
    return Array.from(tagElements);
  }

  /**
   * Render the QTI item into a container element
   * If validation is enabled, it will validate the XML first if not already validated
   *
   * @param container - Container element to render into
   */
  async render(container: HTMLElement): Promise<void> {
    if (!this.xmlDoc) {
      throw new Error('QTI XML not parsed. Check constructor.');
    }

    // Check if validation is enabled
    if (this.options.validateXml !== false) {
      // Check if validation was already performed
      if (!this.isValidated) {
        // Wait for validation to complete
        await this.validateXml();
      }
    }

    // Proceed with rendering
    this.mathJaxPromises = [];
    this.renderContent(container);
    await Promise.all(this.mathJaxPromises);
    dispatchAfterRenderEvent();
  }

  setMathContainer(container: Element): void {
    this.mathJaxPromises.push(this.triggerMathJax(container));
  }

  private async triggerMathJax(container: Element): Promise<void> {
    if (typeof (window as any).MathJax !== 'undefined') {
      try {
        // Support MathJax v3/v4
        if ((window as any).MathJax.typesetPromise) {
          await (window as any).MathJax.typesetPromise([container]);
        } else if ((window as any).MathJax.Hub && (window as any).MathJax.Hub.Queue) {
          // Support MathJax v2
          return new Promise((resolve) => {
            (window as any).MathJax.Hub.Queue(
              ['Typeset', (window as any).MathJax.Hub, container],
              resolve
            );
          });
        } else if ((window as any).MathJax.typeset) {
          // Support older versions or different configs
          (window as any).MathJax.typeset([container]);
        }
      } catch (e) {
        console.warn('MathJax typesetting failed:', e);
      }
    } else {
      console.warn('MathJax not found');
    }
  }

  /**
   * Internal method to render the content into container
   */
  private renderContent(container: HTMLElement): void {
    if (!this.xmlDoc) {
      throw new Error('QTI XML not parsed. Check constructor.');
    }

    this.container = container;
    container.innerHTML = ''; // Clear existing content

    // Find all response declarations by iterating through all elements
    // This handles namespaces better than querySelector
    const allElements = this.xmlDoc?.children;
    if (!allElements || allElements.length === 0) {
      throw new Error('No root elements found in QTI XML');
    } else if (allElements.length > 1) {
      throw new Error('Multiple root elements found in QTI XML');
    }
    const rootElement = allElements[0];

    const RootClass = this.rendererClassRegistry.get(
      rootElement.localName || rootElement.tagName.toLowerCase()
    );
    if (!RootClass) {
      throw new Error(
        `No renderer found for root element: ${
          rootElement.localName || rootElement.tagName.toLowerCase()
        }`
      );
    }

    this.rootIdentifier = rootElement.getAttribute('identifier') || '';
    const rootRender = new RootClass(rootElement);
    this.rootRenderedElement = rootRender.process(this);

    if (this.rootRenderedElement.type === 'visual') {
      container.appendChild(this.rootRenderedElement.element);
      this.showByRules();
    }

    // Initialize Debug View if debug mode is enabled
    if (this.options.debug) {
      this.debugView = new DebugView(this);
      this.debugView.mount(container);
    }
  }

  /**
   * We will set display none for those who might not be shown for the rules:
   *  - If the element is not at the current context path
   *  - If the element viewer is not set on the element: TO BE DONE
   * @param element
   * @returns
   */
  private showByRules(element?: HTMLElement): void {
    const showingContext = this.contextsPaths[this.showingContextPathIndex];
    let elementContext = '';
    if (!element) {
      if (!this.rootRenderedElement || this.rootRenderedElement.type !== 'visual') {
        return;
      }
      element = this.rootRenderedElement.element as HTMLElement;
      elementContext = showingContext;
    } else {
      elementContext = element.getAttribute('data-context') || '';
    }

    if (elementContext === '') {
      const closestContextElement = element.closest('[data-context]');
      if (closestContextElement) {
        elementContext = closestContextElement.getAttribute('data-context') || '';
      }
    }
    if (elementContext === showingContext || showingContext === undefined) {
      element.style.removeProperty('display');
      // force all parent elements to also be shown
      let parent = element.parentElement;
      while (parent) {
        if (
          this.rootRenderedElement?.type === 'visual' &&
          this.rootRenderedElement.element &&
          this.rootRenderedElement.element === parent
        ) {
          parent = null;
        } else {
          parent.style.removeProperty('display');
          parent = parent.parentElement;
        }
      }
    } else {
      element.style.display = 'none';
    }
    for (const child of Array.from(element.children)) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        this.showByRules(child as HTMLElement);
      }
    }
  }

  private getVariableNameForContext(identifier: string, context: boolean | string = true): string {
    if (context === true) {
      return this.getTraversingContextVariableName(identifier);
    } else if (typeof context === 'string') {
      return `${context}::${identifier}`;
    }
    return identifier;
  }
  setOutcomeValue(identifier: string, value: ValueElement): void {
    const variableName = this.getVariableNameForContext(identifier);
    this.outcomeValues.set(variableName, value);
    this.debugView?.update();
  }

  getOutcomeValue(identifier: string): ValueElement | EmptyElement {
    const variableName = this.getVariableNameForContext(identifier);
    return (
      this.outcomeValues.get(variableName) || {
        type: 'empty',
      }
    );
  }

  getOutcomeValues(): Map<string, ValueElement> {
    return this.outcomeValues;
  }

  setVariable(identifier: string, value: ValueElement): void {
    const variableName = this.getVariableNameForContext(identifier);
    this.variables.set(variableName, value);
    this.debugView?.update();
  }

  getVariable(identifier: string): ValueElement | EmptyElement {
    const variableName = this.getVariableNameForContext(identifier);
    return (
      this.variables.get(variableName) || {
        type: 'empty',
      }
    );
  }

  getVariables(): Map<string, ValueElement> {
    return this.variables;
  }

  setCorrectResponse(identifier: string, value: ValueElement): void {
    const variableName = this.getVariableNameForContext(identifier);
    this.correctResponses.set(variableName, value);
    this.debugView?.update();
  }

  getCorrectResponse(identifier: string): ValueElement | EmptyElement {
    const variableName = this.getVariableNameForContext(identifier);
    return (
      this.correctResponses.get(variableName) || {
        type: 'empty',
      }
    );
  }

  getCorrectResponses(): Map<string, ValueElement> {
    return this.correctResponses;
  }

  pushTraversingContext(context: string): void {
    if (context === this.rootIdentifier && this._traversingContext.length === 0) {
      // skip root context
      return;
    }
    this._traversingContext.push(context);
    this.contextsPaths.push(this.getFullTraversingContext());
  }

  popTraversingContext(): void {
    if (this._traversingContext.length === 0) {
      return;
    }
    this._traversingContext.pop();
  }

  withEventContext(context: string, callback: () => void): void {
    this._eventContext.push(context);
    try {
      callback();
    } finally {
      this._eventContext.pop();
    }
  }

  getFullTraversingContext(): string {
    if (this._eventContext.length > 0) {
      return this._eventContext[this._eventContext.length - 1];
    }
    return this._traversingContext.join('::');
  }

  getTraversingContextVariableName(identifier: string): string {
    const currentContextIdentifier = this.getFullTraversingContext();
    if (currentContextIdentifier) {
      return `${currentContextIdentifier}::${identifier}`;
    }
    return identifier;
  }

  hasNextItem(): boolean {
    return this.showingContextPathIndex < this.contextsPaths.length - 1;
  }

  hasPreviousItem(): boolean {
    return this.showingContextPathIndex > 0;
  }

  nextItem(): void {
    if (this.showingContextPathIndex < this.contextsPaths.length - 1) {
      this.showingContextPathIndex++;
      this.showByRules();
    }
  }
  previousItem(): void {
    if (this.showingContextPathIndex > 0) {
      this.showingContextPathIndex--;
      this.showByRules();
    }
  }

  getReferencedXmlElement(href: string): Element | null {
    const referencedXmlString = this.referencedXmlStrings.get(href);
    if (referencedXmlString) {
      const parser = new DOMParser();
      const referencedXmlDoc = parser.parseFromString(referencedXmlString, 'text/xml');
      return referencedXmlDoc.documentElement;
    }
    return null;
  }

  processElementChildren(element: Element, container: HTMLElement | null): ProcessResult[] {
    const children = Array.from(element.childNodes);
    const results: ProcessResult[] = [];
    for (const child of children) {
      const result = this.processElement(child as Element);
      if (result.type === 'visual' && container) {
        container.appendChild(result.element);
      }
      results.push(result);
    }
    return results;
  }

  /**
   * Generic element renderer that dispatches to registered classes
   */
  processElement(element: Element): ProcessResult {
    if (element.nodeType === Node.TEXT_NODE) {
      const textNode = document.createTextNode(element.textContent || '');
      return {
        type: 'visual',
        element: textNode,
      };
    }
    if (element.nodeType !== Node.ELEMENT_NODE) {
      return {
        type: 'empty',
      };
    }
    const tagName = element.localName || element.tagName.toLowerCase();
    const ElementClass = this.rendererClassRegistry.get(tagName);

    if (ElementClass) {
      const instance = new ElementClass(element);
      const result = instance.process(this);
      if (result.type === 'visual') {
        // carry over class names from the element to the rendered element
        const className = element.getAttribute('class') || '';
        if (className) {
          const totalClassNames = (result.element as HTMLElement).className + ' ' + className;
          (result.element as HTMLElement).className = totalClassNames.trim();
        }
      }
      return result;
    }

    // Fallback: render as generic element with children
    return this.processGenericElement(element);
  }

  public submit(): void {
    dispatchSubmitProcessEvent(this.outcomeValues, this.variables);
    this.submissionCount++;
  }

  public getSubmissionCount(): number {
    return this.submissionCount;
  }

  /**
   * Fallback renderer for unsupported elements
   * Renders element with its text content and processes children
   */
  private processGenericElement(element: Element): ProcessResult {
    const tagName = element.localName || element.tagName.toLowerCase();

    let container = document.createElement(tagName);
    if (container.toString() === '[object HTMLUnknownElement]' || tagName.includes('-')) {
      if (tagName.startsWith('qti-')) {
        // Return empty element for QTI elements that are not supported, to avoid rendering something that must not be shown to the user.
        console.warn(`QTI element ${tagName} is not supported and will not be rendered.`);
        return {
          type: 'empty',
        };
      } else {
        // render as generic element div
        console.info(`Custom or unknown element ${tagName} will be rendered as a div.`);
        container = document.createElement('div');
        container.className = tagName;
      }
    }
    // carry over class names from the element to the rendered element
    const className = element.getAttribute('class') || '';
    if (className) {
      container.className = className;
    }

    // Copy text content and render children
    this.processElementChildren(element, container);

    return {
      type: 'visual',
      element: container,
    };
  }
}
