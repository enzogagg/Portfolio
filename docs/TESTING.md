# 🧪 Testing Strategy & Documentation

Comprehensive testing strategy for the Portfolio project, covering unit tests, E2E tests, code quality, and CI/CD integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Test Pyramid](#test-pyramid)
- [Unit Testing](#unit-testing)
- [E2E Testing](#e2e-testing)
- [Code Quality](#code-quality)
- [Running Tests](#running-tests)
- [Coverage Metrics](#coverage-metrics)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)

## 🎯 Overview

### Testing Philosophy

- **Quality First**: All code changes must pass tests before merging
- **Comprehensive Coverage**: Target 80%+ code coverage
- **Fast Feedback**: Unit tests run in < 10s, E2E in < 2min
- **Accessibility**: Every feature tested for WCAG compliance
- **Performance**: All pages must load in < 3s

### Test Statistics

| Metric                        | Value                              | Status          |
| ----------------------------- | ---------------------------------- | --------------- |
| **Backend Unit Tests**        | 21 (Go unit tests)                 | ✅ passing      |
| **Backend Integration Tests** | 3 (Go integration tests)           | ✅ passing      |
| **Frontend Unit Tests**       | 129 (Jest)                         | ✅ passing      |
| **E2E Tests**                 | ~130                               | ✅ Created      |
| **Code Coverage (overall)**   | 85.9% (combined, backend+frontend) | ✅ Above target |
| **Lint Errors**               | 0                                  | ✅ Clean        |
| **Lint Warnings**             | 0                                  | ✅ Clean        |

## 🔺 Test Pyramid

```
                    ▲
                   ╱ ╲
                  ╱ E2E╲           ~130 tests (slow, comprehensive)
                 ╱───────╲          - User workflows
                ╱         ╲         - Cross-browser
               ╱Integration╲        - Visual regression
              ╱─────────────╲       - Performance
             ╱               ╲
            ╱  Unit Tests     ╲    129 tests (fast, isolated)
           ╱___________________╲    - Business logic
          ╱                     ╲   - DOM manipulation
         ╱   Static Analysis    ╲  - Module initialization
        ╱_________________________╲
       (Linting, Type Checking, etc.)
```

### Rationale

1. **Static Analysis** (ESLint, Stylelint)
   - Catches syntax errors, style issues
   - Runs in milliseconds
   - 100% code coverage by definition

2. **Unit Tests** (Jest)
   - Tests individual modules in isolation
   - Fast execution (< 10s)
   - High coverage (83.51%)
   - Easy to debug

3. **E2E Tests** (Playwright)
   - Tests complete user workflows
   - Slower execution (1-2 min)
   - Real browser environment
   - Catches integration issues

## 🧩 Unit Testing

### Framework: Jest 29.x

**Purpose**: Test JavaScript modules in isolation with mocked dependencies.

### Configuration

- **File**: `/config/jest.config.js`
- **Test Directory**: `/frontend/tests/unit_test/`
- **Test Pattern**: `*.test.js`
- **Environment**: jsdom (browser-like)
- **Transform**: Babel (ES6+ → ES5)

### Test Files

| File                    | Tests | Coverage | Focus                     |
| ----------------------- | ----- | -------- | ------------------------- |
| `accessibility.test.js` | 16    | 91.78%   | Keyboard nav, ARIA, focus |
| `animations.test.js`    | 18    | 87.67%   | Scroll animations, header |
| `performance.test.js`   | 16    | 63.33%   | Optimizations, monitoring |
| `config.test.js`        | 29    | 96.55%   | Module configuration      |
| `projects.test.js`      | 15    | 83.33%   | Project filtering         |
| `navigation.test.js`    | 14    | 93.87%   | Mobile menu, navigation   |
| `utils.test.js`         | 21    | 100%     | Utility functions         |
| `burger.test.js`        | 2     | 63.63%   | Burger menu standalone    |

### Running Unit Tests

```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Specific file
npm test -- accessibility.test.js

# Watch mode
npm test -- --watch

# Verbose output
npm test -- --verbose
```

### Coverage Thresholds (Enforced)

```javascript
{
  branches: 70%,
  functions: 75%,
  lines: 80%,
  statements: 80%
}
```

### Example Test Structure

```javascript
import { moduleFunction } from "../modules/module.js";

describe("Module Name", () => {
  beforeEach(() => {
    // Setup before each test
    document.body.innerHTML = '<div id="test"></div>';
  });

  afterEach(() => {
    // Cleanup after each test
    document.body.innerHTML = "";
  });

  test("should do something", () => {
    // Arrange
    const element = document.getElementById("test");

    // Act
    moduleFunction(element);

    // Assert
    expect(element.classList.contains("active")).toBe(true);
  });
});
```

## 🎭 E2E Testing

### Framework: Playwright 1.x

**Purpose**: Test complete user workflows in real browsers.

### Configuration

- **File**: `/config/playwright.config.js`
- **Test Directory**: `/frontend/tests/playwright/`
- **Test Pattern**: `*.spec.js`
- **Browsers**: Chromium, WebKit, Mobile Chrome
- **Base URL**: http://localhost:8000

### Test Suites

| Suite                | Tests | Coverage                         |
| -------------------- | ----- | -------------------------------- |
| `home.spec.js`       | ~20   | Homepage, SEO, performance       |
| `projects.spec.js`   | ~25   | Filtering, cards, responsive     |
| `navigation.spec.js` | ~20   | Menus, keyboard, mobile          |
| `contact.spec.js`    | ~20   | Form, validation, accessibility  |
| `about.spec.js`      | ~15   | Content, responsive              |
| `regression.spec.js` | ~30   | Visual regression, cross-browser |

### Running E2E Tests

```bash
# All tests
npm run test:e2e

# Specific suite
npx playwright test home.spec.js

# Specific browser
npx playwright test --project=chromium

# Headed mode (visible)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# UI mode (interactive)
npx playwright test --ui

# Update snapshots
npx playwright test regression.spec.js --update-snapshots

# Generate report
npx playwright show-report
```

### Test Types

#### 1. Functional Tests

- User interactions (clicks, forms)
- Navigation flows
- Feature functionality

#### 2. Accessibility Tests

- Keyboard navigation
- ARIA attributes
- Screen reader compatibility
- Color contrast

#### 3. Performance Tests

- Page load time < 3s
- No blocking resources
- Memory leak detection

#### 4. Visual Regression Tests

- Screenshot comparison
- Desktop + Mobile viewports
- Cross-browser consistency

#### 5. Cross-Browser Tests

- Chromium (Chrome, Edge)
- WebKit (Safari)
- Mobile Chrome

### Example E2E Test

```javascript
import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/frontend/index.html");
    await page.waitForLoadState("networkidle");
  });

  test("should load successfully", async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Portfolio/);

    // Verify header is visible
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Verify no console errors
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    expect(errors).toHaveLength(0);
  });
});
```

## 🔍 Code Quality

### ESLint (JavaScript)

**Configuration**: `/frontend/.eslintrc.js`

**Rules**: 35 strict rules enforced

```bash
# Lint JS files
npm run lint:js

# Auto-fix issues
npm run lint:js:fix
```

### Stylelint (CSS)

**Configuration**: `/frontend/.stylelintrc.json`

**Rules**: 15 strict rules enforced

```bash
# Lint CSS files
npm run lint:css

# Auto-fix issues
npm run lint:css:fix
```

### Prettier (Formatting)

**Configuration**: `/frontend/.prettierrc.json`

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Quality Metrics

- ✅ **0 errors** (enforced in CI/CD)
- ✅ **0 warnings** (enforced in CI/CD)
- ✅ **100% compliance** with all rules

## 🚀 Running Tests

### Quick Commands

```bash
# Everything
npm run lint && npm test && npm run test:e2e

# Just unit tests
npm test

# Just E2E tests
npm run test:e2e

# Just linting
npm run lint
```

### Pre-Commit Workflow

```bash
# 1. Lint code
npm run lint

# 2. Run unit tests
npm test

# 3. Check coverage
npm run test:coverage
```

### Pre-Push Workflow

```bash
# 1. Lint
npm run lint

# 2. Unit tests with coverage
npm run test:coverage

# 3. E2E tests
npm run test:e2e
```

## 📊 Coverage Metrics

### Current Coverage

| Module           | Lines      | Statements | Branches   | Functions  |
| ---------------- | ---------- | ---------- | ---------- | ---------- |
| **Overall**      | **83.51%** | **82.66%** | **73.95%** | **76.36%** |
| accessibility.js | 91.78%     | 91.55%     | 81.25%     | 92.85%     |
| animations.js    | 87.67%     | 87.50%     | 72.72%     | 87.50%     |
| performance.js   | 63.33%     | 63.15%     | 45.83%     | 60.00%     |
| config.js        | 96.55%     | 96.29%     | 91.30%     | 100%       |
| projects.js      | 83.33%     | 82.35%     | 50.00%     | 75.00%     |
| navigation.js    | 93.87%     | 94.11%     | 71.42%     | 100%       |
| utils.js         | 100%       | 100%       | 100%       | 100%       |
| burger.js        | 63.63%     | 63.63%     | 50.00%     | 66.66%     |

### Coverage Goals

- ✅ **Lines**: 80%+ (current: 83.51%)
- ✅ **Statements**: 80%+ (current: 82.66%)
- ⚠️ **Branches**: 70%+ (current: 73.95%)
- ✅ **Functions**: 75%+ (current: 76.36%)

### Viewing Coverage Reports

```bash
# Generate HTML report
npm run test:coverage

# Open report in browser
open coverage/lcov-report/index.html
```

## 🔄 CI/CD Integration

### GitHub Actions Workflow

```yaml
name: CI/CD Tests

on:
  push:
    branches: [test/frontend, main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Unit Tests
        run: npm run test:coverage

      - name: E2E Tests
        run: npm run test:e2e

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
```

### Quality Gates

All must pass before merging:

- ✅ ESLint: 0 errors, 0 warnings
- ✅ Stylelint: 0 errors, 0 warnings
- ✅ Jest: 100% tests passing
- ✅ Coverage: 80%+ lines
- ✅ Playwright: All E2E tests passing

## ✅ Best Practices

### Unit Tests

**Do:**

- ✅ Test one thing per test
- ✅ Use descriptive test names
- ✅ Mock external dependencies
- ✅ Test edge cases and errors
- ✅ Clean up after tests

**Don't:**

- ❌ Test implementation details
- ❌ Write interdependent tests
- ❌ Use fixed timeouts
- ❌ Ignore test failures

### E2E Tests

**Do:**

- ✅ Use semantic selectors (`getByRole`)
- ✅ Wait for network idle
- ✅ Test real user scenarios
- ✅ Verify accessibility
- ✅ Check for console errors

**Don't:**

- ❌ Use brittle CSS selectors
- ❌ Hard-code delays
- ❌ Test only happy paths
- ❌ Ignore visual regressions

### General

**Do:**

- ✅ Write tests before fixing bugs
- ✅ Keep tests readable and maintainable
- ✅ Run tests locally before pushing
- ✅ Review coverage reports
- ✅ Document complex test scenarios

**Don't:**

- ❌ Skip tests to save time
- ❌ Commit broken tests
- ❌ Lower coverage thresholds
- ❌ Ignore flaky tests

## 🐛 Debugging

### Unit Test Debugging

```bash
# Node debugger
node --inspect-brk node_modules/.bin/jest

# Verbose output
npm test -- --verbose

# Single test
npm test -- -t "test name"
```

### E2E Test Debugging

```bash
# UI mode
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Trace viewer
npx playwright show-trace trace.zip

# Headed mode
npx playwright test --headed
```

## 📚 Documentation

### Testing Documentation

- [Frontend Tests README](./frontend/tests/README.md) - Testing overview
- [E2E Tests README](./frontend/tests/playwright/README.md) - Playwright guide
- [Jest Config](../config/jest.config.js) - Unit test configuration
- [Playwright Config](../config/playwright.config.js) - E2E configuration

### Related Documentation

- [LINTING.md](./LINTING.md) - Code quality standards
- [Architecture Guide](./ARCHITECTURE.md) - Project structure _(planned)_
- [Contributing Guide](./CONTRIBUTING.md) - Contribution guidelines _(planned)_

## 🎯 Future Improvements

### Short Term

- [ ] Increase branch coverage to 80%+
- [ ] Add visual regression baselines
- [ ] Integrate axe-core for accessibility
- [ ] Add performance budgets

### Long Term

- [ ] Add mutation testing
- [ ] Implement contract testing
- [ ] Add security scanning
- [ ] Mobile device testing (iOS Safari)
- [ ] Load testing with k6

---

**Author**: Enzo Gaggiotti  
**Last Updated**: November 2025  
**Version**: 1.0.0
