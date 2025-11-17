# Portfolio

![Tests](https://github.com/enzogagg/Portfolio/actions/workflows/tests.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Welcome to the personal portfolio repository of Enzo Gaggiotti.

This project demonstrates a modern, modular, and enterprise-grade architecture, with a clear separation between frontend, backend, and technical documentation.

## 🏗️ Repository Structure

```plaintext
Portfolio/
├── frontend/   # Web application (HTML, CSS, JS)
├── backend/    # API, server logic (Go)
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

-- [Frontend Setup](./docs/frontend/README.md) - How to run the application
- [Configuration](./config/README.md) - All config files explained
-- [Backend Setup](./docs/backend/README.md) - How to run and test the Go backend

### Development

-- [CSS Architecture](./docs/frontend/assets/css/README.md) - Modular CSS structure
-- [JS Architecture](./docs/frontend/assets/js/README.md) - JavaScript modules

### Quality & Testing


### Backend

- The backend is implemented in Go using Gin, connects to Postgres via `pgxpool`, and sends email via SMTP.
- Documentation: [docs/backend/README.md](./docs/backend/README.md)

### Scripts

- [Scripts Documentation](./scripts/README.md) - Utility scripts for development

## 🚀 Quick Start

```bash
# Install dependencies
npm ci

# Install Playwright browsers (first time only)
npm run test:e2e:install

# Run all CI tests locally
./scripts/test-ci.sh

# Or run tests individually
npm run test:ci        # All tests
npm run lint           # Linting only
npm run test:unit      # Unit tests only
npm run test:e2e:ci    # E2E tests only
```

### Project Documentation

- [Documentation Index](./docs/README.md) - All technical documentation

---

**Author**: Enzo Gaggiotti  
**Last Updated**: 16 November 2025
**Recent Changes**: 16 November 2025
- Added comprehensive backend unit & integration tests; improved coverage to 85.9%.
- CI: GitHub Actions workflows updated for unit, integration and lint jobs; golangci-lint pinned for compatibility.
- Frontend: added Docker build that generates `assets/js/config.js` from `.env` at container start; contact form module (`contact.js`) posts to `window.API_BASE`.
- Docker Compose: frontend image now built so `.env` values are injected into the frontend at runtime; nginx configured for static serving by default (no proxy).
- Backend: CORS configuration adjusted to allow local development origins (`http://localhost`, `http://127.0.0.1`).

**License**: MIT
