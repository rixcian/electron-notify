import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/**/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  bundle: false,
});
