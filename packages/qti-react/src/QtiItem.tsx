import React, { useEffect, useRef, useState } from "react";
import { QtiRenderer, type AssessmentResult } from "@qti-renderer/core";

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
  onResponseChange?: (responses: Record<string, string | string[]>) => void;
  onAssessmentResult?: (result: AssessmentResult) => void;
}

export function QtiItem({
  xml,
  onResponseChange,
  onAssessmentResult,
}: QtiItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<QtiRenderer | null>(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    try {
      // Create new renderer instance with feedback enabled
      const renderer = new QtiRenderer(xml, {
        debug: false,
        showFeedback: true,
      });
      rendererRef.current = renderer;

      // Mount to container
      renderer.mount(containerRef.current);

      // Set up feedback callback to trigger re-render
      renderer.onFeedbackUpdate(() => {
        forceUpdate((prev) => prev + 1);
        if (onResponseChange && rendererRef.current) {
          onResponseChange(rendererRef.current.getResponses());
        }
        if (onAssessmentResult && rendererRef.current) {
          onAssessmentResult(rendererRef.current.processResponses());
        }
      });
    } catch (error) {
      console.error("Failed to render QTI item:", error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `<div style="color: red; padding: 1rem;">
          Error rendering QTI item: ${
            error instanceof Error ? error.message : "Unknown error"
          }
        </div>`;
      }
    }
  }, [xml, onResponseChange, onAssessmentResult]);

  return <div ref={containerRef} className="qti-item-container" />;
}
