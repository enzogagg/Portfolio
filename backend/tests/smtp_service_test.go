package tests_test

import (
	"testing"

	"backend/internal/services"

	"github.com/stretchr/testify/assert"
)

func TestNewSMTPService(t *testing.T) {
	host := "smtp.example.com"
	port := "465"
	user := "user@example.com"
	pass := "password"
	address := "admin@example.com"

	svc := services.NewSMTPService(host, port, user, pass, address)

	assert.NotNil(t, svc)
}

func TestSMTPService_Structure(t *testing.T) {
	testCases := []struct {
		name    string
		host    string
		port    string
		user    string
		pass    string
		address string
	}{
		{
			name:    "OVH config",
			host:    "ssl0.ovh.net",
			port:    "465",
			user:    "contact@example.com",
			pass:    "secret",
			address: "admin@example.com",
		},
		{
			name:    "Gmail config",
			host:    "smtp.gmail.com",
			port:    "587",
			user:    "user@gmail.com",
			pass:    "apppassword",
			address: "admin@example.com",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			svc := services.NewSMTPService(tc.host, tc.port, tc.user, tc.pass, tc.address)
			assert.NotNil(t, svc)
		})
	}
}
