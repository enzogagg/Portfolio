package tests_test

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	handlers "backend/api/handlers"
	"backend/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// mock implementation of the contact service
type mockContactService struct {
	called bool
	err    error
}

func (m *mockContactService) SubmitContactForm(ctx context.Context, form models.ContactForm) error {
	m.called = true
	return m.err
}

func TestHandleSendContactForm_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)

	svc := &mockContactService{}
	h := handlers.NewContactHandler(svc)

	router := gin.New()
	router.POST("/contact", h.HandleSendContactForm)

	payload := models.ContactForm{Name: "John", Email: "john@example.com", Subject: "Hello", Message: "Hi"}
	body, _ := json.Marshal(payload)
	req := httptest.NewRequest("POST", "/contact", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.True(t, svc.called, "service SubmitContactForm should be called")
}

func TestHandleSendContactForm_ValidationFail(t *testing.T) {
	gin.SetMode(gin.TestMode)

	svc := &mockContactService{}
	h := handlers.NewContactHandler(svc)

	router := gin.New()
	router.POST("/contact", h.HandleSendContactForm)

	// Missing email field
	payload := map[string]string{"name": "John", "subject": "Hello", "message": "Hi"}
	body, _ := json.Marshal(payload)
	req := httptest.NewRequest("POST", "/contact", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestHandleSendContactForm_InvalidJSON(t *testing.T) {
	gin.SetMode(gin.TestMode)

	svc := &mockContactService{}
	h := handlers.NewContactHandler(svc)

	router := gin.New()
	router.POST("/contact", h.HandleSendContactForm)

	// Invalid JSON
	req := httptest.NewRequest("POST", "/contact", bytes.NewReader([]byte("invalid json")))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.False(t, svc.called, "service should not be called with invalid JSON")
}

func TestHandleSendContactForm_ServiceError(t *testing.T) {
	gin.SetMode(gin.TestMode)

	svc := &mockContactService{err: assert.AnError}
	h := handlers.NewContactHandler(svc)

	router := gin.New()
	router.POST("/contact", h.HandleSendContactForm)

	payload := models.ContactForm{Name: "John", Email: "john@example.com", Subject: "Hello", Message: "Hi"}
	body, _ := json.Marshal(payload)
	req := httptest.NewRequest("POST", "/contact", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusInternalServerError, w.Code)
	assert.True(t, svc.called, "service should have been called")
}

func TestHandleSendContactForm_InvalidEmail(t *testing.T) {
	gin.SetMode(gin.TestMode)

	svc := &mockContactService{}
	h := handlers.NewContactHandler(svc)

	router := gin.New()
	router.POST("/contact", h.HandleSendContactForm)

	// Invalid email format
	payload := models.ContactForm{Name: "John", Email: "not-an-email", Subject: "Hello", Message: "Hi"}
	body, _ := json.Marshal(payload)
	req := httptest.NewRequest("POST", "/contact", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.False(t, svc.called, "service should not be called with invalid email")
}
