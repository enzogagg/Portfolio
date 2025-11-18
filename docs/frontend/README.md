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

- [CSS Architecture](./assets/css/README.md) - CSS modular structure
- [JavaScript Architecture](./assets/js/README.md) - JS modules and configuration
- [Testing Guide](./tests/README.md) - Testing strategy
- [Linting Guide](../LINTING.md) - ESLint & Stylelint configuration
- [Main Documentation](../../README.md) - Documentation index

## 🔧 Configuration Files

## 🚀 Deployment

This is a static website. Deploy the `frontend/` directory to:

**Production deployment**:

```bash
# Using Docker with volume mount
docker run -d -p 80:80 \
  -v $(pwd)/frontend:/usr/share/nginx/html \
  nginx:alpine
```

## 📄 License

MIT License - See LICENSE file for details

**Version**: 2.1.0  
**Last Updated**: November 18, 2025  
**Author**: Enzo Gaggiotti

## 🔔 Recent Enhancements (18 Nov 2025)

Recent frontend improvements to improve performance, security and layout stability:

- **Self-hosted FontAwesome**: FontAwesome CSS and webfonts were moved to `frontend/assets/fonts/fontawesome/` to remove external CDN requests and prevent third-party cookie warnings.
- **Local loader CSS**: `frontend/assets/css/local-fontawesome.css` imports the local `all.min.css` and acts as a drop-in replacement for previous CDN links.
- **Preload webfonts**: Key FontAwesome woff2 files are preloaded on important pages (e.g. `projects.html`) to reduce layout shifts.
- **Inline critical icons**: Main project card icons (server, fish, globe) were converted to inline SVG to avoid layout jumps while fonts load.
- **JS fix for layout**: `frontend/assets/js/modules/projects.js` re-applies the active filter after initialization to force layout recalculation that previously only happened after user interaction.
- **CSP update & HTML cleanup**: Content-Security-Policy updated and HTML files cleaned (early `<meta charset>`, removed duplicated head/doctypes).

These changes are documented across the frontend docs and READMEs under `docs/frontend/`.
See `../ENHANCEMENTS.md` for the latest frontend improvements (self-hosted FontAwesome, font preloads, inline SVG icons for project cards, JS layout fixes, and CSP updates).
