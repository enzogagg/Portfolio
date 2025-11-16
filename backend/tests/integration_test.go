//go:build integration
// +build integration

package tests_test

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"backend/api/handlers"
	"backend/config"
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type IntegrationTestSuite struct {
	suite.Suite
	db     *pgxpool.Pool
	router *gin.Engine
}

func (suite *IntegrationTestSuite) SetupSuite() {
	// Load config
	cfg, err := config.LoadConfig()
	if err != nil {
		suite.T().Fatalf("Unable to load config: %v", err)
	}

	// Connect to test database
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s",
		cfg.DbUser, cfg.DbPassword, cfg.DbHost, cfg.DbPort, cfg.DbName)

	pool, err := pgxpool.New(ctx, dbURL)
	if err != nil {
		suite.T().Fatalf("Unable to connect to database: %v", err)
	}

	if err := pool.Ping(ctx); err != nil {
		suite.T().Fatalf("Unable to ping database: %v", err)
	}

	suite.db = pool

	// Setup router
	gin.SetMode(gin.TestMode)
	suite.router = gin.New()

	// Create real services (but mock SMTP to avoid sending real emails)
	contactRepo := repository.NewContactRepository(suite.db)
	emailService := &mockEmailServiceIntegration{}
	contactService := services.NewContactService(contactRepo, emailService)
	contactHandler := handlers.NewContactHandler(contactService)

	suite.router.POST("/api/v1/contact", contactHandler.HandleSendContactForm)
}

func (suite *IntegrationTestSuite) TearDownSuite() {
	if suite.db != nil {
		suite.db.Close()
	}
}

func (suite *IntegrationTestSuite) SetupTest() {
	// Clean up test data before each test
	_, err := suite.db.Exec(context.Background(), "TRUNCATE TABLE contact_submissions RESTART IDENTITY")
	if err != nil {
		suite.T().Logf("Warning: Could not truncate table: %v", err)
	}
}

// Mock email service for integration tests
type mockEmailServiceIntegration struct{}

func (m *mockEmailServiceIntegration) SendContactEmail(contact models.ContactForm) error {
	// Don't send real emails in tests
	return nil
}

func (suite *IntegrationTestSuite) TestContactSubmission_EndToEnd() {
	form := models.ContactForm{
		Name:    "Integration Test",
		Email:   "integration@test.com",
		Subject: "Test Subject",
		Message: "This is an integration test message",
	}

	body, _ := json.Marshal(form)
	req := httptest.NewRequest("POST", "/api/v1/contact", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	suite.router.ServeHTTP(w, req)

	assert.Equal(suite.T(), http.StatusOK, w.Code)

	// Verify data was inserted in database
	var count int
	err := suite.db.QueryRow(context.Background(),
		"SELECT COUNT(*) FROM contact_submissions WHERE email = $1", form.Email).Scan(&count)
	assert.NoError(suite.T(), err)
	assert.Equal(suite.T(), 1, count)
}

func (suite *IntegrationTestSuite) TestContactSubmission_InvalidData() {
	// Missing required email field
	payload := map[string]string{
		"name":    "Test",
		"subject": "Test",
		"message": "Test",
	}

	body, _ := json.Marshal(payload)
	req := httptest.NewRequest("POST", "/api/v1/contact", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	suite.router.ServeHTTP(w, req)

	assert.Equal(suite.T(), http.StatusBadRequest, w.Code)

	// Verify no data was inserted
	var count int
	err := suite.db.QueryRow(context.Background(),
		"SELECT COUNT(*) FROM contact_submissions").Scan(&count)
	assert.NoError(suite.T(), err)
	assert.Equal(suite.T(), 0, count)
}

func TestIntegrationTestSuite(t *testing.T) {
	if os.Getenv("RUN_INTEGRATION_TESTS") != "true" {
		t.Skip("Skipping integration tests. Set RUN_INTEGRATION_TESTS=true to run them.")
	}
	suite.Run(t, new(IntegrationTestSuite))
}
