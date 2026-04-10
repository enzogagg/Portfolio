package middleware

import "github.com/gin-gonic/gin"

// SecurityHeaders returns a middleware that sets common security headers on responses
func SecurityHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")
		c.Header("X-XSS-Protection", "1; mode=block")
		c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
		c.Header("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()")
		c.Header("X-Download-Options", "noopen")
		c.Header("X-Permitted-Cross-Domain-Policies", "none")

		// HSTS (Strict-Transport-Security) - 2 years
		c.Header("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")

		// COOP (Cross-Origin-Opener-Policy)
		c.Header("Cross-Origin-Opener-Policy", "same-origin")

		// COEP (Cross-Origin-Embedder-Policy) - Optional but good for isolation
		c.Header("Cross-Origin-Embedder-Policy", "require-corp")

		// Strict CSP matching frontend configuration
		c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-eval' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://unpkg.com https://cdn.jsdelivr.net https://matomo.ega.ovh; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; img-src 'self' data: https://matomo.ega.ovh; connect-src 'self' https://matomo.ega.ovh; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests; require-trusted-types-for 'script';")

		// For POST requests with sensitive payloads, ensure responses are not cached
		if c.Request.Method == "POST" {
			c.Header("Cache-Control", "no-store")
		}

		c.Next()
	}
}
