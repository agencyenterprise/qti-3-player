# QTI Renderer Packages

This monorepo contains the QTI 3.x renderer and framework-specific wrappers.

## Packages

### `@ae-studio/qti-renderer`
Framework-agnostic QTI 3.x renderer library. This is the core rendering engine that all wrappers use.

**Usage:**
```typescript
import { QtiRenderer } from '@ae-studio/qti-renderer';

const renderer = new QtiRenderer(xml, options);
await renderer.render(containerElement);
```

### `@qti-renderer/react`
React wrapper component for QTI renderer.

**Installation:**
```bash
npm install @qti-renderer/react @ae-studio/qti-renderer
```

**Usage:**
```tsx
import { QtiItem } from '@qti-renderer/react';

<QtiItem 
  xml={qtiXml}
/>
```

### `@qti-renderer/vue`
Vue wrapper component for QTI renderer.

**Installation:**
```bash
npm install @qti-renderer/vue @ae-studio/qti-renderer
```

**Usage in Vue:**
```vue
<template>
  <QtiItem 
    :xml="qtiXml"
  />
</template>

<script setup>
import QtiItem from '@qti-renderer/vue';
</script>
```

**Usage in React (via wrapper):**
```tsx
import { VueQtiItemWrapper } from '@qti-renderer/vue';

<VueQtiItemWrapper xml={qtiXml} />
```

### `@qti-renderer/vanilla`
Vanilla JS wrapper (React-based for Storybook compatibility).

**Installation:**
```bash
npm install @qti-renderer/vanilla @ae-studio/qti-renderer
```

**Usage:**
```tsx
import { VanillaQtiItem } from '@qti-renderer/vanilla';

<VanillaQtiItem xml={qtiXml} />
```

## Development

### Building all packages
```bash
npm run build
```

### Building individual packages
```bash
cd packages/qti-react && npm run build
cd packages/qti-vue && npm run build
cd packages/qti-vanilla && npm run build
cd packages/qti-renderer && npm run build
```

### Development mode (watch)
```bash
cd packages/qti-react && npm run dev
```

## Workspace Structure

```
packages/
├── qti-renderer/     # Core renderer library
├── qti-react/       # React wrapper
├── qti-vue/          # Vue wrapper
└── qti-vanilla/      # Vanilla JS wrapper
```

## Publishing

All packages use the `@qti-renderer` scope and can be published to npm individually or as a monorepo.
