import { QtiRenderer, EventsEnum } from '@ae-studio/qti-renderer';
import { QtiRendererParams } from '@ae-studio/qti-renderer/dist/types';

export interface VanillaQtiItemCallbacks {
  onRender?: () => void;
  onValidate?: () => void;
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
 * const qtiItem = new VanillaQtiItem(container, xmlString, {});
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
  private params: QtiRendererParams;
  private callbacks?: VanillaQtiItemCallbacks;

  constructor(
    container: HTMLElement,
    params: QtiRendererParams,
    callbacks?: VanillaQtiItemCallbacks
  ) {
    this.container = container;
    this.params = params;
    this.callbacks = callbacks;
    this.mount();
  }

  /**
   * Mount or update the QTI renderer with new XML
   */
  mount(): void {
    // Clean up existing renderer
    this.destroy();

    try {
      this.renderer = new QtiRenderer(this.params);
      if (this.callbacks?.onRender) {
        document.addEventListener(EventsEnum.AFTER_RENDER_EVENT, () => {
          this.callbacks?.onRender?.();
        });
      }
      if (this.callbacks?.onValidate) {
        document.addEventListener(EventsEnum.AFTER_VALIDATE_EVENT, () => {
          this.callbacks?.onValidate?.();
        });
      }
      // Render to container (async)
      this.renderer.render(this.container).catch((error) => {
        console.error('Failed to render QTI item:', error);
        this.container.innerHTML = `<div style="color: red; padding: 1rem;">
          Error rendering QTI item: ${error instanceof Error ? error.message : 'Unknown error'}
        </div>`;
      });
    } catch (error) {
      console.error('Failed to create QTI renderer:', error);
      this.container.innerHTML = `<div style="color: red; padding: 1rem;">
        Error creating QTI renderer: ${error instanceof Error ? error.message : 'Unknown error'}
      </div>`;
    }
  }

  /**
   * Update the XML content (alias for mount)
   */
  updateXml(params: QtiRendererParams): void {
    this.params = params;
    this.mount();
  }

  /**
   * Submit the current response
   */
  submit(): void {
    if (this.renderer) {
      this.renderer.submit();
    }
  }

  /**
   * Get the submission count
   */
  getSubmissionCount(): number {
    if (this.renderer) {
      return this.renderer.getSubmissionCount();
    }
    return 0;
  }

  /**
   * Destroy the renderer and clean up
   */
  destroy(): void {
    if (this.renderer) {
      // Clear container
      this.container.innerHTML = '';
      this.renderer = null;
    }
  }

  /**
   * Get the renderer
   */
  getRenderer(): QtiRenderer {
    if (this.renderer) {
      return this.renderer;
    }
    throw new Error('Renderer not found');
  }
}

/**
 * Convenience function to mount QTI item
 *
 * @example
 * ```typescript
 * const container = document.getElementById('qti-container');
 * const qtiItem = mountQtiItem(container, xmlString, {});
 * ```
 */
export function mountQtiItem(container: HTMLElement, params: QtiRendererParams): VanillaQtiItem {
  return new VanillaQtiItem(container, params);
}
