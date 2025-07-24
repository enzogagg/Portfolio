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
      return;
    }

    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');

    // Only initialize if we're on the projects page
    if (this.filterButtons.length === 0 || this.projectCards.length === 0) {
      console.log('Projects page elements not found, skipping initialization');
      return;
    }

    console.log('🎯 Initializing projects page functionality');

    // Ensure filter buttons are always visible (critical for Vercel)
    this.ensureFilterVisibility();

    this.resetProjectCards();
    this.setupFilterButtons();
    this.isInitialized = true;

    console.log('✅ Projects page functionality initialized');  
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
      card.classList.remove('project-hidden', 'project-filtering');
    });
  }

  /**
   * Setup event listeners for filter buttons
   */
  setupFilterButtons() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        this.filterProjects(filter);
        this.updateActiveButton(button);
      });
    });
  }

  /**
   * Filter project cards based on category
   * @param {string} filter - The filter category ('all' or specific category)
   */
  filterProjects(filter) {
    console.log(`Filtering projects by: ${filter}`);

    this.projectCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === 'all' || category === filter) {
        this.showCard(card);
      } else {
        this.hideCard(card);
      }
    });
  }

  /**
   * Show a project card with smooth animation
   * @param {Element} card - The project card element
   */
  showCard(card) {
    card.classList.remove('project-hidden');
    card.classList.add('project-filtering');

    setTimeout(() => {
      card.classList.remove('project-filtering');
    }, 300);
  }

  /**
   * Hide a project card with smooth animation
   * @param {Element} card - The project card element
   */
  hideCard(card) {
    card.classList.add('project-filtering');

    setTimeout(() => {
      card.classList.add('project-hidden');
      card.classList.remove('project-filtering');
    }, 300);
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
   * Check if projects filter is initialized
   * @returns {boolean} True if initialized
   */
  isReady() {
    return this.isInitialized;
  }
}

// Create and export singleton instance
export const projectsFilter = new ProjectsFilter();
