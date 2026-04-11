package main

import (
	"log"
	"strings"

	"backend/api"
	"backend/api/handlers"
	"backend/config"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	// Initialize database pool
	pool, err := repository.NewDbPool(*cfg)
	if err != nil {
		log.Fatalf("Error creating database pool: %v", err)
	}
	defer pool.Close()

	// Initialize repositories and services
	contactRepo := repository.NewContactRepository(pool)

	emailService := services.NewSMTPService(
		cfg.SmtpHost,
		cfg.SmtpPort,
		cfg.SmtpUser,
		cfg.SmtpPass,
		cfg.AdminEmail,
	)

	// Initialize handlers
	contactService := services.NewContactService(contactRepo, emailService)
	contactHandler := handlers.NewContactHandler(contactService)

	// Ensure Gin runs in release mode in production; set mode before creating the router
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	// Apply security headers middleware to all responses
	router.Use(middleware.SecurityHeaders())

	// Use trusted proxies from configuration (set via TRUSTED_PROXIES env var).
	// The config loader provides a default of "127.0.0.1" when unset.
	trusted := cfg.TrustedProxies
	if len(trusted) == 0 {
		trusted = []string{"127.0.0.1"}
	}
	if err := router.SetTrustedProxies(trusted); err != nil {
		log.Fatalf("Failed to set trusted proxies: %v", err)
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.FrontendURL, cfg.FrontendURL_Dev, "http://localhost", "http://127.0.0.1"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			// Allow configured origins
			if origin == cfg.FrontendURL || origin == cfg.FrontendURL_Dev {
				return true
			}
			// Allow localhost with any port (http://localhost:*) and 127.0.0.1
			if strings.HasPrefix(origin, "http://localhost") || strings.HasPrefix(origin, "http://127.0.0.1") {
				return true
			}
			return false
		},
	}))

	api.RegisterRoutes(router, contactHandler)

	log.Printf("Starting server on port %s...", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
