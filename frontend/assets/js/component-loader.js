/**
 * =====================================================================================================
 * COMPONENT LOADER - HTML INCLUDE SYSTEM
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: component-loader.js
 * Version: 1.0.0
 * Last Updated: November 2025
 *
 * Description:
 * Lightweight component system for loading shared HTML components (header, footer, etc.)
 * Automatically loads components marked with data-component attribute.
 *
 * Usage:
 * <div data-component="footer"></div>
 *
 * Features:
 * - Automatic component detection and loading
 * - Error handling with console warnings
 * - No dependencies required
 * - Fast and efficient
 *
 * =====================================================================================================
 */

(function () {
  "use strict";

  // Track loading state
  const loadingPromises = [];
  let isLoading = true;

  /**
   * Load a component from the components directory
   * @param {string} componentName - Name of the component file (without .html)
   * @param {HTMLElement} element - Element to replace with component content
   * @returns {Promise<void>}
   */
  async function loadComponent(componentName, element) {
    try {
      const response = await fetch(`components/${componentName}.html`);

      if (!response.ok) {
        throw new Error(
          `Failed to load component: ${componentName} (${response.status})`,
        );
      }

      const html = await response.text();
      element.outerHTML = html;

      // Dispatch custom event for component loaded
      document.dispatchEvent(
        new CustomEvent("componentLoaded", {
          detail: { componentName },
        }),
      );
    } catch (error) {
      console.error("Component loader error:", error);
      element.innerHTML = `<!-- Component "${componentName}" failed to load -->`;
    }
  }

  /**
   * Initialize component loader
   * Scans DOM for elements with data-component attribute
   * @returns {Promise<void>}
   */
  async function initComponentLoader() {
    const components = document.querySelectorAll("[data-component]");

    if (components.length === 0) {
      isLoading = false;
      return;
    }

    // Load all components and track promises
    const promises = Array.from(components).map((element) => {
      const componentName = element.getAttribute("data-component");
      if (componentName) {
        const promise = loadComponent(componentName, element);
        loadingPromises.push(promise);
        return promise;
      }
      return Promise.resolve();
    });

    // Wait for all components to load
    await Promise.all(promises);
    isLoading = false;

    // Dispatch event when all components are loaded
    document.dispatchEvent(new CustomEvent("allComponentsLoaded"));
  }

  /**
   * Wait for all components to be loaded
   * @returns {Promise<void>}
   */
  async function waitForComponents() {
    if (!isLoading) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      document.addEventListener("allComponentsLoaded", resolve, { once: true });
    });
  }

  // Expose waitForComponents globally for tests
  window.waitForComponents = waitForComponents;

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initComponentLoader);
  } else {
    initComponentLoader();
  }
})();
