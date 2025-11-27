/**
 * Portfolio Project Loader
 * Custom loader for the portfolio project page.
 */
(function () {
  const l = document.getElementById("l");
  const r = () => {
    if (l && l.parentNode) {
      l.style.opacity = "0";
      setTimeout(() => l.remove(), 500);
    }
  };
  window.addEventListener("load", r);
  setTimeout(r, 3000);
  document.body.style.overflow = "auto";
  document.body.className = "min-h-screen flex flex-col text-white";
})();
