import { QtiRendererOptions, ResponseValue, ResponseResult, AssessmentResult } from './types';

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
  private container: HTMLElement | null = null;
  private responses: Map<string, ResponseValue> = new Map();
  private correctResponses: Map<string, ResponseValue> = new Map();
  private feedbackBlocks: Map<string, Element> = new Map();
  private options: QtiRendererOptions;
  private feedbackCallbacks: Set<() => void> = new Set();
  private feedbackContainer: HTMLElement | null = null;

  /**
   * Internal registry mapping QTI element names to render functions
   * Supports both standard and qti- prefixed element names
   */
  private renderRegistry: Map<string, RenderFunction> = new Map([
    // Standard element names
    ['assessmentItem', this.renderAssessmentItem.bind(this)],
    ['itemBody', this.renderItemBody.bind(this)],
    ['choiceInteraction', this.renderChoiceInteraction.bind(this)],
    ['prompt', this.renderPrompt.bind(this)],
    ['simpleChoice', this.renderSimpleChoice.bind(this)],
    // QTI 3.x prefixed element names
    ['qti-assessment-item', this.renderAssessmentItem.bind(this)],
    ['qti-item-body', this.renderItemBody.bind(this)],
    ['qti-choice-interaction', this.renderChoiceInteraction.bind(this)],
    ['qti-prompt', this.renderPrompt.bind(this)],
    ['qti-simple-choice', this.renderSimpleChoice.bind(this)],
    ['qti-modal-feedback', this.renderModalFeedback.bind(this)],
    ['qti-feedback-block', this.renderFeedbackBlock.bind(this)],
  ]);

  constructor(qtiXml: string, options: QtiRendererOptions = {}) {
    this.options = { showFeedback: true, ...options };
    this.parseXml(qtiXml);
    this.parseResponseDeclarations();
    this.parseFeedbackBlocks();
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
  private findElementByLocalName(parent: Document | Element, localName: string): Element | null {
    const elements = parent.getElementsByTagNameNS('*', localName);
    return elements.length > 0 ? elements[0] : null;
  }

  /**
   * Helper to query selector that works with or without namespaces
   */
  private querySelectorLocal(element: Element | Document, localName: string): Element | null {
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
  private querySelectorAllLocal(element: Element | Document, localName: string): Element[] {
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
   * Parse response declarations to extract correct answers
   */
  private parseResponseDeclarations(): void {
    if (!this.xmlDoc) return;

    // Find all response declarations by iterating through all elements
    // This handles namespaces better than querySelector
    const allElements = this.xmlDoc.getElementsByTagName('*');
    const declarations: Element[] = [];
    
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      const localName = el.localName || el.tagName.toLowerCase();
      if (localName === 'responseDeclaration' || localName === 'qti-response-declaration') {
        declarations.push(el);
      }
    }

    declarations.forEach(decl => {
      const identifier = decl.getAttribute('identifier');
      if (!identifier) return;

      // Find correct response by checking children
      let correctResponseEl: Element | null = null;
      for (let i = 0; i < decl.children.length; i++) {
        const child = decl.children[i];
        const localName = child.localName || child.tagName.toLowerCase();
        if (localName === 'correctResponse' || localName === 'qti-correct-response') {
          correctResponseEl = child;
          break;
        }
      }
      
      if (!correctResponseEl) return;

      // Extract correct values by checking children
      const values: string[] = [];
      for (let i = 0; i < correctResponseEl.children.length; i++) {
        const child = correctResponseEl.children[i];
        const localName = child.localName || child.tagName.toLowerCase();
        if (localName === 'value' || localName === 'qti-value') {
          const value = child.textContent?.trim() || '';
          if (value) values.push(value);
        }
      }

      if (values.length === 1) {
        this.correctResponses.set(identifier, values[0]);
      } else if (values.length > 1) {
        this.correctResponses.set(identifier, values);
      }
    });
  }

  /**
   * Parse feedback blocks from QTI XML
   */
  private parseFeedbackBlocks(): void {
    if (!this.xmlDoc) return;

    // Find all feedback blocks by iterating through all elements
    const allElements = this.xmlDoc.getElementsByTagName('*');
    
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      const localName = el.localName || el.tagName.toLowerCase();
      if (localName === 'modalFeedback' || localName === 'qti-modal-feedback') {
        const identifier = el.getAttribute('identifier');
        if (identifier) {
          this.feedbackBlocks.set(identifier, el);
        }
      }
    }
  }

  /**
   * Mount the rendered QTI item into a container element
   */
  mount(container: HTMLElement): void {
    if (!this.xmlDoc) {
      throw new Error('QTI XML not parsed. Check constructor.');
    }

    this.container = container;
    container.innerHTML = ''; // Clear existing content

    // Find and render the assessmentItem root element (handles namespaces and qti- prefix)
    const assessmentItem = this.querySelectorLocal(this.xmlDoc, 'assessmentItem') ||
                          this.querySelectorLocal(this.xmlDoc, 'qti-assessment-item');
    if (!assessmentItem) {
      throw new Error('No assessmentItem found in QTI XML');
    }

    const rendered = this.renderElement(assessmentItem);
    container.appendChild(rendered);

    // Create feedback container
    this.feedbackContainer = document.createElement('div');
    this.feedbackContainer.className = 'qti-feedback-container';
    container.appendChild(this.feedbackContainer);
  }

  /**
   * Get current responses from all interactions
   * Returns a record mapping interaction identifiers to response values
   */
  getResponses(): Record<string, ResponseValue> {
    const result: Record<string, ResponseValue> = {};
    this.responses.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  /**
   * Process responses and return assessment results
   */
  processResponses(): AssessmentResult {
    const results: Record<string, ResponseResult> = {};
    let correctCount = 0;
    let totalCount = 0;

    this.responses.forEach((response, identifier) => {
      const correctResponse = this.correctResponses.get(identifier);
      totalCount++;

      if (correctResponse !== undefined) {
        const isCorrect = this.compareResponses(response, correctResponse);
        results[identifier] = {
          correct: isCorrect,
          response,
          correctResponse,
        };
        if (isCorrect) correctCount++;
      } else {
        // No correct response defined, mark as incorrect
        results[identifier] = {
          correct: false,
          response,
          correctResponse: '',
        };
      }
    });

    return {
      results,
      score: totalCount > 0 ? correctCount / totalCount : 0,
    };
  }

  /**
   * Compare user response with correct response
   */
  private compareResponses(userResponse: ResponseValue, correctResponse: ResponseValue): boolean {
    if (Array.isArray(userResponse) && Array.isArray(correctResponse)) {
      if (userResponse.length !== correctResponse.length) return false;
      const userSorted = [...userResponse].sort();
      const correctSorted = [...correctResponse].sort();
      return userSorted.every((val, idx) => val === correctSorted[idx]);
    } else if (typeof userResponse === 'string' && typeof correctResponse === 'string') {
      return userResponse === correctResponse;
    } else if (Array.isArray(userResponse) && typeof correctResponse === 'string') {
      return userResponse.length === 1 && userResponse[0] === correctResponse;
    } else if (typeof userResponse === 'string' && Array.isArray(correctResponse)) {
      return correctResponse.length === 1 && correctResponse[0] === userResponse;
    }
    return false;
  }

  /**
   * Register a callback to be called when feedback should be updated
   */
  onFeedbackUpdate(callback: () => void): void {
    this.feedbackCallbacks.add(callback);
  }

  /**
   * Trigger feedback update callbacks
   */
  private triggerFeedbackUpdate(): void {
    this.feedbackCallbacks.forEach(callback => callback());
  }

  /**
   * Generic element renderer that dispatches to registered render functions
   */
  private renderElement(element: Element): HTMLElement {
    const tagName = element.localName || element.tagName.toLowerCase();
    const renderFn = this.renderRegistry.get(tagName);

    if (renderFn) {
      return renderFn(element, this);
    }

    // Fallback: render as generic element with children
    return this.renderGenericElement(element);
  }

  /**
   * Render assessmentItem - the root element
   * Creates a container div with the itemBody content
   */
  private renderAssessmentItem(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement('div');
    container.className = 'qti-assessment-item';
    container.setAttribute('role', 'article');
    container.setAttribute('aria-label', 'Assessment item');

    // Find and render itemBody (handles namespaces and qti- prefix)
    const itemBody = renderer.querySelectorLocal(element, 'itemBody') ||
                     renderer.querySelectorLocal(element, 'qti-item-body');
    if (itemBody) {
      const rendered = renderer.renderElement(itemBody);
      container.appendChild(rendered);
    }

    return container;
  }

  /**
   * Render itemBody - contains the question content
   * Acts as a container for interactions
   */
  private renderItemBody(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement('div');
    container.className = 'qti-item-body';

    // Render all child elements
    Array.from(element.children).forEach(child => {
      const rendered = renderer.renderElement(child);
      container.appendChild(rendered);
    });

    return container;
  }

  /**
   * Render choiceInteraction - multiple choice question
   * Creates a fieldset with radio buttons for each choice
   */
  private renderChoiceInteraction(element: Element, renderer: QtiRenderer): HTMLElement {
    const identifier = element.getAttribute('responseIdentifier') || 
                      element.getAttribute('response-identifier') ||
                      element.getAttribute('identifier') || 
                      `choice-${Math.random().toString(36).substr(2, 9)}`;
    
    const maxChoices = parseInt(
      element.getAttribute('maxChoices') || 
      element.getAttribute('max-choices') || 
      '1', 
      10
    );
    const isMultiple = maxChoices > 1;

    const fieldset = document.createElement('fieldset');
    fieldset.className = 'qti-choice-interaction';
    fieldset.setAttribute('data-response-identifier', identifier);

    // Render prompt if present (handles namespaces and qti- prefix)
    const prompt = renderer.querySelectorLocal(element, 'prompt') ||
                   renderer.querySelectorLocal(element, 'qti-prompt');
    if (prompt) {
      const promptElement = renderer.renderElement(prompt);
      const legend = document.createElement('legend');
      legend.className = 'qti-prompt';
      // Move prompt content into legend
      while (promptElement.firstChild) {
        legend.appendChild(promptElement.firstChild);
      }
      fieldset.appendChild(legend);
    }

    // Render choices (handles namespaces and qti- prefix)
    const choices = [
      ...renderer.querySelectorAllLocal(element, 'simpleChoice'),
      ...renderer.querySelectorAllLocal(element, 'qti-simple-choice'),
    ];
    choices.forEach((choice, index) => {
      const choiceId = choice.getAttribute('identifier') || `choice-${index}`;
      const renderedChoice = renderer.renderSimpleChoice(choice, renderer, identifier, choiceId, isMultiple);
      fieldset.appendChild(renderedChoice);
    });

    // Initialize response state
    this.responses.set(identifier, isMultiple ? [] : '');

    return fieldset;
  }

  /**
   * Render prompt - question text
   * Returns a container div (content will be moved to legend by parent)
   */
  private renderPrompt(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement('div');
    container.className = 'qti-prompt';

    // Render text content and any nested elements
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        container.appendChild(document.createTextNode(node.textContent || ''));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const rendered = renderer.renderElement(node as Element);
        container.appendChild(rendered);
      }
    });

    return container;
  }

  /**
   * Render simpleChoice - individual choice option
   * Creates a label with radio/checkbox input
   */
  private renderSimpleChoice(
    element: Element, 
    renderer: QtiRenderer,
    interactionId?: string,
    choiceId?: string,
    isMultiple?: boolean
  ): HTMLElement {
    // If called from registry, extract context from element
    if (!interactionId || !choiceId) {
      const fieldset = element.closest('fieldset[data-response-identifier]');
      interactionId = fieldset?.getAttribute('data-response-identifier') || 'unknown';
      
      // Try to find parent choiceInteraction (handles namespaces)
      let parentInteraction: Element | null = null;
      let current: Element | null = element.parentElement;
      while (current && !parentInteraction) {
        const localName = current.localName || current.tagName.toLowerCase();
        if (localName === 'choiceinteraction' || localName === 'choiceInteraction') {
          parentInteraction = current;
        }
        current = current.parentElement;
      }
      
      if (parentInteraction) {
        interactionId = parentInteraction.getAttribute('responseIdentifier') || interactionId;
        const maxChoices = parseInt(parentInteraction.getAttribute('maxChoices') || '1', 10);
        isMultiple = maxChoices > 1;
      }
      
      choiceId = element.getAttribute('identifier') || 
                `choice-${Math.random().toString(36).substr(2, 9)}`;
    }

    const label = document.createElement('label');
    label.className = 'qti-simple-choice';
    label.setAttribute('for', `${interactionId}-${choiceId}`);

    // Create input element
    const input = document.createElement('input');
    input.type = isMultiple ? 'checkbox' : 'radio';
    input.name = interactionId;
    input.id = `${interactionId}-${choiceId}`;
    input.value = choiceId;
    input.setAttribute('data-choice-identifier', choiceId);

    // Handle change events to update response state and show feedback
    input.addEventListener('change', () => {
      this.updateResponse(interactionId, choiceId, input.checked, isMultiple || false);
      if (this.options.showFeedback) {
        this.updateFeedback(interactionId, choiceId, input.checked);
      }
      this.triggerFeedbackUpdate();
    });

    label.appendChild(input);

    // Render choice content
    const content = document.createElement('span');
    content.className = 'qti-choice-content';
    
    // Process child nodes (text and elements)
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        content.appendChild(document.createTextNode(node.textContent || ''));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const rendered = renderer.renderElement(node as Element);
        content.appendChild(rendered);
      }
    });

    label.appendChild(content);

    return label;
  }

  /**
   * Update response state when user selects/deselects a choice
   */
  private updateResponse(
    interactionId: string, 
    choiceId: string, 
    isSelected: boolean, 
    isMultiple: boolean
  ): void {
    if (isMultiple) {
      const current = (this.responses.get(interactionId) as string[]) || [];
      if (isSelected) {
        if (!current.includes(choiceId)) {
          current.push(choiceId);
        }
      } else {
        const index = current.indexOf(choiceId);
        if (index > -1) {
          current.splice(index, 1);
        }
      }
      this.responses.set(interactionId, current);
    } else {
      this.responses.set(interactionId, isSelected ? choiceId : '');
    }

    if (this.options.debug) {
      console.log('Responses updated:', this.getResponses());
    }
  }

  /**
   * Update visual feedback for a choice based on correctness
   */
  private updateFeedback(interactionId: string, choiceId: string, isSelected: boolean): void {
    if (!this.container) return;

    const correctResponse = this.correctResponses.get(interactionId);
    if (correctResponse === undefined) return;

    // Find the choice label element
    const choiceLabel = this.container.querySelector(
      `label[for="${interactionId}-${choiceId}"]`
    ) as HTMLElement;
    if (!choiceLabel) return;

    // Remove existing feedback classes
    choiceLabel.classList.remove('qti-correct', 'qti-incorrect');

    if (!isSelected) {
      // If deselected, remove feedback
      return;
    }

    // Determine if this choice is correct
    const isCorrect = this.isChoiceCorrect(choiceId, correctResponse);
    
    if (isCorrect) {
      choiceLabel.classList.add('qti-correct');
      this.showFeedback('CORRECT');
    } else {
      choiceLabel.classList.add('qti-incorrect');
      this.showFeedback('INCORRECT');
    }

    // Also highlight correct answer if user selected wrong one
    if (!isCorrect && this.container) {
      const container = this.container; // Store in local variable for TypeScript
      if (typeof correctResponse === 'string') {
        const correctLabel = container.querySelector(
          `label[for="${interactionId}-${correctResponse}"]`
        ) as HTMLElement;
        if (correctLabel && !correctLabel.classList.contains('qti-correct')) {
          correctLabel.classList.add('qti-correct');
        }
      } else if (Array.isArray(correctResponse)) {
        correctResponse.forEach(correctId => {
          const correctLabel = container.querySelector(
            `label[for="${interactionId}-${correctId}"]`
          ) as HTMLElement;
          if (correctLabel && !correctLabel.classList.contains('qti-correct')) {
            correctLabel.classList.add('qti-correct');
          }
        });
      }
    }
  }

  /**
   * Check if a choice ID is in the correct response
   */
  private isChoiceCorrect(choiceId: string, correctResponse: ResponseValue): boolean {
    if (typeof correctResponse === 'string') {
      return choiceId === correctResponse;
    } else if (Array.isArray(correctResponse)) {
      return correctResponse.includes(choiceId);
    }
    return false;
  }

  /**
   * Show feedback message based on identifier
   */
  private showFeedback(identifier: string): void {
    if (!this.feedbackContainer) return;

    const feedbackBlock = this.feedbackBlocks.get(identifier);
    if (!feedbackBlock) return;

    // Clear existing feedback
    this.feedbackContainer.innerHTML = '';

    // Render feedback block
    const rendered = this.renderElement(feedbackBlock);
    this.feedbackContainer.appendChild(rendered);
    this.feedbackContainer.style.display = 'block';
  }

  /**
   * Render modal feedback element
   */
  private renderModalFeedback(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement('div');
    container.className = 'qti-modal-feedback';

    // Render all child elements (typically feedback-block)
    Array.from(element.children).forEach(child => {
      const rendered = renderer.renderElement(child);
      container.appendChild(rendered);
    });

    return container;
  }

  /**
   * Render feedback block element
   */
  private renderFeedbackBlock(element: Element, renderer: QtiRenderer): HTMLElement {
    const container = document.createElement('div');
    container.className = 'qti-feedback-block';

    // Render all child nodes (text and elements like <p>)
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text) {
          container.appendChild(document.createTextNode(text));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const nodeEl = node as Element;
        const tagName = nodeEl.localName || nodeEl.tagName.toLowerCase();
        
        // Create appropriate HTML element
        let htmlEl: HTMLElement;
        if (tagName === 'p') {
          htmlEl = document.createElement('p');
        } else if (tagName === 'strong' || tagName === 'b') {
          htmlEl = document.createElement('strong');
        } else if (tagName === 'em' || tagName === 'i') {
          htmlEl = document.createElement('em');
        } else {
          htmlEl = document.createElement('div');
        }

        // Copy text content and attributes
        htmlEl.textContent = nodeEl.textContent || '';
        container.appendChild(htmlEl);
      }
    });

    return container;
  }

  /**
   * Fallback renderer for unsupported elements
   * Renders element with its text content and processes children
   */
  private renderGenericElement(element: Element): HTMLElement {
    const container = document.createElement('div');
    container.className = `qti-${element.localName || element.tagName.toLowerCase()}`;

    // Copy text content and render children
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text) {
          container.appendChild(document.createTextNode(text));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const rendered = this.renderElement(node as Element);
        container.appendChild(rendered);
      }
    });

    return container;
  }
}
