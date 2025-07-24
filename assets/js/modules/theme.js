// ========================================
// THEME MANAGEMENT MODULE
// Handles light/dark theme switching and persistence
// ========================================

'use strict';

/**
 * Theme Management Module
 * Handles theme switching, persistence, and initialization
 */
export class ThemeManager {
  constructor() {
    this.storageKey = 'theme';
  }

  /**
   * Toggle between light and dark themes
   * Saves preference to localStorage and updates DOM classes
   */
  toggle() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    console.log('Toggle theme called. Current isDark:', isDark);

    if (isDark) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  /**
   * Set light theme
   */
  setLightTheme() {
    const html = document.documentElement;
    html.classList.remove('dark');
    html.classList.remove('bg-neutral-950', 'text-white');
    html.classList.add('bg-white', 'text-gray-900');
    localStorage.setItem(this.storageKey, 'light');
    console.log('Switched to light theme');
  }

  /**
   * Set dark theme
   */
  setDarkTheme() {
    const html = document.documentElement;
    html.classList.add('dark');
    html.classList.remove('bg-white', 'text-gray-900');
    html.classList.add('bg-neutral-950', 'text-white');
    localStorage.setItem(this.storageKey, 'dark');
    console.log('Switched to dark theme');
  }

  /**
   * Load saved theme from localStorage or default to light
   * Applies theme on initial page load
   */
  load() {
    const savedTheme = localStorage.getItem(this.storageKey) || 'light';
    const html = document.documentElement;

    console.log('Loading theme:', savedTheme);

    if (savedTheme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('bg-white', 'text-gray-900');
      html.classList.add('bg-neutral-950', 'text-white');
    } else {
      html.classList.remove('dark');
      html.classList.remove('bg-neutral-950', 'text-white');
      html.classList.add('bg-white', 'text-gray-900');
    }

    console.log('Theme loaded. Current classes:', html.className);
  }

  /**
   * Get current theme
   * @returns {string} Current theme ('light' or 'dark')
   */
  getCurrentTheme() {
    return localStorage.getItem(this.storageKey) || 'light';
  }

  /**
   * Check if current theme is dark
   * @returns {boolean} True if dark theme is active
   */
  isDarkTheme() {
    return document.documentElement.classList.contains('dark');
  }
}

// Create and export singleton instance
export const themeManager = new ThemeManager();

// Export functions for backward compatibility with HTML onclick handlers
export function toggleTheme() {
  themeManager.toggle();
}
