import { QtiRendererOptions, EmptyElement, ProcessResult, ValueElement } from './types';
import { registerAllElements } from './qti-elements/register';
import { ConcreteQtiElementClass } from './qti-elements/types';
import { validateXml, type ValidationResult, type ValidationOptions } from './validation';
import { dispatchSubmitProcessEvent } from './events';

/**
 * Registry of QTI element names to their render functions
 * Each render function receives the XML element and returns an HTML element
 */
type RenderFunction = (element: Element, renderer: QtiRenderer) => HTMLElement;

/**
 * QTI Renderer - Framework-agnostic renderer for QTI 3.x assessment items
 *
 * Supports a minimal subset of QTI 3.x:
 * - assessmentItem
 * - itemBody
 * - choiceInteraction
 * - prompt
 * - simpleChoice
 *
 * Design decisions:
 * - Uses DOMParser for XML parsing (no external dependencies)
 * - Renders to vanilla DOM elements (framework-agnostic)
 * - Maintains response state internally
 * - Uses semantic HTML for accessibility
 */
export class QtiRenderer {
  private xmlDoc: Document | null = null;
  private xmlString: string;
  private container: HTMLElement | null = null;
  private options: QtiRendererOptions;

  private submitButtonContainer: HTMLElement | null = null;
  private submissionCountContainer: HTMLElement | null = null;
  private submissionCount: number = 0;

  private outcomeValues: Map<string, ValueElement> = new Map();
  private variables: Map<string, ValueElement> = new Map();
  private correctResponses: Map<string, ValueElement> = new Map();

  private validationResult: ValidationResult | null = null;
  private validationPromise: Promise<ValidationResult> | null = null;
  private isValidated: boolean = false;
  private mathJaxPromises: Promise<void>[] = [];

  /**
   * Internal registry mapping QTI element names to class constructors
   * Used for validation and content-model lookups
   */
  private rendererClassRegistry: Map<string, ConcreteQtiElementClass> = new Map();

  constructor(qtiXml: string, options: QtiRendererOptions = {}) {
    this.xmlString = qtiXml;
    this.options = {
      showFeedback: true,
      validateXml: true, // Validation enabled by default
      ...options,
    };
    registerAllElements(this.rendererClassRegistry);
    this.parseXml(qtiXml);
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
      // Default: use cached local schema (fetchSchema defaults to false/undefined)
      // This means loadLocalSchema() will be used, which uses the cached schema
      ...this.options.validationOptions,
      // If user explicitly provided a schema URL, allow fetching
      // Otherwise, fetchSchema remains false/undefined to use local cached schema
      fetchSchema: this.options.validationOptions?.schema?.startsWith('http')
        ? this.options.validationOptions.fetchSchema ?? true
        : this.options.validationOptions?.fetchSchema ?? false,
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
    this.parseXml(qtiXml);
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
  private parseXml(xml: string): void {
    const parser = new DOMParser();
    this.xmlDoc = parser.parseFromString(xml, 'text/xml');

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

    const rootRender = new RootClass(rootElement);
    const rendered = rootRender.process(this);
    if (rendered.type === 'visual') {
      container.appendChild(rendered.element);
    }

    // Create submission count display
    this.submissionCountContainer = document.createElement('div');
    this.submissionCountContainer.className = 'qti-submission-count';
    this.updateSubmissionCountDisplay();
    container.appendChild(this.submissionCountContainer);

    // Create submit button container (always visible)
    this.submitButtonContainer = document.createElement('div');
    this.submitButtonContainer.className = 'qti-submit-container';

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'qti-submit-button';
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => {
      this.handleSubmit();
    });

    this.submitButtonContainer.appendChild(submitButton);
    container.appendChild(this.submitButtonContainer);
  }

  setOutcomeValue(identifier: string, value: ValueElement): void {
    this.outcomeValues.set(identifier, value);
  }

  getOutcomeValue(identifier: string): ValueElement | EmptyElement {
    return (
      this.outcomeValues.get(identifier) || {
        type: 'empty',
      }
    );
  }

  setVariable(identifier: string, value: ValueElement): void {
    this.variables.set(identifier, value);
  }

  getVariable(identifier: string): ValueElement | EmptyElement {
    return (
      this.variables.get(identifier) || {
        type: 'empty',
      }
    );
  }

  setCorrectResponse(identifier: string, value: ValueElement): void {
    this.correctResponses.set(identifier, value);
  }

  getCorrectResponse(identifier: string): ValueElement | EmptyElement {
    return (
      this.correctResponses.get(identifier) || {
        type: 'empty',
      }
    );
  }

  processElementChildren(element: Element, container: HTMLElement | null): void {
    const children = Array.from(element.childNodes);
    for (const child of children) {
      const result = this.processElement(child as Element);
      if (result.type === 'visual' && container) {
        container.appendChild(result.element);
      }
    }
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

  /**
   * Update submission count display - shows remaining attempts
   */
  private updateSubmissionCountDisplay(): void {
    if (!this.submissionCountContainer) return;

    this.submissionCountContainer.textContent = `Submissions: ${this.submissionCount}`;
  }

  /**
   * Handle submit button click - show feedback
   */
  private handleSubmit(): void {
    if (!this.container) return;

    // Increment submission count
    this.submissionCount++;
    this.updateSubmissionCountDisplay();

    dispatchSubmitProcessEvent();
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
