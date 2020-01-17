module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    // 'vue/no-side-effects-in-computed-properties': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
