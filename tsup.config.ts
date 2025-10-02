import { defineConfig } from 'tsup';
import type { Plugin } from 'esbuild';
import path from 'path';
import fs from 'fs';

const pathResolverPlugin: Plugin = {
  name: 'path-resolver',
  setup(build) {
    const aliases = {
      '@api': path.join(__dirname, 'src', 'api'),
      '@config': path.join(__dirname, 'src', 'config'),
      '@utils': path.join(__dirname, 'src', 'utils'),
      '@cache': path.join(__dirname, 'src', 'cache'),
      '@libs': path.join(__dirname, 'src', 'libs'),
      '@validate': path.join(__dirname, 'src', 'validate'),
      '@exceptions': path.join(__dirname, 'src', 'exceptions'),
    };

    Object.entries(aliases).forEach(([alias, aliasPath]) => {
      const filter = new RegExp(`^${alias.replace('/', '\\/')}`);
      
      build.onResolve({ filter }, (args) => {
        const modulePath = args.path.replace(alias, aliasPath);
        
        // Try different extensions and index files
        // IMPORTANT: Check index files BEFORE checking if it's a directory
        const possiblePaths = [
          modulePath + '.ts',
          modulePath + '.js',
          path.join(modulePath, 'index.router.ts'), // Check index.router.ts first
          path.join(modulePath, 'index.ts'),
          path.join(modulePath, 'index.js'),
          modulePath,
        ];
        
        for (const possiblePath of possiblePaths) {
          if (fs.existsSync(possiblePath) && fs.statSync(possiblePath).isFile()) {
            return { path: possiblePath };
          }
        }
        
        // If nothing found, return the original path and let esbuild handle it
        return { path: modulePath };
      });
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