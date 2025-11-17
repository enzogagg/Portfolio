```markdown
# Backend API

Base path: `/api/v1`

## Endpoints

### POST /api/v1/contact

Submit the contact form from the frontend.

- Content-Type: `application/json`
- Payload (exemple):

```json
{
  "name": "Enzo G.",
  "email": "enzo@example.com",
  "message": "Bonjour — je suis intéressé par votre travail",
  "subject": "Contact portfolio"
}
```

 - Responses:
  - `201 Created` — message stored / email sent (or enqueued)
  - `400 Bad Request` — invalid payload (missing required field, invalid email)
  - `500 Internal Server Error` — server / SMTP / DB error

- Exemple `curl`:

```bash
curl -X POST "${BACKEND_URL}:${BACKEND_PORT}/api/v1/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Hello","message":"Hi"}'
```

## Best practices

- Always set the `Content-Type: application/json` header.
- Validate fields on both frontend and backend.
- For browser testing, ensure the origin is allowed by CORS — see `CONFIG.md`.
