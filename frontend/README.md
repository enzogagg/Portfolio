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
├── docs/                 # 📚 Documentation
│   ├── LINTING.md        # Linting configuration guide
│   └── README.md         # Documentation index
├── tests/                # 🧪 Tests (to be implemented)
│   └── README.md         # Testing guidelines
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

- [Linting Guide](./docs/LINTING.md) - ESLint & Stylelint configuration
- [Tests Guide](./tests/README.md) - Testing strategy (planned)

## 🔧 Configuration Files

- `.eslintrc.js` - JavaScript linting rules (35 rules)
- `.stylelintrc.json` - CSS linting rules (15 rules)
- `.prettierrc.json` - Code formatting rules
- `package.json` - Dependencies and scripts

# Portfolio Frontend

Modern, responsive portfolio web application built with HTML5, CSS3, and vanilla JavaScript (ES6+).

## 📁 Project Structure

```plaintext
frontend/
├── assets/
│   ├── css/              # Modular stylesheets (Glassmorphism, Tailwind)
│   ├── js/               # JavaScript modules (ES6, standalone)
│   ├── images/           # Images and media
│   └── documents/        # Downloadable documents (CV, etc.)
├── docs/                 # Documentation (linting, architecture)
│   ├── LINTING.md        # Linting configuration guide
│   └── README.md         # Documentation index
├── tests/                # Quality assurance & tests
│   └── README.md         # Testing guidelines
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

## ✅ Code Quality Status

**Current State**: 100% Enterprise-grade compliance

```text
Total Issues: 0 (from 265 initial)
CSS Errors: 0 ✅
JS Errors: 0 ✅
Code Quality: 100% ✅
```

### Quality Metrics

| Metric                | Status                  |
| --------------------- | ----------------------- |
| ESLint (35 rules)     | ✅ 0 errors, 0 warnings |
| Stylelint (15 rules)  | ✅ 0 errors, 0 warnings |
| Code Duplication      | ✅ -800 lines removed   |
| Formatting (Prettier) | ✅ 100% formatted       |

## 🛠️ Tech Stack

### Core

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript ES6+** - Vanilla JS, no frameworks

### Design System

- **Glassmorphism** - Modern UI aesthetic
- **Tailwind CSS** - Utility-first classes (CDN)
- **Custom CSS Modules** - Modular architecture

### Development Tools

- **ESLint** - JavaScript linting (35+ rules)
- **Stylelint** - CSS linting (15+ rules)
- **Prettier** - Code formatting
- **Python HTTP Server** - Local development

## 📐 Code Standards

### JavaScript

- ✅ ES6+ syntax (arrow functions, template literals)
- ✅ Semicolons required
- ✅ Single quotes
- ✅ 2 spaces indentation
- ✅ `const`/`let` only (no `var`)
- ✅ `console.info()` for debug (not `console.log()`)

### CSS

- ✅ Classes in kebab-case (`.my-class`)
- ✅ Animations in camelCase (`@keyframes fadeIn`)
- ✅ Variables in kebab-case (`--my-var`)
- ✅ RGB values only (`rgb(255, 0, 0)`)
- ✅ No ID selectors (use classes)
- ✅ Justified `!important` only (with comments)

See [docs/LINTING.md](./docs/LINTING.md) for complete guidelines.

## 🏗️ Architecture

### CSS Modules

```plaintext
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

```plaintext
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

- [Linting Guide](./docs/LINTING.md) - ESLint & Stylelint configuration
- [Tests Guide](./tests/README.md) - Testing strategy (planned)

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

## 📊 Code Quality Status

```text
ESLint:    265 issues (162 errors, 103 warnings)
Stylelint: See lint report for details
Target:    95%+ compliance
```

Run `npm run lint:report` for detailed breakdown.

## 🤝 Contributing

1. Follow code standards (see above)
2. Run `npm run validate` before committing
3. Ensure all linters pass
4. Use conventional commit messages

## 📄 License

MIT License - See LICENSE file for details

---

**Version**: 2.1.0  
**Last Updated**: November 5, 2025  
**Author**: Enzo Gaggiotti
