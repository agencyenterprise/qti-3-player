import './style.css';
import { VanillaQtiItem } from '@qti-renderer/vanilla';
// Import base styles from the renderer core
import '@ae-studio/qti-renderer/dist/qti-base.css';
import '@ae-studio/qti-renderer/dist/qti-custom.css';
// Import custom renderer CSS as inline string
import customRendererCss from './custom-renderer.css?inline';
import { validateXml } from '@ae-studio/qti-renderer';

const xmlInput = document.getElementById('xml-input') as HTMLTextAreaElement;
const renderBtn = document.getElementById('render-btn') as HTMLButtonElement;
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
const submissionCountEl = document.getElementById('submission-count') as HTMLSpanElement;
const validateBtn = document.getElementById('validate-btn') as HTMLButtonElement;
const validationResult = document.getElementById('validation-result') as HTMLDivElement;
const qtiContainer = document.getElementById('qti-container') as HTMLDivElement;
const customCssToggle = document.getElementById('custom-css-toggle') as HTMLInputElement;

// Handle Custom CSS Toggle
const styleId = 'custom-renderer-style';
const toggleCustomCss = (enabled: boolean) => {
  const existingStyle = document.getElementById(styleId);

  if (enabled) {
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = customRendererCss;
      document.head.appendChild(style);
    }
  } else {
    if (existingStyle) {
      existingStyle.remove();
    }
  }
};

customCssToggle.addEventListener('change', (e) => {
  toggleCustomCss((e.target as HTMLInputElement).checked);
});

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

  if (submissionCountEl) {
    submissionCountEl.textContent = `Submissions: 0`;
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
submitBtn.addEventListener('click', () => {
  if (currentItem) {
    currentItem.submit();
    if (submissionCountEl) {
      submissionCountEl.textContent = `Submissions: ${currentItem.getSubmissionCount()}`;
    }
  }
});
validateBtn.addEventListener('click', validateQti);

renderQti();

// Resizer Logic
const resizer = document.getElementById('dragMe') as HTMLDivElement;
const leftSide = resizer.previousElementSibling as HTMLElement;
const rightSide = resizer.nextElementSibling as HTMLElement;
const container = resizer.parentElement as HTMLElement;

let x = 0;
let leftWidth = 0;

const mouseDownHandler = (e: MouseEvent) => {
  // Get the current mouse position
  x = e.clientX;
  leftWidth = leftSide.getBoundingClientRect().width;

  // Attach the listeners to `document`
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);

  // Add resizing class for visual feedback
  resizer.classList.add('resizing');
  document.body.style.cursor = 'col-resize';
  leftSide.style.userSelect = 'none';
  leftSide.style.pointerEvents = 'none';
  rightSide.style.userSelect = 'none';
  rightSide.style.pointerEvents = 'none';
};

const mouseMoveHandler = (e: MouseEvent) => {
  // How far the mouse has been moved
  const dx = e.clientX - x;

  const newLeftWidth = ((leftWidth + dx) * 100) / container.getBoundingClientRect().width;

  // Limit the width to avoid breaking layout (e.g. 10% to 90%)
  if (newLeftWidth > 10 && newLeftWidth < 90) {
    leftSide.style.width = `${newLeftWidth}%`;
  }
};

const mouseUpHandler = () => {
  resizer.classList.remove('resizing');
  document.body.style.removeProperty('cursor');
  leftSide.style.removeProperty('user-select');
  leftSide.style.removeProperty('pointer-events');
  rightSide.style.removeProperty('user-select');
  rightSide.style.removeProperty('pointer-events');

  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};

resizer.addEventListener('mousedown', mouseDownHandler);
