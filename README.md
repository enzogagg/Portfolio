# Portfolio

Welcome to the personal portfolio repository of Enzo Gaggiotti.

This project demonstrates a modern, modular, and enterprise-grade architecture, with a clear separation between frontend, backend, and technical documentation.

## 🏗️ Repository Structure

```plaintext
Portfolio/
├── frontend/   # Web application (HTML, CSS, JS)
├── backend/    # API, server logic (coming soon)
├── docs/        # Technical documentation (linting, architecture, tests, etc.)
├── README.md   # General overview
```

## 🎯 Philosophy

- **Modularity**: Each part of the project is independent and well documented.
- **Quality**: Strict linting, tests, CI/CD, comprehensive documentation.
- **Accessibility**: WCAG standards, responsive design.
- **Performance**: Optimized for modern web.

## 📚 Documentation Structure

The project follows a logical documentation hierarchy:

```plaintext
📁 Portfolio/
│
├── 📄 README.md (this file)          # Project overview
│
├── 📁 docs/                           # Central documentation hub
│   ├── 📄 README.md                   # Documentation index
│   ├── 📄 LINTING.md                  # Code quality standards
│   └── 📄 TESTING.md                  # Testing strategy
│
├── 📁 config/                         # Configuration files
│   ├── 📄 README.md                   # Config overview
│   ├── ⚙️ jest.config.js             # Unit tests config
│   ├── ⚙️ playwright.config.js       # E2E tests config
│   └── ⚙️ babel.config.js            # Transpiler config
│
└── 📁 frontend/                       # Frontend application
    ├── 📄 README.md                   # Frontend guide
    │
    ├── 📁 assets/
    │   ├── css/
    │   │   └── 📄 README.md           # CSS architecture
    │   ├── js/
    │   │   └── 📄 README.md           # JS architecture
    │   └── documents/
    │       └── 📄 README.md           # Document assets
    │
    └── 📁 tests/
        ├── 📄 README.md               # Testing overview
        ├── unit_test/                 # Jest unit tests
        └── playwright/
            └── 📄 README.md           # E2E test guide
```

### Documentation Principles

- ✅ **All documentation in English**
- ✅ **Each directory has a README.md explaining its purpose**
- ✅ **Central docs/ folder for project-wide documentation**
- ✅ **Local READMEs for specific module documentation**
- ✅ **Clear navigation between related documents**

## � Quick Links

### Getting Started

- [Frontend Setup](./frontend/README.md) - How to run the application
- [Configuration](./config/README.md) - All config files explained

### Development

- [CSS Architecture](./frontend/assets/css/README.md) - Modular CSS structure
- [JS Architecture](./frontend/assets/js/README.md) - JavaScript modules

### Quality & Testing

- [Linting Standards](./docs/LINTING.md) - Code quality rules (ESLint, Stylelint)
- [Testing Strategy](./docs/TESTING.md) - Unit tests, E2E tests, coverage
- [Unit Tests](./frontend/tests/README.md) - Jest testing guide
- [E2E Tests](./frontend/tests/playwright/README.md) - Playwright testing guide

### Project Documentation

- [Documentation Index](./docs/README.md) - All technical documentation

---

**Author**: Enzo Gaggiotti  
**Last Updated**: November 2025  
**License**: MIT
