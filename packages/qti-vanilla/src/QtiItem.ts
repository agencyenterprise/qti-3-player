import { QtiRenderer, type AssessmentResult } from "@qti-renderer/core";

export interface VanillaQtiItemOptions {
  onResponseChange?: (responses: Record<string, string | string[]>) => void;
  onAssessmentResult?: (result: AssessmentResult) => void;
  debug?: boolean;
  showFeedback?: boolean;
}

/**
 * Vanilla JS wrapper for QTI renderer
 * 
 * This is a truly framework-agnostic implementation that uses pure JavaScript/TypeScript.
 * No React, Vue, or any other framework dependencies.
 * 
 * @example
 * ```typescript
 * const container = document.getElementById('qti-container');
 * const qtiItem = new VanillaQtiItem(container, xmlString, {
 *   onResponseChange: (responses) => console.log(responses),
 *   onAssessmentResult: (result) => console.log(result)
 * });
 * 
 * // Update XML
 * qtiItem.updateXml(newXmlString);
 * 
 * // Cleanup
 * qtiItem.destroy();
 * ```
 */
export class VanillaQtiItem {
  private container: HTMLElement;
  private renderer: QtiRenderer | null = null;
  private options: VanillaQtiItemOptions;

  constructor(
    container: HTMLElement,
    xml: string,
    options: VanillaQtiItemOptions = {}
  ) {
    this.container = container;
    this.options = {
      debug: false,
      showFeedback: true,
      ...options,
    };
    this.mount(xml);
  }

  /**
   * Mount or update the QTI renderer with new XML
   */
  mount(xml: string): void {
    // Clean up existing renderer
    this.destroy();

    try {
      this.renderer = new QtiRenderer(xml, {
        debug: this.options.debug ?? false,
        showFeedback: this.options.showFeedback ?? true,
        validateXml: true,
      });

      // Render to container (async)
      this.renderer.render(this.container).catch((error) => {
        console.error("Failed to render QTI item:", error);
        this.container.innerHTML = `<div style="color: red; padding: 1rem;">
          Error rendering QTI item: ${
            error instanceof Error ? error.message : "Unknown error"
          }
        </div>`;
      });

      // Set up feedback callback
      this.renderer.onFeedbackUpdate(() => {
        if (this.options.onResponseChange && this.renderer) {
          this.options.onResponseChange(this.renderer.getResponses());
        }
        if (this.options.onAssessmentResult && this.renderer) {
          this.options.onAssessmentResult(this.renderer.processResponses());
        }
      });
    } catch (error) {
      console.error("Failed to create QTI renderer:", error);
      this.container.innerHTML = `<div style="color: red; padding: 1rem;">
        Error creating QTI renderer: ${
          error instanceof Error ? error.message : "Unknown error"
        }
      </div>`;
    }
  }

  /**
   * Update the XML content (alias for mount)
   */
  updateXml(xml: string): void {
    this.mount(xml);
  }

  /**
   * Get current responses
   */
  getResponses(): Record<string, string | string[]> {
    return this.renderer?.getResponses() ?? {};
  }

  /**
   * Process responses and get assessment result
   */
  processResponses(): AssessmentResult | null {
    return this.renderer?.processResponses() ?? null;
  }

  /**
   * Destroy the renderer and clean up
   */
  destroy(): void {
    if (this.renderer) {
      // Clear container
      this.container.innerHTML = "";
      this.renderer = null;
    }
  }
}

/**
 * Convenience function to mount QTI item
 * 
 * @example
 * ```typescript
 * const container = document.getElementById('qti-container');
 * const qtiItem = mountQtiItem(container, xmlString, {
 *   onResponseChange: (responses) => console.log(responses)
 * });
 * ```
 */
export function mountQtiItem(
  container: HTMLElement,
  xml: string,
  options?: VanillaQtiItemOptions
): VanillaQtiItem {
  return new VanillaQtiItem(container, xml, options);
}
