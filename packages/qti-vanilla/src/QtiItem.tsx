import React, { useEffect, useRef } from "react";
import { QtiRenderer, type AssessmentResult } from "@qti-renderer/core";

export interface VanillaQtiItemProps {
  xml: string;
  onResponseChange?: (responses: Record<string, string | string[]>) => void;
  onAssessmentResult?: (result: AssessmentResult) => void;
}

/**
 * Vanilla JS wrapper component for QTI renderer
 * This is a React wrapper that uses the framework-agnostic QTI renderer directly
 */
export function VanillaQtiItem({
  xml,
  onResponseChange,
  onAssessmentResult,
}: VanillaQtiItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<QtiRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    try {
      const renderer = new QtiRenderer(xml, {
        debug: false,
        showFeedback: true,
      });
      rendererRef.current = renderer;
      renderer.mount(containerRef.current);

      // Set up feedback callback
      renderer.onFeedbackUpdate(() => {
        if (onResponseChange && rendererRef.current) {
          onResponseChange(rendererRef.current.getResponses());
        }
        if (onAssessmentResult && rendererRef.current) {
          onAssessmentResult(rendererRef.current.processResponses());
        }
      });

      return () => {
        rendererRef.current = null;
      };
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

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "800px",
        padding: "20px",
      }}
      className="qti-item-container"
    />
  );
}
