module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 0,
    'max-len': 0,
    'jsx-a11y/no-autofocus': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'prefer-const': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-restricted-exports': 'off',
    'react/require-default-props': 'off',
    'react/button-has-type': 'off',
    'react/function-component-definition': 'off',
  },
};
