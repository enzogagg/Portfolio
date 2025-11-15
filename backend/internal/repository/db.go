package repository

import (
	"context"
	"fmt"
	"log"
	"time"

	"backend/config"

	"github.com/jackc/pgx/v5/pgxpool"
)

// NewDbPool creates and returns a new PostgreSQL connection pool
func NewDbPool(config config.Config) (*pgxpool.Pool, error) {

	// DSN format: postgresql://user:password@host:port/dbname
	dsn := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s",
		config.DbUser,
		config.DbPassword,
		config.DbHost,
		config.DbPort,
		config.DbName,
	)

	// Set a timeout context for the connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Create the connection pool
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		log.Printf("unable to connect to database: %v\n", err)
		return nil, err
	}

	// Test the connection
	if err := pool.Ping(ctx); err != nil {
		log.Printf("unable to ping the database: %v\n", err)
		return nil, err
	}

	log.Println("Connected to the database successfully")
	return pool, nil
}
