import { describe, it, expect } from 'vitest';
import { QtiRenderer } from './renderer';

describe('QtiRenderer Validation Integration', () => {
  // Valid QTI 3.0 XML
  const validQtiXml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0p1_v1p0.xsd" 
  identifier="TEST_001"
  title="Test Question"
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
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Invalid QTI XML - invalid element (unknown element)
  const invalidQtiXml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0p1_v1p0.xsd" 
  identifier="TEST_002"
  title="Test Question"
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
      <invalid-element>This element does not exist</invalid-element>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  it('should not validate XML in constructor', () => {
    const renderer = new QtiRenderer(validQtiXml);

    // Validation should not have been performed
    expect(renderer.isXmlValidated()).toBe(false);
    expect(renderer.getValidationResult()).toBeNull();
  });

  it('should validate XML when validateXml() is called', async () => {
    const renderer = new QtiRenderer(validQtiXml);

    // Initially not validated
    expect(renderer.isXmlValidated()).toBe(false);

    // Call validateXml
    const validationResult = await renderer.validateXml();

    // Should now be validated
    expect(renderer.isXmlValidated()).toBe(true);
    expect(validationResult).not.toBeNull();
    
    // Schema may have warnings about external references, but XML structure should be valid
    // Filter out schema loading errors (ErrnoError) which are environmental
    const criticalErrors = validationResult.errors.filter(
      (e) =>
        !e.message.toLowerCase().includes('does not resolve') &&
        !e.message.toLowerCase().includes('schemas parser error') &&
        !e.message.includes('ErrnoError') &&
        !e.message.toLowerCase().includes('failed to load')
    );
    expect(criticalErrors).toHaveLength(0);
  }, 30000);

  it('should detect validation errors for invalid XML', async () => {
    const renderer = new QtiRenderer(invalidQtiXml);

    const validationResult = await renderer.validateXml();

    expect(validationResult).not.toBeNull();
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors.length).toBeGreaterThan(0);
    expect(renderer.isXmlValidated()).toBe(true);
  }, 30000);

  it('should validate XML automatically when render() is called with validation enabled', async () => {
    const renderer = new QtiRenderer(validQtiXml, {
      validateXml: true,
    });

    expect(renderer.isXmlValidated()).toBe(false);

    const container = document.createElement('div');
    await renderer.render(container);

    // Should have validated before rendering
    expect(renderer.isXmlValidated()).toBe(true);
    expect(container.children.length).toBeGreaterThan(0);
  }, 30000);

  it('should not validate when render() is called with validation disabled', async () => {
    const renderer = new QtiRenderer(validQtiXml, {
      validateXml: false,
    });

    const container = document.createElement('div');
    await renderer.render(container);

    // Should not have validated
    expect(renderer.isXmlValidated()).toBe(false);
    expect(renderer.getValidationResult()).toBeNull();
    // But should still render
    expect(container.children.length).toBeGreaterThan(0);
  });

  it('should not re-validate if already validated when render() is called', async () => {
    const renderer = new QtiRenderer(validQtiXml, {
      validateXml: true,
    });

    // Validate first
    await renderer.validateXml();
    expect(renderer.isXmlValidated()).toBe(true);
    const firstValidationResult = renderer.getValidationResult();

    // Render should use existing validation
    const container = document.createElement('div');
    await renderer.render(container);

    // Should still be validated and result should be the same
    expect(renderer.isXmlValidated()).toBe(true);
    expect(renderer.getValidationResult()).toBe(firstValidationResult);
    expect(container.children.length).toBeGreaterThan(0);
  }, 30000);

  it('should invalidate validation when invalidateValidation() is called', async () => {
    const renderer = new QtiRenderer(validQtiXml);

    // Validate
    await renderer.validateXml();
    expect(renderer.isXmlValidated()).toBe(true);
    expect(renderer.getValidationResult()).not.toBeNull();

    // Invalidate
    renderer.invalidateValidation();

    // Should be invalidated
    expect(renderer.isXmlValidated()).toBe(false);
    expect(renderer.getValidationResult()).toBeNull();
  });

  it('should invalidate validation and re-parse when updateXml() is called', async () => {
    const renderer = new QtiRenderer(validQtiXml);

    // Validate
    await renderer.validateXml();
    expect(renderer.isXmlValidated()).toBe(true);

    // Update XML
    const newXml = validQtiXml.replace('TEST_001', 'TEST_UPDATED');
    renderer.updateXml(newXml);

    // Should be invalidated
    expect(renderer.isXmlValidated()).toBe(false);
    expect(renderer.getValidationResult()).toBeNull();

    // Should have updated XML (check via getResponses or similar)
    const container = document.createElement('div');
    await renderer.render(container);
    expect(container.children.length).toBeGreaterThan(0);
  }, 30000);

  it('should still render even if validation fails', async () => {
    const container = document.createElement('div');
    const renderer = new QtiRenderer(invalidQtiXml, {
      validateXml: true,
    });

    // Render should complete even if validation fails
    await renderer.render(container);

    // Container should have content
    expect(container.children.length).toBeGreaterThan(0);
    // But validation should have failed
    const validationResult = renderer.getValidationResult();
    expect(validationResult).not.toBeNull();
    expect(validationResult?.valid).toBe(false);
  }, 30000);

  it('should provide validation result via getValidationResult', async () => {
    const renderer = new QtiRenderer(validQtiXml);

    // Initially null (not validated)
    let result = renderer.getValidationResult();
    expect(result).toBeNull();

    // Validate
    await renderer.validateXml();

    // Now should have result
    result = renderer.getValidationResult();
    expect(result).not.toBeNull();
    // Schema may have warnings, but XML structure should be valid
    // Filter out schema loading errors (ErrnoError) which are environmental
    const criticalErrors = result?.errors.filter(
      (e) =>
        !e.message.toLowerCase().includes('does not resolve') &&
        !e.message.toLowerCase().includes('schemas parser error') &&
        !e.message.includes('ErrnoError') &&
        !e.message.toLowerCase().includes('failed to load')
    ) || [];
    expect(criticalErrors).toHaveLength(0);
  }, 30000);
});
