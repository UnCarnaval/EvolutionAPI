import { defineConfig } from 'tsup';
import type { Plugin } from 'esbuild';
import path from 'path';
import fs from 'fs';

const pathResolverPlugin: Plugin = {
  name: 'path-resolver',
  setup(build) {
    build.onResolve({ filter: /^@api/ }, (args) => {
      const newPath = args.path.replace('@api', path.join(__dirname, 'src', 'api'));
      return { path: newPath + '.ts' };
    });
    build.onResolve({ filter: /^@config/ }, (args) => {
      const newPath = args.path.replace('@config', path.join(__dirname, 'src', 'config'));
      return { path: newPath + '.ts' };
    });
    build.onResolve({ filter: /^@utils/ }, (args) => {
      const newPath = args.path.replace('@utils', path.join(__dirname, 'src', 'utils'));
      return { path: newPath + '.ts' };
    });
    build.onResolve({ filter: /^@cache/ }, (args) => {
      const newPath = args.path.replace('@cache', path.join(__dirname, 'src', 'cache'));
      return { path: newPath + '.ts' };
    });
    build.onResolve({ filter: /^@libs/ }, (args) => {
      const newPath = args.path.replace('@libs', path.join(__dirname, 'src', 'libs'));
      return { path: newPath + '.ts' };
    });
    build.onResolve({ filter: /^@validate/ }, (args) => {
      const newPath = args.path.replace('@validate', path.join(__dirname, 'src', 'validate'));
      return { path: newPath + '.ts' };
    });
    build.onResolve({ filter: /^@exceptions/ }, (args) => {
      const newPath = path.join(__dirname, 'src', 'exceptions');
      // Check if it's a file or directory
      if (fs.existsSync(newPath + '.ts')) {
        return { path: newPath + '.ts' };
      } else if (fs.existsSync(path.join(newPath, 'index.ts'))) {
        return { path: path.join(newPath, 'index.ts') };
      }
      return { path: newPath };
    });
  },
};

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs'],
  clean: true,
  minify: false,
  splitting: false,
  sourcemap: false,
  bundle: true,
  noExternal: [/.*/],
  tsconfig: './tsconfig.json',
  esbuildPlugins: [pathResolverPlugin],
});