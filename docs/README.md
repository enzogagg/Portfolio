# 📚 Documentation Index

This folder contains all technical documentation for the Portfolio project.

## 📋 Available Documentation

- [DOCUMENTATION_MAP.md](./DOCUMENTATION_MAP.md) - Visual guide to all documentation
- [LINTING.md](./LINTING.md) - Enterprise linting configuration and code quality standards
- [TESTING.md](./TESTING.md) - Comprehensive testing strategy and documentation
- [Backend](./backend/README.md) - Backend service documentation (setup, tests, CI)
- [LINTING.md](./LINTING.md) - Enterprise linting configuration and code quality standards
- [TESTING.md](./TESTING.md) - Comprehensive testing strategy and documentation
- [Backend](./backend/README.md) - Backend service documentation (setup, tests, CI)
- [Frontend](./frontend/README.md) - Frontend documentation (assets, tests, guides)

## 📝 Documentation Standards

All documentation in this project follows these guidelines:

1. **Language**: English only
2. **Format**: Markdown (.md)
3. **Structure**: Clear headings and table of contents
4. **Code Examples**: Properly formatted with syntax highlighting
5. **Emojis**: Used for visual navigation (sparingly)
6. **Updates**: Include "Last Updated" date

## 🎯 Planned Documentation

- **ARCHITECTURE.md**: Project structure and design decisions _(planned)_
- **DEPLOYMENT.md**: Deployment process and CI/CD configuration _(planned)_
- **CONTRIBUTING.md**: Contribution guidelines _(planned)_
- **API.md**: JavaScript module API reference _(planned)_
- **ACCESSIBILITY.md**: Accessibility features and WCAG compliance _(planned)_
- **PERFORMANCE.md**: Performance optimization strategies _(planned)_

---

**Last Updated**: 16 November 2025

## 🔁 Recent Changes (16 Nov 2025)

- Backend tests: added and expanded unit + integration tests; coverage improved (backend combined coverage ~85.9%).
- CI updates: unit / integration / lint workflows adjusted; golangci-lint version pinned to avoid Go version mismatch.
- Frontend runtime config: added `frontend/Dockerfile` + `assets/js/config.template.js` which generates `assets/js/config.js` from `.env` at container start. `window.API_BASE` is now available for JS modules.
- Frontend contact: new module `assets/js/modules/contact.js` added; it POSTs JSON to `${API_BASE}/api/v1/contact` and shows inline toasts.
- Docker Compose: frontend now built from `frontend/Dockerfile` and receives `.env` so runtime API base is injected.
- CORS & local dev: backend updated to allow `http://localhost` / `http://127.0.0.1` origins for development (preflight OPTIONS handling fixed).
