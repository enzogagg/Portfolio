package main

import (
	"log"
	"strings"

	"backend/api"
	"backend/api/handlers"
	"backend/config"
	"backend/internal/repository"
	"backend/internal/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	// Initialize database pool
	pool, err := repository.NewDbPool(*config)
	if err != nil {
		log.Fatalf("Error creating database pool: %v", err)
	}
	defer pool.Close()

	// Initialize repositories and services
	contactRepo := repository.NewContactRepository(pool)

	emailService := services.NewSMTPService(
		config.SmtpHost,
		config.SmtpPort,
		config.SmtpUser,
		config.SmtpPass,
		config.AdminEmail,
	)

	// Initialize handlers
	contactService := services.NewContactService(contactRepo, emailService)
	contactHandler := handlers.NewContactHandler(contactService)

	router := gin.Default()
	// Use trusted proxies from configuration (set via TRUSTED_PROXIES env var).
	// The config loader provides a default of "127.0.0.1" when unset.
	trusted := config.TrustedProxies
	if len(trusted) == 0 {
		trusted = []string{"127.0.0.1"}
	}
	if err := router.SetTrustedProxies(trusted); err != nil {
		log.Fatalf("Failed to set trusted proxies: %v", err)
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{config.FrontendURL, config.FrontendURL_Dev, "http://localhost", "http://127.0.0.1"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			// Allow configured origins
			if origin == config.FrontendURL || origin == config.FrontendURL_Dev {
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

	log.Printf("Starting server on port %s...", config.Port)
	if err := router.Run(":" + config.Port); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
