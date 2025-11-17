package config

import (
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Port             string   // Port on which the backend server will run
	URL              string   // Backend URL
	SmtpHost         string   // SMTP server host
	SmtpPort         string   // SMTP server port
	SmtpUser         string   // SMTP server username
	SmtpPass         string   // SMTP server password
	FrontendURL      string   // Frontend URL for CORS settings
	FrontendPort     string   // Frontend port for CORS settings
	FrontendURL_Dev  string   // Frontend URL for development environment
	FrontendPort_Dev string   // Frontend port for development environment
	AdminEmail       string   // Admin email address to receive contact form messages
	DbHost           string   // Database host
	DbPort           string   // Database port
	DbUser           string   // Database user
	DbPassword       string   // Database password
	DbName           string   // Database name
	TrustedProxies   []string // Trusted proxy IPs (used by Gin)
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		log.Printf("no .env file loaded: %v, relying on environment variables", err)
	}
	config := &Config{
		Port:             getEnv("BACKEND_PORT", "8080"),
		URL:              getEnv("BACKEND_URL", "http://localhost:8080"),
		SmtpHost:         getEnv("SMTP_HOST", "smtp.example.com"),
		SmtpPort:         getEnv("SMTP_PORT", "587"),
		SmtpUser:         getEnv("SMTP_USER", ""),
		SmtpPass:         getEnv("SMTP_PASSWORD", ""),
		FrontendURL:      getEnv("FRONTEND_URL", "http://localhost:3000"),
		FrontendPort:     getEnv("FRONTEND_PORT", "3000"),
		FrontendURL_Dev:  getEnv("FRONTEND_URL_DEV", "http://localhost:3000"),
		FrontendPort_Dev: getEnv("FRONTEND_PORT_DEV", "3000"),
		AdminEmail:       getEnv("ADMIN_EMAIL", ""),
		DbHost:           getEnv("DB_HOST", ""),
		DbPort:           getEnv("DB_PORT", ""),
		DbUser:           getEnv("DB_BACKEND_USER", ""),
		DbPassword:       getEnv("DB_BACKEND_PASSWORD", ""),
		DbName:           getEnv("DB_NAME", ""),
	}
	// Parse trusted proxies from env var (comma-separated). Default to localhost.
	proxies := getEnv("TRUSTED_PROXIES", "127.0.0.1")
	if proxies == "" {
		config.TrustedProxies = []string{"127.0.0.1"}
	} else {
		parts := strings.Split(proxies, ",")
		for i := range parts {
			parts[i] = strings.TrimSpace(parts[i])
		}
		config.TrustedProxies = parts
	}
	return config, nil
}
