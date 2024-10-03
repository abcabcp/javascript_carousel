module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: 'module', // Allows for the use of imports
  },
 "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier" 
  ],
  rules: {
    // Custom rules here
    '@typescript-eslint/no-var-requires': 'off', // Disable the no-var-requires rule
  },
};
