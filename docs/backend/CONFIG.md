````markdown
# Backend Configuration

Le backend lit sa configuration depuis la variable d'environnement et/ou le fichier `.env` (utilise `godotenv` pour le développement).

## Variables d'environnement importantes

- `BACKEND_PORT` (default: `8080`) — port écouté par le service
- `BACKEND_URL` — url (ex: `http://localhost`)

- Base de données Postgres (pgxpool):
  - `DB_HOST` (ex: `db` en Docker Compose)
  - `DB_PORT` (ex: `5432`)
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASSWORD`

- SMTP (pour envoi d'emails):
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASSWORD`
  - `SMTP_ADDRESS` (adresse depuis laquelle sont envoyés les mails)

- CORS / frontend origin:
  - `FRONTEND_URL_DEV` — origine(s) autorisée(s) en développement (ex: `http://localhost` ou `http://127.0.0.1`)

## Exemple `.env`

````dotenv
BACKEND_PORT=8080
BACKEND_URL=http://localhost

DB_HOST=db
DB_PORT=5432
DB_NAME=portfolio
DB_USER=backend
DB_PASSWORD=changeme

SMTP_HOST=smtp.example.com
SMTP_PORT=587
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
````
````

## Notes

- In CI, configure the repository secrets (see `TESTS.md`) so integration workflows can start a database and run tests.
- For production deploys, prefer using secure environment variable management provided by your host.
