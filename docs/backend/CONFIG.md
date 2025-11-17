# Backend Configuration

The backend reads configuration from environment variables and (for local development) can load values from a `.env` file via `godotenv`.

## Important environment variables

- `BACKEND_PORT` (default: `8080`) — port the service listens on
- `BACKEND_URL` — base URL (e.g. `http://localhost`)

- Postgres (pgxpool):
  - `DB_HOST` (e.g. `db` in Docker Compose)
  - `DB_PORT` (e.g. `5432`)
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASSWORD`

- SMTP (for sending emails):
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASSWORD`
  - `SMTP_ADDRESS` (the from address used for outgoing emails)

- CORS / frontend origin:
  - `FRONTEND_URL_DEV` — allowed origin(s) for development (e.g. `http://localhost` or `http://127.0.0.1`)

## Example `.env`

```dotenv
BACKEND_PORT=8080
BACKEND_URL=http://localhost

DB_HOST=db
DB_PORT=5432
DB_NAME=portfolio
DB_USER=backend
DB_PASSWORD=changeme

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=smtp_user
SMTP_PASSWORD=smtp_pass
SMTP_ADDRESS=hello@example.com

FRONTEND_URL_DEV=http://localhost
```

## Notes

- In CI, configure the repository secrets (see `TESTS.md`) so integration workflows can start a database and run tests.
- For production deploys, prefer using secure environment variable management provided by your host.

## Related Documentation

- [Backend README](./README.md) - Quick start guide
- [API Documentation](./API.md) - REST API reference
- [Testing Guide](./TESTS.md) - How to run tests
- [Architecture](./ARCHITECTURE.md) - Backend structure

---

**Last Updated**: 17 November 2025
```
