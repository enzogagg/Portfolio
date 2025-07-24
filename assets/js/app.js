// ========================================
// PORTFOLIO MAIN APPLICATION
// Modern Modular Portfolio Website
// Author: Enzo Gaggiotti
// ========================================

'use strict';

// Import all modules
import { themeManager, toggleTheme } from './modules/theme.js';
import { mobileNavigation, toggleMobileMenu, closeMobileMenu } from './modules/navigation.js';
import { scrollAnimations } from './modules/animations.js';
import { projectsFilter } from './modules/projects.js';
import { accessibilityManager } from './modules/accessibility.js';
import { performanceManager } from './modules/performance.js';

/**
 * Portfolio Application Class
 * Main application controller that orchestrates all modules
 */
class PortfolioApp {
  constructor() {
    this.isInitialized = false;
    this.modules = {
      theme: themeManager,
      navigation: mobileNavigation,
      animations: scrollAnimations,
      projects: projectsFilter,
      accessibility: accessibilityManager,
      performance: performanceManager
    };
  }

  /**
   * Initialize the entire application
   */
  async init() {
    if (this.isInitialized) {
      console.warn('Application already initialized');
      return;
    }

    console.log('🚀 Initializing Portfolio Application...');

    // Add js-enabled class for progressive enhancement
    document.body.classList.add('js-enabled');

    try {
      // Initialize core functionality first
      await this.initializeCore();

      // Initialize page-specific features
      await this.initializePageFeatures();

      // Setup global event listeners
      this.setupGlobalEvents();

      // Mark as initialized
      this.isInitialized = true;

      console.log('✅ Portfolio Application initialized successfully');
      this.logInitializationSummary();

    } catch (error) {
      console.error('❌ Error initializing application:', error);
      throw error;
    }
  }

  /**
   * Initialize core application features
   */
  async initializeCore() {
    // Initialize all modules explicitly
    this.modules.theme.load();
    this.modules.navigation.init();
    this.modules.animations.init();
    this.modules.projects.init();
    this.modules.accessibility.init();
    this.modules.performance.init();
    
    // Set initial navigation state
    this.modules.accessibility.setInitialNavigationState();

    console.log('✅ Core features initialized');
  }

  /**
   * Initialize page-specific features
   */
  async initializePageFeatures() {
    // Initialize projects page if applicable
    if (this.isProjectsPage()) {
      this.modules.animations.initializeProjectsScrollAnimations();
    }

    console.log('✅ Page-specific features initialized');
  }

  /**
   * Setup global event listeners and expose global functions
   */
  setupGlobalEvents() {
    // Expose theme toggle function globally for HTML onclick handlers
    window.toggleTheme = () => {
      this.modules.theme.toggle();
    };

    // Expose mobile menu functions globally
    window.toggleMobileMenu = () => {
      this.modules.navigation.toggleMobileMenu();
    };

    window.closeMobileMenu = () => {
      this.modules.navigation.closeMobileMenu();
    };

    // Handle page visibility changes for performance optimization
    document.addEventListener('visibilitychange', () => {
      this.modules.performance.handleVisibilityChange();
    });

    // Handle window resize for responsive adjustments
    window.addEventListener('resize', this.debounce(() => {
      this.modules.accessibility.handleResize();
    }, 150));

    console.log('🔗 Global event listeners and functions setup complete');
  }

  /**
   * Check if current page is the projects page
   * @returns {boolean} True if on projects page
   */
  isProjectsPage() {
    return window.location.pathname.includes('projects') ||
           document.querySelector('.projects-grid') !== null;
  }

  /**
   * Check if current page is the home page
   * @returns {boolean} True if on home page
   */
  isHomePage() {
    const path = window.location.pathname;
    return path === '/' || path.endsWith('index.html') || path === '';
  }

  /**
   * Get application status
   * @returns {Object} Application status information
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      currentTheme: this.modules.theme.getCurrentTheme(),
      mobileMenuOpen: this.modules.navigation.isMenuOpen(),
      projectsFilterReady: this.modules.projects.isReady(),
      currentPage: this.getCurrentPageType()
    };
  }

  /**
   * Get current page type
   * @returns {string} Page type identifier
   */
  getCurrentPageType() {
    if (this.isHomePage()) return 'home';
    if (this.isProjectsPage()) return 'projects';
    if (window.location.pathname.includes('about')) return 'about';
    if (window.location.pathname.includes('contact')) return 'contact';
    return 'unknown';
  }

  /**
   * Log initialization summary
   */
  logInitializationSummary() {
    const status = this.getStatus();

    console.group('📊 Application Status');
    console.log('Initialized:', status.initialized);
    console.log('Current Theme:', status.currentTheme);
    console.log('Page Type:', status.currentPage);
    console.log('Projects Filter Ready:', status.projectsFilterReady);
    console.groupEnd();
  }

  /**
   * Cleanup resources before page unload
   */
  cleanup() {
    if (this.modules.animations) {
      this.modules.animations.destroy();
    }

    console.log('🧹 Application cleanup completed');
  }

  /**
   * Restart application (useful for debugging)
   */
  async restart() {
    console.log('🔄 Restarting application...');

    this.cleanup();
    this.isInitialized = false;

    await this.init();
  }
}

// Create application instance
const app = new PortfolioApp();

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  app.init().catch(error => {
    console.error('Failed to initialize application:', error);
  });
});

// Expose global functions for HTML compatibility
globalThis.toggleTheme = toggleTheme;
globalThis.toggleMobileMenu = toggleMobileMenu;
globalThis.closeMobileMenu = closeMobileMenu;

// Expose app instance for debugging
if (typeof window !== 'undefined') {
  window.portfolioApp = app;
}

// Export for module use
export default app;
