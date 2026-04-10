package tests_test

import (
	"os"
	"testing"

	"backend/config"

	"github.com/stretchr/testify/assert"
)

func TestLoadConfig(t *testing.T) {
	t.Run("with environment variables", func(t *testing.T) {
		os.Setenv("BACKEND_PORT", "9090")
		os.Setenv("SMTP_HOST", "test.smtp.com")
		os.Setenv("DB_NAME", "test_db")
		defer func() {
			os.Unsetenv("BACKEND_PORT")
			os.Unsetenv("SMTP_HOST")
			os.Unsetenv("DB_NAME")
		}()

		cfg, err := config.LoadConfig()

		assert.NoError(t, err)
		assert.NotNil(t, cfg)
		assert.Equal(t, "9090", cfg.Port)
		assert.Equal(t, "test.smtp.com", cfg.SmtpHost)
		assert.Equal(t, "test_db", cfg.DbName)
	})

	t.Run("with fallback values", func(t *testing.T) {
		envVars := []string{
			"BACKEND_PORT", "BACKEND_URL", "SMTP_HOST", "SMTP_PORT",
			"SMTP_USER", "SMTP_PASSWORD", "FRONTEND_URL", "FRONTEND_PORT",
			"ADMIN_EMAIL", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME",
		}

		for _, v := range envVars {
			os.Unsetenv(v)
		}

		cfg, err := config.LoadConfig()

		assert.NoError(t, err)
		assert.NotNil(t, cfg)
		assert.Equal(t, "8080", cfg.Port)
		assert.Equal(t, "http://localhost:8080", cfg.URL)
		assert.Equal(t, "smtp.example.com", cfg.SmtpHost)
		assert.Equal(t, "587", cfg.SmtpPort)
	})

	t.Run("handles missing .env gracefully", func(t *testing.T) {
		cfg, err := config.LoadConfig()

		assert.NoError(t, err)
		assert.NotNil(t, cfg)
		assert.NotEmpty(t, cfg.Port)
	})
}

func TestConfigStructure(t *testing.T) {
	// Set minimal required environment variables
	os.Setenv("DB_BACKEND_USER", "testuser")
	os.Setenv("DB_BACKEND_PASSWORD", "testpass")
	os.Setenv("DB_NAME", "testdb")
	os.Setenv("DB_HOST", "testhost")
	os.Setenv("DB_PORT", "5555")

	defer func() {
		os.Unsetenv("DB_BACKEND_USER")
		os.Unsetenv("DB_BACKEND_PASSWORD")
		os.Unsetenv("DB_NAME")
		os.Unsetenv("DB_HOST")
		os.Unsetenv("DB_PORT")
	}()

	cfg, err := config.LoadConfig()

	assert.NoError(t, err)
	assert.NotEmpty(t, cfg.Port)
	assert.Equal(t, "testhost", cfg.DbHost)
	assert.Equal(t, "5555", cfg.DbPort)
	assert.Equal(t, "testuser", cfg.DbUser)
	assert.Equal(t, "testpass", cfg.DbPassword)
	assert.Equal(t, "testdb", cfg.DbName)
}
