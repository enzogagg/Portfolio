package repository

import (
	"context"
	"fmt"

	"backend/internal/models"

	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

// DBExecutor interface for database operations (compatible with pgxpool.Pool and pgxmock)
type DBExecutor interface {
	Exec(ctx context.Context, sql string, arguments ...interface{}) (pgconn.CommandTag, error)
}

// IContactRepository defines the interface for contact repository
type IContactRepository interface {
	SaveContactForm(ctx context.Context, form models.ContactForm) error
}

// ContactRepository implements IContactRepository
type ContactRepository struct {
	db DBExecutor
}

// NewContactRepository creates a new instance of ContactRepository
func NewContactRepository(db DBExecutor) IContactRepository {
	return &ContactRepository{
		db: db,
	}
}

// NewContactRepositoryFromPool creates a new instance from pgxpool.Pool (helper for main.go)
func NewContactRepositoryFromPool(pool *pgxpool.Pool) IContactRepository {
	return NewContactRepository(pool)
}

// SaveContactForm saves the contact form data to the database
func (r *ContactRepository) SaveContactForm(ctx context.Context, form models.ContactForm) error {
	query := `
		INSERT INTO contact_submissions (name, email, subject, message)
		VALUES ($1, $2, $3, $4)
		`

	// Call Exec on the db pool
	_, error := r.db.Exec(ctx, query, form.Name, form.Email, form.Subject, form.Message)
	if error != nil {
		return fmt.Errorf("unable to insert contact in database: %w", error)
	}
	return nil
}
