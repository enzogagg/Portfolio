/**
 * =====================================================================================================
 * TESTS - NAVIGATION MODULE
 * =====================================================================================================
 *
 * Test suite for navigation.js
 * Tests mobile menu functionality and keyboard interactions
 */

import { MobileNavigation } from "../../assets/js/modules/navigation.js";

describe("MobileNavigation", () => {
  let mobileNavigation;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="burger-menu" aria-expanded="false">
        <div class="burger-line"></div>
        <div class="burger-line"></div>
        <div class="burger-line"></div>
      </div>
      <div id="mobile-menu" class="mobile-menu">
        <nav>
          <a href="#" class="nav-link">Home</a>
          <a href="#" class="nav-link">About</a>
        </nav>
      </div>
    `;

    mobileNavigation = new MobileNavigation();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Initialization", () => {
    test("should initialize with correct elements", () => {
      const consoleSpy = jest.spyOn(console, "info").mockImplementation();

      mobileNavigation.init();

      expect(mobileNavigation.mobileMenu).toBeTruthy();
      expect(mobileNavigation.burgerMenu).toBeTruthy();
      expect(mobileNavigation.isInitialized).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        "✅ Mobile navigation initialized",
      );

      consoleSpy.mockRestore();
    });

    test("should only initialize once", () => {
      const consoleSpy = jest.spyOn(console, "info").mockImplementation();

      mobileNavigation.init();
      mobileNavigation.init();

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      consoleSpy.mockRestore();
    });

    test("should warn if elements are missing", () => {
      document.body.innerHTML = "<div></div>";
      mobileNavigation = new MobileNavigation();

      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      mobileNavigation.init();

      expect(consoleSpy).toHaveBeenCalledWith(
        "Mobile navigation elements not found",
      );
      expect(mobileNavigation.isInitialized).toBe(false);

      consoleSpy.mockRestore();
    });
  });

  describe("Menu Toggle", () => {
    test("should toggle menu state", () => {
      mobileNavigation.init();

      expect(mobileNavigation.isOpen).toBe(false);
      mobileNavigation.toggle();
      expect(mobileNavigation.isOpen).toBe(true);
      mobileNavigation.toggle();
      expect(mobileNavigation.isOpen).toBe(false);
    });

    test("should add/remove active classes on toggle", () => {
      mobileNavigation.init();

      mobileNavigation.toggle();
      expect(mobileNavigation.burgerMenu.classList.contains("active")).toBe(
        true,
      );
      expect(mobileNavigation.mobileMenu.classList.contains("active")).toBe(
        true,
      );

      mobileNavigation.toggle();
      expect(mobileNavigation.burgerMenu.classList.contains("active")).toBe(
        false,
      );
      expect(mobileNavigation.mobileMenu.classList.contains("active")).toBe(
        false,
      );
    });

    test("should handle toggle without elements gracefully", () => {
      mobileNavigation.mobileMenu = null;
      mobileNavigation.burgerMenu = null;

      expect(() => {
        mobileNavigation.toggle();
      }).not.toThrow();
    });
  });

  describe("Menu Opening", () => {
    test("should open menu correctly", () => {
      mobileNavigation.init();

      mobileNavigation.open();

      expect(mobileNavigation.isOpen).toBe(true);
      expect(mobileNavigation.burgerMenu.classList.contains("active")).toBe(
        true,
      );
      expect(mobileNavigation.mobileMenu.classList.contains("active")).toBe(
        true,
      );
    });

    test("should set aria-expanded attribute", () => {
      mobileNavigation.init();

      mobileNavigation.open();

      expect(mobileNavigation.burgerMenu.getAttribute("aria-expanded")).toBe(
        "true",
      );
    });
  });

  describe("Menu Closing", () => {
    test("should close menu correctly", () => {
      mobileNavigation.init();
      mobileNavigation.open();

      mobileNavigation.close();

      expect(mobileNavigation.isOpen).toBe(false);
      expect(mobileNavigation.burgerMenu.classList.contains("active")).toBe(
        false,
      );
      expect(mobileNavigation.mobileMenu.classList.contains("active")).toBe(
        false,
      );
    });

    test("should set aria-expanded attribute to false", () => {
      mobileNavigation.init();
      mobileNavigation.open();

      mobileNavigation.close();

      expect(mobileNavigation.burgerMenu.getAttribute("aria-expanded")).toBe(
        "false",
      );
    });
  });

  describe("Event Listeners", () => {
    test("should close menu on Escape key", () => {
      mobileNavigation.init();
      mobileNavigation.open();

      const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escapeEvent);

      expect(mobileNavigation.isOpen).toBe(false);
    });

    test("should not close menu on other keys", () => {
      mobileNavigation.init();
      mobileNavigation.open();

      const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
      document.dispatchEvent(enterEvent);

      expect(mobileNavigation.isOpen).toBe(true);
    });

    test("should close menu on outside click", () => {
      mobileNavigation.init();
      mobileNavigation.open();

      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: outsideElement,
        enumerable: true,
      });

      document.dispatchEvent(clickEvent);

      expect(mobileNavigation.isOpen).toBe(false);
    });

    test("should close menu on window resize to desktop size", () => {
      mobileNavigation.init();
      mobileNavigation.open();

      // Mock window.innerWidth
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const resizeEvent = new Event("resize");
      window.dispatchEvent(resizeEvent);

      expect(mobileNavigation.isOpen).toBe(false);
    });
  });
});
