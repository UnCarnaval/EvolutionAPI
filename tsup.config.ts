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
      const filter = new RegExp(`^${alias.replace('/', '\\/')}(/|$)`);
      
      build.onResolve({ filter }, (args) => {
        // Only handle our aliases, not node_modules packages that start with @
        if (args.importer && args.importer.includes('node_modules')) {
          return null; // Let esbuild handle it
        }
        
        const modulePath = args.path.replace(alias, aliasPath);
        
        // Try different extensions and index files
        const possiblePaths = [
          modulePath + '.ts',
          modulePath + '.js',
          path.join(modulePath, 'index.router.ts'),
          path.join(modulePath, 'index.ts'),
          path.join(modulePath, 'index.js'),
        ];
        
        for (const possiblePath of possiblePaths) {
          try {
            if (fs.existsSync(possiblePath) && fs.statSync(possiblePath).isFile()) {
              return { path: possiblePath };
            }
          } catch (e) {
            // Continue to next path
          }
        }
        
        // If nothing found, return null and let esbuild handle it
        return null;
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
  // Don't bundle node_modules, keep them external
  // This regex matches any import that doesn't start with . or / or our aliases
  external: [
    /^(?!@(api|config|utils|cache|libs|validate|exceptions))[^.\/]/,
  ],
  tsconfig: './tsconfig.json',
  esbuildPlugins: [pathResolverPlugin],
});