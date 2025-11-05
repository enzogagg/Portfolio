# 🧪 Testing & Quality Assurance

This directory contains all testing infrastructure and quality assurance configurations for the portfolio project.

## 📁 Current Structure

```
tests/
├── .eslintrc.js        # JavaScript linting configuration (35 enterprise rules)
├── .stylelintrc.json   # CSS linting configuration (15 strict rules)
└── README.md           # This file
```

## 🎯 Linting Configurations

### ESLint (.eslintrc.js)

**Purpose**: Enforce JavaScript/ES6+ coding standards

**Key Features**:

- 35 strict enterprise-grade rules
- Enforces modern ES6+ syntax (const/let, arrow functions, template literals)
- Prevents common bugs (unused variables, type coercion)
- Maintains code consistency (indentation, quotes, semicolons)

**Usage**:

```bash
npm run lint:js          # Check JavaScript files
npm run lint:js:fix      # Auto-fix issues
```

**Documentation**: See [LINTING.md](../docs/LINTING.md) for detailed rule explanations

### Stylelint (.stylelintrc.json)

**Purpose**: Enforce CSS coding standards and best practices

**Key Features**:

- 15 strict rules for CSS quality
- Enforces naming conventions (kebab-case for classes, camelCase for animations)
- Prevents bad practices (ID selectors, named colors, duplicate selectors)
- Maintains code consistency (indentation, quotes, nesting depth)

**Usage**:

```bash
npm run lint:css         # Check CSS files
npm run lint:css:fix     # Auto-fix issues
```

**Documentation**: See [LINTING.md](../docs/LINTING.md) for detailed rule explanations

## 🔮 Future Testing Strategy

This directory will eventually contain:

### Unit Tests

```
tests/unit/
├── animations.test.js
├── navigation.test.js
├── accessibility.test.js
└── performance.test.js
```

**Framework**: Jest or Vitest  
**Coverage Target**: 80%+

### Integration Tests

```
tests/integration/
├── page-navigation.test.js
├── form-submission.test.js
└── theme-switching.test.js
```

### End-to-End Tests

```
tests/e2e/
├── user-flows/
│   ├── contact-form.spec.js
│   ├── project-browsing.spec.js
│   └── responsive-navigation.spec.js
└── visual/
    └── screenshots/
```

**Framework**: Playwright or Cypress

### Test Utilities

```
tests/fixtures/
├── mock-data.json
├── test-helpers.js
└── setup.js
```

## 📊 Current Status

**Linting**: ✅ Configured (265 issues identified, ready for remediation)  
**Unit Tests**: ⏳ Planned  
**Integration Tests**: ⏳ Planned  
**E2E Tests**: ⏳ Planned

## 🚀 Running Quality Checks

```bash
# Run all linting (CSS + JS)
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Check formatting
npm run format:check

# Full validation (format + lint)
npm run validate

# Generate linting report
npm run lint:report
```

## 📝 Contributing

When adding new tests:

1. Follow the naming convention: `[module-name].test.js`
2. Place in appropriate directory (unit/integration/e2e)
3. Update this README with new test descriptions
4. Ensure all tests pass before committing
5. Aim for meaningful test coverage, not just high percentages

## 📚 Resources

- **ESLint Documentation**: https://eslint.org/docs/latest/
- **Stylelint Documentation**: https://stylelint.io/
- **Jest Documentation**: https://jestjs.io/
- **Playwright Documentation**: https://playwright.dev/
- **Cypress Documentation**: https://www.cypress.io/

---

**Last Updated**: January 2025  
**Maintainer**: Enzo Gaggiotti
