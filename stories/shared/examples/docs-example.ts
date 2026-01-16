/**
 * Example QTI 3.x XML: Documentation example
 * This example demonstrates the basic structure and common elements of QTI 3.x
 */
export const docsExample = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
  identifier="DOCS_001"
  title="Documentation Example"
  adaptive="false"
  time-dependent="false">
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <qti-correct-response>
      <qti-value>CHOICE_A</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>This is a documentation example showing the basic QTI 3.x structure.</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">Option A</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">Option B</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_C">Option C</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_D">Option D</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;
