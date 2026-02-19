#Step 1: build the backend service
FROM golang:1.25-alpine AS builder
RUN apk add --no-cache ca-certificates tzdata
WORKDIR /app/backend

COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o app .


FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
WORKDIR /app
COPY --from=builder /app/backend/app .
EXPOSE 8080
CMD ["./app"]