import React, { useEffect, useRef } from "react";
import { createApp } from "vue";
import { QtiItem as QtiItemVue } from "@qti-renderer/vue";
import type { AssessmentResult } from "@qti-renderer/core";

/**
 * React wrapper for Vue QtiItem component
 * This is ONLY used in Storybook to display Vue components in React-based Storybook
 * The actual Vue package does not include this wrapper
 */
export interface VueQtiItemWrapperProps {
  xml: string;
  onResponseChange?: (responses: Record<string, string | string[]>) => void;
  onAssessmentResult?: (result: AssessmentResult) => void;
}

export function VueQtiItemWrapper({
  xml,
  onResponseChange,
  onAssessmentResult,
}: VueQtiItemWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<ReturnType<typeof createApp> | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // Create and mount Vue app
    const app = createApp(QtiItemVue, {
      xml,
      onResponseChange,
      onAssessmentResult,
    });
    app.mount(containerRef.current);
    appRef.current = app;

    return () => {
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
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
    />
  );
}
