````markdown
# Backend — Tests

Ce document décrit comment exécuter les tests unitaires et d'intégration pour le backend Go.

## Types de tests

- **Unitaires**: tests de fonctions, handlers, services (utilisent `pgxmock` pour mocker la DB)
- **Intégration**: tests qui utilisent une vraie base Postgres (docker compose) et qui valident le flux complet

## Commandes locales

Exécuter tous les tests:

```bash
go test ./... -v
```
````

Exécuter avec couverture (génère `coverage.out`):

```bash
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out -o coverage.html
```

Exécuter uniquement les tests du package `internal` (exemple):

```bash
go test ./internal/... -v
```

## Intégration

1. Démarrer la DB via Docker Compose:

```bash
docker compose up -d db
```

2. Exporter les variables d'environnement nécessaires (ou utilisez `.env` à la racine):

````bash
# example (zsh)
export DB_HOST=127.0.0.1
export DB_PORT=5432
export DB_USER=backend
# Backend — Tests

This document explains how to run unit and integration tests for the Go backend.

## Test types

- Unit tests: function-level tests, handlers, and services (use `pgxmock` to mock the DB)
- Integration tests: tests that run against a real Postgres instance (via Docker Compose) and validate end-to-end flows

## Local commands

Run all tests:

```bash
go test ./... -v
````

Run tests with coverage (outputs `coverage.out`):

```bash
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out -o coverage.html
```

Run tests for the `internal` package only:

```bash
go test ./internal/... -v
```

## Integration

1. Start the DB via Docker Compose:

```bash
docker compose up -d db
```

2. Export required environment variables (or use the repository `.env`):

```bash
# example (zsh)
export DB_HOST=127.0.0.1
export DB_PORT=5432
export DB_USER=backend
export DB_PASSWORD=changeme
export DB_NAME=portfolio
```

3. Run integration tests (adapt filter to your test naming):

```bash
go test ./... -run Integration -v
```

## CI (GitHub Actions)

- Integration workflows expect repository secrets for DB and SMTP to be set.
- Secrets to add: `DB_BACKEND_USER`, `DB_BACKEND_PASSWORD`, `DB_ADMIN_PASSWORD`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_ADDRESS`.

## Test tooling

- `testify` — assertions and helpers
- `pgxmock` — mock library for `pgx`/`pgxpool`

## Tips

- Clean the DB between integration tests if they modify shared state.
- Use fixtures or factories to create deterministic test data.
