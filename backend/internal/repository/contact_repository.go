package repository

import (
	"context"
	"fmt"

	"backend/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
)

// IContactRepository defines the interface for contact repository
type IContactRepository interface {
	SaveContactForm(ctx context.Context, form models.ContactForm) error
}

// ContactRepository implements IContactRepository
type ContactRepository struct {
	db *pgxpool.Pool
}

// NewContactRepository creates a new instance of ContactRepository
func NewContactRepository(db *pgxpool.Pool) IContactRepository {
	return &ContactRepository{
		db: db,
	}
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
