/**
 * =====================================================================================================
 * PORTFOLIO - MAIN APPLICATION
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: app.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Main JavaScript application orchestrating all portfolio modules
 * with modular architecture and state management.
 *
 * Features:
 * - Modular architecture with ES6 import/export
 * - Apple-style mobile navigation management
 * - Smooth animations and transitions system
 * - Project filtering with persistent state
 * - WCAG accessibility manager
 * - Performance optimizations
 * - Centralized event management
 *
 * Dependencies: modules/navigation.js, modules/animations.js, modules/projects.js
 * Browser Support: ES6+ modules, modern browsers
 *
 * =====================================================================================================
 */

"use strict";

// Import all modules (theme module removed)
import {
  mobileNavigation,
  toggleMobileMenu,
  closeMobileMenu,
} from "./modules/navigation.js";
import { scrollAnimations } from "./modules/animations.js";
import { projectsFilter } from "./modules/projects.js";
import { accessibilityManager } from "./modules/accessibility.js";
import { performanceManager } from "./modules/performance.js";

/**
 * Portfolio Application Class
 * Main application controller that orchestrates all modules
 */
class PortfolioApp {
  isInitialized = false;

  constructor() {
    this.modules = {
      navigation: mobileNavigation,
      animations: scrollAnimations,
      projects: projectsFilter,
      accessibility: accessibilityManager,
      performance: performanceManager,
    };
  }

  /**
   * Initialize the entire application
   */
  async init() {
    if (this.isInitialized) {
      console.warn("Application already initialized");
      return;
    }

    console.info("🚀 Initializing Portfolio Application...");

    this.forceFilterVisibility();

    document.body.classList.add("js-enabled");

    try {
      await this.initializeCore();

      await this.initializePageFeatures();

      this.setupGlobalEvents();

      this.isInitialized = true;

      console.info("✅ Portfolio Application initialized successfully");
      this.logInitializationSummary();
    } catch (error) {
      console.error("❌ Error initializing application:", error);
      throw error;
    }
  }

  /**
   * Force filter buttons to be visible immediately (critical for Vercel)
   */
  forceFilterVisibility() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const filterContainer = document.querySelector(
      ".flex.flex-wrap.justify-center.gap-4.mb-20.animate-on-scroll",
    );
    const projectCards = document.querySelectorAll(
      ".project-card-enhanced, .project-card",
    );

    // Force filter buttons visibility
    for (const btn of filterButtons) {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
      btn.style.visibility = "visible";
      btn.style.display = "inline-flex";
      btn.classList.add("animate-in");
    }

    if (filterContainer) {
      filterContainer.style.opacity = "1";
      filterContainer.style.transform = "translateY(0)";
      filterContainer.style.visibility = "visible";
      filterContainer.classList.add("animate-in");
    }

    // CRITICAL: Force project cards to be visible IMMEDIATELY
    for (const card of projectCards) {
      // Remove animation-delay to prevent flickering
      card.style.removeProperty("animation-delay");
      card.style.setProperty("opacity", "1", "important");
      card.style.setProperty("transform", "translateY(0)", "important");
      card.style.setProperty("visibility", "visible", "important");
      card.classList.add("animate-in");
      card.classList.remove("project-hidden");
    }

    console.info(
      `🔧 Forced visibility: ${filterButtons.length} filters, ${projectCards.length} cards`,
    );
  }

  /**
   * Initialize core application features
   *
   * INITIALIZATION ORDER (Important):
   * 1. projects   - Initializes project cards visibility (Single Responsibility)
   * 2. navigation - Sets up mobile menu and navigation
   * 3. animations - Observes scroll animations (EXCLUDES project cards to avoid duplication)
   * 4. accessibility - Handles ARIA and keyboard navigation
   * 5. performance - Monitors and optimizes performance
   *
   * NOTE: Projects MUST initialize before animations to prevent race conditions.
   * The animations module explicitly excludes project cards from its observer.
   */
  async initializeCore() {
    // STEP 1: Initialize project cards (handled by projects module)
    this.modules.projects.init();

    // STEP 2-5: Initialize other modules
    this.modules.navigation.init();
    this.modules.animations.init();
    this.modules.accessibility.init();
    this.modules.performance.init();

    this.modules.accessibility.setInitialNavigationState();

    console.info("✅ Core features initialized");
  }

  /**
   * Header Auto-Hide Functionality
```
   */
  initializeHeaderAutoHide() {
    const header =
      document.getElementById("main-header") ||
      document.querySelector("header");
    if (!header) {
      console.info("Header not found, skipping auto-hide initialization");
      return;
    }

    let lastScrollY = window.scrollY;

    // Throttle scroll events for better performance
    const throttle = (func, delay) => {
      let timeoutId;
      let lastExecTime = 0;
      return function (...args) {
        const currentTime = Date.now();

        if (currentTime - lastExecTime > delay) {
          func.apply(this, args);
          lastExecTime = currentTime;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => func.apply(this, args), delay);
        }
      };
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100; // Start hiding after 100px of scroll

      // Don't hide header if we're at the top of the page
      if (currentScrollY < scrollThreshold) {
        header.classList.remove("header-hidden");
        header.classList.add("header-visible");
        lastScrollY = currentScrollY;
        return;
      }

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        // Scrolling down - hide header
        header.classList.add("header-hidden");
        header.classList.remove("header-visible");
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        header.classList.remove("header-hidden");
        header.classList.add("header-visible");
      }

      lastScrollY = currentScrollY;
    };

    // Use throttled scroll handler
    const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps

    // Add scroll event listener
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Initialize header state
    header.classList.add("header-visible");

    console.info("🎯 Header auto-hide functionality initialized");
  }

  /**
   * Initialize page-specific features
   */
  async initializePageFeatures() {
    // Initialize projects page if applicable
    if (this.isProjectsPage()) {
      this.modules.animations.initializeProjectsScrollAnimations();
    }

    console.info("✅ Page-specific features initialized");
  }

  /**
   * Setup global event listeners and expose global functions
   */
  setupGlobalEvents() {
    // Expose mobile menu functions globally
    globalThis.toggleMobileMenu = () => {
      this.modules.navigation.toggleMobileMenu();
    };

    globalThis.closeMobileMenu = () => {
      this.modules.navigation.closeMobileMenu();
    };

    // Handle page visibility changes for performance optimization
    document.addEventListener("visibilitychange", () => {
      this.modules.performance.handleVisibilityChange();
    });

    // Handle window resize for responsive adjustments
    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.modules.accessibility.handleResize();
      }, 150),
    );

    console.info("🔗 Global event listeners and functions setup complete");
  }

  /**
   * Debounce utility function
   * @param {Function} func Function to debounce
   * @param {number} wait Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Check if current page is the projects page
   * @returns {boolean} True if on projects page
   */
  isProjectsPage() {
    return (
      globalThis.location.pathname.includes("projects") ||
      document.querySelector(".projects-grid") !== null
    );
  }

  /**
   * Check if current page is the home page
   * @returns {boolean} True if on home page
   */
  isHomePage() {
    const path = globalThis.location.pathname;
    return path === "/" || path.endsWith("index.html") || path === "";
  }

  /**
   * Get application status
   * @returns {Object} Application status information
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      mobileMenuOpen: this.modules.navigation.isMenuOpen(),
      projectsFilterReady: this.modules.projects.isReady(),
      currentPage: this.getCurrentPageType(),
    };
  }

  /**
   * Get current page type
   * @returns {string} Page type identifier
   */
  getCurrentPageType() {
    if (this.isHomePage()) {
      return "home";
    }
    if (this.isProjectsPage()) {
      return "projects";
    }
    if (globalThis.location.pathname.includes("about")) {
      return "about";
    }
    if (globalThis.location.pathname.includes("contact")) {
      return "contact";
    }
    return "unknown";
  }

  /**
   * Log initialization summary
   */
  logInitializationSummary() {
    const status = this.getStatus();

    console.group("📊 Application Status");
    console.info("Initialized:", status.initialized);
    console.info("Page Type:", status.currentPage);
    console.info("Projects Filter Ready:", status.projectsFilterReady);
    console.groupEnd();
  }

  /**
   * Cleanup resources before page unload
   */
  cleanup() {
    if (this.modules.animations) {
      this.modules.animations.destroy();
    }

    console.info("🧹 Application cleanup completed");
  }

  /**
   * Restart application (useful for debugging)
   */
  async restart() {
    console.info("🔄 Restarting application...");

    this.cleanup();
    this.isInitialized = false;

    await this.init();
  }
}

// Create application instance
const app = new PortfolioApp();

/**
 * Initialize application immediately for production (Vercel)
 */
function initializeImmediately() {
  app.init().catch((error) => {
    console.error("Failed to initialize application:", error);
  });
}

/**
 * Initialize application when DOM is ready
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeImmediately);
} else {
  // DOM is already ready, initialize immediately
  initializeImmediately();
}

// Also initialize after a short delay to be absolutely sure
setTimeout(initializeImmediately, 50);

// Expose global functions for HTML compatibility (theme function removed)
globalThis.toggleMobileMenu = toggleMobileMenu;
globalThis.closeMobileMenu = closeMobileMenu;

// Expose app instance for debugging
globalThis.portfolioApp = app;

// Export for module use
export default app;
