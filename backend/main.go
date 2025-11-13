package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
		return
	}
	url := os.Getenv("BACKEND_URL")
	fmt.Println("Backend URL:", url)
}
