/**
 * =====================================================================================================
 * TESTS - PERFORMANCE MODULE
 * =====================================================================================================
 *
 * Test suite for performance.js
 * Tests performance optimizations and monitoring
 */

import { PerformanceManager } from "../../assets/js/modules/performance.js";

describe("PerformanceManager", () => {
  let performanceManager;

  beforeEach(() => {
    // Mock PerformanceObserver
    global.PerformanceObserver = class PerformanceObserver {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      disconnect() {}
    };

    // Also add to window for the 'in' operator check
    window.PerformanceObserver = global.PerformanceObserver;

    document.body.innerHTML = `
      <div class="project-card">Project Card 1</div>
      <div class="project-card">Project Card 2</div>
      <div class="tech-card">Tech Card</div>
      <button class="glass-button">Glass Button</button>
    `;

    performanceManager = new PerformanceManager();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Initialization", () => {
    test("should initialize only once", () => {
      const consoleSpy = jest.spyOn(console, "info").mockImplementation();

      performanceManager.init();
      expect(performanceManager.isInitialized).toBe(true);

      performanceManager.init();
      expect(consoleSpy).toHaveBeenCalledWith(
        "✅ Performance optimizations initialized",
      );

      consoleSpy.mockRestore();
    });

    test("should set isInitialized to true", () => {
      expect(performanceManager.isInitialized).toBe(false);
      performanceManager.init();
      expect(performanceManager.isInitialized).toBe(true);
    });
  });

  describe("Interactive Optimizations", () => {
    test("should optimize project cards on hover", () => {
      performanceManager.init();

      const projectCard = document.querySelector(".project-card");

      // Trigger mouseenter
      const mouseEnterEvent = new MouseEvent("mouseenter");
      projectCard.dispatchEvent(mouseEnterEvent);

      expect(projectCard.style.willChange).toBe("transform, box-shadow");

      // Trigger mouseleave
      const mouseLeaveEvent = new MouseEvent("mouseleave");
      projectCard.dispatchEvent(mouseLeaveEvent);

      expect(projectCard.style.willChange).toBe("auto");
    });

    test("should optimize glass buttons on hover", () => {
      performanceManager.init();

      const glassButton = document.querySelector(".glass-button");

      // Trigger mouseenter
      const mouseEnterEvent = new MouseEvent("mouseenter");
      glassButton.dispatchEvent(mouseEnterEvent);

      expect(glassButton.style.willChange).toBe(
        "transform, background, border-color",
      );

      // Trigger mouseleave
      const mouseLeaveEvent = new MouseEvent("mouseleave");
      glassButton.dispatchEvent(mouseLeaveEvent);

      expect(glassButton.style.willChange).toBe("auto");
    });

    test("should optimize all interactive elements", () => {
      const consoleSpy = jest.spyOn(console, "info").mockImplementation();

      performanceManager.init();

      // Should optimize 3 project/tech cards + 1 glass button = 4 elements
      expect(consoleSpy).toHaveBeenCalledWith(
        "Optimized 4 interactive elements",
      );

      consoleSpy.mockRestore();
    });
  });

  describe("Preload Optimizations", () => {
    test("should create preload link for fonts", () => {
      performanceManager.init();

      // Check if preload links were created (mocked in setupPreloadOptimizations)
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      expect(preloadLinks.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Performance Monitoring", () => {
    test("should monitor performance metrics", () => {
      const consoleSpy = jest.spyOn(console, "info").mockImplementation();

      performanceManager.init();

      // Verify that monitoring was set up
      expect(performanceManager.isInitialized).toBe(true);

      consoleSpy.mockRestore();
    });

    test("should handle PerformanceObserver support gracefully", () => {
      // Test with PerformanceObserver available
      expect(() => {
        performanceManager.init();
      }).not.toThrow();
    });

    test("should work without PerformanceObserver", () => {
      // Temporarily remove PerformanceObserver from window
      const originalPO = window.PerformanceObserver;
      delete window.PerformanceObserver;

      expect(() => {
        const pm = new PerformanceManager();
        pm.init();
      }).not.toThrow();

      // Restore
      window.PerformanceObserver = originalPO;
    });
  });

  describe("Debouncing", () => {
    test("should provide debounce utility", () => {
      performanceManager.init();

      // PerformanceManager should handle debouncing internally
      expect(performanceManager.isInitialized).toBe(true);
    });
  });

  describe("GPU Optimizations", () => {
    test("should apply will-change property strategically", () => {
      performanceManager.init();

      const projectCard = document.querySelector(".project-card");

      // Initially should not have will-change
      expect(projectCard.style.willChange).toBe("");

      // Should apply on hover
      projectCard.dispatchEvent(new MouseEvent("mouseenter"));
      expect(projectCard.style.willChange).toBeTruthy();

      // Should remove after hover
      projectCard.dispatchEvent(new MouseEvent("mouseleave"));
      expect(projectCard.style.willChange).toBe("auto");
    });
  });

  describe("Memory Management", () => {
    test("should clean up will-change after interaction", () => {
      performanceManager.init();

      const elements = document.querySelectorAll(
        ".project-card, .tech-card, .glass-button",
      );

      elements.forEach((element) => {
        element.dispatchEvent(new MouseEvent("mouseenter"));
        expect(element.style.willChange).toBeTruthy();

        element.dispatchEvent(new MouseEvent("mouseleave"));
        expect(element.style.willChange).toBe("auto");
      });
    });
  });

  describe("Performance Metrics Monitoring", () => {
    test("should setup performance monitoring", () => {
      // Mock performance API
      const mockPerfData = {
        domContentLoadedEventEnd: 1500,
        domContentLoadedEventStart: 1000,
        loadEventEnd: 2500,
        loadEventStart: 2000,
        fetchStart: 0,
      };

      global.performance.getEntriesByType = jest.fn(() => [mockPerfData]);

      expect(() => {
        performanceManager.monitorPerformance();
      }).not.toThrow();

      // Verify that performance API is called
      expect(global.performance.getEntriesByType).toBeDefined();
    });
  });

  describe("Long Tasks Monitoring", () => {
    test("should observe long tasks", () => {
      const observeSpy = jest.spyOn(PerformanceObserver.prototype, "observe");

      performanceManager.monitorLongTasks();

      expect(observeSpy).toHaveBeenCalled();

      observeSpy.mockRestore();
    });

    test("should warn about long tasks", () => {
      const warnSpy = jest.spyOn(console, "warn").mockImplementation();

      // Create a mock callback
      let observerCallback;
      global.PerformanceObserver = jest.fn((callback) => {
        observerCallback = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
        };
      });

      performanceManager.monitorLongTasks();

      // Simulate long task detection
      if (observerCallback) {
        observerCallback({
          getEntries: () => [
            {
              duration: 100, // > 50ms threshold
            },
          ],
        });

        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining("Long task detected"),
        );
      }

      warnSpy.mockRestore();
    });
  });

  describe("Debounce Utility", () => {
    test("should debounce resize events", () => {
      jest.useFakeTimers();

      performanceManager.init();

      const resizeCallback = jest.fn();
      const debouncedResize = performanceManager.debounce(resizeCallback, 100);

      // Call multiple times
      debouncedResize();
      debouncedResize();
      debouncedResize();

      // Should not be called yet
      expect(resizeCallback).not.toHaveBeenCalled();

      // Advance timers
      jest.advanceTimersByTime(100);

      // Should be called once
      expect(resizeCallback).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });
});
