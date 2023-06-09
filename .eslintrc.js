module.exports = {
  root: true,
  extends: [
    'plugin:react/recommended',
    'standard',
    'eslint:recommended',
    'prettier',
  ],
  settings: {
    react: {version: 'detect'},
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'prettier/prettier': 0,
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'no-throw-literal': 'off',
    'react-native/no-inline-styles': 0,
  },
};
