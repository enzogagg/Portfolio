````markdown
# Backend Documentation

This document describes the backend service: how to configure, run, test and troubleshoot it.

## Overview

- Language: Go
- Framework: Gin
- DB: PostgreSQL (pgxpool)
- Email: SMTP via `github.com/jordan-wright/email`

The backend exposes a small REST API used by the frontend (contact endpoint) and is covered by unit and integration tests.

## Local setup

Requirements:

- Go (version pinned in `go.mod`)
- Docker & Docker Compose (for running a local Postgres instance)
- `make` (optional, targets available in `Makefile`)

Recommended steps:

1. Copy the example environment variables into `.env` (if present) or create one using the root `.env` template.
2. Start services locally:

```bash
docker compose up -d db
docker compose build backend
docker compose up -d backend
# or start all services
docker compose up --build
```
````

3. Backend will listen on the port configured in `.env` (see `BACKEND_PORT` / `BACKEND_URL`).

## Environment variables

The backend uses `.env` for configuration. Important variables:

- `BACKEND_PORT` - port the backend listens on (default: `8080`)
- `BACKEND_URL` - base url used by services
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - Postgres connection
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_ADDRESS` - SMTP configuration for sending emails
- `FRONTEND_URL_DEV` - allowed origin(s) for CORS in development

Ensure values are set before running integration tests or starting the backend in Docker Compose.

## CORS

The backend is configured to allow the local development origins by default (e.g. `http://localhost`, `http://127.0.0.1`). If you serve the frontend on another host or port, update `FRONTEND_URL_DEV` in `.env` or change the CORS configuration in `main.go`.

## Tests

Run unit tests:

```bash
go test ./... -v
```

Run backend-only tests with coverage (recommended during development):

```bash
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out -o coverage.html
```

Integration tests require a running database and valid SMTP settings (or a stubbed SMTP server). Use `docker compose` to start a `db` service before running integration tests.

## CI (GitHub Actions)

Workflows are defined to run unit and integration tests and to upload coverage. The integration workflow expects repository secrets for the DB and SMTP settings. Add these in your repository's Settings → Secrets:

- `DB_BACKEND_USER`
- `DB_BACKEND_PASSWORD`
- `DB_ADMIN_PASSWORD`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_ADDRESS`

## Troubleshooting

- CORS 403 on preflight (OPTIONS): verify `FRONTEND_URL_DEV` matches the origin used by the browser (e.g. `http://localhost` when served from port 80).
- DB connection errors: ensure `db` container is healthy and credentials match `.env`.
- SMTP send failures: check network access to the SMTP host and the credentials in `.env`.

## Useful commands

- Build backend: `docker compose build backend`
- Restart backend: `docker compose restart backend`
- Run tests: `make test` or `go test ./...`
- Show coverage: `make coverage` (if Makefile target exists)

---

Last updated: 16 November 2025

```

```
