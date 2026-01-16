import React, { useEffect, useRef } from "react";
import { VanillaQtiItem, type VanillaQtiItemOptions } from "@qti-renderer/vanilla";
import type { AssessmentResult } from "@qti-renderer/core";

/**
 * React wrapper for Vanilla QtiItem
 * This is ONLY used in Storybook to display vanilla components in React-based Storybook
 * The actual vanilla package does not include React
 */
export interface VanillaQtiItemWrapperProps {
  xml: string;
  onResponseChange?: (responses: Record<string, string | string[]>) => void;
  onAssessmentResult?: (result: AssessmentResult) => void;
}

export function VanillaQtiItemWrapper({
  xml,
  onResponseChange,
  onAssessmentResult,
}: VanillaQtiItemWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qtiItemRef = useRef<VanillaQtiItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const options: VanillaQtiItemOptions = {
      onResponseChange,
      onAssessmentResult,
      debug: false,
      showFeedback: true,
    };

    qtiItemRef.current = new VanillaQtiItem(containerRef.current, xml, options);

    return () => {
      if (qtiItemRef.current) {
        qtiItemRef.current.destroy();
        qtiItemRef.current = null;
      }
    };
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
