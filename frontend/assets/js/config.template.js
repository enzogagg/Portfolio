// Generated at container start from environment using envsubst
// Use simple variable placeholders; defaults are applied by the container startup script
// Provides the base URL for the API used by frontend JS
// When left empty, it uses relative routing through the Nginx reverse proxy (/api/...) 
// preventing all CORS, Mixed-Content and CSP issues.
window.API_BASE = "";

// Example: window.API_BASE = "http://localhost:8080"
