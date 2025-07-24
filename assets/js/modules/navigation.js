// ========================================
// MOBILE NAVIGATION MODULE
// Handles mobile menu toggle and keyboard navigation
// ========================================

'use strict';

/**
 * Mobile Navigation Manager
 * Handles mobile menu state, animations, and interactions
 */
export class MobileNavigation {
  constructor() {
    this.mobileMenu = null;
    this.burgerMenu = null;
    this.isOpen = false;

    this.init();
  }

  /**
   * Initialize mobile navigation elements and event listeners
   */
  init() {
    this.mobileMenu = document.getElementById('mobile-menu');
    this.burgerMenu = document.querySelector('.burger-menu');

    if (!this.mobileMenu || !this.burgerMenu) {
      console.warn('Mobile navigation elements not found');
      return;
    }

    this.setupEventListeners();
    console.log('✅ Mobile navigation initialized');
  }

  /**
   * Setup event listeners for mobile navigation
   */
  setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.close();
      }
    });

    // Handle click outside menu
    document.addEventListener('click', (e) => {
      if (!this.burgerMenu.contains(e.target) && !this.mobileMenu.contains(e.target)) {
        this.close();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  /**
   * Toggle mobile menu visibility
   */
  toggle() {
    if (!this.mobileMenu || !this.burgerMenu) return;

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  /**
   * Open mobile menu
   */
  open() {
    if (!this.mobileMenu || !this.burgerMenu) return;

    this.mobileMenu.classList.add('active');
    this.burgerMenu.classList.add('active');
    document.body.classList.add('menu-open');
    this.isOpen = true;

    console.log('Mobile menu opened');
  }

  /**
   * Close mobile menu and reset states
   */
  close() {
    if (!this.mobileMenu || !this.burgerMenu) return;

    this.mobileMenu.classList.remove('active');
    this.burgerMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    this.isOpen = false;

    console.log('Mobile menu closed');
  }

  /**
   * Check if mobile menu is currently open
   * @returns {boolean} True if menu is open
   */
  isMenuOpen() {
    return this.isOpen;
  }
}

// Create and export singleton instance
export const mobileNavigation = new MobileNavigation();

// Export functions for backward compatibility with HTML onclick handlers
export function toggleMobileMenu() {
  mobileNavigation.toggle();
}

export function closeMobileMenu() {
  mobileNavigation.close();
}
