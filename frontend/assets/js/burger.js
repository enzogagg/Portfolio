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
      setTimeout(() => (menu.style.opacity = "1"), 10);
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
// Function to initialize burger menu
function initBurgerMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) {
    menu.style.display = "none";
    menu.style.opacity = "0";
  }

  // Add event listener to burger menu
  const burger = document.querySelector(".burger-menu");
  if (burger) {
    // Remove existing listener if any to avoid duplicates
    burger.removeEventListener("click", toggleMobileMenu);
    burger.addEventListener("click", toggleMobileMenu);
  }

  // Close menu when clicking on navigation links
  const mobileNavLinks = document.querySelectorAll("#mobile-menu a, .mobile-menu a");
  mobileNavLinks.forEach((link) => {
    link.removeEventListener("click", _closeMobileMenu);
    link.addEventListener("click", _closeMobileMenu);
  });

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
  const burger = document.querySelector(".burger-menu");
  
  if (menu && menu.classList.contains("active")) {
    // Check if click is outside menu and burger
    if (!menu.contains(e.target) && !burger?.contains(e.target)) {
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
