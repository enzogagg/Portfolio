package services

import (
	"backend/internal/models"
)

type IEmailService interface {
	SendContactEmail(contact models.ContactForm) error
}
