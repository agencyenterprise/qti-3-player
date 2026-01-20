# QTI Renderer Packages

This monorepo contains the QTI 3.x renderer and framework-specific wrappers.

## Packages

### `@qti-renderer/core`
Framework-agnostic QTI 3.x renderer library. This is the core rendering engine that all wrappers use.

**Usage:**
```typescript
import { QtiRenderer } from '@qti-renderer/core';

const renderer = new QtiRenderer(xml, options);
renderer.mount(containerElement);
```

### `@qti-renderer/react`
React wrapper component for QTI renderer.

**Installation:**
```bash
npm install @qti-renderer/react @qti-renderer/core
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
npm install @qti-renderer/vue @qti-renderer/core
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
npm install @qti-renderer/vanilla @qti-renderer/core
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
