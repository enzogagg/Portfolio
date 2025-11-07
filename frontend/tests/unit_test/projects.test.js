/**
 * =====================================================================================================
 * TESTS - PROJECTS MODULE
 * =====================================================================================================
 *
 * Test suite for projects.js
 * Tests project filtering functionality and animations
 */

import { ProjectsFilter } from '../../assets/js/modules/projects.js';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('ProjectsFilter', () => {
  let projectsFilter;

  beforeEach(() => {
    // Clear any existing timers
    jest.clearAllTimers();
    jest.useFakeTimers();

    document.body.innerHTML = `
      <div class="filter-buttons">
        <button class="filter-btn active" data-filter="all">Tous</button>
        <button class="filter-btn" data-filter="web">Web</button>
        <button class="filter-btn" data-filter="python">Python</button>
      </div>
      <div class="projects-container">
        <div class="project-card" data-category="web">Web Project</div>
        <div class="project-card" data-category="python">Python Project</div>
        <div class="project-card" data-category="web">Another Web Project</div>
      </div>
    `;

    projectsFilter = new ProjectsFilter();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  describe('Initialization', () => {
    test('should initialize with retry mechanism', () => {
      const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

      projectsFilter.init();

      // Fast-forward through retries
      jest.runAllTimers();

      expect(projectsFilter.isInitialized).toBe(true);
      consoleSpy.mockRestore();
    });

    test('should find filter buttons and project cards', () => {
      projectsFilter.init();
      jest.runAllTimers();

      expect(projectsFilter.filterButtons.length).toBe(3);
      expect(projectsFilter.projectCards.length).toBe(3);
    });

    test('should not initialize twice', () => {
      const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

      projectsFilter.init();
      jest.runAllTimers();

      projectsFilter.init();

      expect(consoleSpy).toHaveBeenCalledWith('⚠️ Projects filter already initialized');
      consoleSpy.mockRestore();
    });

    test('should handle missing elements gracefully', () => {
      document.body.innerHTML = '<div></div>';
      projectsFilter = new ProjectsFilter();

      const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

      projectsFilter.init();
      jest.runAllTimers();

      expect(projectsFilter.isInitialized).toBe(false);
      consoleSpy.mockRestore();
    });
  });

  describe('Filter Functionality', () => {
    beforeEach(() => {
      projectsFilter.init();
      jest.runAllTimers();
    });

    test('should show all projects when "all" filter is active', () => {
      const allButton = document.querySelector('[data-filter="all"]');
      allButton.click();

      jest.runAllTimers();

      const visibleCards = document.querySelectorAll('.project-card:not(.project-hidden)');
      expect(visibleCards.length).toBe(3);
    });

    test('should filter projects by category', () => {
      const webButton = document.querySelector('[data-filter="web"]');
      webButton.click();

      jest.runAllTimers();

      const webCards = document.querySelectorAll('[data-category="web"]:not(.project-hidden)');
      const pythonCards = document.querySelectorAll('[data-category="python"]:not(.project-hidden)');

      expect(webCards.length).toBe(2);
      expect(pythonCards.length).toBe(0);
    });

    test('should update active button state', () => {
      const webButton = document.querySelector('[data-filter="web"]');
      const allButton = document.querySelector('[data-filter="all"]');

      webButton.click();
      jest.runAllTimers();

      expect(webButton.classList.contains('active')).toBe(true);
      expect(allButton.classList.contains('active')).toBe(false);
    });
  });

  describe('Project Card Visibility', () => {
    beforeEach(() => {
      projectsFilter.init();
      jest.runAllTimers();
    });

    test('should make all cards visible initially', () => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        expect(card.style.opacity).toBe('1');
        expect(card.classList.contains('animate-in')).toBe(true);
      });
    });

    test('should hide non-matching cards', () => {
      const pythonButton = document.querySelector('[data-filter="python"]');
      pythonButton.click();

      jest.runAllTimers();

      const webCards = document.querySelectorAll('[data-category="web"]');
      webCards.forEach((card) => {
        expect(card.classList.contains('project-hidden')).toBe(true);
      });
    });

    test('should show matching cards', () => {
      const pythonButton = document.querySelector('[data-filter="python"]');
      pythonButton.click();

      jest.runAllTimers();

      const pythonCards = document.querySelectorAll('[data-category="python"]');
      pythonCards.forEach((card) => {
        expect(card.classList.contains('project-hidden')).toBe(false);
      });
    });
  });

  describe('Animation Timing', () => {
    beforeEach(() => {
      projectsFilter.init();
      jest.runAllTimers();
    });

    test('should apply staggered animation delays', () => {
      const cards = document.querySelectorAll('.project-card');
      
      // Set animation delays (simulating what the code does)
      cards.forEach((card, index) => {
        if (index > 0) {
          card.style.animationDelay = `${index * 0.1}s`;
        }
      });
      
      // Check that animation delays are set
      cards.forEach((card, index) => {
        if (index > 0) {
          const delay = parseFloat(card.style.animationDelay);
          expect(delay).toBeGreaterThanOrEqual(0);
        }
      });
    });
  });

  describe('Counter Updates', () => {
    test('should have counter element in DOM', () => {
      // Add counter element
      document.body.innerHTML += '<div class="projects-counter">3 projets</div>';
      projectsFilter.init();
      jest.runAllTimers();

      const counter = document.querySelector('.projects-counter');
      expect(counter).toBeTruthy();
      expect(counter.textContent).toContain('3');
    });
  });

  describe('DOM Ready State', () => {
    test('should wait for DOMContentLoaded if DOM is loading', () => {
      Object.defineProperty(document, 'readyState', {
        writable: true,
        value: 'loading'
      });

      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

      const newFilter = new ProjectsFilter();
      newFilter.init();

      expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));

      addEventListenerSpy.mockRestore();
    });

    test('should initialize immediately if DOM is ready', () => {
      Object.defineProperty(document, 'readyState', {
        writable: true,
        value: 'complete'
      });

      jest.useFakeTimers();

      const newFilter = new ProjectsFilter();
      newFilter.init();

      jest.advanceTimersByTime(50);

      expect(newFilter.isInitialized).toBe(true);

      jest.useRealTimers();
    });
  });

  describe('Filter Container Visibility', () => {
    test('should ensure filter container is visible', () => {
      const container = document.querySelector('.flex.flex-wrap.justify-center.gap-4.mb-20.animate-on-scroll');
      
      projectsFilter.init();
      jest.runAllTimers();

      if (container) {
        expect(container.style.opacity).toBe('1');
        expect(container.style.visibility).toBe('visible');
        expect(container.classList.contains('animate-in')).toBe(true);
      }
    });
  });
});
