// https://www.imsglobal.org/question/qtiv2p1/examples/items/Example02-feedbackInline.xml

export const inlineFeedbackQuestion = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
    xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" identifier="Example02-feedbackInline"
    title="Example 2 - inline feedback" adaptive="false" time-dependent="false">
    <!-- Comment to be ignored --> 
    <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <!-- Comment to be ignored -->
        <qti-correct-response>
        <!-- Comment to be ignored -->
            <qti-value><!-- Comment to be ignored -->true</qti-value>
        </qti-correct-response>
    </qti-response-declaration>
    <qti-outcome-declaration identifier="FEEDBACK" cardinality="single" base-type="identifier"/>
    <qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float"
        normal-maximum="10.0">
        <!-- Comment to be ignored -->
        <qti-default-value>
        <!-- Comment to be ignored -->
            <qti-value><!-- Comment to be ignored -->0</qti-value>
        </qti-default-value>
    </qti-outcome-declaration>
    <qti-outcome-declaration identifier="MAXSCORE" cardinality="single" base-type="float">
        <qti-default-value>
            <qti-value>10.0</qti-value>
        </qti-default-value>
    </qti-outcome-declaration>
    <qti-item-body>
    <!-- Comment to be ignored -->
        <qti-choice-interaction response-identifier="RESPONSE" shuffle="false" max-choices="1">
        <!-- Comment to be ignored -->
            <qti-prompt><!-- Comment to be ignored -->Sigmund Freud and Carl Jung both belong to the psychoanalytic school of
                psychology.</qti-prompt>
            <qti-simple-choice identifier="true" fixed="true"><!-- Comment to be ignored -->True 
                <qti-feedback-inline
                    outcome-identifier="FEEDBACK" identifier="true" show-hide="show"><!-- Comment to be ignored -->That's
                    correct<!-- Comment to be ignored --></qti-feedback-inline></qti-simple-choice>
            <qti-simple-choice identifier="false" fixed="true"><!-- Comment to be ignored -->False <qti-feedback-inline
                    outcome-identifier="FEEDBACK" identifier="false" show-hide="show">That's not
                    correct</qti-feedback-inline></qti-simple-choice>
        </qti-choice-interaction>
    </qti-item-body>
    <qti-response-processing>
    <!-- Comment to be ignored -->
        <qti-set-outcome-value identifier="FEEDBACK">
            <qti-variable identifier="RESPONSE"/>
            <!-- Comment to be ignored -->
        </qti-set-outcome-value>
        <!-- Comment to be ignored -->
        <qti-response-condition>
            <!-- Comment to be ignored -->
            <qti-response-if>
                <!-- Comment to be ignored -->
                <qti-match>
                    <!-- Comment to be ignored -->
                    <qti-variable identifier="RESPONSE"/>
                    <!-- Comment to be ignored -->
                    <qti-correct identifier="RESPONSE"/>
                </qti-match>
                <!-- Comment to be ignored -->
                <qti-set-outcome-value identifier="SCORE">
                    <!-- Comment to be ignored -->
                    <qti-variable identifier="MAXSCORE"/>
                </qti-set-outcome-value>
                <!-- Comment to be ignored -->
            </qti-response-if>
        </qti-response-condition>
        <!-- Comment to be ignored -->
    </qti-response-processing>
    <!-- Comment to be ignored -->
</qti-assessment-item>
`;
