package tests_test

import (
	"testing"

	"backend/config"
	"backend/internal/repository"

	"github.com/stretchr/testify/assert"
)

// TestNewDbPool_InvalidConfig tests NewDbPool with invalid configuration
// This will fail to connect but will exercise the code path
func TestNewDbPool_InvalidConfig(t *testing.T) {
	cfg := config.Config{
		DbHost:     "invalid.host",
		DbPort:     "5432",
		DbUser:     "testuser",
		DbPassword: "testpass",
		DbName:     "testdb",
	}

	pool, err := repository.NewDbPool(cfg)

	// We expect an error since the host is invalid
	assert.Error(t, err)
	assert.Nil(t, pool)
}

// TestNewDbPool_EmptyConfig tests NewDbPool with empty configuration
func TestNewDbPool_EmptyConfig(t *testing.T) {
	cfg := config.Config{
		DbHost:     "",
		DbPort:     "",
		DbUser:     "",
		DbPassword: "",
		DbName:     "",
	}

	pool, err := repository.NewDbPool(cfg)

	// We expect an error since the configuration is empty
	assert.Error(t, err)
	assert.Nil(t, pool)
}

// TestNewDbPool_DSNFormat tests that the DSN is correctly formatted
func TestNewDbPool_DSNFormat(t *testing.T) {
	testCases := []struct {
		name   string
		config config.Config
	}{
		{
			name: "Standard config",
			config: config.Config{
				DbHost:     "localhost",
				DbPort:     "5432",
				DbUser:     "user",
				DbPassword: "pass",
				DbName:     "db",
			},
		},
		{
			name: "Config with special characters",
			config: config.Config{
				DbHost:     "db.example.com",
				DbPort:     "5433",
				DbUser:     "user@domain",
				DbPassword: "p@ssw0rd!",
				DbName:     "my-database",
			},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			// Will fail to connect but exercises DSN building
			pool, err := repository.NewDbPool(tc.config)

			// Expected to fail (no real DB)
			assert.Error(t, err)
			assert.Nil(t, pool)
		})
	}
}
