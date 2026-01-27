/**
 * Example QTI 3.x XML: Math question with MathML
 */
export const mathQuestion = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  identifier="MATH_001"
  title="Math Question with MathML"
  adaptive="false"
  time-dependent="false">
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <qti-correct-response>
      <qti-value>CHOICE_B</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>
        <p>Solve for <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi></math>:</p>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mrow>
            <msup><mi>x</mi><mn>2</mn></msup>
            <mo>-</mo>
            <mn>4</mn>
            <mo>=</mo>
            <mn>0</mn>
          </mrow>
        </math>
      </qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">
        <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>=</mo><mn>2</mn></math>
      </qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">
        <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>=</mo><mo>±</mo><mn>2</mn></math>
      </qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_C">
        <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>=</mo><mn>4</mn></math>
      </qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_D">
        <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>=</mo><mo>±</mo><mn>4</mn></math>
      </qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;
