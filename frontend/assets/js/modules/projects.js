/**
 * =====================================================================================================
 * PORTFOLIO - PROJECTS MODULE
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: projects.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Project filtering module with smooth animations
 * and filter button state management.
 *
 * Features:
 * - Project filtering by technology
 * - Smooth show/hide animations
 * - Filter button state management
 * - Visible projects counter
 * - Filter state persistence
 * - Optimized CSS/JS transitions
 *
 * Dependencies: utils.js, config.js
 * Browser Support: ES6+ modules, modern browsers
 *
 * Responsibilities:
 * - Initialization and visibility of project cards (Single Responsibility)
 * - Filtering and animation of project cards
 * - Filter button state management
 *
 * =====================================================================================================
 */

"use strict";

import { forceProjectCardVisibility } from "./utils.js";
import { initState } from "./config.js";

/**
 * Projects Filter Manager
 * RESPONSIBLE FOR: All project cards initialization and filtering
 * Handles project filtering functionality and smooth animations
 */
export class ProjectsFilter {
  constructor() {
    this.filterButtons = [];
    this.projectCards = [];
    this.isInitialized = false;
  }

  /**
   * Initialize projects filtering if elements are present
   */
  init() {
    if (this.isInitialized) {
      console.log("⚠️ Projects filter already initialized");
      return;
    }

    console.log("🔍 Starting projects filter initialization...");

    let retryCount = 0;
    const maxRetries = 5;
    const initializeWhenReady = () => {
      this.filterButtons = document.querySelectorAll(".filter-btn");
      this.projectCards = document.querySelectorAll(
        ".project-card-enhanced, .project-card",
      );

      console.log(`🔍 Found ${this.filterButtons.length} filter buttons`);
      console.log(`🔍 Found ${this.projectCards.length} project cards`);
      for (const [index, btn] of Array.from(this.filterButtons).entries()) {
        console.log(
          `  Filter button ${index}: "${btn.textContent.trim()}" (data-filter: "${btn.dataset.filter}")`,
        );
      }

      for (const [index, card] of Array.from(this.projectCards).entries()) {
        console.log(
          `  Project card ${index}: ${card.className} (data-category: "${card.dataset.category}")`,
        );
      }
      if (this.filterButtons.length === 0 || this.projectCards.length === 0) {
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(
            `⚠️ Projects page elements not found, retrying ${retryCount}/${maxRetries} in 100ms...`,
          );
          setTimeout(initializeWhenReady, 100);
        } else {
          console.log(
            "ℹ️ Not on projects page, skipping filter initialization",
          );
        }
        return;
      }

      console.log("🎯 Initializing projects page functionality");

      this.ensureFilterVisibility();

      this.resetProjectCards();

      this.setupFilterButtons();
      this.isInitialized = true;

      initState.markInitialized("projectCards");

      console.log("✅ Projects page functionality initialized");
    };

    if (document.readyState === "loading") {
      console.log("📋 DOM still loading, waiting...");
      document.addEventListener("DOMContentLoaded", initializeWhenReady);
    } else {
      setTimeout(initializeWhenReady, 50);
    }
  }

  /**
   * Ensure filter buttons are visible regardless of animation state
   */
  ensureFilterVisibility() {
    for (const button of this.filterButtons) {
      button.style.opacity = "1";
      button.style.transform = "translateY(0)";
      button.style.visibility = "visible";

      if (button.classList.contains("animate-on-scroll")) {
        button.classList.add("animate-in");
      }
    }
    const filterContainer = document.querySelector(
      ".flex.flex-wrap.justify-center.gap-4.mb-20.animate-on-scroll",
    );
    if (filterContainer) {
      filterContainer.style.opacity = "1";
      filterContainer.style.transform = "translateY(0)";
      filterContainer.style.visibility = "visible";
      filterContainer.classList.add("animate-in");
    }

    console.log("🔧 Filter visibility ensured for production");
  }

  /**
   * Reset any existing inline styles that might interfere with CSS
   */
  resetProjectCards() {
    const processedCount = forceProjectCardVisibility(this.projectCards);
    console.log(
      `🔄 ${processedCount} project cards made immediately visible on load`,
    );
  }

  /**
   * Setup event listeners for filter buttons
   */
  setupFilterButtons() {
    console.log(`🎯 Setting up ${this.filterButtons.length} filter buttons`);
    console.log(`🎯 Found ${this.projectCards.length} project cards`);

    for (const [index, button] of Array.from(this.filterButtons).entries()) {
      console.log(
        `📌 Setting up button ${index}: "${button.textContent.trim()}" (data-filter: "${button.dataset.filter}")`,
      );

      button.replaceWith(button.cloneNode(true));
      const newButton = document.querySelectorAll(".filter-btn")[index];

      newButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const filter = newButton.dataset.filter;
        console.log(`🖱️ Filter button clicked: "${filter}"`);

        this.filterProjects(filter);
        this.updateActiveButton(newButton);
      });

      console.log(`✅ Event listener added to button ${index}`);
    }

    this.filterButtons = document.querySelectorAll(".filter-btn");
    console.log("🔄 Filter buttons setup complete");
  }

  /**
   * Filter project cards based on category
   * @param {string} filter - The filter category ('all' or specific category)
   */
  filterProjects(filter) {
    console.log(`Filtering projects by: ${filter}`);

    let showCount = 0;
    let hideCount = 0;

    for (const [index, card] of Array.from(this.projectCards).entries()) {
      const category = card.dataset.category;
      console.log(`Card ${index}: category="${category}", filter="${filter}"`);

      if (filter === "all" || category === filter) {
        this.showCard(card);
        showCount++;
      } else {
        this.hideCard(card);
        hideCount++;
      }
    }

    console.log(`Filter result: ${showCount} shown, ${hideCount} hidden`);
  }

  /**
   * Show a project card with smooth animation
   * @param {Element} card - The project card element
   */
  showCard(card) {
    console.log("🟢 Showing card:", card.className);

    card.classList.remove("project-hidden");
    card.style.display = "block";
    card.style.opacity = "1";
    card.style.transform = "scale(1)";
    card.style.visibility = "visible";
  }

  /**
   * Hide a project card with smooth animation
   * @param {Element} card - The project card element
   */
  hideCard(card) {
    console.log("🔴 Hiding card:", card.className);

    card.classList.add("project-hidden");
    card.style.display = "none";
    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";
    card.style.visibility = "hidden";
  }

  /**
   * Update active button state
   * @param {Element} activeButton - The clicked filter button
   */
  updateActiveButton(activeButton) {
    for (const btn of this.filterButtons) {
      btn.classList.remove("active");
    }
    activeButton.classList.add("active");
  }

  /**
   * Get currently active filter
   * @returns {string} The active filter category
   */
  getActiveFilter() {
    const activeButton = document.querySelector(".filter-btn.active");
    return activeButton ? activeButton.dataset.filter : "all";
  }

  /**
   * Set active filter programmatically
   * @param {string} filter - The filter to activate
   */
  setActiveFilter(filter) {
    const targetButton = document.querySelector(`[data-filter="${filter}"]`);
    if (targetButton) {
      this.filterProjects(filter);
      this.updateActiveButton(targetButton);
    }
  }

  /**
   * Reset filters to show all projects
   */
  resetFilters() {
    this.setActiveFilter("all");
  }

  /**
   * Test filtering functionality
   */
  testFiltering() {
    console.log("🧪 Testing filter: infrastructure");
    this.filterProjects("infrastructure");

    setTimeout(() => {
      console.log("🧪 Testing filter: all");
      this.filterProjects("all");
    }, 2000);
  }

  /**
   * Check if projects filter is initialized
   * @returns {boolean} True if initialized
   */
  isReady() {
    return this.isInitialized;
  }
}

// Create and export singleton instance
export const projectsFilter = new ProjectsFilter();
