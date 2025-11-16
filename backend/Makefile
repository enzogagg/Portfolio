.PHONY: help test unit integration lint coverage clean

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

test: unit ## Run all unit tests

unit: ## Run unit tests
	@echo "🧪 Running unit tests..."
	go test -v -race -coverprofile=coverage.out -coverpkg=./... ./tests/...

integration: ## Run integration tests (requires Docker Compose)
	@echo "🧪 Running integration tests..."
	@echo "⚠️  Make sure docker compose is running with 'docker compose up -d'"
	@if [ ! -f ../.env ]; then \
		echo "❌ Error: ../.env file not found!"; \
		exit 1; \
	fi
	@export $$(cat ../.env | grep -v '^#' | xargs) && \
	RUN_INTEGRATION_TESTS=true \
	DB_HOST=localhost \
	go test -v -tags=integration ./tests/integration_test.go

coverage: unit ## Generate and display coverage report
	@echo "📊 Coverage report:"
	go tool cover -func=coverage.out
	@echo "\n📈 To view the HTML report, run: make coverage-html"

coverage-html: unit ## Generate an HTML coverage report
	@echo "📊 Generating HTML report..."
	go tool cover -html=coverage.out -o coverage.html
	@echo "✅ Report generated: backend/coverage.html"

lint: ## Check code with golangci-lint
	@echo "🔍 Checking code..."
	golangci-lint run --timeout=5m

fmt: ## Format code with gofmt and goimports
	@echo "✨ Formatting code..."
	go fmt ./...
	goimports -w . || true

vet: ## Static code analysis
	@echo "🔎 Static analysis..."
	go vet ./...

clean: ## Clean build and test files
	@echo "🧹 Cleaning..."
	rm -f coverage.out coverage.html
	go clean -testcache

deps: ## Install dependencies
	@echo "📦 Installing dependencies..."
	go mod download
	go mod verify

tidy: ## Clean up go.mod and go.sum
	@echo "🧹 Cleaning up dependencies..."
	go mod tidy

test-ci: ## Simulate CI pipeline
	@echo "🤖 Simulating CI pipeline..."
	@make clean
	@make deps
	@make lint || true
	@make test
	@make coverage

docker-test: ## Run tests in Docker Compose
	@echo "🐳 Running tests with Docker..."
	docker compose up -d db
	@sleep 5
	@make integration
	docker compose down

quick-test: ## Run quick tests without race detector
	@echo "⚡ Quick tests..."
	go test ./tests/handler_contact_test.go ./tests/service_contact_test.go ./tests/repository_contact_test.go

bench: ## Run benchmarks
	@echo "📊 Benchmarks..."
	go test -bench=. -benchmem ./...

watch: ## Run tests in watch mode (requires gotestsum)
	@echo "👀 Watch mode enabled..."
	gotestsum --watch -- -race ./tests/
