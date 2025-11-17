```markdown
# Backend Service (Go)

This README provides a module-level overview for the `backend/` service. For full technical documentation see `docs/backend/`.

## Overview

- Language: Go
- Framework: Gin
- Database: PostgreSQL (pgxpool)
- Email: SMTP via `github.com/jordan-wright/email`

## Project layout

```
backend/
├── cmd/         # application entrypoint(s)
├── api/         # HTTP handlers and routing
├── internal/    # services, repository, models, config
└── go.mod
```

## Requirements

- Go (use version declared in `go.mod`)
- Docker & Docker Compose (for local DB during development/tests)

## Local development

1. Copy or create the repository `.env` and set DB + SMTP values.
2. Start Postgres:

```bash
docker compose up -d db
```

3. Build & run the backend:

```bash
docker compose build backend
docker compose up -d backend
# or run locally (if you have Go installed):
go run ./cmd
```

## Environment variables

See `docs/backend/CONFIG.md` for a complete list and example `.env`.

## Tests

Run unit tests:

```bash
go test ./... -v
```

Run tests with coverage:

```bash
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out -o coverage.html
```

Integration tests require a running Postgres instance (see `docs/backend/TESTS.md`).

## Useful commands

```bash
docker compose build backend
docker compose restart backend
go test ./... -v
```

## Links

- Full backend docs: `docs/backend/`
- API reference: `docs/backend/API.md`

---

Last updated: 17 November 2025
```
