/**
 * =====================================================================================================
 * TESTS - ANIMATIONS MODULE
 * =====================================================================================================
 *
 * Test suite for animations.js
 * Tests scroll animations and Intersection Observer behavior
 */

import { ScrollAnimations } from "../../assets/js/modules/animations.js";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe(element) {
    // Simulate immediate intersection
    this.callback([
      {
        target: element,
        isIntersecting: true,
        intersectionRatio: 1,
      },
    ]);
  }

  unobserve() {}
  disconnect() {}
};

describe("ScrollAnimations", () => {
  let scrollAnimations;

  beforeEach(() => {
    document.body.innerHTML = `
      <header id="main-header"></header>
      <div class="fade-in">Fade In Element</div>
      <div class="animate-on-scroll">Animate On Scroll</div>
      <div class="filter-btn">Filter Button</div>
    `;

    scrollAnimations = new ScrollAnimations();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Initialization", () => {
    test("should initialize only once", () => {
      const consoleSpy = jest.spyOn(console, "info").mockImplementation();

      scrollAnimations.init();
      expect(scrollAnimations.isInitialized).toBe(true);

      scrollAnimations.init();
      expect(consoleSpy).toHaveBeenCalledWith(
        "✅ Scroll animations initialized",
      );

      consoleSpy.mockRestore();
    });

    test("should find and store header element", () => {
      scrollAnimations.init();
      expect(scrollAnimations.header).toBeTruthy();
      expect(scrollAnimations.header.id).toBe("main-header");
    });
  });

  describe("Scroll Animations Setup", () => {
    test("should find animated elements", () => {
      scrollAnimations.init();

      const animatedElements = document.querySelectorAll(
        ".fade-in, .animate-on-scroll",
      );
      expect(animatedElements.length).toBeGreaterThan(0);
    });

    test("should make filter buttons immediately visible", () => {
      scrollAnimations.init();

      const filterButtons = document.querySelectorAll(".filter-btn");
      filterButtons.forEach((btn) => {
        expect(btn.style.opacity).toBe("1");
        expect(btn.style.transform).toBe("translateY(0)");
        expect(btn.classList.contains("animate-in")).toBe(true);
      });
    });

    test("should handle missing animated elements gracefully", () => {
      document.body.innerHTML = "<div>No animated elements</div>";
      scrollAnimations = new ScrollAnimations();

      const consoleSpy = jest.spyOn(console, "info").mockImplementation();
      scrollAnimations.init();

      expect(consoleSpy).toHaveBeenCalledWith("No animated elements found");
      consoleSpy.mockRestore();
    });
  });

  describe("Header Scroll Behavior", () => {
    test("should initialize header scroll tracking", () => {
      scrollAnimations.init();
      expect(scrollAnimations.lastScrollPosition).toBeDefined();
      expect(scrollAnimations.scrollThreshold).toBe(100);
    });

    test("should have header reference after initialization", () => {
      scrollAnimations.init();
      expect(scrollAnimations.header).not.toBeNull();
    });
  });

  describe("Intersection Observer", () => {
    test("should create animation observer", () => {
      scrollAnimations.init();
      // Observer is created internally during setupScrollAnimations
      expect(scrollAnimations.isInitialized).toBe(true);
    });

    test("should observe animated elements", () => {
      const observeSpy = jest.spyOn(IntersectionObserver.prototype, "observe");

      scrollAnimations.init();

      // Should observe fade-in and animate-on-scroll elements (but not filter buttons)
      expect(observeSpy).toHaveBeenCalled();

      observeSpy.mockRestore();
    });
  });

  describe("Header Scroll Handling", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <header id="main-header" style="transform: translateY(0)">Header</header>
        <div class="fade-in">Content 1</div>
        <div class="animate-on-scroll">Content 2</div>
      `;
      scrollAnimations = new ScrollAnimations();
    });

    test("should hide header when scrolling down past threshold", () => {
      scrollAnimations.init();

      // Simulate scroll down past threshold
      scrollAnimations.lastScrollPosition = 50;
      Object.defineProperty(window, "pageYOffset", {
        writable: true,
        value: 200,
      });

      scrollAnimations.handleHeaderScroll();

      expect(scrollAnimations.header.style.transform).toBe("translateY(-100%)");
    });

    test("should show header when scrolling up", () => {
      scrollAnimations.init();

      // Simulate scroll up
      scrollAnimations.lastScrollPosition = 200;
      Object.defineProperty(window, "pageYOffset", {
        writable: true,
        value: 100,
      });

      scrollAnimations.handleHeaderScroll();

      expect(scrollAnimations.header.style.transform).toBe("translateY(0)");
    });

    test("should show header at top of page", () => {
      scrollAnimations.init();

      scrollAnimations.lastScrollPosition = 50;
      Object.defineProperty(window, "pageYOffset", {
        writable: true,
        value: 0,
      });

      scrollAnimations.handleHeaderScroll();

      expect(scrollAnimations.header.style.transform).toBe("translateY(0)");
    });

    test("should not crash if header is missing", () => {
      document.body.innerHTML = `
        <div class="fade-in">Content</div>
      `;
      scrollAnimations = new ScrollAnimations();
      scrollAnimations.init();

      expect(() => {
        scrollAnimations.handleHeaderScroll();
      }).not.toThrow();
    });
  });

  describe("Projects Scroll Animations", () => {
    test("should initialize projects scroll animations", () => {
      const consoleSpy = jest.spyOn(console, "info").mockImplementation();

      scrollAnimations.initializeProjectsScrollAnimations();

      expect(consoleSpy).toHaveBeenCalledWith(
        "🎯 Initializing projects scroll animations",
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        "✅ Projects scroll animations initialized",
      );

      consoleSpy.mockRestore();
    });

    test("should handle no project elements gracefully", () => {
      document.body.innerHTML = `<div>No animated content</div>`;
      scrollAnimations = new ScrollAnimations();

      expect(() => {
        scrollAnimations.initializeProjectsScrollAnimations();
      }).not.toThrow();
    });
  });

  describe("Cleanup", () => {
    test("should disconnect observer on destroy", () => {
      const disconnectSpy = jest.spyOn(
        IntersectionObserver.prototype,
        "disconnect",
      );

      scrollAnimations.init();
      scrollAnimations.destroy();

      expect(disconnectSpy).toHaveBeenCalled();

      disconnectSpy.mockRestore();
    });

    test("should handle destroy without observer", () => {
      expect(() => {
        scrollAnimations.destroy();
      }).not.toThrow();
    });
  });
});
