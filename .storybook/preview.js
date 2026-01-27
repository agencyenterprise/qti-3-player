import '@ae-studio/qti-renderer/dist/qti-base.css';
import '@ae-studio/qti-renderer/dist/qti-custom.css';

// Load MathJax
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js';
script.async = true;
document.head.appendChild(script);

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
