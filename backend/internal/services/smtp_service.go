package services

import (
	"backend/internal/models"
	"crypto/tls"
	"fmt"
	"net/smtp"

	"github.com/jordan-wright/email"
)

// SmtpService implements IEmailService using SMTP protocol
// This struct holds the SMTP server configuration and authentication details.
type SmtpService struct {
	host    string
	port    string
	user    string
	pass    string
	address string
}

// NewSMTPService creates a new instance of SmtpService
// with the provided SMTP server configuration and authentication details.
func NewSMTPService(host, port, user, pass string, address string) IEmailService {

	return &SmtpService{
		host:    host,
		port:    port,
		user:    user,
		pass:    pass,
		address: address,
	}
}

// SendContactEmail sends an email using the SMTP server configuration.
// It takes the recipient's email address, subject, and body as parameters.
func (s *SmtpService) SendContactEmail(form models.ContactForm) error {

	e := email.NewEmail()
	e.From = s.user
	e.To = []string{s.address}
	e.Subject = "Nouveau message via le formulaire de contact - Portfolio Enzo"
	e.Text = []byte(fmt.Sprintf("De: %s <%s>\n\nMessage:\n%s", form.Name, form.Email, form.Message))
	e.ReplyTo = []string{form.Email}

	address := fmt.Sprintf("%s:%s", s.host, s.port)
	tlsConfig := &tls.Config{
		ServerName: s.host,
	}
	auth := smtp.PlainAuth("", s.user, s.pass, s.host)
	err := e.SendWithTLS(address, auth, tlsConfig)
	if err != nil {
		fmt.Printf("Error: smtp fail: %s", err)
		return err
	}

	fmt.Printf("Email sent successfully to %s via SMTP server %s", s.user, address)
	return nil
}
