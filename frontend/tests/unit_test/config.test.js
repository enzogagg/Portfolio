/**
 * =====================================================================================================
 * TESTS - CONFIG MODULE
 * =====================================================================================================
 *
 * Test suite for config.js
 * Tests centralized configuration and initialization state management
 */

import { APP_CONFIG, InitializationState, isResponsibleFor, getResponsibleModule } from '../../assets/js/modules/config.js';

describe('APP_CONFIG', () => {
  test('should have selectors configuration', () => {
    expect(APP_CONFIG.selectors).toBeDefined();
    expect(APP_CONFIG.selectors.projectCards).toBe('.project-card-enhanced, .project-card');
    expect(APP_CONFIG.selectors.filterButtons).toBe('.filter-btn');
    expect(APP_CONFIG.selectors.header).toBe('#main-header, header');
  });

  test('should have animations configuration', () => {
    expect(APP_CONFIG.animations).toBeDefined();
    expect(APP_CONFIG.animations.observerOptions).toBeDefined();
    expect(APP_CONFIG.animations.observerOptions.threshold).toBe(0.1);
    expect(APP_CONFIG.animations.maxStaggerDelay).toBe(0.3);
  });

  test('should have projects configuration', () => {
    expect(APP_CONFIG.projects).toBeDefined();
    expect(APP_CONFIG.projects.defaultCategory).toBe('all');
    expect(APP_CONFIG.projects.animationDuration).toBe(300);
  });

  test('should have responsibilities configuration', () => {
    expect(APP_CONFIG.responsibilities).toBeDefined();
    expect(APP_CONFIG.responsibilities.projectCards).toBe('projects');
    expect(APP_CONFIG.responsibilities.scrollAnimations).toBe('animations');
    expect(APP_CONFIG.responsibilities.coordination).toBe('app');
  });

  test('should have excludeFromObserver array', () => {
    expect(APP_CONFIG.animations.excludeFromObserver).toBeDefined();
    expect(Array.isArray(APP_CONFIG.animations.excludeFromObserver)).toBe(true);
    expect(APP_CONFIG.animations.excludeFromObserver).toContain('.project-card-enhanced');
    expect(APP_CONFIG.animations.excludeFromObserver).toContain('.project-card');
  });
});

describe('InitializationState', () => {
  let initState;

  beforeEach(() => {
    initState = new InitializationState();
  });

  describe('Constructor', () => {
    test('should initialize with all modules as not initialized', () => {
      expect(initState.initialized.projectCards).toBe(false);
      expect(initState.initialized.animations).toBe(false);
      expect(initState.initialized.navigation).toBe(false);
      expect(initState.initialized.accessibility).toBe(false);
      expect(initState.initialized.performance).toBe(false);
    });

    test('should initialize with empty listeners array', () => {
      expect(Array.isArray(initState.listeners)).toBe(true);
      expect(initState.listeners.length).toBe(0);
    });
  });

  describe('markInitialized', () => {
    test('should mark a module as initialized', () => {
      initState.markInitialized('projectCards');
      expect(initState.initialized.projectCards).toBe(true);
    });

    test('should mark multiple modules as initialized', () => {
      initState.markInitialized('projectCards');
      initState.markInitialized('animations');
      initState.markInitialized('navigation');

      expect(initState.initialized.projectCards).toBe(true);
      expect(initState.initialized.animations).toBe(true);
      expect(initState.initialized.navigation).toBe(true);
    });

    test('should not affect other modules', () => {
      initState.markInitialized('projectCards');

      expect(initState.initialized.projectCards).toBe(true);
      expect(initState.initialized.animations).toBe(false);
      expect(initState.initialized.navigation).toBe(false);
    });

    test('should handle invalid module names gracefully', () => {
      expect(() => {
        initState.markInitialized('nonexistent');
      }).not.toThrow();
    });
  });

  describe('isInitialized', () => {
    test('should return false for non-initialized modules', () => {
      expect(initState.isInitialized('projectCards')).toBe(false);
      expect(initState.isInitialized('animations')).toBe(false);
    });

    test('should return true for initialized modules', () => {
      initState.markInitialized('projectCards');
      expect(initState.isInitialized('projectCards')).toBe(true);
    });

    test('should return false for invalid module names', () => {
      expect(initState.isInitialized('nonexistent')).toBe(false);
    });
  });

  describe('Listener Notification', () => {
    test('should notify listeners when module is initialized', () => {
      const listener = jest.fn();
      initState.listeners.push(listener);

      initState.markInitialized('projectCards');

      expect(listener).toHaveBeenCalledWith('projectCards');
    });

    test('should notify multiple listeners', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      
      initState.listeners.push(listener1, listener2);
      initState.markInitialized('animations');

      expect(listener1).toHaveBeenCalledWith('animations');
      expect(listener2).toHaveBeenCalledWith('animations');
    });

    test('should work without listeners', () => {
      expect(() => {
        initState.markInitialized('navigation');
      }).not.toThrow();
    });
  });

  describe('Module Coordination', () => {
    test('should allow checking if dependencies are ready', () => {
      initState.markInitialized('projectCards');
      initState.markInitialized('animations');

      const projectCardsReady = initState.isInitialized('projectCards');
      const animationsReady = initState.isInitialized('animations');
      const allReady = projectCardsReady && animationsReady;

      expect(allReady).toBe(true);
    });

    test('should support waiting for specific module', () => {
      expect(initState.isInitialized('performance')).toBe(false);
      
      initState.markInitialized('performance');
      
      expect(initState.isInitialized('performance')).toBe(true);
    });
  });

  describe('State Management', () => {
    test('should maintain state across multiple operations', () => {
      initState.markInitialized('projectCards');
      initState.markInitialized('animations');
      
      expect(initState.isInitialized('projectCards')).toBe(true);
      expect(initState.isInitialized('animations')).toBe(true);
      expect(initState.isInitialized('navigation')).toBe(false);
    });

    test('should not reset previously initialized modules', () => {
      initState.markInitialized('projectCards');
      expect(initState.isInitialized('projectCards')).toBe(true);
      
      initState.markInitialized('animations');
      expect(initState.isInitialized('projectCards')).toBe(true);
      expect(initState.isInitialized('animations')).toBe(true);
    });

    test('should check if all modules are initialized', () => {
      expect(initState.allInitialized()).toBe(false);

      initState.markInitialized('projectCards');
      initState.markInitialized('animations');
      initState.markInitialized('navigation');
      initState.markInitialized('accessibility');
      initState.markInitialized('performance');

      expect(initState.allInitialized()).toBe(true);
    });

    test('should return summary of initialization state', () => {
      initState.markInitialized('projectCards');
      initState.markInitialized('animations');

      const summary = initState.getSummary();

      expect(summary.total).toBe(5);
      expect(summary.completed).toBe(2);
      expect(summary.pending).toContain('navigation');
      expect(summary.pending).toContain('accessibility');
      expect(summary.pending).toContain('performance');
      expect(summary.percentage).toBe(40); // 2/5 = 40%
    });
  });

  describe('WaitFor Promise', () => {
    test('should resolve immediately if module already initialized', async () => {
      initState.markInitialized('projectCards');

      const promise = initState.waitFor('projectCards');
      
      await expect(promise).resolves.toBeUndefined();
    });

    test('should wait for module initialization', async () => {
      const promise = initState.waitFor('navigation');

      // Mark as initialized after a delay
      setTimeout(() => {
        initState.markInitialized('navigation');
      }, 10);

      await expect(promise).resolves.toBeUndefined();
    });
  });
});

describe('Helper Functions', () => {
  describe('isResponsibleFor', () => {
    test('should return true for correct module responsibility', () => {
      expect(isResponsibleFor('projects', 'projectCards')).toBe(true);
      expect(isResponsibleFor('animations', 'scrollAnimations')).toBe(true);
    });

    test('should return false for incorrect module responsibility', () => {
      expect(isResponsibleFor('navigation', 'projectCards')).toBe(false);
      expect(isResponsibleFor('projects', 'scrollAnimations')).toBe(false);
    });
  });

  describe('getResponsibleModule', () => {
    test('should return responsible module name', () => {
      expect(getResponsibleModule('projectCards')).toBe('projects');
      expect(getResponsibleModule('scrollAnimations')).toBe('animations');
      expect(getResponsibleModule('coordination')).toBe('app');
    });

    test('should return null for unknown responsibility', () => {
      expect(getResponsibleModule('unknownTask')).toBe(null);
    });
  });
});
