import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs'],
  clean: true,
  minify: false,
  splitting: false,
  sourcemap: true,
  bundle: true,
  noExternal: [/.*/],
  esbuildOptions(options) {
    options.alias = {
      '@api': path.resolve(__dirname, 'src/api'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@middlewares': path.resolve(__dirname, 'src/middlewares'),
    };
  },
});