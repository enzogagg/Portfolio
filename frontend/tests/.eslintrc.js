module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // For config files
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // ==================== Code Quality ====================
    // Variables and declarations
    "no-var": "error", // Forbid `var`, use `let`/`const`
    "prefer-const": "error", // Force `const` if never reassigned
    "no-unused-vars": [
      "error",
      {
        // Unused variables are errors
        argsIgnorePattern: "^_", // Unless prefixed with `_`
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-undef": "error", // Undeclared variable is an error
    "no-use-before-define": [
      "error",
      {
        // No use before declaration
        functions: false, // Except functions (hoisting OK)
        classes: true,
        variables: true,
      },
    ],

    // Comparisons and conditions
    eqeqeq: ["error", "always"], // Force `===` instead of `==`
    "no-constant-condition": "error", // No `if (true)`
    "no-empty": "error", // No empty blocks
    curly: ["error", "all"], // Curly braces required everywhere

    // Functions
    "no-eval": "error", // `eval()` forbidden
    "no-implied-eval": "error", // No implicit eval
    "no-new-func": "error", // No `new Function()`
    "no-param-reassign": [
      "error",
      {
        // No parameter mutation
        props: false, // Except object properties
      },
    ],
    "no-return-assign": "error", // No assignment in return
    "no-loop-func": "error", // No function in loop

    // Objects and prototypes
    "no-prototype-builtins": "error", // Force Object.hasOwn()
    "no-extend-native": "error", // No native prototype modification

    // Arrays
    "array-callback-return": "error", // `.map()`, `.filter()` must return
    "no-array-constructor": "error", // Force `[]` instead of `new Array()`

    // ==================== Best Practices ====================
    "no-alert": "warn", // `alert()` discouraged
    "no-console": [
      "warn",
      {
        // `console.*` as warning
        allow: ["warn", "error", "info", "group", "groupEnd", "table"],
      },
    ],
    "no-debugger": "error", // `debugger` forbidden in production
    "no-unreachable": "error", // Dead code after return
    "no-duplicate-imports": "error", // No duplicate imports

    // ==================== Code Style ====================
    semi: ["error", "always"], // Semicolons required
    quotes: [
      "error",
      "single",
      {
        // Single quotes
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    "comma-dangle": ["error", "always-multiline"], // Trailing comma on multi-line
    indent: ["error", 2], // 2 spaces indentation
    "max-len": [
      "warn",
      {
        // Max 120 characters
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "no-trailing-spaces": "error", // No trailing spaces
    "no-multiple-empty-lines": [
      "error",
      {
        // Max 2 consecutive empty lines
        max: 2,
        maxEOF: 1,
      },
    ],
    "space-before-blocks": "error", // Space before `{`
    "keyword-spacing": "error", // Spaces around keywords
    "arrow-spacing": "error", // Spaces around `=>`
    "object-curly-spacing": ["error", "always"], // Spaces in `{ obj }`
    "array-bracket-spacing": ["error", "never"], // No spaces in `[arr]`

    // ==================== Modern JavaScript ====================
    "prefer-arrow-callback": "error", // Prefer arrow functions
    "prefer-template": "error", // Prefer template strings
    "prefer-spread": "error", // Prefer `...arr` over `.apply()`
    "prefer-rest-params": "error", // Prefer `...args` over `arguments`
    "no-useless-concat": "error", // No useless concatenation
    "template-curly-spacing": "error", // No spaces in `${var}`
  },
};
