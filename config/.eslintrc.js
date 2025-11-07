module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // For config files
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // ==================== Code Quality ====================
    // Variables and declarations
    'no-var': 'error', // Forbid `var`, use `let`/`const`
    'prefer-const': 'error', // Force `const` if never reassigned
    'no-unused-vars': [
      'error',
      {
        // Unused variables are errors
        argsIgnorePattern: '^_', // Unless prefixed with `_`
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-undef': 'error', // Undeclared variable is an error
    'no-use-before-define': [
      'error',
      {
        // No use before declaration
        functions: false, // Except functions (hoisting OK)
        classes: true,
        variables: true,
      },
    ],

    // Comparisons and conditions
    eqeqeq: ['error', 'always'], // Force `===` instead of `==`
    'no-constant-condition': 'error', // No `if (true)`
    'no-empty': 'error', // No empty blocks
  },
};
