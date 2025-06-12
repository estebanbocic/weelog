import typescript from '@rollup/plugin-typescript';

export default [
  // ES Module build
  {
    input: 'src/weelog.ts',
    output: {
      file: 'dist/weelog.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [typescript({
      importHelpers: false,
      noEmitHelpers: true
    })],
    external: []
  },
  // CommonJS build
  {
    input: 'src/weelog.ts',
    output: {
      file: 'dist/weelog.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [typescript({
      importHelpers: false,
      noEmitHelpers: true
    })],
    external: []
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
    plugins: [typescript({
      importHelpers: false,
      noEmitHelpers: true
    })],
    external: []
  }
];