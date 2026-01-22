import React, { useEffect, useRef } from "react";
import { createApp } from "vue";
import QtiItemVue from "./QtiItem.vue";

interface VueQtiItemWrapperProps {
  xml: string;
}

export function VueQtiItemWrapper({
  xml,
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
    });
    app.mount(containerRef.current);
    appRef.current = app;

    return () => {
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, [xml]);

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
