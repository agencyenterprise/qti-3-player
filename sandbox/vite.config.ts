import { defineConfig } from 'vite';
import prefixSelector from 'postcss-prefix-selector';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  server: {
    fs: {
      allow: ['..'],
    },
    middlewareMode: false,
  },
  plugins: [
    // Plugin to serve schema files from @qti-renderer/core without copying
    {
      name: 'serve-qti-schemas',
      configureServer(server) {
        // Get the project root (one level up from sandbox)
        const projectRoot = join(__dirname, '..');
        
        // Register middleware to serve schema files
        server.middlewares.use((req, res, next) => {
          if (!req.url) {
            next();
            return;
          }
          
          // Serve schema files from @qti-renderer/core/dist
          if (req.url.startsWith('/node_modules/@qti-renderer/core/dist/')) {
            try {
              const relativePath = req.url.replace('/node_modules/@qti-renderer/core', '');
              const filePath = join(projectRoot, 'node_modules/@qti-renderer/core', relativePath);
              const content = readFileSync(filePath, 'utf-8');
              if (!content || content.length === 0) {
                console.error(`Empty file: ${filePath}`);
                next();
                return;
              }
              res.setHeader('Content-Type', req.url.endsWith('.xsd') ? 'application/xml' : 'text/plain');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(content);
              return;
            } catch (error) {
              console.error(`Failed to serve ${req.url}:`, error);
              // File not found, continue to next middleware
            }
          }
          // Also serve from /dist/ path (for compatibility)
          if (req.url.startsWith('/dist/')) {
            try {
              const relativePath = req.url.replace('/dist/', '');
              const filePath = join(projectRoot, 'packages/qti-renderer/dist', relativePath);
              const content = readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', req.url.endsWith('.xsd') ? 'application/xml' : 'text/plain');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(content);
              return;
            } catch (error) {
              console.error(`Failed to serve ${req.url}:`, error);
            }
          }
          // Serve schemas from /schemas/ path
          if (req.url.startsWith('/schemas/')) {
            try {
              const relativePath = req.url.replace('/schemas/', '');
              const filePath = join(projectRoot, 'packages/qti-renderer/dist/schemas', relativePath);
              const content = readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', 'application/xml');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(content);
              return;
            } catch (error) {
              console.error(`Failed to serve ${req.url}:`, error);
            }
          }
          next();
        });
      },
    },
  ],
  // Configure worker handling for xmllint-wasm
  worker: {
    format: 'es',
    plugins: () => [],
  },
  // Optimize dependencies for xmllint-wasm - exclude it from pre-bundling
  optimizeDeps: {
    exclude: ['xmllint-wasm'],
    esbuildOptions: {
      // Ensure WASM files are treated as external
      loader: {
        '.wasm': 'file',
      },
    },
  },
  // Ensure WASM files are handled correctly
  assetsInclude: ['**/*.wasm'],
  // Build configuration for workers
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Ensure WASM files are copied to output
    assetsInlineLimit: 0, // Don't inline WASM files
  },
  // Resolve configuration to help with xmllint-wasm
  resolve: {
    preserveSymlinks: false,
    dedupe: [],
  },
  // Ensure xmllint-wasm worker files are accessible
  publicDir: false, // We don't need a public dir, but this ensures proper handling
});
