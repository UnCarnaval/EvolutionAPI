import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs'],
  clean: true,
  minify: false,
  splitting: false,
  sourcemap: true,
  noExternal: [
    '@prisma/client',
    'express-async-errors',
    'reflect-metadata',
    'class-validator',
  ],
});