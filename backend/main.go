package main

import (
	"log"

	"backend/api"
	"backend/api/handlers"
	"backend/config"
	"backend/internal/repository"
	"backend/internal/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config, error := config.LoadConfig()
	if error != nil {
		log.Fatalf("Error loading config: %v", error)
	}

	// Initialize database pool
	pool, error := repository.NewDbPool(*config)
	if error != nil {
		log.Fatalf("Error creating database pool: %v", error)
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
	if err := router.SetTrustedProxies([]string{"192.168.100.59", "127.0.0.1"}); err != nil {
		log.Fatalf("Failed to set trusted proxies: %v", err)
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{config.FrontendURL, config.FrontendURL_Dev},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	api.RegisterRoutes(router, contactHandler)

	log.Printf("Starting server on port %s...", config.Port)
	if error := router.Run(":" + config.Port); error != nil {
		log.Fatalf("Error starting server: %v", error)
	}
}
