package services

import (
	"backend/internal/models"
	"crypto/tls"
	"errors"
	"fmt"
	"html"
	"log"
	"net/mail"
	"net/smtp"
	"strings"

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
	// Basic trimming
	name := strings.TrimSpace(form.Name)
	fromEmail := strings.TrimSpace(form.Email)
	message := strings.TrimSpace(form.Message)

	// Basic validation
	if fromEmail == "" {
		return errors.New("invalid email: empty")
	}
	parsed, err := mail.ParseAddress(fromEmail)
	if err != nil {
		return fmt.Errorf("invalid email address: %w", err)
	}

	// Simple length limits to avoid abuse
	if len(name) > 200 {
		return errors.New("name too long")
	}
	if len(fromEmail) > 320 {
		return errors.New("email too long")
	}
	if len(message) > 10000 {
		return errors.New("message too long")
	}

	// Escape user-provided content to avoid injection in HTML email
	escName := html.EscapeString(name)
	escEmail := html.EscapeString(parsed.Address)
	escMessage := html.EscapeString(message)

	e := email.NewEmail()
	e.From = s.user
	e.To = []string{s.address}
	e.Subject = "Nouveau message via le formulaire de contact - Portfolio Enzo"

	// Plain-text body
	e.Text = []byte(fmt.Sprintf("De: %s <%s>\n\nMessage:\n%s", escName, escEmail, escMessage))

	// HTML body (safe-escaped). Preserve newlines by wrapping message in <pre>.
	e.HTML = []byte(fmt.Sprintf("<p>De: %s &lt;%s&gt;</p><p>Message:</p><pre>%s</pre>", escName, escEmail, escMessage))

	// Construct Reply-To using a validated address and optional name
	reply := (&mail.Address{Name: name, Address: parsed.Address}).String()
	e.ReplyTo = []string{reply}

	address := fmt.Sprintf("%s:%s", s.host, s.port)
	tlsConfig := &tls.Config{
		ServerName: s.host,
	}
	auth := smtp.PlainAuth("", s.user, s.pass, s.host)
	err = e.SendWithTLS(address, auth, tlsConfig)
	if err != nil {
		log.Printf("Error: smtp fail: %s", err)
		return err
	}

	log.Printf("Email sent successfully to %s via SMTP server %s", s.user, address)
	return nil
}
