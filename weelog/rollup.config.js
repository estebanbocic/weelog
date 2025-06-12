import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  // ES Module build
  {
    input: 'src/weelog.ts',
    output: {
      file: 'dist/weelog.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [typescript()]
  },
  // CommonJS build
  {
    input: 'src/weelog.ts',
    output: {
      file: 'dist/weelog.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [typescript()]
  },
  // UMD build for browsers
  {
    input: 'src/weelog.ts',
    output: {
      file: 'dist/weelog.umd.js',
      format: 'umd',
      name: 'WeeLog',
      sourcemap: true
    },
    plugins: [typescript(), terser()]
  }
];