# 📚 Documentation Index

This folder contains all technical documentation for the Portfolio project.

## 📋 Available Documentation

### Core Documentation

- [DOCUMENTATION_MAP.md](./DOCUMENTATION_MAP.md) - Visual guide to all documentation
- [LINTING.md](./LINTING.md) - Enterprise linting configuration and code quality standards
- [TESTING.md](./TESTING.md) - Comprehensive testing strategy and documentation

### Backend Documentation

- [Backend](./backend/README.md) - Backend service documentation (setup, tests, CI)
  - [API Reference](./backend/API.md) - REST API endpoints
  - [Configuration](./backend/CONFIG.md) - Environment variables
  - [Testing Guide](./backend/TESTS.md) - Unit & integration tests
  - [Architecture](./backend/ARCHITECTURE.md) - Module structure

### Frontend Documentation

- [Frontend](./frontend/README.md) - Frontend documentation (assets, tests, guides)
  - [CSS Architecture](./frontend/assets/css/README.md) - Modular CSS
  - [JS Architecture](./frontend/assets/js/README.md) - JavaScript modules
  - [Testing](./frontend/tests/README.md) - Jest & Playwright tests
  - [Documents](./frontend/assets/documents/README.md) - Downloadable assets

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
- **ACCESSIBILITY.md**: Accessibility features and WCAG compliance _(planned)_
- **PERFORMANCE.md**: Performance optimization strategies _(planned)_

---

**Last Updated**: 17 November 2025

## 🔁 Recent Changes (17 Nov 2025)

- **Backend Documentation**: Complete backend docs added (API, CONFIG, TESTS, ARCHITECTURE)
- **Backend Implementation**: Go service with Gin framework, PostgreSQL, SMTP integration
- **Testing**: Backend unit & integration tests; coverage improved to ~85.9%
- **CI/CD**: GitHub Actions workflows for backend (unit, integration, lint) and frontend
- **Frontend Runtime Config**: `.env` injection at Docker startup for dynamic API base URL
- **Frontend Contact Module**: New `contact.js` module connecting to backend API
- **CORS Configuration**: Backend adjusted to allow local development origins
- **Documentation Reorganization**: All docs now properly organized under `docs/backend/` and `docs/frontend/`
- **Code Quality**: All linting issues resolved (100% compliance), golangci-lint integrated
