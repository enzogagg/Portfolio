/**
 * Security: Trusted Types Policy
 * Configures a default policy to allow DOM manipulation while satisfying CSP requirements.
 */
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  window.trustedTypes.createPolicy("default", {
    createHTML: (string) => string,
    createScript: (string) => string,
    createScriptURL: (string) => string,
  });
}
