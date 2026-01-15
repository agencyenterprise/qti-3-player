# QTI 3.x Renderer - Proof of Concept

A framework-agnostic QTI 3.x renderer with a React demo application.

## Structure

```
qti-3-player/
├── packages/
│   └── qti-renderer/     # Core renderer library (TypeScript, framework-agnostic)
└── apps/
    └── react-demo/        # React sample application
```

## Core Library (`packages/qti-renderer`)

Framework-agnostic npm package that renders QTI 3.x assessment items to HTML.

### Supported QTI Elements

- `<assessmentItem>` - Root element
- `<itemBody>` - Question content container
- `<choiceInteraction>` - Multiple choice interaction
- `<prompt>` - Question text
- `<simpleChoice>` - Individual choice options

### API

```typescript
import { QtiRenderer } from '@qti-renderer/core';

const renderer = new QtiRenderer(qtiXmlString);
renderer.mount(containerElement);
const responses = renderer.getResponses(); // Record<string, string | string[]>
```

### Design Decisions

- Uses `DOMParser` for XML parsing (no external dependencies)
- Renders to vanilla DOM elements (framework-agnostic)
- Maintains response state internally
- Uses semantic HTML (`fieldset`, `legend`, `label`) for accessibility
- Registry pattern for extensible element rendering

## React Demo (`apps/react-demo`)

Sample React application demonstrating QTI renderer usage.

### Usage

```tsx
import { QtiItem } from './QtiItem';

<QtiItem xml={qtiXmlString} onResponseChange={(responses) => console.log(responses)} />
```

### Running

```bash
npm install
npm run dev
```

## Limitations

This is a proof of concept with the following limitations:

- **No response processing** - Only renders questions, doesn't grade them
- **No scoring** - No calculation or evaluation of responses
- **No adaptive behavior** - Static rendering only
- **No feedback** - No correct/incorrect feedback display
- **No test structure** - Only single items, no tests/sections

## QTI 3.x Support

Targets QTI 3.x specification structure and syntax. Uses `responseIdentifier` and supports `maxChoices` attribute for single/multiple selection.
