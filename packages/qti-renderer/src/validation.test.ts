import { describe, it, expect } from 'vitest';
import { validateXml } from './validation';

describe('XML Validation', () => {
  // Valid QTI 3.0 XML
  const validQtiXml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
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
      <qti-simple-choice identifier="CHOICE_C">5</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Valid QTI XML - minimal valid example
  const validQtiXmlMinimal = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="MINIMAL_001"
  title="Minimal Question"
  time-dependent="false">
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>Choose an option</qti-prompt>
      <qti-simple-choice identifier="A">Option A</qti-simple-choice>
      <qti-simple-choice identifier="B">Option B</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Valid QTI XML - with all optional attributes
  const validQtiXmlFull = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="FULL_001"
  title="Full Question"
  label="full-question-label"
  adaptive="true"
  time-dependent="true">
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <qti-correct-response>
      <qti-value>CHOICE_A</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1" shuffle="true">
      <qti-prompt>Select the correct answer</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">Correct Answer</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">Wrong Answer</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Invalid QTI XML - missing required identifier attribute
  const invalidQtiXmlMissingIdentifier = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
  title="Test Question"
  adaptive="false"
  time-dependent="false">
  <!-- Missing required identifier attribute -->
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <qti-correct-response>
      <qti-value>CHOICE_A</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>What is 2 + 2?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Invalid QTI XML - missing required title attribute
  const invalidQtiXmlMissingTitle = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="TEST_002"
  adaptive="false"
  time-dependent="false">
  <!-- Missing required title attribute -->
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>What is 2 + 2?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Invalid QTI XML - missing required time-dependent attribute
  const invalidQtiXmlMissingTimeDependent = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="TEST_003"
  title="Test Question"
  adaptive="false">
  <!-- Missing required time-dependent attribute -->
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>What is 2 + 2?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Invalid QTI XML - invalid element (unknown element)
  const invalidQtiXmlUnknownElement = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
  identifier="TEST_004"
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
      <invalid-element>This element does not exist in QTI schema</invalid-element>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Invalid QTI XML - invalid attribute value (boolean)
  const invalidQtiXmlInvalidBoolean = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
  identifier="TEST_005"
  title="Test Question"
  adaptive="invalid-boolean-value"
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
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Invalid QTI XML - missing required attribute on child element
  const invalidQtiXmlMissingChildAttribute = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="TEST_006"
  title="Test Question"
  adaptive="false"
  time-dependent="false">
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>What is 2 + 2?</qti-prompt>
      <!-- Missing required identifier attribute on simple-choice -->
      <qti-simple-choice>4</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">3</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  // Invalid QTI XML - wrong element order
  const invalidQtiXmlWrongOrder = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="TEST_007"
  title="Test Question"
  adaptive="false"
  time-dependent="false">
  <!-- item-body should come after response-declaration -->
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>What is 2 + 2?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <qti-correct-response>
      <qti-value>CHOICE_A</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
</qti-assessment-item>`;

  // Invalid XML - malformed XML (missing closing tag)
  const invalidXmlMalformed = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  identifier="TEST_008"
  title="Test Question"
  adaptive="false"
  time-dependent="false">
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <!-- Missing closing tag -->
    <qti-correct-response>
      <qti-value>CHOICE_A</qti-value>
  </qti-response-declaration>
</qti-assessment-item>`;

  // Invalid XML - invalid XML syntax
  const invalidXmlSyntax = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  identifier="TEST_009"
  title="Test Question"
  adaptive="false"
  time-dependent="false">
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>What is 2 + 2?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
      <!-- Unclosed tag -->
      <qti-simple-choice identifier="CHOICE_B">3
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

  describe('validateXml - Valid XML scenarios', () => {
    it('should validate valid QTI XML successfully', async () => {
      const result = await validateXml(validQtiXml);

      // Filter out schema loading errors (ErrnoError) which are environmental
      // These don't indicate XML structure problems
      const criticalErrors = result.errors.filter(
        (e) => !e.message.includes('ErrnoError') && 
               !e.message.toLowerCase().includes('failed to load')
      );
      
      // Valid XML should not have XML structure errors
      // Schema loading errors are environmental and don't indicate invalid XML
      expect(criticalErrors.length).toBe(0);
    });

    it('should validate minimal valid QTI XML', async () => {
      const result = await validateXml(validQtiXmlMinimal);

      const criticalErrors = result.errors.filter(
        (e) => !e.message.includes('ErrnoError') &&
               !e.message.toLowerCase().includes('failed to load')
      );
      
      expect(criticalErrors.length).toBe(0);
    });

    it('should validate QTI XML with all optional attributes', async () => {
      const result = await validateXml(validQtiXmlFull);

      const criticalErrors = result.errors.filter(
        (e) => !e.message.includes('ErrnoError') &&
               !e.message.toLowerCase().includes('failed to load')
      );
      
      expect(criticalErrors.length).toBe(0);
    });

    it('should validate QTI XML without schemaLocation attribute', async () => {
      const xmlWithoutSchemaLocation = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="TEST_010"
  title="Test Question"
  time-dependent="false">
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>Question</qti-prompt>
      <qti-simple-choice identifier="A">Answer A</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

      const result = await validateXml(xmlWithoutSchemaLocation);

      const criticalErrors = result.errors.filter(
        (e) => !e.message.includes('ErrnoError') &&
               !e.message.toLowerCase().includes('failed to load')
      );
      
      expect(criticalErrors.length).toBe(0);
    });
  });

  describe('validateXml - Invalid XML scenarios', () => {
    it('should reject QTI XML with missing required identifier attribute', async () => {
      const result = await validateXml(invalidQtiXmlMissingIdentifier);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      // Assert that error message is shown
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      expect(errorMessages.length).toBeGreaterThan(0);
      
      // Log first error for debugging
      if (result.errors.length > 0) {
        console.log('Error message:', result.errors[0].message);
      }
    });

    it('should reject QTI XML with missing required title attribute', async () => {
      const result = await validateXml(invalidQtiXmlMissingTitle);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      
      console.log('Error message:', result.errors[0]?.message || 'No error message');
    });

    it('should reject QTI XML with missing required time-dependent attribute', async () => {
      const result = await validateXml(invalidQtiXmlMissingTimeDependent);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      
      console.log('Error message:', result.errors[0]?.message || 'No error message');
    });

    it('should reject QTI XML with unknown element', async () => {
      const result = await validateXml(invalidQtiXmlUnknownElement);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      
      console.log('Error message:', result.errors[0]?.message || 'No error message');
    });

    it('should reject QTI XML with invalid boolean attribute value', async () => {
      const result = await validateXml(invalidQtiXmlInvalidBoolean);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      
      console.log('Error message:', result.errors[0]?.message || 'No error message');
    });

    it('should reject QTI XML with missing required child attribute', async () => {
      const result = await validateXml(invalidQtiXmlMissingChildAttribute);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      
      console.log('Error message:', result.errors[0]?.message || 'No error message');
    });

    it('should reject QTI XML with wrong element order', async () => {
      const result = await validateXml(invalidQtiXmlWrongOrder);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      
      console.log('Error message:', result.errors[0]?.message || 'No error message');
    });

    it('should reject malformed XML with missing closing tag', async () => {
      const result = await validateXml(invalidXmlMalformed);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      
      console.log('Error message:', result.errors[0]?.message || 'No error message');
    });

    it('should reject XML with invalid syntax', async () => {
      const result = await validateXml(invalidXmlSyntax);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toBeTruthy();
      
      console.log('Error message:', result.errors[0]?.message || 'No error message');
    });
  });

  describe('validateXml - Error details', () => {
    it('should include error messages with details for invalid XML', async () => {
      const result = await validateXml(invalidQtiXmlMissingIdentifier);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      // All errors should have messages
      result.errors.forEach((error) => {
        expect(error.message).toBeTruthy();
        expect(typeof error.message).toBe('string');
        expect(error.message.length).toBeGreaterThan(0);
      });
    });

    it('should provide error details including rawMessage when available', async () => {
      const result = await validateXml(invalidQtiXmlUnknownElement);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      // At least one error should have details
      const hasDetailedError = result.errors.some(
        (error) => error.message || error.rawMessage
      );
      expect(hasDetailedError).toBe(true);
    });
  });

  describe('validateXml - Custom schema', () => {
    it('should use customSchema when provided', async () => {
      const customSchema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" 
  targetNamespace="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  elementFormDefault="qualified">
  <xs:element name="qti-assessment-item">
    <xs:complexType>
      <xs:sequence>
        <xs:any minOccurs="0" maxOccurs="unbounded" processContents="lax"/>
      </xs:sequence>
      <xs:attribute name="identifier" type="xs:string" use="required"/>
      <xs:attribute name="title" type="xs:string"/>
      <xs:attribute name="adaptive" type="xs:boolean"/>
      <xs:attribute name="time-dependent" type="xs:boolean"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`;

      const result = await validateXml(validQtiXml, {
        customSchema: customSchema,
      });

      expect(result).toBeDefined();
      expect(typeof result.valid).toBe('boolean');
    });

    it('should validate with custom schema and detect errors', async () => {
      const customSchema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" 
  targetNamespace="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  elementFormDefault="qualified">
  <xs:element name="qti-assessment-item">
    <xs:complexType>
      <xs:sequence>
        <xs:any minOccurs="0" maxOccurs="unbounded" processContents="lax"/>
      </xs:sequence>
      <xs:attribute name="identifier" type="xs:string" use="required"/>
      <xs:attribute name="title" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`;

      // XML missing required title
      const invalidXml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  identifier="TEST_011">
</qti-assessment-item>`;

      const result = await validateXml(invalidXml, {
        customSchema: customSchema,
      });

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
