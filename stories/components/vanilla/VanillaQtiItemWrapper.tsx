import React, { useEffect, useRef } from 'react';
import { VanillaQtiItem } from '@qti-renderer/vanilla';

/**
 * React wrapper for Vanilla QtiItem
 * This is ONLY used in Storybook to display vanilla components in React-based Storybook
 * The actual vanilla package does not include React
 */
export interface VanillaQtiItemWrapperProps {
  xml: string;
}

export function VanillaQtiItemWrapper({ xml }: VanillaQtiItemWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qtiItemRef = useRef<VanillaQtiItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    qtiItemRef.current = new VanillaQtiItem(containerRef.current, xml);

    return () => {
      if (qtiItemRef.current) {
        qtiItemRef.current.destroy();
        qtiItemRef.current = null;
      }
    };
  }, [xml]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '800px',
        padding: '20px',
      }}
      className="qti-item-container"
    />
  );
}
