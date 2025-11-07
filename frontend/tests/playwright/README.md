# 🎭 End-to-End (E2E) Testing - Portfolio

## 📋 Overview

Comprehensive functional and non-regression test suite for the portfolio, using Playwright.

## 🎯 Test Coverage

### Tests by Page

#### 1. **home.spec.js** - Homepage
- ✅ Page loading and display
- ✅ Navigation and header
- ✅ Accessibility tests
- ✅ Performance tests
- ✅ Responsive design
- ✅ SEO (meta tags)
- **Total: ~20 tests**

#### 2. **projects.spec.js** - Projects Page
- ✅ Filtering system
- ✅ Card animations
- ✅ Project details
- ✅ Project counter
- ✅ Responsive design
- ✅ Non-regression tests (rapid filtering, empty states)
- **Total: ~25 tests**

#### 3. **navigation.spec.js** - Global Navigation
- ✅ Desktop navigation
- ✅ Mobile menu (hamburger)
- ✅ Keyboard accessibility
- ✅ Keyboard shortcuts (H = home, ESC = close menu)
- ✅ Resize handling
- ✅ Non-regression tests (broken links)
- **Total: ~20 tests**

#### 4. **contact.spec.js** - Contact Page
- ✅ Contact form
- ✅ Field validation
- ✅ Accessibility (labels, ARIA)
- ✅ Responsive design
- ✅ Social links
- ✅ Non-regression tests
- **Total: ~20 tests**

#### 5. **about.spec.js** - About Page
- ✅ Content (bio, skills, experience)
- ✅ Profile picture
- ✅ Social links
- ✅ Responsive design
- ✅ Accessibility (alt text, heading hierarchy)
- **Total: ~15 tests**

#### 6. **regression.spec.js** - Visual Regression Tests
- ✅ Screenshots of all pages (desktop + mobile)
- ✅ Cross-browser tests
- ✅ Performance tests
- ✅ Broken link detection
- ✅ Resource verification (CSS, JS)
- ✅ Complete user journeys
- **Total: ~30 tests**

## 📊 Statistics

- **Total tests**: ~130 E2E tests
- **Pages tested**: 4 main pages
- **Browsers**: Chromium, WebKit (Safari), Mobile Chrome
- **Viewports**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

## 🚀 Running Tests

### All Tests
```bash
npm run test:e2e
```

### Specific Tests
```bash
# Tests for a specific page
npx playwright test home.spec.js

# Tests in a specific browser
npx playwright test --project=chromium

# Tests in headed mode (visible)
npx playwright test --headed

# Tests with detailed report
npx playwright test --reporter=html
```

### Debug Mode
```bash
npx playwright test --debug
npx playwright test home.spec.js --debug
```

### Update Reference Screenshots
```bash
npx playwright test regression.spec.js --update-snapshots
```

## 🎨 Test Types

### 1. Functional Tests
- Verify all features work correctly
- Navigation, filters, forms
- User interactions

### 2. Non-Regression Tests
- Comparative screenshots
- Detection of unintended visual changes
- Stability verification

### 3. Accessibility Tests
- Keyboard navigation
- ARIA attributes
- Labels and alternative text
- Contrast and readability

### 4. Performance Tests
- Loading time < 3s
- No blocking resources
- No memory leaks

### 5. Cross-Browser Tests
- Chrome, Safari, Mobile compatibility
- Identical behavior across browsers

### 6. Responsive Tests
- Mobile, tablet, desktop adaptation
- Mobile menu
- Responsive images

## 📝 Test Structure

```javascript
test.describe('Test group', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/frontend/page.html');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('.selector');
    
    // Act
    await element.click();
    
    // Assert
    await expect(element).toBeVisible();
  });
});
```

## 🔍 Best Practices

### ✅ Do
- Use semantic selectors (`getByRole`, `getByLabel`)
- Wait for network loading (`waitForLoadState`)
- Test error cases
- Verify accessibility
- Clean up after tests

### ❌ Don't
- Fragile CSS selectors (`.class-123`)
- Excessive fixed timeouts
- Interdependent tests
- Ignore console errors

## 📈 Expected Results

All tests should pass with:
- ✅ 0 critical errors
- ✅ Identical screenshots (visual regression)
- ✅ Loading time < 3s
- ✅ Accessibility validated
- ✅ Responsive functional

## 🐛 Debugging

### View Traces
```bash
npx playwright show-trace trace.zip
```

### Generate Traces
```bash
npx playwright test --trace on
```

### Interactive UI Mode
```bash
npx playwright test --ui
```

## 📊 Reports

HTML reports are automatically generated after each run:
```bash
npx playwright show-report
```

## 🔄 CI/CD

E2E tests are run automatically:
- On every push
- On every pull request
- On the test/frontend branch

Configuration in `.github/workflows/e2e-tests.yml` (if applicable)

## 📚 Playwright Documentation

- [Official Documentation](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

**Author**: Enzo Gaggiotti  
**Last Updated**: November 2025  
**Version**: 1.0.0

