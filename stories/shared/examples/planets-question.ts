/**
 * Example QTI 3.x XML: Multiple choice question about planets
 * This example includes feedback for correct and incorrect answers.
 */
export const planetsQuestion = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
  identifier="SC_001"
  title="Planets Question"
  adaptive="false"
  time-dependent="false">
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
    <qti-content-body>
      <p><strong>Correct!</strong></p>
      <p>Mars is indeed known as the Red Planet due to iron oxide (rust) on its surface giving it a reddish appearance.</p>
    </qti-content-body>
  </qti-modal-feedback>
  <qti-modal-feedback outcome-identifier="FEEDBACK" show-hide="show" identifier="INCORRECT">
    <qti-content-body>
      <p><strong>Incorrect.</strong></p>
      <p>Please try again.</p>
    </qti-content-body>
  </qti-modal-feedback>
</qti-assessment-item>`;
