/**
 * =====================================================================================================
 * PORTFOLIO - ACCESSIBILITY MODULE
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: accessibility.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Accessibility management module with keyboard navigation,
 * focus management and WCAG 2.1 AA compliance.
 *
 * Features:
 * - Complete keyboard navigation (Tab, Enter, Escape)
 * - Focus management and skip links
 * - ARIA labels and live regions
 * - Visual focus indicators
 * - Screen reader support
 * - WCAG 2.1 level AA compliance
 *
 * Dependencies: None - standalone module
 * Browser Support: Modern browsers with ARIA support
 *
 * =====================================================================================================
 */

"use strict";

/**
 * Accessibility Manager
 * Handles keyboard navigation, focus management, and accessibility features
 */
export class AccessibilityManager {
  constructor() {
    this.isInitialized = false;
    // Don't initialize DOM elements in constructor
  }

  /**
   * Initialize accessibility features
   */
  init() {
    if (this.isInitialized) {
      return;
    }

    this.initializeKeyboardNavigation();
    this.initializeSmoothScroll();
    this.setupKeyboardShortcuts();
    this.isInitialized = true;

    console.info("✅ Accessibility features initialized");
  }

  /**
   * Enhance keyboard navigation accessibility
   * Shows focus indicators only when using keyboard navigation
   */
  initializeKeyboardNavigation() {
    // Track keyboard usage
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
      }
    });

    // Track mouse usage
    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-navigation");
    });
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
          return;
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active navigation states
        this.updateActiveNavigation(anchor);

        // Close mobile menu if open (import needed)
        import("./navigation.js").then(({ closeMobileMenu }) => {
          closeMobileMenu();
        });
      });
    });
  }

  /**
   * Setup keyboard shortcuts for better UX
   */
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Skip if user is typing in an input field
      if (
        e.target instanceof Element &&
        e.target.matches("input, textarea, [contenteditable]")
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "escape":
          // Close mobile menu
          import("./navigation.js").then(({ closeMobileMenu }) => {
            closeMobileMenu();
          });
          break;
        case "h":
          // Go to home/top
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;

        case "?":
          // Show keyboard shortcuts help (could be implemented)
          e.preventDefault();
          console.info("Keyboard shortcuts: H = Home, ESC = Close menu");
          break;
      }
    });
  }
  /**
   * Update active navigation link state
   * @param {Element} activeLink - The clicked navigation link
   */
  updateActiveNavigation(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll("nav a").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked link
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  /**
   * Set initial active navigation state based on current page
   */
  setInitialNavigationState() {
    const currentPath = window.location.pathname;
    const isHomePage =
      currentPath === "/" ||
      currentPath.endsWith("index.html") ||
      currentPath === "";

    if (isHomePage) {
      const homeLink = document.querySelector('nav a[href="#top"]');
      if (homeLink) {
        homeLink.classList.add("active");
      }
    }
  }

  /**
   * Improve focus management for modal dialogs or overlays
   * @param {Element} container - The container to trap focus within
   */
  trapFocus(container) {
    if (!container) {
      return;
    }

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    container.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });

    // Focus first element
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  /**
   * Announce content changes to screen readers
   * @param {string} message - The message to announce
   * @param {string} priority - The priority level ('polite' or 'assertive')
   */
  announceToScreenReader(message, priority = "polite") {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Create and export singleton instance
export const accessibilityManager = new AccessibilityManager();
