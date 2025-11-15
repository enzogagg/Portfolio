package services

import (
	"context"
	"log"

	"backend/internal/models"
	"backend/internal/repository"
)

type IContactService interface {
	SubmitContactForm(ctx context.Context, form models.ContactForm) error
}

type ContactService struct {
	contactRepo  repository.IContactRepository
	emailService IEmailService
}

func NewContactService(contactRepo repository.IContactRepository, emailService IEmailService) IContactService {
	return &ContactService{
		contactRepo:  contactRepo,
		emailService: emailService,
	}
}

func (s *ContactService) SubmitContactForm(ctx context.Context, form models.ContactForm) error {

	// Save the contact form to the database
	err := s.contactRepo.SaveContactForm(ctx, form)
	if err != nil {
		log.Printf("Error saving contact form to database: %v", err)
		return err
	}

	// Send notification email
	// Doing this asynchronously in goroutine to avoid blocking the main flow
	go func() {
		err := s.emailService.SendContactEmail(form)
		if err != nil {
			log.Printf("Error sending contact email: %v", err)
		}
	}()
	return nil
}
