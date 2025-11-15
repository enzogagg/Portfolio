package handlers

import (
	"net/http"

	"backend/internal/models"
	"backend/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// ContactHandler handles contact form submissions
// This struct now includes a validator for input validation
type ContactHandler struct {
	contactService services.IContactService
	validator      *validator.Validate
}

// NewContactHandler creates a new instance of ContactHandler
// It is a constructor that initializes the email service and validator
func NewContactHandler(contactService services.IContactService) *ContactHandler {
	return &ContactHandler{
		contactService: contactService,
		validator:      validator.New(),
	}
}

// SendEmail handles the POST /contact endpoint
// It validates the input and uses the email service to send the contact email
func (h *ContactHandler) HandleSendContactForm(c *gin.Context) {
	var form models.ContactForm

	if error := c.ShouldBindJSON(&form); error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": error.Error()})
		return
	}
	if error := h.validator.Struct(form); error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": error.Error()})
		return
	}

	if error := h.contactService.SubmitContactForm(c.Request.Context(), form); error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit contact form"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully sent contact form"})
}
