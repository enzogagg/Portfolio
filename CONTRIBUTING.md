# Contributing Guide

Thank you for your interest in contributing to the portfolio! 🎉

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/enzogagg/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:8000

## 📝 Development Workflow

### 1. Create a branch

```bash
git checkout -b feature/my-new-feature
```

### 2. Make your changes

#### Modify styles

```bash
# Modular CSS in frontend/assets/css/

# Structure:
# - base/ : Reset, variables
# - components/ : UI components
# - pages/ : Page-specific styles

# Example: Modify a component
vim frontend/assets/css/components/card.css
```

#### Add a new page

```bash
# Copy an existing page
cp frontend/index.html frontend/new-page.html

# Modify content (title, meta, content)
# Verify the critical loader is present (it should be if copied from existing page)

# Add to sitemap.xml if needed
```

### 3. Check your code

```bash
# Format code
npm run format

# Lint
npm run lint

# Auto-fix
npm run lint:fix

# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

### 4. Full validation

```bash
# Complete validation (format + lint + tests)
npm run validate
```

### 5. Commit

```bash
git add .
git commit -m "feat: feature description"
```

**Commit convention**:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting (no code change)
- `refactor:` Refactoring
- `test:` Adding/modifying tests
- `chore:` Maintenance

### 6. Push and Pull Request

```bash
git push origin feature/my-new-feature
```

Create a Pull Request on GitHub with:

- Clear description of changes
- Screenshots if visual modifications
- Reference to related issues

## 🏗️ Architecture

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for:

- Project structure
- Template system
- Code conventions
- Patterns used

## ✅ PR Checklist

Before submitting a Pull Request, verify:

- [ ] Code follows project conventions
- [ ] `npm run format` has been executed
- [ ] `npm run lint` returns no errors
- [ ] Tests pass (`npm run test`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] Documentation is up to date
- [ ] Commits follow the convention
- [ ] No sensitive data is committed

## 🎨 Code Standards

### HTML

```html
<!-- Good semantic structure -->
<section class="hero">
  <h1>Main Title</h1>
  <p>Description</p>
</section>

<!-- Accessibility -->
<button aria-label="Menu" type="button">
  <i class="fas fa-bars"></i>
</button>

<!-- SEO -->
<meta name="description" content="Relevant description" />
```

### CSS

```css
/* BEM Naming */
.card { }
.card__header { }
.card__header--active { }

/* Or Tailwind utility-first */
<div class="bg-black text-white p-4 rounded-lg">
```

### JavaScript

```javascript
// ESLint + Prettier
const myFunction = (param) => {
  console.log(param);
};

// Clear comments
/**
 * Function description
 * @param {string} param - Parameter description
 * @returns {void}
 */
function myFunction(param) {
  // Implementation
}
```

## 🧪 Tests

### Unit Tests (Jest)

```javascript
// frontend/tests/unit_test/myFunction.test.js
describe("myFunction", () => {
  it("should do something", () => {
    expect(myFunction("test")).toBe("expected");
  });
});
```

### E2E Tests (Playwright)

```javascript
// frontend/tests/e2e/homepage.spec.js
test("homepage loads correctly", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await expect(page).toHaveTitle(/Portfolio/);
});
```

## 🐛 Bug Reporting

Use GitHub Issues with:

1. **Clear title**: "Bug: Loader doesn't disappear on Firefox"
2. **Description**: Steps to reproduce, expected vs actual behavior
3. **Environment**: OS, browser, version
4. **Screenshots** if applicable
5. **Console logs** if applicable

## 💡 Feature Suggestions

Issues with `enhancement` tag:

1. **Title**: "Feature: Add light/dark mode"
2. **Description**: Why this feature is useful
3. **Implementation proposal**: How you would implement it
4. **Alternatives**: Other possible approaches

## 📚 Useful Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **GSAP**: https://greensock.com/docs/
- **Three.js**: https://threejs.org/docs/
- **Jest**: https://jestjs.io/docs
- **Playwright**: https://playwright.dev/docs

## 🤝 Code of Conduct

- Be respectful
- Communicate clearly
- Accept constructive feedback
- Help other contributors

## ❓ Questions?

- **GitHub Issues**: For technical questions
- **Email**: enzo.gaggiotti@epitech.eu
- **Documentation**: Check `/docs` first

---

Thank you for your contribution! 🙏
