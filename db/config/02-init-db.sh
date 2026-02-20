#!/bin/bash
set -e

# Validate required environment variables
REQUIRED_VARS=(
  "POSTGRES_USER"
  "POSTGRES_PASSWORD"
  "DB_NAME"
  "DB_BACKEND_USER"
  "DB_BACKEND_PASSWORD"
)

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: Required environment variable $var is not set."
    exit 1
  fi
done

# Use the Unix socket during initialization
export PGHOST="/var/run/postgresql"
export PGUSER="$POSTGRES_USER"
export PGPASSWORD="$POSTGRES_PASSWORD"

echo "Configuring DB $DB_NAME with user $DB_BACKEND_USER..."

echo "Step 1/3: Creating database and role (idempotent)..."
# Create database if not exists (psql will error if exists; we ignore)
psql -d postgres -c "CREATE DATABASE \"$DB_NAME\"" || echo "Notice: Database $DB_NAME already exists."

# Create role idempotently using a DO block and format() to safely quote identifier and password
cat <<PSQL | psql -d postgres
DO
\$do\$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${DB_BACKEND_USER}') THEN
    EXECUTE format('CREATE ROLE %I WITH LOGIN PASSWORD %L', '${DB_BACKEND_USER}', '${DB_BACKEND_PASSWORD}');
  END IF;
END
\$do\$;
PSQL

echo "Step 2/3: Granting CONNECT privilege..."
psql -d postgres -c "GRANT CONNECT ON DATABASE \"$DB_NAME\" TO ${DB_BACKEND_USER}"

echo "Step 3/3: Granting table and sequence privileges..."
cat <<'PSQL' | psql -d "$DB_NAME"
-- Use format() to safely inject identifier values where needed
DO
\$do\$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='contact_submissions') THEN
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.contact_submissions TO %I', '${DB_BACKEND_USER}');
    EXECUTE format('GRANT USAGE, SELECT ON SEQUENCE public.contact_submissions_id_seq TO %I', '${DB_BACKEND_USER}');
  END IF;
END
\$do\$;
PSQL

echo "Ensuring ownership and idempotent privileges on existing objects..."
# If the table/sequence exist, make the backend user the owner (use format() to avoid identifier issues)
cat <<'PSQL' | psql -d "$DB_NAME"
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='contact_submissions') THEN
    EXECUTE format('ALTER TABLE public.contact_submissions OWNER TO %I', '${DB_BACKEND_USER}');
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.sequences WHERE sequence_schema='public' AND sequence_name='contact_submissions_id_seq') THEN
    EXECUTE format('ALTER SEQUENCE public.contact_submissions_id_seq OWNER TO %I', '${DB_BACKEND_USER}');
  END IF;
END
$$;
PSQL

# Apply grants and default privileges using format() to safely quote the role identifier
cat <<'PSQL' | psql -d "$DB_NAME"
DO
\$do\$
BEGIN
  -- Schema usage
  EXECUTE format('GRANT USAGE ON SCHEMA public TO %I', '${DB_BACKEND_USER}');
  -- Table and sequence privileges for existing objects
  EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO %I', '${DB_BACKEND_USER}');
  EXECUTE format('GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO %I', '${DB_BACKEND_USER}');
  -- Default privileges for future objects
  EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO %I', '${DB_BACKEND_USER}');
  EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO %I', '${DB_BACKEND_USER}');
END
\$do\$;
PSQL

echo "Database initialization finished."
