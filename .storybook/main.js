import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/** @type { import('storybook').MainConfig } */
const config = {
  stories: [
    '../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  // Use React as the primary framework
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      esbuild: {
        jsx: 'automatic',
      },
      server: {
        fs: {
          allow: ['..'],
        },
      },
      // Configure worker handling for xmllint-wasm
      worker: {
        format: 'es',
        plugins: () => [],
      },
      // Build configuration for workers
      build: {
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
      // Optimize dependencies for xmllint-wasm
      optimizeDeps: {
        exclude: ['xmllint-wasm'],
        include: [],
      },
      // Ensure WASM files are handled correctly
      assetsInclude: ['**/*.wasm'],
      // Resolve configuration to help with xmllint-wasm worker loading
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
        },
      },
    });
  },
  // Serve built qti-renderer artifacts as static assets (e.g. CSS demo paths).
  // Schemas are embedded in code now, so we no longer serve `/schemas`.
  staticDirs: [
    {
      from: '../packages/qti-renderer/dist',
      to: '/dist',
    },
  ],
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
