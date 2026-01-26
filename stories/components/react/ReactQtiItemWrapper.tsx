import React, { useRef, useState } from 'react';
import { QtiItem, QtiItemRef } from '@qti-renderer/react';

export interface ReactQtiItemWrapperProps {
  xml: string;
}

export function ReactQtiItemWrapper({ xml }: ReactQtiItemWrapperProps) {
  const qtiItemRef = useRef<QtiItemRef>(null);
  const [submissionCount, setSubmissionCount] = useState(0);

  const handleSubmit = () => {
    if (qtiItemRef.current) {
      qtiItemRef.current.submit();
      setSubmissionCount(qtiItemRef.current.getSubmissionCount());
    }
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          padding: '20px',
        }}
      >
        <QtiItem ref={qtiItemRef} xml={xml} />
      </div>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#61dafb',
            color: 'black',
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
