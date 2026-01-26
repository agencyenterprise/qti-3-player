# @ae-studio/qti-renderer

Framework-agnostic QTI 3.x renderer and validator library for rendering and validating QTI (Question and Test Interoperability) assessment items in web applications. Features **WASM-powered client-side XML schema validation** - validate QTI XML directly in the browser without backend dependencies.

## Installation

```bash
npm install @ae-studio/qti-renderer
```

## Quick Start

### Minimal Working Example

Here's a complete minimal example based on a real-world implementation:

**1. HTML Setup (`index.html`):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QTI Renderer Example</title>
</head>
<body>
  <div id="qti-container"></div>
  <script type="module" src="./main.js"></script>
</body>
</html>
```

**2. TypeScript/JavaScript (`main.ts` or `main.js`):**

```typescript
import { QtiRenderer } from '@ae-studio/qti-renderer';
// Import required CSS styles - these are essential for proper styling
import '@ae-studio/qti-renderer/assets/qti-base.css';
import '@ae-studio/qti-renderer/assets/qti-custom.css';

const qtiXml = `<?xml version="1.0" encoding="UTF-8"?>
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
      <qti-prompt>Which of the following are greenhouse gases?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">Carbon dioxide (CO2)</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">Methane (CH4)</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_C">Nitrous oxide (N2O)</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_D">Oxygen (O2)</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_E">Water vapor (H2O)</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`;

const container = document.getElementById('qti-container')!;

// Create renderer instance with options
const renderer = new QtiRenderer(qtiXml, {
  showFeedback: true,
  validateXml: true,
  debug: false
});

// Render to container (async - returns Promise)
renderer.render(container).catch((error) => {
  console.error('Error rendering QTI:', error);
  container.innerHTML = `<div style="color: red; padding: 1rem;">
    Error rendering QTI: ${error instanceof Error ? error.message : 'Unknown error'}
  </div>`;
});
```

**3. Build Configuration (if using a bundler like Vite):**

For Vite projects, ensure your `vite.config.ts` handles CSS imports:

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  // Your config...
});
```

**Important Configuration Notes:**

- **CSS Imports**: The CSS files (`qti-base.css` and `qti-custom.css`) **must** be imported for proper styling. Without them, the rendered QTI items will not display correctly.
- **Module Type**: This package uses ES modules. Ensure your project is configured to handle ES modules (use `type: "module"` in package.json or a bundler that supports ES modules).
- **Async Rendering**: The `render()` method is asynchronous and returns a Promise. Always handle potential errors.

## 🚀 Frontend XML Schema Validation (Powered by WASM)

**One of the standout features of this library is client-side XML schema validation** - something that's typically only possible on the backend!

### What Makes This Special?

Traditional QTI validation requires:
- ❌ Backend infrastructure
- ❌ Server-side XML processing
- ❌ Network round-trips for validation
- ❌ Complex deployment pipelines

**This library brings validation to the frontend** using WebAssembly (WASM), enabling:

- ✅ **Instant validation** - No server round-trips needed
- ✅ **Offline-capable** - Works without backend connectivity
- ✅ **Zero backend dependencies** - Pure client-side validation
- ✅ **Full schema compliance** - Validates against the official QTI 3.0 XSD schema

### How It Works

The library uses [`xmllint-wasm`](https://github.com/kripken/xml.js), a WebAssembly port of the industry-standard `xmllint` XML validator. This allows us to run native XML schema validation directly in the browser:

```typescript
import { QtiRenderer, validateXml } from '@ae-studio/qti-renderer';

// Validate QTI XML before rendering
const qtiXml = `<?xml version="1.0"?>
<qti-assessment-item xmlns="...">
  <!-- Your QTI content -->
</qti-assessment-item>`;

// Standalone validation
const result = await validateXml(qtiXml);
if (!result.valid) {
  console.error('Validation errors:', result.errors);
  // Errors include line numbers, column numbers, and detailed messages
}

// Or let the renderer validate automatically (default)
const renderer = new QtiRenderer(qtiXml, {
  validateXml: true  // Enabled by default!
});

// Validation happens automatically during render()
await renderer.render(container);
```

### Validation Features

- **Bundled QTI 3.0 Schema**: The official QTI 3.0 XSD schema is bundled with the package, so validation works offline
- **Detailed Error Reporting**: Get precise error locations (line/column numbers) and descriptive messages
- **Custom Schema Support**: Use your own XSD schema if needed
- **Performance**: WASM provides near-native performance for XML validation

### Example: Handling Validation Errors

```typescript
const renderer = new QtiRenderer(qtiXml, {
  validateXml: true
});

try {
  await renderer.render(container);
  console.log('✅ QTI XML is valid and rendered successfully!');
} catch (error) {
  // Validation errors are thrown if XML is invalid
  if (error instanceof Error) {
    console.error('Validation failed:', error.message);
  }
}

// Or validate separately for better error handling
const validationResult = await renderer.validateXml();
if (!validationResult.valid) {
  validationResult.errors.forEach(error => {
    console.error(`Line ${error.line}: ${error.message}`);
  });
}
```

This feature makes it perfect for:
- **QTI Authoring Tools** - Validate content as authors create it
- **Content Management Systems** - Real-time validation feedback
- **Educational Platforms** - Ensure QTI content quality before publishing
- **Development Tools** - Catch errors early in the development process

## Configuration Options

The `QtiRenderer` constructor accepts an optional `QtiRendererOptions` object:

```typescript
interface QtiRendererOptions {
  /**
   * Whether to enable debug logging
   * @default false
   */
  debug?: boolean;

  /**
   * Whether to show feedback immediately after response
   * @default true
   */
  showFeedback?: boolean;

  /**
   * Whether to validate XML against QTI schema
   * @default true
   */
  validateXml?: boolean;

  /**
   * Custom validation options (schema URL, custom schema string, etc.)
   * Only used if validateXml is true
   */
  validationOptions?: ValidationOptions;
}
```

### Example with Custom Options

```typescript
const renderer = new QtiRenderer(qtiXml, {
  showFeedback: true,
  validateXml: true,
  debug: false,
  validationOptions: {
    // Use custom schema string
    customSchema: '<xs:schema>...</xs:schema>',
    // Or preload additional schema files for imports/includes
    preloadSchemas: [
      { fileName: 'custom.xsd', contents: '<xs:schema>...</xs:schema>' }
    ]
  }
});
```

## API Reference

### `QtiRenderer`

The main renderer class for QTI assessment items.

#### Constructor

```typescript
new QtiRenderer(qtiXml: string, options?: QtiRendererOptions)
```

Creates a new QTI renderer instance.

- `qtiXml`: The QTI XML string to render
- `options`: Optional configuration object

#### Methods

##### `render(container: HTMLElement): Promise<void>`

Renders the QTI item into the specified container element.

- `container`: The HTML element to render into
- Returns: Promise that resolves when rendering is complete

**Example:**

```typescript
const container = document.getElementById('qti-container')!;
await renderer.render(container);
```

##### `validateXml(): Promise<ValidationResult>`

Validates the QTI XML against the QTI schema. This is called automatically during `render()` if `validateXml` is enabled.

- Returns: Promise resolving to validation result

**Example:**

```typescript
const result = await renderer.validateXml();
if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

### Types

#### `QtiRendererOptions`

Configuration options for the QTI renderer.

#### `ValidationResult`

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
```

#### `ValidationError`

```typescript
interface ValidationError {
  message: string;
  rawMessage?: string;
  line?: number;
  column?: number;
  fileName?: string;
}
```

#### `ValidationOptions`

```typescript
interface ValidationOptions {
  /**
   * Custom schema string to use instead of default local schema
   */
  customSchema?: string;
  /**
   * Additional schema files to preload (for imports/includes)
   */
  preloadSchemas?: Array<{ fileName: string; contents: string }>;
}
```

## Features

- 🎯 **Frontend XML Schema Validation** - WASM-powered client-side validation against QTI 3.0 schema (no backend needed!)
- ✅ Response processing with conditional logic
- ✅ Outcome variable management
- ✅ Feedback display (inline and modal)
- ✅ Response state management
- ✅ Framework-agnostic (works with React, Vue, vanilla JS, etc.)
- ✅ TypeScript support with full type definitions

## Supported QTI Elements

The renderer supports a subset of QTI 3.x elements:

- `qti-assessment-item`
- `qti-item-body`
- `qti-choice-interaction`
- `qti-simple-choice`
- `qti-prompt`
- `qti-response-declaration`
- `qti-outcome-declaration`
- `qti-response-processing`
- `qti-response-condition`
- `qti-response-if`
- `qti-response-else`
- `qti-set-outcome-value`
- `qti-correct-response`
- `qti-feedback-inline`
- `qti-modal-feedback`
- `qti-match`
- `qti-correct`
- And more...

See the [QTI Support Documentation](https://github.com/agencyenterprise/qti-3-player/tree/main/docs/qti_support) for a complete checklist.


## Framework Wrappers

This is the core renderer library. Framework-specific wrappers are available:

- **React**: `@qti-renderer/react` (coming soon)
- **Vue**: `@qti-renderer/vue` (coming soon)
- **Vanilla JS**: `@qti-renderer/vanilla` (coming soon)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/agencyenterprise/qti-3-player) for contribution guidelines.

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/agencyenterprise/qti-3-player)
- [Live Sandbox Demo](https://agencyenterprise.github.io/qti-3-player/)
- [QTI Specification](https://www.imsglobal.org/question/)
