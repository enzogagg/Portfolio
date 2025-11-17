# 📚 Documentation Map

Visual guide to all documentation in the Portfolio project.

## 🗺️ Navigation Map

```
┌─────────────────────────────────────────────────────────────┐
│                     📄 README.md (Root)                      │
│              Project overview & documentation map             │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌────────────────┐    ┌──────────────┐
│  📁 docs/     │    │  📁 config/    │    │ 📁 backend/  │
│  README.md    │    │  README.md     │    │  go.mod      │
└───────────────┘    └────────────────┘    └──────────────┘
        │                     │                     
   ┌────┼────┐               │              
   ▼    ▼    ▼               ▼              
backend/ frontend/ TESTING.md  jest.config.js
README   README    LINTING.md  playwright.config.js
```

## 📋 Complete Documentation Index

### 🎯 Level 1: Project Root

| File                      | Purpose                                   | Audience |
| ------------------------- | ----------------------------------------- | -------- |
| [README.md](../README.md) | Project overview, philosophy, quick links | Everyone |

### 🎯 Level 2: Main Directories

| Directory             | README                           | Purpose                      |
| --------------------- | -------------------------------- | ---------------------------- |
| [docs/](../docs/)     | [README.md](./README.md)         | Central documentation hub    |
| [config/](../config/) | [README.md](../config/README.md) | Configuration files overview |

### 🎯 Level 3: Documentation (docs/)

| File/Folder                          | Description                            | Keywords                              |
| ------------------------------------ | -------------------------------------- | ------------------------------------- |
| [LINTING.md](./LINTING.md)           | ESLint + Stylelint rules, code quality | ESLint, Stylelint, quality, standards |
| [TESTING.md](./TESTING.md)           | Testing strategy, Jest, Playwright     | Jest, Playwright, coverage, E2E       |
| [backend/](./backend/)               | Backend documentation folder           | Go, API, PostgreSQL, tests            |
| [frontend/](./frontend/)             | Frontend documentation folder          | HTML, CSS, JS, tests                  |

### 🎯 Level 4: Backend Documentation (docs/backend/)

| File                                   | Description                            |
| -------------------------------------- | -------------------------------------- |
| [README.md](./backend/README.md)       | Backend quick start guide              |
| [API.md](./backend/API.md)             | REST API endpoints documentation       |
| [CONFIG.md](./backend/CONFIG.md)       | Environment variables & configuration  |
| [TESTS.md](./backend/TESTS.md)         | Testing guide (unit & integration)     |
| [ARCHITECTURE.md](./backend/ARCHITECTURE.md) | Backend architecture & module layout |

### 🎯 Level 4: Frontend Documentation (docs/frontend/)

| Directory/File                                     | Description                          |
| -------------------------------------------------- | ------------------------------------ |
| [README.md](./frontend/README.md)                  | Frontend application guide           |
| [assets/css/README.md](./frontend/assets/css/README.md) | CSS modular architecture        |
| [assets/js/README.md](./frontend/assets/js/README.md)   | JavaScript modules              |
| [assets/documents/README.md](./frontend/assets/documents/README.md) | Downloadable files (CV) |
| [tests/README.md](./frontend/tests/README.md)      | Testing overview (Jest + Playwright) |
| [tests/playwright/README.md](./frontend/tests/playwright/README.md) | E2E testing guide       |

---

**Last Updated**: 17 November 2025  
**Maintained by**: Enzo Gaggiotti
