# Backend Architecture

Overview of modules and how the backend is organized.

## Main structure
```

backend/
├── cmd/ # Entrypoint(s) (main.go)
├── api/ # Handlers HTTP (routes)

# Backend Architecture

Overview of modules and how the backend is organized.

## Main structure

```
backend/
├── main.go            # Entrypoint(s)
├── api/               # HTTP handlers (routes)
├── config/            # Configuration loader
├── internal/
│   ├── services/      # Business logic (SMTP, rules)
│   ├── repository/    # DB access (pgxpool wrappers)
│   ├── models/        # Data structures (ContactForm, etc.)
│   └── config/        # Configuration loader
├── tests/             # Integration tests / fixtures
└── go.mod
```

## Main components

- **main.go / cmd/**: starts the application, configures the Gin router, middlewares (CORS, logging) and the DB connection.
- **api/handlers**: thin HTTP layer that validates payloads and calls services.
- **services/**: encapsulates business logic (e.g. `smtp_service.go` sends emails).
- **repository/**: functions to interact with Postgres via `pgxpool`. Provides constructors to facilitate testing (`NewContactRepositoryFromPool`).

## Testing & dependency inversion

- Services and repositories accept interfaces or factories to allow injection of mocks (`pgxmock`) during tests.
- Integration tests start a real DB (Docker) and validate full flows (e.g. insert contact + SMTP send).

## Observability

- Logs via the standard Gin logger — configure level per environment.
- Errors are returned from services to make assertions easier in tests.

## Related Documentation

- [Backend README](./README.md) - Quick start guide
- [API Documentation](./API.md) - REST API reference
- [Configuration](./CONFIG.md) - Environment variables
- [Testing Guide](./TESTS.md) - How to run tests

---

**Last Updated**: 17 November 2025
