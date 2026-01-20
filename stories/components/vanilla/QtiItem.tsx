import React, { useEffect, useRef } from "react";
import { QtiRenderer } from "@qti-renderer/core";

interface VanillaQtiItemProps {
  xml: string;
}

export function VanillaQtiItem({
  xml,
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
  }, [xml]);

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
