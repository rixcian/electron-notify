import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss';
// import image from '@rollup/plugin-image';
// import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './',
      rootDir: './src',
    }),
    copy({
      targets: [
        { src: 'src/container.html', dest: 'dist' }
      ]
    }),
    // postcss(),
    // image(),
    // terser(),
  ],
  external: ['electron'],
};