import React, { useEffect, useRef, useState } from 'react';
import { createApp } from 'vue';
import { QtiItem as QtiItemVue } from '@qti-renderer/vue';

/**
 * React wrapper for Vue QtiItem component
 * This is ONLY used in Storybook to display Vue components in React-based Storybook
 * The actual Vue package does not include this wrapper
 */
export interface VueQtiItemWrapperProps {
  xml: string;
}

export function VueQtiItemWrapper({ xml }: VueQtiItemWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<ReturnType<typeof createApp> | null>(null);
  const componentRef = useRef<any>(null);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // Create and mount Vue app
    const app = createApp(QtiItemVue, {
      xml,
    });
    componentRef.current = app.mount(containerRef.current);
    appRef.current = app;

    return () => {
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
        componentRef.current = null;
      }
    };
  }, [xml]);

  const handleSubmit = () => {
    if (componentRef.current) {
      componentRef.current.submit();
      setSubmissionCount(componentRef.current.getSubmissionCount());
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
      />
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#42b883',
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
