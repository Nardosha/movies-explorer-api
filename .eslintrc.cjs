module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-useless-escape': 0,
    'max-len': ['error', { code: 130 }],
    'import/prefer-default-export': 0,
    'consistent-return': 1,
    'func-names': 0,
    'import/named': 'warn',
    'import/extensions': 0,
    quotes: [1, 'single', { avoidEscape: true }],
    'object-curly-newline': 0,
  },
};
