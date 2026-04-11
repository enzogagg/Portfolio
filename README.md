<div align="center">

# Portfolio - Enzo Gaggiotti

[![Unified CI/CD](https://img.shields.io/github/actions/workflow/status/enzogagg/Portfolio/unified-ci.yml?branch=main&label=CI/CD%20Pipeline&style=for-the-badge&logo=github)](https://github.com/enzogagg/Portfolio/actions/workflows/unified-ci.yml)
[![License](https://img.shields.io/github/license/enzogagg/Portfolio?style=for-the-badge&color=blue)](https://opensource.org/licenses/MIT)

![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)

</div>

Welcome to the personal portfolio repository of Enzo Gaggiotti.

This project demonstrates a modern, modular, and enterprise-grade architecture, with a clear separation between frontend, backend, and technical documentation.

## 🏗️ Repository Structure

```plaintext
Portfolio/
├── frontend/    # Web application (HTML, CSS, JS)
├── backend/     # API, server logic (Go)
├── docs/        # Technical documentation
├── config/      # Configuration files (Jest, Playwright, etc.)
└── README.md    # General overview
```

## 🎯 Philosophy

- **Modularity**: Each part of the project is independent and well documented
- **Quality**: Strict linting, tests, CI/CD, comprehensive documentation
- **Accessibility**: WCAG standards, responsive design
- **Performance**: Optimized for modern web

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
│   ├── 📄 TESTING.md                  # Testing strategy
│   ├── 📁 backend/                    # Backend documentation
│   │   ├── README.md                  # Backend quick start
│   │   ├── API.md                     # REST API reference
│   │   ├── CONFIG.md                  # Configuration guide
│   │   ├── TESTS.md                   # Testing guide
│   │   └── ARCHITECTURE.md            # Backend architecture
│   └── 📁 frontend/                   # Frontend documentation
│       ├── README.md                  # Frontend guide
│       ├── assets/css/README.md       # CSS architecture
│       ├── assets/js/README.md        # JS modules
│       └── tests/README.md            # Testing overview
│
├── 📁 config/                         # Configuration files
│   ├── 📄 README.md                   # Config overview
│   ├── ⚙️ jest.config.js             # Unit tests config
│   ├── ⚙️ playwright.config.js       # E2E tests config
│   └── ⚙️ babel.config.js            # Transpiler config
│
├── 📁 frontend/                       # Frontend application
│   ├── index.html                     # Main page
│   ├── assets/                        # CSS, JS, images
│   └── tests/                         # Unit & E2E tests
│
└── 📁 backend/                        # Backend service (Go)
    ├── cmd/                           # Application entrypoint
    ├── api/                           # HTTP handlers
    ├── internal/                      # Services, models
    └── go.mod                         # Go dependencies
```

### Documentation Principles

- ✅ **All documentation in English**
- ✅ **Each directory has a README.md explaining its purpose**
- ✅ **Central docs/ folder for project-wide documentation**
- ✅ **Local READMEs for specific module documentation**
- ✅ **Clear navigation between related documents**

## 📊 Quick Links

### Getting Started

- [Frontend Setup](./docs/frontend/README.md) - How to run the application
- [Backend Setup](./docs/backend/README.md) - How to run and test the Go backend
- [Configuration](./config/README.md) - All config files explained

### Development

- [CSS Architecture](./docs/frontend/assets/css/README.md) - Modular CSS structure
- [JS Architecture](./docs/frontend/assets/js/README.md) - JavaScript modules
- [Backend API](./docs/backend/API.md) - REST API documentation
- [Backend Architecture](./docs/backend/ARCHITECTURE.md) - Backend structure

### Quality & Testing

- [Testing Strategy](./docs/TESTING.md) - Complete testing documentation
- [Linting Standards](./docs/LINTING.md) - Code quality rules
- [Backend Tests](./docs/backend/TESTS.md) - Backend testing guide

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

## 🐳 Docker Setup

```bash
# Start all services (frontend, backend, database)
docker compose up --build

# Start specific service
docker compose up -d db
docker compose up -d backend
docker compose up -d frontend

# View logs
docker compose logs -f backend
```

### Project Documentation

- [Documentation Index](./docs/README.md) - All technical documentation

---

**Author**: Enzo Gaggiotti  
**Last Updated**: 17 November 2025

### Recent Changes (17 Nov 2025)

- **Backend Service**: Go-based API with Gin framework, PostgreSQL database, SMTP email integration
- **Comprehensive Testing**: Backend unit & integration tests with 85.9% coverage
- **CI/CD**: GitHub Actions workflows for backend (unit, integration, lint) and frontend tests
- **Runtime Configuration**: Frontend `.env` injection at Docker startup for dynamic API base URL
- **Contact Form**: New module connecting to backend API with proper CORS configuration
- **Documentation**: Complete reorganization with dedicated `docs/backend/` and `docs/frontend/` sections
- **Code Quality**: All linting issues resolved (100% compliance), golangci-lint integrated

**License**: MIT

### What's New (18 Nov 2025)

Recent frontend improvements to enhance performance, security and user experience:

- **Self-hosted FontAwesome**: `all.min.css` and the webfonts are now included locally under `frontend/assets/fonts/fontawesome/` to remove external requests to `cdnjs.cloudflare.com` (prevents third-party cookies and Lighthouse warnings).
- **Local loader CSS**: `frontend/assets/css/local-fontawesome.css` now imports `../fonts/fontawesome/css/all.min.css` (and the file was cleaned of accidental Markdown fences).
- **Font preload**: added `<link rel="preload">` for `fa-solid-900.woff2`, `fa-regular-400.woff2` and `fa-brands-400.woff2` on affected pages (e.g. `projects.html`) to reduce layout shifts during render.
- **Critical icons as inline SVG**: main project card icons (server, fish, globe) were replaced with inline SVGs in `frontend/projects.html` to guarantee stable positioning before font load.
- **JS fix — re-apply active filter**: `frontend/assets/js/modules/projects.js` now re-applies the active filter immediately after initialization (simulates a click) to force a layout recalculation and avoid mispositioning observed prior to user interaction.
- **Meta charset & head cleanup**: Several HTML files were cleaned up to place `<meta charset>` early and avoid parsing issues.
- **HTML structure fixes**: `proxmox-project.html` and other pages received structural corrections (duplicate `<!doctype>`/`<head>` removed).
- **CSP update**: server-side Content-Security-Policy configuration was updated to remove `cdnjs.cloudflare.com` from allowed sources (consistent with self-hosting assets).

Example modified files:

- `frontend/assets/fonts/fontawesome/css/all.min.css`
- `frontend/assets/fonts/fontawesome/webfonts/*` (woff2/ttf)
- `frontend/assets/css/local-fontawesome.css`
- `frontend/projects.html` (inline SVGs + preload)
- `frontend/assets/css/modules/cards.css` (adjusted `.project-icon`)
- `frontend/assets/js/modules/projects.js` (re-apply filter)
- `frontend/nginx.conf` (CSP update)

Checks & local testing

1. Start a local server from the `frontend` folder:

```bash
cd frontend
python3 -m http.server 8000
```

2. Open `http://localhost:8000/projects.html` and perform a hard reload (Cmd+Shift+R). Verify:

- card icons remain stable on load (no layout jump),
- webfonts are preloaded (check Network tab),
- no Lighthouse warnings about third-party cookies from `cdnjs.cloudflare.com`.

Suggested commit

```bash
git add frontend/assets/fonts/fontawesome frontend/assets/css/local-fontawesome.css frontend/projects.html frontend/assets/js/modules/projects.js
git commit -m "feat(frontend): self-host FontAwesome, inline SVG icons, preload fonts and fix projects layout"
git push
```

Notes & options

- If you want to remove all external dependencies, I can also self-host the `Inter` font (currently loaded via Google Fonts). Would you like me to do that?
- For an extra mitigation against layout shifts, we can add `font-display: swap` in `all.min.css` (I can apply that automatically).


# Webhook Test
Triggering automated deployment test.

# Final Webhook Test
Successful domain-based trigger test.

# Stability Test
Final deployment verification after infrastructure stabilization.

# Final Clean Test
Verification of zero-escape syntax.

# Final Validation
Automated CI/CD validation.

# Last Test
Ready for production.

# Bulletproof Test
Template-based CI/CD validation.
