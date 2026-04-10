# CI/CD - GitHub Actions

## 📋 Overview

This folder contains GitHub Actions workflows for continuous integration and deployment of the portfolio.

## 🔄 Available Workflows

### 1. **Tests** (`tests.yml`)

Automatically runs all tests on every push or pull request.

#### Jobs executed:

1. **Unit Tests (Jest)**
   - Runs all unit tests
   - Generates coverage report
   - Uploads reports as artifacts

2. **E2E Tests (Playwright)**
   - Runs E2E tests on all browsers
   - Tests user behavior
   - Uploads reports and screenshots on failure

3. **Linting (ESLint)**
   - Checks JavaScript code quality
   - Applies style rules

4. **Full Validation**
   - Runs after all other jobs
   - Executes complete validation
   - Fails if any test fails

#### Triggers:

- **Push** on branches: `main`, `develop`, `test/*`, `fix/*`, `ci/*`
- **Pull Request** to: `main`, `develop`

#### Generated Artifacts:

- Jest coverage report (30 days)
- Playwright report (30 days)
- Test results (30 days)

## 🚀 Local Usage

To reproduce CI tests locally:

```bash
# Unit tests
npm run test:unit

# E2E tests (CI mode)
npm run test:e2e:ci

# Linting
npm run lint

# Full validation
npm run validate
```

## 📊 View Results

1. **On GitHub**:
   - Go to the "Actions" tab
   - Click on a workflow to see details
   - Download artifacts to view reports

2. **Locally**:
   - Playwright reports: `playwright-report/index.html`
   - Jest reports: `frontend/tests/coverage/lcov-report/index.html`

## ✅ Status Badge

Add this badge to your README:

```markdown
![Tests](https://github.com/enzogagg/Portfolio/actions/workflows/tests.yml/badge.svg)
```

## 🔧 Configuration

Test configurations are in:

- **Jest**: `config/jest.config.js`
- **Playwright**: `config/playwright.config.js`
- **ESLint**: `config/.eslintrc.js`

## 📝 Notes

- E2E tests use the `list` reporter in CI for more concise output
- Artifacts are retained for 30 days
- Workflow fails if at least one test fails
- Node.js 20 is used for all jobs
