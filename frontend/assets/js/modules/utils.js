/**
 * =====================================================================================================
 * PORTFOLIO - UTILITY FUNCTIONS MODULE
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: utils.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Shared helper functions used across multiple modules.
 *
 * Features:
 * - Element visibility forcing
 * - Animation delay removal
 * - Class manipulation utilities
 * - Reusable helper functions
 *
 * Dependencies: None - standalone utilities
 * Browser Support: ES6+ modules, modern browsers
 *
 * =====================================================================================================
 */

/**
 * Forces immediate visibility on elements to prevent animation flickering
 * This is critical for project cards that should be visible on page load
 *
 * @param {NodeList|Array|HTMLElement} elements - Element(s) to make visible
 * @param {Object} options - Configuration options
 * @param {boolean} options.removeAnimationDelay - Whether to remove animation-delay (default: true)
 * @param {boolean} options.addAnimateInClass - Whether to add 'animate-in' class (default: true)
 * @param {boolean} options.removeHiddenClass - Whether to remove 'project-hidden' class (default: true)
 */
export function forceElementVisibility(elements, options = {}) {
  const {
    removeAnimationDelay = true,
    addAnimateInClass = true,
    removeHiddenClass = true,
  } = options;

  // Handle single element or collection
  const elementArray =
    elements instanceof NodeList || Array.isArray(elements)
      ? Array.from(elements)
      : [elements];

  let processedCount = 0;

  for (const element of elementArray) {
    if (!element || !(element instanceof HTMLElement)) {
      continue;
    }

    // Remove animation-delay to prevent flickering
    if (removeAnimationDelay) {
      element.style.removeProperty('animation-delay');
    }

    // Force visibility with !important to override any CSS
    element.style.setProperty('opacity', '1', 'important');
    element.style.setProperty('transform', 'translateY(0)', 'important');
    element.style.setProperty('visibility', 'visible', 'important');

    // Add animate-in class
    if (addAnimateInClass) {
      element.classList.add('animate-in');
    }

    // Remove hidden class
    if (removeHiddenClass) {
      element.classList.remove('project-hidden');
    }

    processedCount++;
  }

  return processedCount;
}

/**
 * Forces visibility specifically for project cards
 * Wrapper function with project-specific defaults
 *
 * @param {NodeList|Array|HTMLElement} cards - Project card element(s)
 * @returns {number} Number of cards processed
 */
export function forceProjectCardVisibility(cards) {
  return forceElementVisibility(cards, {
    removeAnimationDelay: true,
    addAnimateInClass: true,
    removeHiddenClass: true,
  });
}
