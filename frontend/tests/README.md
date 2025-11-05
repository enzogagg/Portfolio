# Frontend Tests & Linting

This folder contains all configuration and documentation for frontend testing and linting. All files, scripts, and documentation are in English and follow enterprise standards.

## Structure

- `README.md` — This file
- `.eslintrc.js` — ESLint configuration (35 strict rules)
- `.stylelintrc.json` — Stylelint configuration (15 strict rules)
- `prettier.config.js` — Prettier formatting rules

## Test Strategy

- **Linting:** All CSS and JS files are linted using strict enterprise-grade rules. No warnings or errors are tolerated in CI/CD. See [LINTING.md](../docs/LINTING.md) for details.
- **Unit Tests:** (Planned) All frontend logic will be covered by unit tests. Test coverage will be enforced at 100% for critical modules.
- **Integration Tests:** (Planned) End-to-end tests will validate user flows and accessibility.

## Scripts

Run the following npm scripts from the frontend root:

```bash
npm run lint           # Lint all JS and CSS files
npm run lint:js        # Lint JS files
npm run lint:js:fix    # Auto-fix JS issues
npm run lint:css       # Lint CSS files
npm run lint:css:fix   # Auto-fix CSS issues
```

## Best Practices

- All code and documentation must be in English
- No lint errors or warnings allowed in CI/CD
- Use Prettier for consistent formatting
- Follow modular architecture and keep tests isolated
- Document all custom rules and exceptions in [LINTING.md](../docs/LINTING.md)

## Usage

```bash
npm run lint:css         # Check CSS files
npm run lint:css:fix     # Auto-fix issues
```

## Documentation

See [LINTING.md](../docs/LINTING.md) for detailed rule explanations.
