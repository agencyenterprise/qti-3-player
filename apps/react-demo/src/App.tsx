import { useState } from 'react';
import { QtiItem } from './QtiItem';
import { AssessmentResult } from '@qti-renderer/core';
import { exampleQtiXml } from './example-qti';

/**
 * React demo app showcasing QTI 3.x renderer
 * 
 * This is a minimal example that:
 * - Renders a single multiple choice QTI question
 * - Displays the current responses
 * - Shows assessment results and feedback
 * - Shows how to integrate the QTI renderer with React
 */
function App() {
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  return (
    <div>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>QTI 3.x Renderer Demo</h1>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Proof of concept - Multiple Choice Question with Response Processing
        </p>
      </header>

      <QtiItem 
        xml={exampleQtiXml} 
        onResponseChange={setResponses}
        onAssessmentResult={setAssessmentResult}
      />

      <div style={{ 
        maxWidth: '800px', 
        margin: '2rem auto', 
        padding: '1rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Current Responses:</h2>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          {JSON.stringify(responses, null, 2)}
        </pre>

        {assessmentResult && (
          <>
            <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>
              Assessment Results:
            </h2>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Score: </strong>
              <span style={{ 
                color: assessmentResult.score === 1 ? '#4caf50' : '#f44336',
                fontWeight: 'bold'
              }}>
                {(assessmentResult.score * 100).toFixed(0)}%
              </span>
            </div>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.875rem'
            }}>
              {JSON.stringify(assessmentResult, null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
