/**
 * =====================================================================================================
 * PORTFOLIO - MODULE NAVIGATION
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Portfolio Personnel
 * File: navigation.js
 * Version: 2.1.0
 * Last Updated: July 2025
 *
 * Description:
 * Module de gestion de la navigation mobile avec menu hamburger
 * Apple-style et interactions clavier accessibles.
 *
 * Features:
 * - Menu hamburger avec animations fluides
 * - Navigation clavier accessible (ARIA)
 * - Fermeture automatique sur clic à l'extérieur
 * - Gestion d'état du menu mobile
 * - Auto-masquage du header au scroll
 * - Support complet de l'accessibilité
 *
 * Dependencies: Aucune - module autonome
 * Browser Support: ES6+ modules, modern browsers
 *
 * =====================================================================================================
 */

'use strict';

/**
 * Mobile Navigation Manager
 * Handles mobile menu state, animations, and interactions
 */
export class MobileNavigation {
  mobileMenu = null;
  burgerMenu = null;
  isOpen = false;
  isInitialized = false;

  /**
   * Initialize mobile navigation elements and event listeners
   */
  init() {
    if (this.isInitialized) {
      return;
    }

    this.mobileMenu = document.getElementById('mobile-menu');
    this.burgerMenu = document.querySelector('.burger-menu');

    if (!this.mobileMenu || !this.burgerMenu) {
      console.warn('Mobile navigation elements not found');
      return;
    }

    this.setupEventListeners();
    this.isInitialized = true;
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
