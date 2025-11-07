# 🧪 Testing Documentation

This directory contains all test suites and testing configuration for the portfolio frontend.

## 📁 Structure

```
tests/
├── README.md                    # This file - testing overview
├── unit_test/                   # Jest unit tests
│   ├── accessibility.test.js
│   ├── animations.test.js
│   ├── performance.test.js
│   ├── config.test.js
│   ├── projects.test.js
│   ├── navigation.test.js
│   ├── utils.test.js
│   └── burger.test.js
├── playwright/                  # E2E tests
│   ├── README.md               # E2E testing guide
│   ├── home.spec.js
│   ├── projects.spec.js
│   ├── navigation.spec.js
│   ├── contact.spec.js
│   ├── about.spec.js
│   └── regression.spec.js
└── setup/
    └── jsdom-setup.js          # Test environment setup
```

## 🎯 Test Coverage Summary

### Unit Tests (Jest)

- **Total**: 129 tests
- **Pass Rate**: 100%
- **Code Coverage**: 83.51% lines, 82.66% statements, 73.95% branches
- **Framework**: Jest 29.x with jsdom
- **Target**: JavaScript modules (ES6+)

### E2E Tests (Playwright)

- **Total**: ~130 tests
- **Pages**: 4 main pages + navigation + regression
- **Browsers**: Chromium, WebKit, Mobile Chrome
- **Coverage**: Functional, accessibility, performance, visual regression

## 🚀 Running Tests

### Unit Tests

```bash
# Run all unit tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- accessibility.test.js

# Run in watch mode
npm test -- --watch
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific spec
npx playwright test home.spec.js

# Run in headed mode (visible browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Update visual regression snapshots
npx playwright test regression.spec.js --update-snapshots
```

### All Tests

```bash
# Run unit tests + E2E tests
npm test && npm run test:e2e
```

## 📊 Coverage Details

### Unit Test Coverage by Module

| Module           | Lines  | Statements | Branches | Functions |
| ---------------- | ------ | ---------- | -------- | --------- |
| accessibility.js | 91.78% | 91.55%     | 81.25%   | 92.85%    |
| animations.js    | 87.67% | 87.50%     | 72.72%   | 87.50%    |
| performance.js   | 63.33% | 63.15%     | 45.83%   | 60.00%    |
| config.js        | 96.55% | 96.29%     | 91.30%   | 100%      |
| projects.js      | 83.33% | 82.35%     | 50.00%   | 75.00%    |
| navigation.js    | 93.87% | 94.11%     | 71.42%   | 100%      |
| utils.js         | 100%   | 100%       | 100%     | 100%      |
| burger.js        | 63.63% | 63.63%     | 50.00%   | 66.66%    |

### E2E Test Coverage by Page

- **home.spec.js**: ~20 tests (loading, navigation, accessibility, performance)
- **projects.spec.js**: ~25 tests (filtering, cards, responsive)
- **navigation.spec.js**: ~20 tests (desktop/mobile menu, keyboard)
- **contact.spec.js**: ~20 tests (form validation, accessibility)
- **about.spec.js**: ~15 tests (content, responsive, accessibility)
- **regression.spec.js**: ~30 tests (visual regression, cross-browser)

## 🎨 Testing Strategy

### 1. Unit Tests (Jest)

**Purpose**: Test individual JavaScript modules in isolation

**Coverage**:

- Business logic and algorithms
- DOM manipulation
- Event handlers
- Utility functions
- Module initialization

**Best Practices**:

- Mock external dependencies
- Test edge cases and error handling
- Maintain 80%+ coverage
- Use descriptive test names

### 2. E2E Tests (Playwright)

**Purpose**: Test complete user workflows and interactions

**Coverage**:

- Page loading and rendering
- User interactions (clicks, forms, navigation)
- Accessibility compliance (ARIA, keyboard)
- Performance metrics
- Visual regression
- Cross-browser compatibility

**Best Practices**:

- Use semantic selectors
- Test real user scenarios
- Verify accessibility
- Check console for errors
- Screenshot comparison for visual regression

### 3. Linting & Code Quality

**Tools**: ESLint, Stylelint

**Coverage**:

- 35 ESLint rules (100% compliance)
- 15 Stylelint rules (100% compliance)
- Code formatting with Prettier
- No console errors or warnings

**Commands**:

```bash
npm run lint           # Lint all files
npm run lint:js        # Lint JavaScript
npm run lint:css       # Lint CSS
npm run lint:js:fix    # Auto-fix JS issues
npm run lint:css:fix   # Auto-fix CSS issues
```

## 📝 Test File Naming

### Unit Tests

- **Pattern**: `<module-name>.test.js`
- **Location**: `tests/unit_test/`
- **Example**: `accessibility.test.js`, `animations.test.js`

### E2E Tests

- **Pattern**: `<page-or-feature>.spec.js`
- **Location**: `tests/playwright/`
- **Example**: `home.spec.js`, `projects.spec.js`

## 🔍 Debugging Tests

### Unit Tests

```bash
# Run with verbose output
npm test -- --verbose

# Run single test with debugging
node --inspect-brk node_modules/.bin/jest accessibility.test.js
```

### E2E Tests

```bash
# UI mode (interactive)
npx playwright test --ui

# Debug mode (step through)
npx playwright test --debug

# View test traces
npx playwright show-trace trace.zip

# Show HTML report
npx playwright show-report
```

## 📈 Quality Metrics

### Current Status

- ✅ **129/129** unit tests passing (100%)
- ✅ **83.51%** line coverage (target: 80%)
- ✅ **0** lint errors
- ✅ **0** lint warnings
- ✅ **~130** E2E tests created
- ✅ **100%** code quality compliance

### Coverage Thresholds (Enforced)

```javascript
{
  branches: 70,
  functions: 75,
  lines: 80,
  statements: 80
}
```

## 📚 Related Documentation

- [E2E Testing Guide](./playwright/README.md) - Detailed Playwright documentation
- [Linting Standards](../../docs/LINTING.md) - Code quality rules and standards
- [Jest Configuration](../../config/jest.config.js) - Unit test configuration
- [Playwright Configuration](../../config/playwright.config.js) - E2E test configuration

## 🎯 CI/CD Integration

Tests are run automatically in CI/CD pipeline:

- ✅ On every push
- ✅ On every pull request
- ✅ Before deployment
- ✅ Coverage reports generated

### CI/CD Commands

```bash
# Pre-commit hook
npm run lint && npm test

# CI pipeline
npm run lint && npm run test:coverage && npm run test:e2e
```

## 🐛 Common Issues & Solutions

### Unit Tests

**Issue**: `Cannot find module 'X'`

- **Solution**: Check import paths, ensure module exports correctly

**Issue**: `ReferenceError: window is not defined`

- **Solution**: jsdom setup in `setup/jsdom-setup.js` should handle this

**Issue**: Coverage below threshold

- **Solution**: Add tests for uncovered branches/lines

### E2E Tests

**Issue**: Timeout errors

- **Solution**: Increase timeout in `playwright.config.js` or use `test.setTimeout()`

**Issue**: Element not found

- **Solution**: Wait for page load with `waitForLoadState()`, use better selectors

**Issue**: Screenshot mismatch

- **Solution**: Update snapshots with `--update-snapshots` if changes are intentional

## 🔄 Continuous Improvement

### Upcoming Improvements

- [ ] Increase coverage to 90%+
- [ ] Add visual regression baseline screenshots
- [ ] Integrate accessibility testing tools (axe-core)
- [ ] Add performance budgets
- [ ] Mobile device testing (iOS Safari)

---

**Author**: Enzo Gaggiotti  
**Last Updated**: November 2025  
**Test Framework Versions**: Jest 29.x, Playwright 1.x
