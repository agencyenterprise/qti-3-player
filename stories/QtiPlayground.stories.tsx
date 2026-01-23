import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QtiItem } from '@qti-renderer/react';
import { validateXml } from '@qti-renderer/core';

const meta = {
  title: 'Playground/QTI XML Editor',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default QTI XML template
 */
const defaultQtiXml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="PLAYGROUND_001"
  title="Playground Question"
  adaptive="false"
  time-dependent="false">
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <qti-correct-response>
      <qti-value>CHOICE_A</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>What is 2 + 2?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">3</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_C">5</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

/**
 * Format error message for display
 * The validation.ts now handles most error formatting, so this is simplified
 */
function formatErrorMessage(error: any): string {
  // Handle null/undefined
  if (!error) {
    return 'Unknown validation error';
  }

  // Handle Error instances
  if (error instanceof Error) {
    return error.message || error.name || 'Validation error occurred';
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle object errors - the validation.ts should have already formatted these
  if (typeof error === 'object' && error.message && typeof error.message === 'string') {
    return error.message;
  }

  return 'Validation error occurred. Please check your XML syntax and structure.';
}

/**
 * QTI Playground Component
 * Allows users to paste QTI XML, validate it, and render it
 */
function QtiPlayground() {
  const [xmlInput, setXmlInput] = useState(defaultQtiXml);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: Array<{ message: string; line?: number; fileName?: string }>;
  } | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [renderXml, setRenderXml] = useState(defaultQtiXml);

  const handleValidate = useCallback(async () => {
    setIsValidating(true);
    try {
      const result = await validateXml(xmlInput);

      // The validation.ts now properly formats error messages
      setValidationResult({
        valid: result.valid,
        errors: result.errors.map((error) => ({
          message: error.message,
          line: error.line,
          fileName: error.fileName,
        })),
      });
    } catch (error) {
      console.error('Validation exception:', error);
      setValidationResult({
        valid: false,
        errors: [
          {
            message: formatErrorMessage(error),
          },
        ],
      });
    } finally {
      setIsValidating(false);
    }
  }, [xmlInput]);

  const handleRender = useCallback(() => {
    if (validationResult?.valid) {
      setRenderXml(xmlInput);
    }
  }, [xmlInput, validationResult]);

  const handleClear = useCallback(() => {
    setXmlInput('');
    setValidationResult(null);
    setRenderXml('');
  }, []);

  const handleReset = useCallback(() => {
    setXmlInput(defaultQtiXml);
    setValidationResult(null);
    setRenderXml(defaultQtiXml);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100vh' }}>
      {/* Header */}
      <div style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>QTI XML Playground</h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
          Paste your QTI XML below, validate it, and render it. The renderer will only update when
          validation passes.
        </p>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, gap: '1rem', overflow: 'hidden', padding: '0 1rem' }}>
        {/* Left Panel - Input and Validation */}
        <div
          style={{
            flex: '0 0 50%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            overflow: 'hidden',
          }}
        >
          {/* XML Input */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <label htmlFor="xml-input" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                QTI XML Input
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleClear}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
            <textarea
              id="xml-input"
              value={xmlInput}
              onChange={(e) => {
                setXmlInput(e.target.value);
                setValidationResult(null);
              }}
              style={{
                flex: 1,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'none',
                minHeight: '300px',
              }}
              placeholder="Paste your QTI XML here..."
            />
          </div>

          {/* Validation Controls */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={handleValidate}
              disabled={isValidating || !xmlInput.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '4px',
                background: isValidating || !xmlInput.trim() ? '#ccc' : '#007bff',
                color: 'white',
                cursor: isValidating || !xmlInput.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {isValidating ? 'Validating...' : 'Validate XML'}
            </button>
            <button
              onClick={handleRender}
              disabled={!validationResult?.valid}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '4px',
                background: validationResult?.valid ? '#28a745' : '#ccc',
                color: 'white',
                cursor: validationResult?.valid ? 'pointer' : 'not-allowed',
              }}
            >
              Render
            </button>
          </div>

          {/* Validation Results */}
          {validationResult && (
            <div
              style={{
                padding: '1rem',
                borderRadius: '4px',
                background: validationResult.valid ? '#d4edda' : '#f8d7da',
                border: `1px solid ${validationResult.valid ? '#c3e6cb' : '#f5c6cb'}`,
                color: validationResult.valid ? '#155724' : '#721c24',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {validationResult.valid ? '✓ Valid XML' : '✗ Invalid XML'}
              </div>
              {validationResult.errors.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    Errors ({validationResult.errors.length}):
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {validationResult.errors.slice(0, 10).map((error, index) => (
                      <li
                        key={index}
                        style={{ marginBottom: '0.5rem', fontSize: '0.875rem', lineHeight: '1.5' }}
                      >
                        {error.line && typeof error.line === 'number' && (
                          <span
                            style={{ fontWeight: 'bold', marginRight: '0.5rem', color: '#721c24' }}
                          >
                            Line {error.line}:
                          </span>
                        )}
                        <span>{error.message}</span>
                      </li>
                    ))}
                    {validationResult.errors.length > 10 && (
                      <li style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
                        ... and {validationResult.errors.length - 10} more errors
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Panel - Render Output */}
        <div
          style={{
            flex: '0 0 50%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Rendered Output</label>
            {!renderXml && (
              <span style={{ fontSize: '0.875rem', color: '#666', fontStyle: 'italic' }}>
                Validate and render XML to see output
              </span>
            )}
          </div>
          <div
            style={{
              flex: 1,
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem',
              overflowY: 'auto',
              background: '#f9f9f9',
              minHeight: '300px',
            }}
          >
            {renderXml ? (
              <QtiItem xml={renderXml} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#999',
                  fontSize: '0.9rem',
                }}
              >
                No XML rendered yet. Validate your XML and click "Render" to see the output.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: () => <QtiPlayground />,
};
