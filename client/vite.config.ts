/// <reference types='vitest' />
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const react = await import('@vitejs/plugin-react');
  
  return {
    root: __dirname,
    cacheDir: '../node_modules/.vite/client',
    server:{
      port: 5173,
      host: 'localhost',
    },
    preview:{
      port: 5173,
      host: 'localhost',
    },
    plugins: [react.default()],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
    },
  };
});
