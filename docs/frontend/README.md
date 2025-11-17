# 🎨 Portfolio Frontend

Modern, responsive portfolio website built with HTML5, CSS3, and vanilla JavaScript.

## 📁 Project Structure

```
frontend/
├── assets/
│   ├── css/              # Stylesheets (modular architecture)
│   ├── js/               # JavaScript modules
│   ├── images/           # Images and media
│   └── documents/        # Downloadable documents
├── tests/                # 🧪 Tests
│   ├── unit_test/        # Jest unit tests
│   └── playwright/       # Playwright E2E tests
├── *.html                # HTML pages
├── package.json          # npm dependencies and scripts
├── .eslintrc.js          # ESLint configuration
├── .stylelintrc.json     # Stylelint configuration
└── .prettierrc.json      # Prettier configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Python 3 (for local dev server)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Server runs at http://localhost:8000
```

## 📝 Available Scripts

### Development

```bash
npm run dev               # Start local dev server
npm run start             # Alias for dev
```

### Code Quality

```bash
npm run lint              # Run all linters (CSS + JS)
npm run lint:css          # Lint CSS only
npm run lint:js           # Lint JavaScript only
npm run lint:fix          # Auto-fix all issues
npm run lint:css:fix      # Auto-fix CSS only
npm run lint:js:fix       # Auto-fix JavaScript only
```

### Formatting

```bash
npm run format            # Format all files with Prettier
npm run format:check      # Check formatting without changes
```

### Validation (CI/CD)

```bash
npm run validate          # Run format check + lint (no auto-fix)
npm run lint:report       # Generate lint report to file
```

## 🏗️ Architecture

### CSS Modules

```
assets/css/modules/
├── variables.css         # CSS custom properties
├── base.css              # Reset and base styles
├── animations.css        # Keyframe animations
├── buttons.css           # Button components
├── cards.css             # Card components
├── components.css        # Generic components
├── contact.css           # Contact page styles
├── header.css            # Navigation header
├── loader.css            # Loading animations
├── project-actions.css   # Project action buttons
└── special-components.css # Unique components
```

### JavaScript Modules

```
assets/js/modules/
├── accessibility.js      # Accessibility features
├── animations.js         # Animation controllers
├── config.js             # Global configuration
├── navigation.js         # Navigation logic
├── performance.js        # Performance monitoring
├── projects.js           # Project filtering
└── utils.js              # Utility functions
```

## 🎨 Features

- ✨ Smooth animations and transitions
- 🎭 Glassmorphism design
- 📱 Fully responsive
- ♿ WCAG 2.1 AA compliant
- 🚀 Performance optimized
- 🌙 Dark theme
- 📊 Matomo analytics integration

## 📚 Documentation

## 📚 Documentation

- [CSS Architecture](./assets/css/README.md) - CSS modular structure
- [JavaScript Architecture](./assets/js/README.md) - JS modules and configuration
- [Testing Guide](./tests/README.md) - Testing strategy
- [Linting Guide](../LINTING.md) - ESLint & Stylelint configuration
- [Main Documentation](../../README.md) - Documentation index

## 🔧 Configuration Files

- `.eslintrc.js` - JavaScript linting rules (35 rules)
- `.stylelintrc.json` - CSS linting rules (15 rules)
- `.prettierrc.json` - Code formatting rules
- `package.json` - Dependencies and scripts

## 🚀 Deployment

This is a static website. Deploy the `frontend/` directory to:

- Nginx server (recommended)
- Apache HTTP Server
- Any static file hosting

**Production deployment**:

```bash
# Using Docker with volume mount
docker run -d -p 80:80 \
  -v $(pwd)/frontend:/usr/share/nginx/html \
  nginx:alpine
```

## 📄 License

MIT License - See LICENSE file for details

---

**Version**: 2.1.0  
**Last Updated**: November 5, 2025  
**Author**: Enzo Gaggiotti
