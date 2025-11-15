#Step 1: build the backend service
FROM golang:1.25-alpine AS builder
WORKDIR /app/backend
COPY backend/ .
RUN go build -o app .

#Step 2: create the final image
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/backend/app .
COPY .env .env
EXPOSE 8080
CMD ["./app"]