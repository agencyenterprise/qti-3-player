import {
  QtiRendererOptions,
  ResponseValue,
  ResponseResult,
  AssessmentResult,
} from "./types";
import { registerAllElements } from "./qti-elements/register";
import { validateXml, type ValidationResult, type ValidationOptions } from "./validation";

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
  private responses: Map<string, ResponseValue> = new Map();
  private correctResponses: Map<string, ResponseValue> = new Map();
  private feedbackBlocks: Map<string, Element> = new Map();
  private options: QtiRendererOptions;
  private feedbackCallbacks: Set<() => void> = new Set();
  private feedbackContainer: HTMLElement | null = null;
  private submitButtonContainer: HTMLElement | null = null;
  private submissionCountContainer: HTMLElement | null = null;
  private submissionCount: number = 0;
  private maxAttempts: number | null = null;
  private validationResult: ValidationResult | null = null;
  private validationPromise: Promise<ValidationResult> | null = null;
  private isValidated: boolean = false;

  /**
   * Internal registry mapping QTI element names to render functions
   * Supports both standard and qti- prefixed element names
   */
  private renderRegistry: Map<string, RenderFunction> = new Map();

  constructor(qtiXml: string, options: QtiRendererOptions = {}) {
    this.xmlString = qtiXml;
    this.options = { 
      showFeedback: true, 
      validateXml: true, // Validation enabled by default
      ...options 
    };
    registerAllElements(this.renderRegistry);
    this.parseXml(qtiXml);
    this.parseResponseDeclarations();
    this.parseFeedbackBlocks();
    this.parseMaxAttempts();
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
        ? (this.options.validationOptions.fetchSchema ?? true)
        : (this.options.validationOptions?.fetchSchema ?? false),
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
    this.parseResponseDeclarations();
    this.parseFeedbackBlocks();
    this.parseMaxAttempts();
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
    this.xmlDoc = parser.parseFromString(xml, "text/xml");

    // Check for parsing errors
    const parseError = this.xmlDoc.querySelector("parsererror");
    if (parseError) {
      throw new Error(`Failed to parse QTI XML: ${parseError.textContent}`);
    }
  }

  /**
   * Helper to find elements by local name (handles namespaces)
   */
  findElementByLocalName(
    parent: Document | Element,
    localName: string
  ): Element | null {
    const elements = parent.getElementsByTagNameNS("*", localName);
    return elements.length > 0 ? elements[0] : null;
  }

  /**
   * Helper to query selector that works with or without namespaces
   */
  querySelectorLocal(
    element: Element | Document,
    localName: string
  ): Element | null {
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
  querySelectorAllLocal(
    element: Element | Document,
    localName: string
  ): Element[] {
    // Try with namespace first
    const nsElements = element.getElementsByTagNameNS("*", localName);
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
    const allElements = this.xmlDoc.getElementsByTagName("*");
    const declarations: Element[] = [];

    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      const localName = el.localName || el.tagName.toLowerCase();
      if (
        localName === "responseDeclaration" ||
        localName === "qti-response-declaration"
      ) {
        declarations.push(el);
      }
    }

    declarations.forEach((decl) => {
      const identifier = decl.getAttribute("identifier");
      if (!identifier) return;

      // Find correct response by checking children
      let correctResponseEl: Element | null = null;
      for (let i = 0; i < decl.children.length; i++) {
        const child = decl.children[i];
        const localName = child.localName || child.tagName.toLowerCase();
        if (
          localName === "correctResponse" ||
          localName === "qti-correct-response"
        ) {
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
        if (localName === "value" || localName === "qti-value") {
          const value = child.textContent?.trim() || "";
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
    const allElements = this.xmlDoc.getElementsByTagName("*");

    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      const localName = el.localName || el.tagName.toLowerCase();
      if (localName === "modalFeedback" || localName === "qti-modal-feedback") {
        const identifier = el.getAttribute("identifier");
        if (identifier) {
          this.feedbackBlocks.set(identifier, el);
        }
      }
    }
  }

  /**
   * Parse max attempts from QTI XML
   */
  private parseMaxAttempts(): void {
    if (!this.xmlDoc) return;

    // Find assessment item root element
    const assessmentItem =
      this.querySelectorLocal(this.xmlDoc, "assessmentItem") ||
      this.querySelectorLocal(this.xmlDoc, "qti-assessment-item");

    if (assessmentItem) {
      const maxAttemptsAttr =
        assessmentItem.getAttribute("max-attempts") ||
        assessmentItem.getAttribute("maxAttempts");
      if (maxAttemptsAttr) {
        const parsed = parseInt(maxAttemptsAttr, 10);
        if (!isNaN(parsed) && parsed > 0) {
          this.maxAttempts = parsed;
        }
      }
    }
  }

  /**
   * Render the QTI item into a container element
   * If validation is enabled, it will validate the XML first if not already validated
   * 
   * @param container - Container element to render into
   */
  async render(container: HTMLElement): Promise<void> {
    if (!this.xmlDoc) {
      throw new Error("QTI XML not parsed. Check constructor.");
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
    this.renderContent(container);
  }

  /**
   * Internal method to render the content into container
   */
  private renderContent(container: HTMLElement): void {
    if (!this.xmlDoc) {
      throw new Error("QTI XML not parsed. Check constructor.");
    }

    this.container = container;
    container.innerHTML = ""; // Clear existing content

    // Find and render the assessmentItem root element (handles namespaces and qti- prefix)
    const assessmentItem =
      this.querySelectorLocal(this.xmlDoc, "assessmentItem") ||
      this.querySelectorLocal(this.xmlDoc, "qti-assessment-item");
    if (!assessmentItem) {
      throw new Error("No assessmentItem found in QTI XML");
    }

    const rendered = this.renderElement(assessmentItem);
    container.appendChild(rendered);

    // Create submission count display
    this.submissionCountContainer = document.createElement("div");
    this.submissionCountContainer.className = "qti-submission-count";
    this.updateSubmissionCountDisplay();
    container.appendChild(this.submissionCountContainer);

    // Create submit button container (always visible)
    this.submitButtonContainer = document.createElement("div");
    this.submitButtonContainer.className = "qti-submit-container";

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.className = "qti-submit-button";
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => {
      this.handleSubmit();
    });

    this.submitButtonContainer.appendChild(submitButton);
    container.appendChild(this.submitButtonContainer);

    // Create feedback container
    this.feedbackContainer = document.createElement("div");
    this.feedbackContainer.className = "qti-feedback-container";
    this.feedbackContainer.style.display = "none";
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
          correctResponse: "",
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
  private compareResponses(
    userResponse: ResponseValue,
    correctResponse: ResponseValue
  ): boolean {
    if (Array.isArray(userResponse) && Array.isArray(correctResponse)) {
      if (userResponse.length !== correctResponse.length) return false;
      const userSorted = [...userResponse].sort();
      const correctSorted = [...correctResponse].sort();
      return userSorted.every((val, idx) => val === correctSorted[idx]);
    } else if (
      typeof userResponse === "string" &&
      typeof correctResponse === "string"
    ) {
      return userResponse === correctResponse;
    } else if (
      Array.isArray(userResponse) &&
      typeof correctResponse === "string"
    ) {
      return userResponse.length === 1 && userResponse[0] === correctResponse;
    } else if (
      typeof userResponse === "string" &&
      Array.isArray(correctResponse)
    ) {
      return (
        correctResponse.length === 1 && correctResponse[0] === userResponse
      );
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
  triggerFeedbackUpdate(): void {
    this.feedbackCallbacks.forEach((callback) => callback());
  }

  /**
   * Generic element renderer that dispatches to registered render functions
   */
  renderElement(element: Element): HTMLElement {
    const tagName = element.localName || element.tagName.toLowerCase();
    const renderFn = this.renderRegistry.get(tagName);

    if (renderFn) {
      return renderFn(element, this);
    }

    // Fallback: render as generic element with children
    return this.renderGenericElement(element);
  }


  /**
   * Initialize response state for an interaction
   */
  initializeResponse(interactionId: string, initialValue: ResponseValue): void {
    this.responses.set(interactionId, initialValue);
  }

  /**
   * Update response state when user selects/deselects a choice
   */
  updateResponse(
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
      this.responses.set(interactionId, isSelected ? choiceId : "");
    }

    if (this.options.debug) {
      console.log("Responses updated:", this.getResponses());
    }
  }

  /**
   * Update submission count display - shows remaining attempts
   */
  private updateSubmissionCountDisplay(): void {
    if (!this.submissionCountContainer) return;

    if (this.maxAttempts !== null) {
      const remaining = Math.max(0, this.maxAttempts - this.submissionCount);
      this.submissionCountContainer.textContent = `Submissions remaining: ${remaining}`;
    } else {
      // No limit set - show unlimited
      this.submissionCountContainer.textContent = `Submissions remaining: unlimited`;
    }
  }

  /**
   * Clear feedback and visual indicators
   */
  clearFeedback(): void {
    if (!this.container) return;

    // Clear all visual feedback classes
    const labels = this.container.querySelectorAll(".qti-simple-choice");
    labels.forEach((label) => {
      label.classList.remove("qti-correct", "qti-incorrect");
    });

    // Clear feedback message
    if (this.feedbackContainer) {
      this.feedbackContainer.innerHTML = "";
      this.feedbackContainer.style.display = "none";
    }

    // Re-enable all inputs
    const inputs = this.container.querySelectorAll(
      'input[type="radio"], input[type="checkbox"]'
    );
    inputs.forEach((input) => {
      (input as HTMLInputElement).disabled = false;
    });
  }

  /**
   * Handle submit button click - show feedback
   */
  private handleSubmit(): void {
    if (!this.container) return;

    // Check if max attempts reached
    if (this.maxAttempts !== null && this.submissionCount >= this.maxAttempts) {
      return; // Don't allow more submissions
    }

    // Check if there's a response to submit
    let hasResponse = false;
    this.responses.forEach((response) => {
      if (
        response &&
        (typeof response === "string" ? response !== "" : response.length > 0)
      ) {
        hasResponse = true;
      }
    });

    if (!hasResponse) {
      return; // No response to submit
    }

    // Increment submission count
    this.submissionCount++;
    this.updateSubmissionCountDisplay();

    // Disable submit button if max attempts reached
    if (this.maxAttempts !== null && this.submissionCount >= this.maxAttempts) {
      const submitButton = this.submitButtonContainer?.querySelector(
        ".qti-submit-button"
      ) as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = true;
      }
      // Also disable inputs if max attempts reached
      const inputs = this.container.querySelectorAll(
        'input[type="radio"], input[type="checkbox"]'
      );
      inputs.forEach((input) => {
        (input as HTMLInputElement).disabled = true;
      });
    }
    // Note: If max attempts not reached, inputs remain enabled for next submission

    // Show visual feedback for all interactions
    this.responses.forEach((response, interactionId) => {
      if (!response || (Array.isArray(response) && response.length === 0)) {
        return;
      }

      const correctResponse = this.correctResponses.get(interactionId);
      if (correctResponse === undefined) return;

      // Determine correctness
      const isCorrect = this.compareResponses(response, correctResponse);

      // Update visual feedback
      if (typeof response === "string") {
        this.updateChoiceVisualFeedback(
          interactionId,
          response,
          isCorrect,
          correctResponse
        );
      } else if (Array.isArray(response)) {
        response.forEach((choiceId) => {
          const choiceCorrect = this.isChoiceCorrect(choiceId, correctResponse);
          this.updateChoiceVisualFeedback(
            interactionId,
            choiceId,
            choiceCorrect,
            correctResponse
          );
        });
      }

      // Show feedback message
      if (isCorrect) {
        this.showFeedback("CORRECT");
      } else {
        this.showFeedback("INCORRECT");
      }
    });

    this.triggerFeedbackUpdate();
  }

  /**
   * Update visual feedback for a single choice
   */
  private updateChoiceVisualFeedback(
    interactionId: string,
    choiceId: string,
    isCorrect: boolean,
    correctResponse: ResponseValue
  ): void {
    if (!this.container) return;

    const choiceLabel = this.container.querySelector(
      `label[for="${interactionId}-${choiceId}"]`
    ) as HTMLElement;
    if (!choiceLabel) return;

    choiceLabel.classList.remove("qti-correct", "qti-incorrect");

    if (isCorrect) {
      choiceLabel.classList.add("qti-correct");
    } else {
      choiceLabel.classList.add("qti-incorrect");
    }
  }

  /**
   * Check if a choice ID is in the correct response
   */
  private isChoiceCorrect(
    choiceId: string,
    correctResponse: ResponseValue
  ): boolean {
    if (typeof correctResponse === "string") {
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

    // Don't overwrite if feedback already shown (for multiple interactions)
    if (this.feedbackContainer.innerHTML.trim() !== "") {
      return;
    }

    // Render feedback block
    const rendered = this.renderElement(feedbackBlock);
    this.feedbackContainer.appendChild(rendered);
    this.feedbackContainer.style.display = "block";
  }


  /**
   * Fallback renderer for unsupported elements
   * Renders element with its text content and processes children
   */
  private renderGenericElement(element: Element): HTMLElement {
    const container = document.createElement("div");
    container.className = `qti-${
      element.localName || element.tagName.toLowerCase()
    }`;

    // Copy text content and render children
    Array.from(element.childNodes).forEach((node) => {
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
