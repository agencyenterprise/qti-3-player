import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { EventsEnum, QtiRenderer, QtiRendererOptions } from '@ae-studio/qti-renderer';

/**
 * React wrapper component for QTI renderer
 *
 * This component bridges React and the framework-agnostic QTI renderer.
 * It uses useEffect to mount the renderer when the component mounts or
 * when the XML changes, and useRef to maintain a reference to the
 * container DOM element.
 *
 * Design decision: We don't try to make the renderer React-aware.
 * Instead, we mount it into a container div and let it manage its own DOM.
 */
export interface QtiItemProps {
  xml: string;
  options?: QtiRendererOptions;
  onRender?: () => void;
  onValidate?: () => void;
}

export interface QtiItemRef {
  submit: () => void;
  getSubmissionCount: () => number;
}

export const QtiItem = forwardRef<QtiItemRef, QtiItemProps>(
  ({ xml, options, onRender, onValidate }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<QtiRenderer | null>(null);
    const [, forceUpdate] = useState(0);

    useImperativeHandle(ref, () => ({
      submit: () => {
        if (rendererRef.current) {
          rendererRef.current.submit();
        }
      },
      getSubmissionCount: () => {
        if (rendererRef.current) {
          return rendererRef.current.getSubmissionCount();
        }
        return 0;
      },
      getRenderer: () => {
        if (rendererRef.current) {
          return rendererRef.current;
        }
        throw new Error('Renderer not found');
      },
    }));

    useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      try {
        // Create new renderer instance with feedback and validation enabled
        const renderer = new QtiRenderer({ xml, options });
        rendererRef.current = renderer;

        if (onRender) {
          document.addEventListener(EventsEnum.AFTER_RENDER_EVENT, onRender);
        }
        if (onValidate) {
          document.addEventListener(EventsEnum.AFTER_VALIDATE_EVENT, onValidate);
        }

        // Render to container (async)
        renderer.render(containerRef.current).catch((error) => {
          console.error('Failed to render QTI item:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<div style="color: red; padding: 1rem;">
            Error rendering QTI item: ${error instanceof Error ? error.message : 'Unknown error'}
          </div>`;
          }
        });
      } catch (error) {
        console.error('Failed to create QTI renderer:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div style="color: red; padding: 1rem;">
          Error creating QTI renderer: ${error instanceof Error ? error.message : 'Unknown error'}
        </div>`;
        }
      }
    }, [xml]);

    return <div ref={containerRef} className="qti-item-container" />;
  }
);
