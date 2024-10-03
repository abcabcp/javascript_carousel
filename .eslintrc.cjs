module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended", 
    "prettier" 
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 'off', 
  },
}
