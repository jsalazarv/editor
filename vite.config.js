import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config.cjs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const path = process.env.PROJECT_PATH;

  return {
    css: {
      postcss,
    },
    plugins: [react()],
    base: path || '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@modules': '/src/modules',
        '@layouts': '/src/layouts',
        '@assets': '/src/assets',
        '@common': '/src/common',
        '@utils': '/src/common/utils',
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
