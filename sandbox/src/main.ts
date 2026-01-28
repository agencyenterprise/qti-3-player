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
const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
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
<qti-assessment-test xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                     xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
                     identifier="test-solar-system" title="Solar System Quiz">
    <qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float">
        <qti-default-value>
            <qti-value>0.0</qti-value>
        </qti-default-value>
    </qti-outcome-declaration>
    <qti-outcome-declaration identifier="MAXSCORE" cardinality="single" base-type="float">
        <qti-default-value>
            <qti-value>30.0</qti-value>
        </qti-default-value>
    </qti-outcome-declaration>
    <qti-time-limits max-time="3600.0"/>
    <qti-test-part identifier="part-1" navigation-mode="nonlinear" submission-mode="simultaneous">
        <qti-assessment-section identifier="section-solar-system" fixed="false" title="General Knowledge" visible="true">
            <qti-rubric-block view="candidate" use="instructions">
                <qti-content-body>
                    <h2>The Solar System</h2>
                    <p>The Solar System consists of the Sun and the objects that orbit it. There are eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.</p>
                    <p>Please answer the following questions based on your knowledge of the Solar System.</p>
                </qti-content-body>
            </qti-rubric-block>
            <qti-assessment-item-ref identifier="item-mars-text" href="item-mars-text.xml" fixed="false"/>
            <qti-assessment-item-ref identifier="item-jupiter-tf" href="item-jupiter-tf.xml" fixed="false"/>
            <qti-assessment-item-ref identifier="item-gas-giants-choice" href="item-gas-giants-choice.xml" fixed="false"/>
        </qti-assessment-section>
    </qti-test-part>
    <qti-outcome-processing>
        <qti-set-outcome-value identifier="SCORE">
            <qti-sum>
                <qti-test-variables variable-identifier="SCORE"/>
            </qti-sum>
        </qti-set-outcome-value>
    </qti-outcome-processing>
</qti-assessment-test>`;

const q1Xml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                     xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
                     identifier="item-mars-text" title="Red Planet" adaptive="false" time-dependent="false">
	<qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="string"/>
	<qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float">
		<qti-default-value>
			<qti-value>0.0</qti-value>
		</qti-default-value>
	</qti-outcome-declaration>
  <qti-outcome-declaration identifier="MAXSCORE" cardinality="single" base-type="float">
		<qti-default-value>
			<qti-value>10.0</qti-value>
		</qti-default-value>
	</qti-outcome-declaration>
	<qti-item-body>
		<p>Which planet is known as the "Red Planet"?</p>
		<qti-text-entry-interaction response-identifier="RESPONSE" class="qti-input-width-45"/>
	</qti-item-body>
</qti-assessment-item>`;

const q2Xml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                     xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
                     identifier="item-jupiter-tf" title="Largest Planet" adaptive="false" time-dependent="false">
	<qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier"> 
        <qti-correct-response>
            <qti-value>true</qti-value>
        </qti-correct-response>
    </qti-response-declaration>
  <qti-outcome-declaration identifier="FEEDBACK" cardinality="single" base-type="identifier"/>
	<qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float">
		<qti-default-value>
			<qti-value>0.0</qti-value>
		</qti-default-value>
	</qti-outcome-declaration>
  <qti-outcome-declaration identifier="MAXSCORE" cardinality="single" base-type="float">
		<qti-default-value>
			<qti-value>10.0</qti-value>
		</qti-default-value>
	</qti-outcome-declaration>
	<qti-item-body>
		<p>Jupiter is the largest planet in the Solar System.</p>
		<qti-choice-interaction response-identifier="RESPONSE" shuffle="false" max-choices="1">
            <qti-simple-choice identifier="true" fixed="true">True</qti-simple-choice>
            <qti-simple-choice identifier="false" fixed="true">False</qti-simple-choice>
        </qti-choice-interaction>
	</qti-item-body>
  <qti-response-processing>
        <qti-response-condition>
            <qti-response-if>
                <qti-match>
                    <qti-variable identifier="RESPONSE"/>
                    <qti-correct identifier="RESPONSE"/>
                </qti-match>
                <qti-set-outcome-value identifier="SCORE">
                    <qti-variable identifier="MAXSCORE"/>
                </qti-set-outcome-value>
                <qti-set-outcome-value identifier="FEEDBACK">
                    <qti-base-value base-type="identifier">correct</qti-base-value>
                </qti-set-outcome-value>
            </qti-response-if>
            <qti-response-else>
                <qti-set-outcome-value identifier="FEEDBACK">
                    <qti-base-value base-type="identifier">incorrect</qti-base-value>
                </qti-set-outcome-value>
            </qti-response-else>
        </qti-response-condition>
    </qti-response-processing>
    <qti-modal-feedback outcome-identifier="FEEDBACK" show-hide="show" identifier="correct"><qti-content-body>Correct!</qti-content-body></qti-modal-feedback>
    <qti-modal-feedback outcome-identifier="FEEDBACK" show-hide="show" identifier="incorrect"><qti-content-body>Incorrect!</qti-content-body></qti-modal-feedback>
</qti-assessment-item>`;

const q3Xml = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                     xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd" 
                     identifier="item-gas-giants-choice" title="Gas Giants" adaptive="false" time-dependent="false">
	<qti-response-declaration identifier="RESPONSE" cardinality="multiple" base-type="string"/>
	<qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float">
		<qti-default-value>
			<qti-value>0.0</qti-value>
		</qti-default-value>
	</qti-outcome-declaration>
  <qti-outcome-declaration identifier="MAXSCORE" cardinality="single" base-type="float">
		<qti-default-value>
			<qti-value>10.0</qti-value>
		</qti-default-value>
	</qti-outcome-declaration>
	<qti-item-body>
		<p>Which of the following are Gas Giants?</p>
		<qti-choice-interaction response-identifier="RESPONSE" max-choices="0" orientation="vertical">
            <qti-simple-choice identifier="JUPITER">Jupiter</qti-simple-choice>
            <qti-simple-choice identifier="MARS">Mars</qti-simple-choice>
            <qti-simple-choice identifier="SATURN">Saturn</qti-simple-choice>
            <qti-simple-choice identifier="EARTH">Earth</qti-simple-choice>
        </qti-choice-interaction>
	</qti-item-body>
</qti-assessment-item>`;

const REF_TAGS = ['qti-assessment-item-ref'];

const xmlSourceSelector = document.getElementById('xml-source-selector') as HTMLSelectElement;
const editorTitle = document.getElementById('editor-title') as HTMLHeadingElement;

let currentItem: VanillaQtiItem | null = null;

// State
const xmlContentMap = new Map<string, string>();
let currentSelection = 'main';

// Initialize main
xmlContentMap.set('main', defaultXml);
xmlInput.value = defaultXml;
xmlContentMap.set('item-mars-text.xml', q1Xml);
xmlContentMap.set('item-jupiter-tf.xml', q2Xml);
xmlContentMap.set('item-gas-giants-choice.xml', q3Xml);

const updateSelectorOptions = (refs: Set<string>) => {
  const previousSelection = currentSelection;

  xmlSourceSelector.innerHTML = '';

  const mainOption = document.createElement('option');
  mainOption.value = 'main';
  mainOption.textContent = 'Main';
  xmlSourceSelector.appendChild(mainOption);

  refs.forEach((ref) => {
    const option = document.createElement('option');
    option.value = ref;
    option.textContent = ref;
    xmlSourceSelector.appendChild(option);
  });

  if (refs.has(previousSelection) || previousSelection === 'main') {
    xmlSourceSelector.value = previousSelection;
  } else {
    xmlSourceSelector.value = 'main';
    currentSelection = 'main';
    xmlInput.value = xmlContentMap.get('main') || '';
    editorTitle.textContent = 'Main';
  }
};

const scanForRefs = (xml: string): Set<string> => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');

    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      return new Set();
    }

    const refs = Array.from(doc.getElementsByTagName('*')).filter((el) =>
      REF_TAGS.includes(el.localName)
    );

    const hrefs = new Set<string>();
    refs.forEach((ref) => {
      const href = ref.getAttribute('href');
      if (href) hrefs.add(href);
    });
    return hrefs;
  } catch (e) {
    return new Set();
  }
};

const handleXmlChange = () => {
  const newValue = xmlInput.value;
  xmlContentMap.set(currentSelection, newValue);

  if (currentSelection === 'main') {
    const refs = scanForRefs(newValue);

    refs.forEach((ref) => {
      if (!xmlContentMap.has(ref)) {
        xmlContentMap.set(ref, '');
      }
    });

    updateSelectorOptions(refs);
  }
};

xmlInput.addEventListener('input', handleXmlChange);

xmlSourceSelector.addEventListener('change', (e) => {
  const target = e.target as HTMLSelectElement;
  currentSelection = target.value;

  xmlInput.value = xmlContentMap.get(currentSelection) || '';
  editorTitle.textContent = currentSelection === 'main' ? 'Main' : currentSelection;
});

const updateNavigationButtons = () => {
  if (currentItem) {
    const renderer = currentItem.getRenderer();
    prevBtn.disabled = !renderer.hasPreviousItem();
    nextBtn.disabled = !renderer.hasNextItem();
  } else {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }
};

const renderQti = () => {
  const mainXml = xmlContentMap.get('main') || '';

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

    const referencedXmls = new Map<string, string>();
    xmlContentMap.forEach((value, key) => {
      if (key !== 'main') {
        referencedXmls.set(key, value);
      }
    });

    currentItem = new VanillaQtiItem(
      itemElement,
      {
        xml: mainXml,
        options: {
          debug: true,
          validateXml: true,
        },
        context: {
          referencedXmls,
        },
      },
      {
        onRender: () => {
          updateNavigationButtons();
        },
      }
    );

    console.log('QTI Item rendered successfully');
  } catch (error) {
    console.error('Error rendering QTI:', error);
    qtiContainer.innerHTML = `<div class="error">Error rendering QTI: ${error}</div>`;
  }
};

const initialRefs = scanForRefs(defaultXml);
updateSelectorOptions(initialRefs);

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

prevBtn.addEventListener('click', () => {
  if (currentItem) {
    const renderer = currentItem.getRenderer();
    renderer.previousItem();
    updateNavigationButtons();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentItem) {
    const renderer = currentItem.getRenderer();
    renderer.nextItem();
    updateNavigationButtons();
  }
});

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
