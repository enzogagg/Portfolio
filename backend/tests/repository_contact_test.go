package tests_test

import (
	"context"
	"errors"
	"testing"

	"backend/internal/models"
	"backend/internal/repository"

	"github.com/pashagolub/pgxmock/v2"
	"github.com/stretchr/testify/assert"
)

func TestContactRepository_SaveContactForm_Success(t *testing.T) {
	// Arrange
	mock, err := pgxmock.NewPool()
	assert.NoError(t, err)
	defer mock.Close()

	form := models.ContactForm{
		Name:    "John Doe",
		Email:   "john@example.com",
		Subject: "Test Subject",
		Message: "Test Message",
	}

	mock.ExpectExec(`INSERT INTO contact_submissions`).
		WithArgs(form.Name, form.Email, form.Subject, form.Message).
		WillReturnResult(pgxmock.NewResult("INSERT", 1))

	repo := repository.NewContactRepository(mock)

	// Act
	err = repo.SaveContactForm(context.Background(), form)

	// Assert
	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestContactRepository_SaveContactForm_DatabaseError(t *testing.T) {
	// Arrange
	mock, err := pgxmock.NewPool()
	assert.NoError(t, err)
	defer mock.Close()

	form := models.ContactForm{
		Name:    "John Doe",
		Email:   "john@example.com",
		Subject: "Test Subject",
		Message: "Test Message",
	}

	expectedErr := errors.New("connection timeout")
	mock.ExpectExec(`INSERT INTO contact_submissions`).
		WithArgs(form.Name, form.Email, form.Subject, form.Message).
		WillReturnError(expectedErr)

	repo := repository.NewContactRepository(mock)

	// Act
	err = repo.SaveContactForm(context.Background(), form)

	// Assert
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "unable to insert contact in database")
	assert.NoError(t, mock.ExpectationsWereMet())
}
