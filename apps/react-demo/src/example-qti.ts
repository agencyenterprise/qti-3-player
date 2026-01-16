/**
 * Example QTI 3.x XML for a multiple choice question with response processing
 *
 * This demonstrates the QTI elements supported:
 * - qti-assessment-item: Root element (QTI 3.x prefixed format)
 * - qti-response-declaration: Defines correct answers
 * - qti-item-body: Container for question content
 * - qti-choice-interaction: Multiple choice interaction
 * - qti-prompt: Question text
 * - qti-simple-choice: Individual choice options
 *
 * QTI 3.x uses qti- prefixed element names and response-identifier attribute.
 */
export const exampleQtiXml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
  identifier="SC_001"
  title="Simple Single Choice"
  adaptive="false"
  time-dependent="false"
  max-attempts="3">
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <qti-correct-response>
      <qti-value>CHOICE_B</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>Which planet is known as the Red Planet?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">Earth</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">Mars</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_C">Jupiter</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_D">Venus</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
  <qti-modal-feedback outcome-identifier="FEEDBACK" show-hide="show" identifier="CORRECT">
    <qti-feedback-block>
      <p><strong>Correct!</strong></p>
      <p>Mars is indeed known as the Red Planet due to iron oxide (rust) on its surface giving it a reddish appearance.</p>
    </qti-feedback-block>
  </qti-modal-feedback>
  <qti-modal-feedback outcome-identifier="FEEDBACK" show-hide="show" identifier="INCORRECT">
    <qti-feedback-block>
      <p><strong>Incorrect.</strong></p>
      <p>Please try again.</p>
    </qti-feedback-block>
  </qti-modal-feedback>
</qti-assessment-item>`;
