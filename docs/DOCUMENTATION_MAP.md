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
│  📁 docs/     │    │  📁 config/    │    │ 📁 frontend/ │
│  README.md    │    │  README.md     │    │  README.md   │
└───────────────┘    └────────────────┘    └──────────────┘
        │                                           │
   ┌────┴────┐                         ┌────────────┼────────────┐
   ▼         ▼                         ▼            ▼            ▼
LINTING.md  TESTING.md          assets/      tests/         *.html
                                README.md    README.md       pages
                                    │            │
                        ┌───────────┼────┐      │
                        ▼           ▼    ▼      ▼
                      css/        js/  docs/  playwright/
                    README.md  README.md       README.md
```

## 📋 Complete Documentation Index

### 🎯 Level 1: Project Root

| File                      | Purpose                                   | Audience |
| ------------------------- | ----------------------------------------- | -------- |
| [README.md](../README.md) | Project overview, philosophy, quick links | Everyone |

### 🎯 Level 2: Main Directories

| Directory                 | README                             | Purpose                      |
| ------------------------- | ---------------------------------- | ---------------------------- |
| [docs/](../docs/)         | [README.md](../docs/README.md)     | Central documentation hub    |
| [config/](../config/)     | [README.md](../config/README.md)   | Configuration files overview |
| [frontend/](../frontend/) | [README.md](../frontend/README.md) | Frontend application guide   |

### 🎯 Level 3: Documentation (docs/)

| File                             | Description                            | Keywords                              |
| -------------------------------- | -------------------------------------- | ------------------------------------- |
| [LINTING.md](../docs/LINTING.md) | ESLint + Stylelint rules, code quality | ESLint, Stylelint, quality, standards |
| [TESTING.md](../docs/TESTING.md) | Testing strategy, Jest, Playwright     | Jest, Playwright, coverage, E2E       |
| _(planned)_ ARCHITECTURE.md      | Project structure, design decisions    | Architecture, modules, patterns       |
| _(planned)_ DEPLOYMENT.md        | CI/CD, deployment process              | CI/CD, deployment, production         |
| _(planned)_ CONTRIBUTING.md      | Contribution guidelines                | Git, PR, workflow                     |

### 🎯 Level 3: Frontend Assets

| Directory                                          | README                                              | Description              |
| -------------------------------------------------- | --------------------------------------------------- | ------------------------ |
| [assets/css/](../frontend/assets/css/)             | [README.md](../frontend/assets/css/README.md)       | CSS modular architecture |
| [assets/js/](../frontend/assets/js/)               | [README.md](../frontend/assets/js/README.md)        | JavaScript modules       |
| [assets/documents/](../frontend/assets/documents/) | [README.md](../frontend/assets/documents/README.md) | Downloadable files (CV)  |

### 🎯 Level 3: Testing

| Directory                                          | README                                              | Description                          |
| -------------------------------------------------- | --------------------------------------------------- | ------------------------------------ |
| [tests/](../frontend/tests/)                       | [README.md](../frontend/tests/README.md)            | Testing overview (Jest + Playwright) |
| [tests/playwright/](../frontend/tests/playwright/) | [README.md](../frontend/tests/playwright/README.md) | E2E testing guide                    |

## 🎨 Documentation Types

### 📖 Overview Documents

- **Purpose**: High-level introduction and navigation
- **Files**: Root README, docs/README, frontend/README
- **Audience**: New developers, project managers

### 🏗️ Architecture Documents

- **Purpose**: Explain structure and design decisions
- **Files**: CSS README, JS README
- **Audience**: Developers working on specific modules

### ✅ Standards Documents

- **Purpose**: Define rules and best practices
- **Files**: LINTING.md, TESTING.md
- **Audience**: All developers, CI/CD

### 🛠️ Configuration Documents

- **Purpose**: Explain configuration files
- **Files**: config/README
- **Audience**: DevOps, senior developers

### 📚 Guide Documents

- **Purpose**: Step-by-step instructions
- **Files**: tests/README, playwright/README
- **Audience**: QA engineers, developers

## 🔍 Finding Documentation

### By Topic

#### Code Quality

1. Start: [docs/LINTING.md](../docs/LINTING.md)
2. ESLint config: [frontend/.eslintrc.js](../frontend/.eslintrc.js)
3. Stylelint config: [frontend/.stylelintrc.json](../frontend/.stylelintrc.json)

#### Testing

1. Start: [docs/TESTING.md](../docs/TESTING.md)
2. Unit tests: [frontend/tests/README.md](../frontend/tests/README.md)
3. E2E tests: [frontend/tests/playwright/README.md](../frontend/tests/playwright/README.md)
4. Jest config: [config/jest.config.js](../config/jest.config.js)
5. Playwright config: [config/playwright.config.js](../config/playwright.config.js)

#### CSS Architecture

1. Start: [frontend/assets/css/README.md](../frontend/assets/css/README.md)
2. Modules: [frontend/assets/css/modules/](../frontend/assets/css/modules/)

#### JavaScript Architecture

1. Start: [frontend/assets/js/README.md](../frontend/assets/js/README.md)
2. Modules: [frontend/assets/js/modules/](../frontend/assets/js/modules/)

#### Configuration

1. Start: [config/README.md](../config/README.md)
2. All configs: [config/](../config/)

### By Role

#### 👨‍💻 Frontend Developer

- [Frontend README](../frontend/README.md)
- [CSS Architecture](../frontend/assets/css/README.md)
- [JS Architecture](../frontend/assets/js/README.md)
- [Testing Guide](../frontend/tests/README.md)

#### 🧪 QA Engineer

- [Testing Strategy](../docs/TESTING.md)
- [Unit Tests](../frontend/tests/README.md)
- [E2E Tests](../frontend/tests/playwright/README.md)

#### 🛠️ DevOps Engineer

- [Configuration](../config/README.md)
- [Testing Strategy](../docs/TESTING.md) (CI/CD section)

#### 📝 Technical Writer

- [Documentation Index](../docs/README.md)
- [Project README](../README.md)

## 📊 Documentation Stats

| Metric            | Value                |
| ----------------- | -------------------- |
| **Total READMEs** | 9                    |
| **Central Docs**  | 2 (LINTING, TESTING) |
| **Planned Docs**  | 6                    |
| **Language**      | 100% English ✅      |
| **Emojis Used**   | Yes 🎨               |
| **Last Updated**  | November 2025        |

## ✅ Documentation Standards

All documentation follows these guidelines:

1. **Language**: English only ✅
2. **Format**: Markdown (.md) ✅
3. **Structure**: Clear headings, table of contents ✅
4. **Code Examples**: Syntax highlighted ✅
5. **Emojis**: Used for visual navigation ✅
6. **Updates**: "Last Updated" date ✅
7. **Navigation**: Links to related docs ✅

## 🔄 Keeping Documentation Updated

### When to Update

- ✅ Adding new features
- ✅ Changing architecture
- ✅ Updating dependencies
- ✅ Fixing bugs (if they affect docs)
- ✅ Adding/removing files

### What to Update

1. **Feature added** → Update relevant README + root README if major
2. **Config changed** → Update config/README.md
3. **Tests added** → Update testing docs
4. **Architecture changed** → Update architecture docs

### How to Update

```bash
# 1. Find the relevant documentation
cd docs/  # or relevant directory

# 2. Edit the markdown file
# Update content, examples, links

# 3. Update "Last Updated" date
# Change to current month/year

# 4. Test all links
# Verify no broken references

# 5. Commit with descriptive message
git add .
git commit -m "docs: update TESTING.md with new coverage stats"
```

---

**Last Updated**: November 2025  
**Maintained by**: Enzo Gaggiotti
