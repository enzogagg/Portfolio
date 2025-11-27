/**
 * Matomo Analytics Initialization
 */
const _paq = (globalThis._paq = globalThis._paq || []);
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
const u = "https://matomo.ega.ovh/";
_paq.push(
  ["setCookieDomain", "*.portfolio.ega.ovh"],
  ["setDomains", ["*.portfolio.ega.ovh"]],
  ["trackPageView"],
  ["enableLinkTracking"],
  ["setTrackerUrl", u + "matomo.php"],
  ["setSiteId", "1"],
);
(function () {
  const d = document;
  const g = d.createElement("script");
  const s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = u + "matomo.js";
  s.parentNode.insertBefore(g, s);
})();
