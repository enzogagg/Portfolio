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

echo "Step 1/3: Creating database and role..."
psql -d postgres -c "CREATE DATABASE $DB_NAME" || echo "Notice: Database $DB_NAME already exists."
psql -d postgres -c "CREATE ROLE $DB_BACKEND_USER WITH LOGIN PASSWORD '$DB_BACKEND_PASSWORD'" || echo "Notice: Role $DB_BACKEND_USER already exists."

echo "Step 2/3: Granting CONNECT privilege..."
psql -d postgres -c "GRANT CONNECT ON DATABASE $DB_NAME TO $DB_BACKEND_USER"

echo "Step 3/3: Granting table and sequence privileges..."
GRANT_PERMS_SQL="
    GRANT USAGE ON SCHEMA public TO $DB_BACKEND_USER;
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE contact_submissions TO $DB_BACKEND_USER;
    GRANT USAGE, SELECT ON SEQUENCE contact_submissions_id_seq TO $DB_BACKEND_USER;
"
psql -d "$DB_NAME" -c "$GRANT_PERMS_SQL"

echo "Ensuring ownership and idempotent privileges on existing objects..."
# If the table/sequence exist, make the backend user the owner (use format() to avoid identifier issues)
cat <<PSQL | psql -d "$DB_NAME"
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='contact_submissions') THEN
    EXECUTE format('ALTER TABLE public.contact_submissions OWNER TO %I', '$DB_BACKEND_USER');
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.sequences WHERE sequence_schema='public' AND sequence_name='contact_submissions_id_seq') THEN
    EXECUTE format('ALTER SEQUENCE public.contact_submissions_id_seq OWNER TO %I', '$DB_BACKEND_USER');
  END IF;
END
$$;
PSQL

cat <<PSQL | psql -d "$DB_NAME"
GRANT USAGE ON SCHEMA public TO $DB_BACKEND_USER;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO $DB_BACKEND_USER;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO $DB_BACKEND_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $DB_BACKEND_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO $DB_BACKEND_USER;
PSQL

echo "Database initialization finished."
