import React, { useEffect, useRef, useState } from 'react';
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
  const [submissionCount, setSubmissionCount] = useState(0);

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

  const handleSubmit = () => {
    if (qtiItemRef.current) {
      qtiItemRef.current.submit();
      setSubmissionCount(qtiItemRef.current.getSubmissionCount());
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '800px',
          padding: '20px',
        }}
        className="qti-item-container"
      />
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
        <span>Submission Count: {submissionCount}</span>
      </div>
    </div>
  );
}
