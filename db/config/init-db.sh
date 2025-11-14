#!/bin/bash
set -e # Stop script immediately if a command fails

# --- 1. Validate required environment variables ---
REQUIRED_VARS=(
    "POSTGRES_USER"         # ex: 'postgres'
    "POSTGRES_PASSWORD"     # ex: 'your_admin_password'
    "DB_NAME"               # ex: 'portfolio_db'
    "DB_BACKEND_USER"               # ex: 'backend_user'
    "DB_BACKEND_PASSWORD"           # ex: 'a-very-strong-password'
)

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: Required environment variable $var is not set."
        echo "Please check your .env and docker-compose environment section."
        exit 1
    fi
done

# Set default socket for PostgreSQL connection (used by docker-entrypoint scripts)
export PGHOST="/var/run/postgresql"

echo "Configuring DB $DB_NAME with user $DB_BACKEND_USER..."
echo "Connecting as $POSTGRES_USER via Unix socket..."

# --- 2. Export admin credentials for psql ---
export PGUSER="$POSTGRES_USER"
export PGPASSWORD="$POSTGRES_PASSWORD"

# --- 3. Execute SQL commands ---
echo "Step 1/3: Creating database and role..."
psql -d postgres -c "CREATE DATABASE $DB_NAME" || echo "Notice: Database $DB_NAME already exists."
psql -d postgres -c "CREATE ROLE $DB_BACKEND_USER WITH LOGIN PASSWORD '$DB_BACKEND_PASSWORD'" || echo "Notice: Role $DB_BACKEND_USER already exists."

echo "Step 2/3: Granting CONNECT privilege..."
psql -d postgres -c "GRANT CONNECT ON DATABASE $DB_NAME TO $DB_BACKEND_USER"

echo "Step 3/3: Granting table and sequence privileges..."
GRANT_PERMS_SQL="
    GRANT USAGE ON SCHEMA public TO $DB_BACKEND_USER;
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE contact_submissions TO $DB_BACKEND_USER;
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE projects TO $DB_BACKEND_USER;
    GRANT USAGE, SELECT ON SEQUENCE contact_submissions_id_seq TO $DB_BACKEND_USER;
    GRANT USAGE, SELECT ON SEQUENCE projects_id_seq TO $DB_BACKEND_USER;
"
psql -d "$DB_NAME" -c "$GRANT_PERMS_SQL"

echo "✅ --- Database configuration completed successfully! ---"
