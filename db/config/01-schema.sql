-- Create the database if it does not exist (optional, often done manually)
-- CREATE DATABASE portfolio_db;

-- Make sure to use the correct database
-- \c portfolio_db;

-- -----------------------------------------------------
-- Table for contact form submissions
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_submissions (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    subject    TEXT NOT NULL,
    message    TEXT NOT NULL,
    
    -- Creation date is automatically added
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Creating an index on email can be useful if you want to search contacts
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
