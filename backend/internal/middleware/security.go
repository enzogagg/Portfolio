package middleware

import "github.com/gin-gonic/gin"

// SecurityHeaders returns a middleware that sets common security headers on responses
func SecurityHeaders() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("X-Content-Type-Options", "nosniff")
        c.Header("X-Frame-Options", "DENY")
        c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
        c.Header("Permissions-Policy", "geolocation=(), microphone=()")
        c.Header("X-Download-Options", "noopen")
        c.Header("X-Permitted-Cross-Domain-Policies", "none")
        // CSP report-only initially to detect violations without blocking
        c.Header("Content-Security-Policy-Report-Only", "default-src 'self'; script-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; report-uri /csp-report")

        // For POST requests with sensitive payloads, ensure responses are not cached
        if c.Request.Method == "POST" {
            c.Header("Cache-Control", "no-store")
        }

        c.Next()
    }
}
