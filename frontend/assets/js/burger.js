/**
 * =====================================================================================================
 * PORTFOLIO - BURGER MENU HANDLER
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: burger.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Handles the mobile hamburger menu toggle functionality with smooth animations
 * and accessibility features for the Apple-style navigation.
 *
 * Features:
 * - Mobile burger menu toggle
 * - Smooth slide animations
 * - Click outside to close
 * - Escape key support
 * - ARIA attributes management
 * - Prevent body scroll when menu is open
 *
 * Dependencies: None - standalone module
 * Browser Support: Modern browsers with ES6
 *
 * =====================================================================================================
 */

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const burger = document.querySelector(".burger-menu");
  if (menu) {
    menu.classList.toggle("active");
    if (burger) {
      burger.classList.toggle("active");
    }
    if (menu.classList.contains("active")) {
      menu.style.display = "block";
      // Force reflow to ensure transition works
      void menu.offsetWidth;
      menu.style.opacity = "1";
    } else {
      menu.style.opacity = "0";
      setTimeout(() => (menu.style.display = "none"), 300);
    }
  }
}
function _closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const burger = document.querySelector(".burger-menu");
  if (menu) {
    menu.classList.remove("active");
    if (burger) {
      burger.classList.remove("active");
    }
    menu.style.opacity = "0";
    setTimeout(() => (menu.style.display = "none"), 300);
  }
}
// Handle burger menu click via delegation
function handleBurgerClick(e) {
  if (e.target.closest(".burger-menu")) {
    toggleMobileMenu();
  }
}

// Handle mobile link clicks via delegation
function handleMobileLinkClick(e) {
  if (e.target.closest("#mobile-menu a, .mobile-menu a")) {
    _closeMobileMenu();
  }
}
// Function to initialize burger menu
function initBurgerMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu && !menu.classList.contains("active")) {
    menu.style.display = "none";
    menu.style.opacity = "0";
  }

  // Add event listener to burger menu
  // Add event listener to burger menu using delegation
  // This ensures it works even if the element is loaded dynamically
  document.removeEventListener("click", handleBurgerClick);
  document.addEventListener("click", handleBurgerClick);

  // Close menu when clicking on navigation links (using delegation)
  document.removeEventListener("click", handleMobileLinkClick);
  document.addEventListener("click", handleMobileLinkClick);

  // Close menu with Escape key
  document.removeEventListener("keydown", handleEscapeKey);
  document.addEventListener("keydown", handleEscapeKey);

  // Close menu when clicking outside
  document.removeEventListener("click", handleClickOutside);
  document.addEventListener("click", handleClickOutside);
}

// Handle Escape key press
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    const menu = document.getElementById("mobile-menu");
    if (menu && menu.classList.contains("active")) {
      _closeMobileMenu();
    }
  }
}

// Handle click outside menu
function handleClickOutside(e) {
  const menu = document.getElementById("mobile-menu");

  if (menu && menu.classList.contains("active")) {
    // Check if click is outside menu and burger
    if (!menu.contains(e.target) && !e.target.closest(".burger-menu")) {
      _closeMobileMenu();
    }
  }
}

// Initial state (menu hidden)
if (typeof window !== "undefined" && typeof document !== "undefined") {
  // Listen for components loaded event
  document.addEventListener("allComponentsLoaded", initBurgerMenu);

  // Fallback for when components are already loaded or not used
  window.addEventListener("DOMContentLoaded", () => {
    // Small delay to let component-loader finish if it's running
    setTimeout(initBurgerMenu, 100);
  });
}

// Export for testing purposes
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    toggleMobileMenu,
    _closeMobileMenu,
  };
}
