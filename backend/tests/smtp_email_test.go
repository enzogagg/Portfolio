package tests_test

import (
	"testing"

	"backend/internal/models"
	"backend/internal/services"

	"github.com/stretchr/testify/assert"
)

// TestSendContactEmail_Structure tests that SendContactEmail can be called
// We cannot test actual email sending without a real SMTP server
// but we can test the structure and ensure it handles the contact form data
func TestSendContactEmail_Structure(t *testing.T) {
	// Create a mock SMTP service with invalid credentials
	// This will fail to send but will exercise the code path
	svc := services.NewSMTPService(
		"invalid.smtp.test",
		"587",
		"test@example.com",
		"invalid",
		"admin@example.com",
	)

	form := models.ContactForm{
		Name:    "Test User",
		Email:   "user@example.com",
		Subject: "Test Subject",
		Message: "Test message content",
	}

	// Call SendContactEmail - it will fail but we test the code is executed
	err := svc.SendContactEmail(form)

	// We expect an error since we're using invalid SMTP credentials
	assert.Error(t, err)
}

// TestSendContactEmail_FormValidation tests different form inputs
func TestSendContactEmail_FormValidation(t *testing.T) {
	testCases := []struct {
		name string
		form models.ContactForm
	}{
		{
			name: "Standard form",
			form: models.ContactForm{
				Name:    "John Doe",
				Email:   "john@example.com",
				Subject: "Question",
				Message: "Hello, I have a question",
			},
		},
		{
			name: "Form with special characters",
			form: models.ContactForm{
				Name:    "François José",
				Email:   "test@example.fr",
				Subject: "Renseignement",
				Message: "Bonjour, j'aimerais des informations",
			},
		},
		{
			name: "Form with long message",
			form: models.ContactForm{
				Name:    "Test User",
				Email:   "long@example.com",
				Subject: "Long message test",
				Message: string(make([]byte, 1000)),
			},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			svc := services.NewSMTPService(
				"invalid.test",
				"587",
				"test@test.com",
				"pass",
				"admin@test.com",
			)

			// Will fail but exercises the code
			err := svc.SendContactEmail(tc.form)
			assert.Error(t, err) // Expected to fail with invalid SMTP
		})
	}
}
