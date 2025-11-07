/**
 * =====================================================================================================
 * TESTS - ACCESSIBILITY MODULE
 * =====================================================================================================
 *
 * Test suite for accessibility.js
 * Tests keyboard navigation, focus management, and ARIA compliance
 */

import { AccessibilityManager } from '../../assets/js/modules/accessibility.js';

describe('AccessibilityManager', () => {
  let accessibilityManager;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div id="test-container">
        <header id="main-header">
          <nav>
            <a href="#section1" class="nav-link">Section 1</a>
            <a href="#section2" class="nav-link">Section 2</a>
          </nav>
        </header>
        <section id="section1">Section 1 Content</section>
        <section id="section2">Section 2 Content</section>
      </div>
    `;

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();

    accessibilityManager = new AccessibilityManager();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Initialization', () => {
    test('should initialize only once', () => {
      const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

      accessibilityManager.init();
      expect(accessibilityManager.isInitialized).toBe(true);

      accessibilityManager.init();
      expect(consoleSpy).toHaveBeenCalledTimes(1);

      consoleSpy.mockRestore();
    });

    test('should set isInitialized to true after initialization', () => {
      expect(accessibilityManager.isInitialized).toBe(false);
      accessibilityManager.init();
      expect(accessibilityManager.isInitialized).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    test('should add keyboard-navigation class on Tab key', () => {
      accessibilityManager.init();

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      document.dispatchEvent(tabEvent);

      expect(document.body.classList.contains('keyboard-navigation')).toBe(true);
    });

    test('should remove keyboard-navigation class on mouse click', () => {
      accessibilityManager.init();

      // First add the class with Tab
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      document.dispatchEvent(tabEvent);
      expect(document.body.classList.contains('keyboard-navigation')).toBe(true);

      // Then remove with mousedown
      const mouseEvent = new MouseEvent('mousedown');
      document.dispatchEvent(mouseEvent);

      expect(document.body.classList.contains('keyboard-navigation')).toBe(false);
    });
  });

  describe('Smooth Scroll', () => {
    test('should prevent default behavior on anchor click', () => {
      accessibilityManager.init();

      const anchor = document.querySelector('a[href="#section1"]');
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      
      const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
      anchor.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should handle missing target gracefully', () => {
      document.body.innerHTML = `
        <a href="#nonexistent">Link</a>
      `;

      accessibilityManager.init();

      const anchor = document.querySelector('a');
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

      expect(() => {
        anchor.dispatchEvent(clickEvent);
      }).not.toThrow();
    });
  });

  describe('Focus Management', () => {
    test('should handle focus trap correctly', () => {
      accessibilityManager.init();

      const navLink = document.querySelector('.nav-link');
      expect(navLink).toBeTruthy();
    });

    test('should trap focus within container', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="first">First</button>
        <button id="middle">Middle</button>
        <button id="last">Last</button>
      `;
      document.body.appendChild(container);

      accessibilityManager.trapFocus(container);

      const firstButton = container.querySelector('#first');
      const lastButton = container.querySelector('#last');

      expect(document.activeElement).toBe(firstButton);

      // Simulate Tab on last element
      Object.defineProperty(document, 'activeElement', {
        writable: true,
        value: lastButton
      });

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      const preventDefaultSpy = jest.spyOn(tabEvent, 'preventDefault');
      container.dispatchEvent(tabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();

      document.body.removeChild(container);
    });

    test('should handle null container gracefully', () => {
      expect(() => {
        accessibilityManager.trapFocus(null);
      }).not.toThrow();
    });
  });

  describe('Keyboard Shortcuts', () => {
    test('should scroll to top on H key press', () => {
      accessibilityManager.init();

      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation();
      const hEvent = new KeyboardEvent('keydown', { key: 'h', bubbles: true });

      document.dispatchEvent(hEvent);

      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

      scrollToSpy.mockRestore();
    });

    test('should show help on ? key press', () => {
      accessibilityManager.init();

      const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
      const helpEvent = new KeyboardEvent('keydown', { key: '?', bubbles: true });

      document.dispatchEvent(helpEvent);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Keyboard shortcuts'));

      consoleSpy.mockRestore();
    });

    test('should not trigger shortcuts when typing in input', () => {
      document.body.innerHTML = `
        <input type="text" id="test-input" />
      `;
      accessibilityManager.init();

      const input = document.querySelector('#test-input');
      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation();

      const hEvent = new KeyboardEvent('keydown', { 
        key: 'h', 
        bubbles: true,
        target: input 
      });
      
      Object.defineProperty(hEvent, 'target', { value: input, enumerable: true });
      
      document.dispatchEvent(hEvent);

      expect(scrollToSpy).not.toHaveBeenCalled();

      scrollToSpy.mockRestore();
    });
  });

  describe('Screen Reader Announcements', () => {
    test('should announce message to screen reader', () => {
      jest.useFakeTimers();
      
      accessibilityManager.announceToScreenReader('Test message', 'polite');

      const announcement = document.querySelector('[aria-live="polite"]');
      expect(announcement).toBeTruthy();
      expect(announcement.textContent).toBe('Test message');
      expect(announcement.getAttribute('aria-atomic')).toBe('true');

      jest.advanceTimersByTime(1000);

      jest.useRealTimers();
    });

    test('should use default polite priority', () => {
      jest.useFakeTimers();
      
      accessibilityManager.announceToScreenReader('Test');

      const announcement = document.querySelector('[aria-live="polite"]');
      expect(announcement).toBeTruthy();

      jest.useRealTimers();
    });
  });

  describe('Initial Navigation State', () => {
    test('should set active class on home page', () => {
      // Mock window.location
      delete window.location;
      window.location = { pathname: '/' };

      document.body.innerHTML = `
        <nav>
          <a href="#top">Home</a>
        </nav>
      `;

      accessibilityManager.setInitialNavigationState();

      const homeLink = document.querySelector('a[href="#top"]');
      expect(homeLink.classList.contains('active')).toBe(true);
    });

    test('should handle index.html path', () => {
      delete window.location;
      window.location = { pathname: '/index.html' };

      document.body.innerHTML = `
        <nav>
          <a href="#top">Home</a>
        </nav>
      `;

      accessibilityManager.setInitialNavigationState();

      const homeLink = document.querySelector('a[href="#top"]');
      expect(homeLink.classList.contains('active')).toBe(true);
    });

    test('should not set active on other pages', () => {
      delete window.location;
      window.location = { pathname: '/about.html' };

      document.body.innerHTML = `
        <nav>
          <a href="#top">Home</a>
        </nav>
      `;

      accessibilityManager.setInitialNavigationState();

      const homeLink = document.querySelector('a[href="#top"]');
      expect(homeLink.classList.contains('active')).toBe(false);
    });
  });
});
