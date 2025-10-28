/**
 * =====================================================================================================
 * PORTFOLIO - CENTRALIZED CONFIGURATION
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: config.js
 * Version: 1.0.0
 * Last Updated: October 2025
 *
 * Description:
 * Centralized configuration to manage module responsibilities
 * and avoid initialization duplication/conflicts.
 *
 * Features:
 * - Shared selector configuration
 * - Module responsibility management
 * - Elimination of order dependencies
 * - Single Source of Truth for configuration
 *
 * Dependencies: None
 * Browser Support: ES6+ modules
 *
 * =====================================================================================================
 */

'use strict';

/**
 * Global application configuration
 */
export const APP_CONFIG = {
  // Shared CSS selectors
  selectors: {
    projectCards: '.project-card-enhanced, .project-card',
    filterButtons: '.filter-btn',
    filterContainer: '.flex.flex-wrap.justify-center.gap-4.mb-20.animate-on-scroll',
    animatedElements: '.animate-on-scroll, .fade-in',
    header: '#main-header, header'
  },

  // Animation configuration
  animations: {
    observerOptions: {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    },
    maxStaggerDelay: 0.3,
    excludeFromObserver: ['.project-card-enhanced', '.project-card']
  },

  // Project filtering configuration
  projects: {
    defaultCategory: 'all',
    animationDuration: 300
  },

  // Module responsibilities (Single Responsibility)
  responsibilities: {
    projectCards: 'projects',
    scrollAnimations: 'animations',
    coordination: 'app'
  }
};

/**
 * Shared initialization state
 * Allows modules to coordinate without order dependencies
 */
export class InitializationState {
  constructor() {
    this.initialized = {
      projectCards: false,
      animations: false,
      navigation: false,
      accessibility: false,
      performance: false
    };
    
    this.listeners = [];
  }

  /**
   * Marks a module as initialized
   */
  markInitialized(moduleName) {
    if (this.initialized.hasOwnProperty(moduleName)) {
      this.initialized[moduleName] = true;
      this.notifyListeners(moduleName);
    }
  }

  /**
   * Checks if a module is initialized
   */
  isInitialized(moduleName) {
    return this.initialized[moduleName] || false;
  }

  /**
   * Waits for a module to be initialized
   */
  waitFor(moduleName) {
    return new Promise((resolve) => {
      if (this.isInitialized(moduleName)) {
        resolve();
      } else {
        this.listeners.push({ moduleName, callback: resolve });
      }
    });
  }

  /**
   * Notifies listeners that a module is initialized
   */
  notifyListeners(moduleName) {
    this.listeners = this.listeners.filter(listener => {
      if (listener.moduleName === moduleName) {
        listener.callback();
        return false; // Remove the listener
      }
      return true; // Keep the listener
    });
  }

  /**
   * Checks if all modules are initialized
   */
  allInitialized() {
    return Object.values(this.initialized).every(value => value === true);
  }

  /**
   * Returns a summary of the initialization state
   */
  getSummary() {
    const total = Object.keys(this.initialized).length;
    const completed = Object.values(this.initialized).filter(Boolean).length;
    return {
      total,
      completed,
      pending: Object.keys(this.initialized).filter(k => !this.initialized[k]),
      percentage: Math.round((completed / total) * 100)
    };
  }
}

/**
 * Singleton instance of the initialization state
 */
export const initState = new InitializationState();

/**
 * Helper to check a module's responsibility
 */
export function isResponsibleFor(moduleName, responsibility) {
  return APP_CONFIG.responsibilities[responsibility] === moduleName;
}

/**
 * Helper to get the module responsible for a task
 */
export function getResponsibleModule(responsibility) {
  return APP_CONFIG.responsibilities[responsibility] || null;
}

console.log('📋 Centralized configuration loaded');
