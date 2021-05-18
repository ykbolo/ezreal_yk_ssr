module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/essential'],
  plugins: [],

  rules: {
    indent: 0,
    camelcase: 0,
    'arrow-parens': 'off',
    'space-before-function-paren': 0,
    'no-console': 'warn',
    'no-debugger': 'warn',
    'new-cap': 0,
    'no-return-await': 0,
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1
      }
    ],
    'no-unused-vars': 'warn'
  }
}
