import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@qti-renderer/core': path.resolve(__dirname, '../../packages/qti-renderer/src'),
    },
  },
});
