/**
 * Example QTI 3.x XML: Simple math question (2 + 2)
 * This is a basic multiple choice question without feedback.
 */
export const mathQuestion = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  identifier="SC_002"
  title="Math Question"
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
      <qti-simple-choice identifier="CHOICE_D">6</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;
