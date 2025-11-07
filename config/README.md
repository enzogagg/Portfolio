# ⚙️ Configuration Files

This directory contains all configuration files for quality tools, testing frameworks, and build systems.

## 📁 Contents

### Testing Configuration

- **`jest.config.js`** - Jest unit testing configuration
  - Test environment: jsdom
  - Coverage thresholds: 80% lines, statements, branches
  - Transform: Babel for ES6+ support
  - Setup files for DOM mocking

- **`playwright.config.js`** - Playwright E2E testing configuration
  - Projects: Chromium, WebKit, Mobile Chrome
  - Base URL: http://localhost:8000
  - Screenshots and videos on failure
  - Retry logic and timeouts

### Code Transformation

- **`babel.config.js`** - Babel transpiler configuration
  - Presets: @babel/preset-env
  - Target: Node.js current version
  - Used by Jest for test transformation

### Code Quality (Future)

- `.eslintrc.js` - ESLint configuration _(to be moved here)_
- `.stylelintrc.json` - Stylelint configuration _(to be moved here)_
- `.prettierrc.json` - Prettier formatting _(to be moved here)_

## 🎯 Purpose

Centralizing configuration files in this directory:

- ✅ Keeps project root clean
- ✅ Makes configurations easier to find
- ✅ Groups related tooling together
- ✅ Improves maintainability

## 📖 Related Documentation

- [Testing Documentation](../docs/TESTING.md)
- [Linting Standards](../docs/LINTING.md)
- [Frontend README](../frontend/README.md)

---

**Last Updated**: November 2025
