# 🎭 End-to-End (E2E) Testing - Portfolio

Comprehensive functional and non-regression test suite for the portfolio, using Playwright.

## 🎯 Test Coverage

- Total tests: ~130 E2E tests
- Pages tested: home, projects, navigation, contact, about, regression
- Browsers: Chromium, WebKit (Safari), Mobile Chrome

## 🚀 Running Tests

```bash
# Run all Playwright tests
npm run test:e2e

# Run specific spec
npx playwright test home.spec.js

# Headed (visible) mode
npx playwright test --headed
```

## 🔍 Best Practices

- Use semantic selectors (`getByRole`, `getByLabel`)
- Wait for load state (`waitForLoadState`)
- Prefer stable selectors over brittle CSS classes

## Reports

- Use `npx playwright show-report` to open HTML reports
