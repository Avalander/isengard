module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
      ecmaVersion: 2018
  },
  rules: {
    'comma-dangle': [ 'warn', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
    }],
    'semi': [ 'error', 'never' ],
  }
}
