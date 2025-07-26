// ========================================
// PROJECTS FILTERING MODULE
// Handles project card filtering and animations
// ========================================

'use strict';

/**
 * Projects Filter Manager
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
    // Only initialize once
    if (this.isInitialized) {
      console.log('⚠️ Projects filter already initialized');
      return;
    }

    console.log('🔍 Starting projects filter initialization...');

    // Force wait for DOM to be fully loaded
    const initializeWhenReady = () => {
      this.filterButtons = document.querySelectorAll('.filter-btn');
      this.projectCards = document.querySelectorAll('.project-card-enhanced, .project-card');

      console.log(`🔍 Found ${this.filterButtons.length} filter buttons`);
      console.log(`🔍 Found ${this.projectCards.length} project cards`);

      // Debug: Log each found element
      this.filterButtons.forEach((btn, index) => {
        console.log(`  Filter button ${index}: "${btn.textContent.trim()}" (data-filter: "${btn.dataset.filter}")`);
      });

      this.projectCards.forEach((card, index) => {
        console.log(`  Project card ${index}: ${card.className} (data-category: "${card.dataset.category}")`);
      });

      // Only initialize if we're on the projects page
      if (this.filterButtons.length === 0 || this.projectCards.length === 0) {
        console.log('⚠️ Projects page elements not found, retrying in 100ms...');
        setTimeout(initializeWhenReady, 100);
        return;
      }

      console.log('🎯 Initializing projects page functionality');

      // Ensure filter buttons are always visible (critical for Vercel)
      this.ensureFilterVisibility();

      this.resetProjectCards();
      this.setupFilterButtons();
      this.isInitialized = true;

      console.log('✅ Projects page functionality initialized');

      // Test filtering immediately
      setTimeout(() => {
        console.log('🧪 Testing filter functionality...');
        this.testFiltering();
      }, 500);
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      console.log('📋 DOM still loading, waiting...');
      document.addEventListener('DOMContentLoaded', initializeWhenReady);
    } else {
      // DOM is already ready, but wait a bit more to be sure
      setTimeout(initializeWhenReady, 50);
    }
  }

  /**
   * Ensure filter buttons are visible regardless of animation state
   */
  ensureFilterVisibility() {
    this.filterButtons.forEach(button => {
      // Force visibility
      button.style.opacity = '1';
      button.style.transform = 'translateY(0)';
      button.style.visibility = 'visible';

      // Add animate-in class if it has animate-on-scroll
      if (button.classList.contains('animate-on-scroll')) {
        button.classList.add('animate-in');
      }
    });

    // Also ensure the container is visible
    const filterContainer = document.querySelector('.flex.flex-wrap.justify-center.gap-4.mb-20.animate-on-scroll');
    if (filterContainer) {
      filterContainer.style.opacity = '1';
      filterContainer.style.transform = 'translateY(0)';
      filterContainer.style.visibility = 'visible';
      filterContainer.classList.add('animate-in');
    }

    console.log('🔧 Filter visibility ensured for production');
  }

  /**
   * Reset any existing inline styles that might interfere with CSS
   */
  resetProjectCards() {
    this.projectCards.forEach(card => {
      card.style.display = '';
      card.style.opacity = '';
      card.style.transform = '';
      card.style.visibility = '';
      card.classList.remove('project-hidden', 'project-filtering');
    });

    console.log('🔄 Project cards reset to default state');
  }

  /**
   * Setup event listeners for filter buttons
   */
  setupFilterButtons() {
    console.log(`🎯 Setting up ${this.filterButtons.length} filter buttons`);
    console.log(`🎯 Found ${this.projectCards.length} project cards`);

    this.filterButtons.forEach((button, index) => {
      console.log(`📌 Setting up button ${index}: "${button.textContent.trim()}" (data-filter: "${button.dataset.filter}")`);

      // Remove any existing event listeners
      button.replaceWith(button.cloneNode(true));
      const newButton = document.querySelectorAll('.filter-btn')[index];

      newButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const filter = newButton.dataset.filter;
        console.log(`🖱️ Filter button clicked: "${filter}"`);

        this.filterProjects(filter);
        this.updateActiveButton(newButton);
      });

      console.log(`✅ Event listener added to button ${index}`);
    });

    // Update our reference to the new buttons
    this.filterButtons = document.querySelectorAll('.filter-btn');
    console.log('🔄 Filter buttons setup complete');
  }

  /**
   * Filter project cards based on category
   * @param {string} filter - The filter category ('all' or specific category)
   */
  filterProjects(filter) {
    console.log(`Filtering projects by: ${filter}`);

    let showCount = 0;
    let hideCount = 0;

    this.projectCards.forEach((card, index) => {
      const category = card.dataset.category;
      console.log(`Card ${index}: category="${category}", filter="${filter}"`);

      if (filter === 'all' || category === filter) {
        this.showCard(card);
        showCount++;
      } else {
        this.hideCard(card);
        hideCount++;
      }
    });

    console.log(`Filter result: ${showCount} shown, ${hideCount} hidden`);
  }

  /**
   * Show a project card with smooth animation
   * @param {Element} card - The project card element
   */
  showCard(card) {
    console.log('🟢 Showing card:', card.className);

    // Remove hidden class immediately
    card.classList.remove('project-hidden');
    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
    card.style.visibility = 'visible';
  }

  /**
   * Hide a project card with smooth animation
   * @param {Element} card - The project card element
   */
  hideCard(card) {
    console.log('🔴 Hiding card:', card.className);

    // Add hidden class immediately
    card.classList.add('project-hidden');
    card.style.display = 'none';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    card.style.visibility = 'hidden';
  }

  /**
   * Update active button state
   * @param {Element} activeButton - The clicked filter button
   */
  updateActiveButton(activeButton) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }

  /**
   * Get currently active filter
   * @returns {string} The active filter category
   */
  getActiveFilter() {
    const activeButton = document.querySelector('.filter-btn.active');
    return activeButton ? activeButton.dataset.filter : 'all';
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
    this.setActiveFilter('all');
  }

  /**
   * Test filtering functionality
   */
  testFiltering() {
    console.log('🧪 Testing filter: infrastructure');
    this.filterProjects('infrastructure');

    setTimeout(() => {
      console.log('🧪 Testing filter: all');
      this.filterProjects('all');
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
