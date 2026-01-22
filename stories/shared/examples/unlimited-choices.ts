/**
 * Example QTI 3.x XML: Choice interaction with max-choices=0
 * Demonstrates vertical orientation and five options.
 */
export const unlimitedChoicesQuestion = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd"
  identifier="SC_MAX_ZERO"
  title="Choice Interaction (Max Choices 0)"
  adaptive="false"
  time-dependent="false">
  <qti-response-declaration identifier="RESPONSE" cardinality="multiple" base-type="identifier" />
  <qti-item-body>
    <qti-choice-interaction
      response-identifier="RESPONSE"
      max-choices="0"
      orientation="vertical">
      <qti-prompt><div>Which of the following are <span class="qti-underline">greenhouse gases</span>?<span class="qti-visually-hidden">Hidden text</span></div></qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">Carbon dioxide (CO2)</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">Methane (CH4)</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_C">Nitrous oxide (N2O)</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_D">Oxygen (O2)</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_E">Water vapor (H2O)</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;
