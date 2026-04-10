package api

import (
	"net/http"

	"backend/api/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine, contactHandler *handlers.ContactHandler) {
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	})

	apiV1 := router.Group("/api/v1")
	{
		apiV1.POST("/contact", contactHandler.HandleSendContactForm)
	}
}
