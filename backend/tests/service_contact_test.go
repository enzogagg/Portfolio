package tests_test

import (
	"context"
	"errors"
	"testing"

	"backend/internal/models"
	"backend/internal/services"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// Mock repository
type mockContactRepository struct {
	mock.Mock
}

func (m *mockContactRepository) SaveContactForm(ctx context.Context, form models.ContactForm) error {
	args := m.Called(ctx, form)
	return args.Error(0)
}

// Mock email service
type mockEmailService struct {
	mock.Mock
}

func (m *mockEmailService) SendContactEmail(contact models.ContactForm) error {
	args := m.Called(contact)
	return args.Error(0)
}

func TestContactService_SubmitContactForm_Success(t *testing.T) {
	// Arrange
	mockRepo := new(mockContactRepository)
	mockEmail := new(mockEmailService)

	form := models.ContactForm{
		Name:    "John Doe",
		Email:   "john@example.com",
		Subject: "Test Subject",
		Message: "Test Message",
	}

	mockRepo.On("SaveContactForm", mock.Anything, form).Return(nil)
	mockEmail.On("SendContactEmail", form).Return(nil)

	service := services.NewContactService(mockRepo, mockEmail)

	// Act
	err := service.SubmitContactForm(context.Background(), form)

	// Assert
	assert.NoError(t, err)
	mockRepo.AssertExpectations(t)
	// Note: email is sent asynchronously, so we can't assert it here reliably
}

func TestContactService_SubmitContactForm_RepositoryError(t *testing.T) {
	// Arrange
	mockRepo := new(mockContactRepository)
	mockEmail := new(mockEmailService)

	form := models.ContactForm{
		Name:    "John Doe",
		Email:   "john@example.com",
		Subject: "Test Subject",
		Message: "Test Message",
	}

	expectedErr := errors.New("database connection error")
	mockRepo.On("SaveContactForm", mock.Anything, form).Return(expectedErr)

	service := services.NewContactService(mockRepo, mockEmail)

	// Act
	err := service.SubmitContactForm(context.Background(), form)

	// Assert
	assert.Error(t, err)
	assert.Equal(t, expectedErr, err)
	mockRepo.AssertExpectations(t)
}
