// Matomo tracking code
const _paq = globalThis._paq = globalThis._paq || [];
(function() {
  const cmds = [['trackPageView'], ['enableLinkTracking']];
  const u = "//192.168.100.46/";
  cmds.push(['setTrackerUrl', u + 'matomo.php'], ['setSiteId', '1']);
  _paq.push(...cmds);
  const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
})();
