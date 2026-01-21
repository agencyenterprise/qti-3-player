import { defineConfig } from 'vite';
import prefixSelector from 'postcss-prefix-selector';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        prefixSelector({
          prefix: '#qti-container',
          transform(prefix, selector, prefixedSelector, filePath, rule) {
            // Only prefix styles coming from the qti-renderer packages
            if (filePath && filePath.includes('qti-renderer')) {
              return prefixedSelector;
            }
            return selector;
          },
        }),
      ],
    },
  },
  base: './', // For GitHub Pages compatibility
});
