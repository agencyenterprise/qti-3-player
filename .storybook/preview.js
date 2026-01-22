import '@qti-renderer/core/dist/qti-base.css';
import '@qti-renderer/core/dist/qti-custom.css';

/** @type { import('storybook').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
