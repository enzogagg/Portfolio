# 🧪 Testing Documentation (Frontend)

This directory contains all test suites and testing configuration for the portfolio frontend.

## 📁 Structure

```
tests/
├── README.md                    # This file - testing overview
├── unit_test/                   # Jest unit tests
├── playwright/                  # E2E tests
└── setup/                       # Test environment setup
```

## 🎯 Test Coverage Summary

- Unit Tests (Jest): ~129 tests, coverage ~83.5%
- E2E Tests (Playwright): ~130 tests (functional + visual regression)

## 🚀 Running Tests

### Unit Tests

```bash
# Run all unit tests
npm test

# Run with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e
```

## 📊 Coverage Details

See `tests/` subdirectories for per-module coverage and test lists.

## 📚 Related Documentation

- [Playwright Guide](./playwright/README.md)
- [Main Testing Documentation](../../TESTING.md)
- [Linting Standards](../../LINTING.md)
