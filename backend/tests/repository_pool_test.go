package tests_test

import (
	"testing"

	"backend/internal/repository"

	"github.com/stretchr/testify/assert"
)

// TestNewContactRepositoryFromPool tests the factory wrapper method
// This function is a simple wrapper around NewContactRepository
// We test it with nil to ensure it creates the repository structure
func TestNewContactRepositoryFromPool(t *testing.T) {
	// Pass nil since we're just testing the wrapper function
	// In production, this would receive a valid pool
	repo := repository.NewContactRepositoryFromPool(nil)

	assert.NotNil(t, repo)
}
