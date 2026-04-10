/**
 * Global Loader Initialization
 * Handles the removal of the preloader screen.
 */
(function () {
  const loader = document.getElementById("global-loader");
  const removeLoader = () => {
    if (loader && loader.parentNode) {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(() => loader.remove(), 500);
    }
  };

  window.addEventListener("load", removeLoader);

  // Safety fallback: force remove after 3s if load event hangs
  setTimeout(removeLoader, 3000);
})();
