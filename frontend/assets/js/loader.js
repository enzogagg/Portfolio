/**
 * =====================================================================================================
 * PORTFOLIO - PAGE LOADER
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: loader.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Handles the minimal page loader animation and fade-out effect
 * after the page has fully loaded.
 *
 * Features:
 * - Minimal loader overlay
 * - Smooth fade-out animation
 * - Automatic removal after load
 * - Non-blocking page display
 *
 * Dependencies: None - standalone module
 * Browser Support: Modern browsers
 *
 * =====================================================================================================
 */

/**
 * Hide the loader with animation
 */
function hideLoader() {
  const loader = document.querySelector(".minimal-loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}

// Listen for components loaded event
document.addEventListener("allComponentsLoaded", () => {
  // Give a small delay to ensure everything is rendered
  setTimeout(() => {
    if (document.readyState === "complete") {
      hideLoader();
    }
  }, 100);
});

// Fallback: hide loader after window load
window.addEventListener("load", hideLoader);
