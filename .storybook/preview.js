import '@ae-studio/qti-renderer/dist/qti-base.css';
import '@ae-studio/qti-renderer/dist/qti-custom.css';

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
