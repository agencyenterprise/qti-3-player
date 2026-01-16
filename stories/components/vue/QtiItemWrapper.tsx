import React, { useEffect, useRef } from "react";
import { createApp } from "vue";
import QtiItemVue from "./QtiItem.vue";
import type { AssessmentResult } from "@qti-renderer/core";

interface VueQtiItemWrapperProps {
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
