# Multi-Framework Storybook Setup

This Storybook instance supports components from multiple frameworks:
- **React** components (`.stories.tsx`)
- **Vue.js** components (`.stories.ts` with Vue decorators)
- **Vanilla JavaScript/HTML** components (`.stories.ts` with custom renderers)

## How It Works

Storybook is configured to use React as the primary framework (`@storybook/react-vite`), but we can render Vue and vanilla JS components using decorators:

1. **React Components**: Use standard React stories with `@storybook/react`
2. **Vue Components**: Use decorators to mount Vue apps within React-based Storybook
3. **Vanilla JS**: Use decorators to render plain HTML/DOM components

## Running Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

## Building Storybook

```bash
npm run build-storybook
```

## Adding New Stories

### React Story Example
Create a file like `ComponentName.stories.tsx`:
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'React/YourComponent',
  component: YourComponent,
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { /* props */ },
};
```

### Vue Story Example
Create a file like `VueComponent.stories.ts`:
```ts
import type { Meta, StoryObj } from '@storybook/react';
import { createApp, h } from 'vue';
import { YourVueComponent } from './YourVueComponent.vue';

const meta = {
  title: 'Vue/YourComponent',
  decorators: [
    (Story: any, context: any) => {
      const container = document.createElement('div');
      const app = createApp({
        render: () => h(YourVueComponent, context.args),
      });
      app.mount(container);
      return container;
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
```

### Vanilla JS Story Example
Create a file like `VanillaComponent.stories.ts`:
```ts
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Vanilla JS/YourComponent',
  decorators: [
    (Story: any, context: any) => {
      const container = document.createElement('div');
      // Render your vanilla JS component here
      container.innerHTML = '<div>Your HTML content</div>';
      return container;
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
```

## Story Locations

Stories are automatically discovered from:
- `packages/**/*.stories.@(js|jsx|ts|tsx|mdx)`
- `stories/**/*.stories.@(js|jsx|ts|tsx|mdx)`

## Component Structure

Components are organized in `stories/components/`:
- `react/` - React components
- `vue/` - Vue components  
- `vanilla/` - Vanilla JS components (wrapped in React for Storybook)

Shared utilities and example data are in `stories/shared/`.
