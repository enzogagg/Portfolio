```markdown
# Backend — Quick Start

This folder contains the technical documentation for the backend (Go service).

Key files:


## Quick start

1. Verify or copy the example environment file to `.env` at the repository root and fill in the DB and SMTP values.
2. Start the database:

```bash
docker compose up -d db
```

3. Start the backend locally:

```bash
docker compose build backend
docker compose up -d backend
# or in one command
docker compose up --build
```

4. Check the health endpoint (if available) or test the contact endpoint with `curl` (see `API.md`).


See the files above for implementation and runtime details.

```
