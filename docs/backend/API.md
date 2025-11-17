# Backend API

Base path: `/api/v1`

## Endpoints

### POST /api/v1/contact

Submit the contact form from the frontend.

- Content-Type: `application/json`
- Payload (example):

```json
{
  "name": "Enzo G.",
  "email": "enzo@example.com",
  "message": "Hello — I'm interested in your work",
  "subject": "Contact portfolio"
}
```

- Responses:
  - `201 Created` — message stored / email sent (or enqueued)
  - `400 Bad Request` — invalid payload (missing required field, invalid email)
  - `500 Internal Server Error` — server / SMTP / DB error

- Example `curl`:

```bash
curl -X POST "${BACKEND_URL}:${BACKEND_PORT}/api/v1/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Hello","message":"Hi"}'
```

## Best practices

- Always set the `Content-Type: application/json` header.
- Validate fields on both frontend and backend.
- For browser testing, ensure the origin is allowed by CORS — see [CONFIG.md](./CONFIG.md).

## Related Documentation

- [Backend Configuration](./CONFIG.md) - Environment variables and CORS setup
- [Testing Guide](./TESTS.md) - How to test the API
- [Architecture](./ARCHITECTURE.md) - Backend structure
- [Backend README](./README.md) - Quick start guide

---

**Last Updated**: 17 November 2025
