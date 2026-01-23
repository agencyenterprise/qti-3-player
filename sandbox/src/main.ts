import './style.css';
import { VanillaQtiItem } from '@qti-renderer/vanilla';
// Import base styles from the renderer core
import '@qti-renderer/core/dist/qti-base.css';
import '@qti-renderer/core/dist/qti-custom.css';
import { validateXml } from '@qti-renderer/core';

const xmlInput = document.getElementById('xml-input') as HTMLTextAreaElement;
const renderBtn = document.getElementById('render-btn') as HTMLButtonElement;
const validateBtn = document.getElementById('validate-btn') as HTMLButtonElement;
const validationResult = document.getElementById('validation-result') as HTMLDivElement;
const qtiContainer = document.getElementById('qti-container') as HTMLDivElement;

// Default XML example
const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
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

xmlInput.value = defaultXml;

let currentItem: VanillaQtiItem | null = null;

const renderQti = () => {
  const xml = xmlInput.value;

  if (currentItem) {
    currentItem.destroy();
    currentItem = null;
  }

  qtiContainer.innerHTML = '';

  try {
    const itemElement = document.createElement('div');
    qtiContainer.appendChild(itemElement);

    currentItem = new VanillaQtiItem(itemElement, xml, {
      debug: true,
      validateXml: true,
    });

    console.log('QTI Item rendered successfully');
  } catch (error) {
    console.error('Error rendering QTI:', error);
    qtiContainer.innerHTML = `<div class="error">Error rendering QTI: ${error}</div>`;
  }
};

const validateQti = async () => {
  const xml = xmlInput.value;

  // Clear previous results
  validationResult.innerHTML = '';
  validationResult.className = '';

  // Set loading state
  validateBtn.disabled = true;
  validateBtn.textContent = 'Validating...';

  try {
    const result = await validateXml(xml);

    if (result.valid) {
      validationResult.className = 'validation-success';
      validationResult.innerHTML =
        '<strong>✓ Valid</strong> - XML is valid according to QTI 3.0 schema.';
    } else {
      validationResult.className = 'validation-error';
      const errorsHtml = result.errors
        .map((err) => {
          const location = err.line ? ` (line ${err.line})` : '';
          return `<div>• ${err.message}${location}</div>`;
        })
        .join('');
      validationResult.innerHTML = `<strong>✗ Invalid</strong> - Found ${result.errors.length} error(s):<br>${errorsHtml}`;
    }
  } catch (error) {
    validationResult.className = 'validation-error';
    validationResult.innerHTML = `<strong>✗ Validation Error</strong> - ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`;
  } finally {
    // Reset button state
    validateBtn.disabled = false;
    validateBtn.textContent = 'Validate XML';
  }
};

renderBtn.addEventListener('click', renderQti);
validateBtn.addEventListener('click', validateQti);

renderQti();
