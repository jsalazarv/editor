module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
