// ========================================
// SCROLL ANIMATIONS MODULE
// Handles scroll-triggered animations and header behavior
// ========================================

'use strict';

/**
 * Scroll Animation Manager
 * Handles scroll-triggered animations using Intersection Observer
 */
export class ScrollAnimations {
  constructor() {
    this.lastScrollPosition = 0;
    this.scrollThreshold = 100;
    this.header = null;
    this.animationObserver = null;

    this.init();
  }

  /**
   * Initialize scroll animations and header behavior
   */
  init() {
    this.header = document.getElementById('main-header');
    this.setupScrollAnimations();
    this.setupHeaderScroll();

    console.log('✅ Scroll animations initialized');
  }

  /**
   * Initialize scroll-triggered animations using Intersection Observer
   */
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .animate-on-scroll');

    if (animatedElements.length === 0) {
      console.log('No animated elements found');
      return;
    }

    // Intersection Observer options
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    // Create observer instance
    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const target = entry.target;

        // Add staggered animation delay for visual appeal
        const delay = Math.random() * 0.3;
        target.style.animationDelay = `${delay}s`;

        // Apply animation classes
        target.classList.add('animate-fade-in');
        target.classList.remove('animate-on-scroll');

        // Stop observing once animated
        this.animationObserver.unobserve(target);
      });
    }, observerOptions);

    // Start observing all animated elements
    animatedElements.forEach(element => {
      this.animationObserver.observe(element);
    });

    console.log(`Started observing ${animatedElements.length} animated elements`);
  }

  /**
   * Setup header scroll behavior with performance optimization
   */
  setupHeaderScroll() {
    if (!this.header) {
      console.warn('Header element not found');
      return;
    }

    let scrollTimeout;

    window.addEventListener('scroll', () => {
      // Debounce scroll events for better performance
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          this.handleHeaderScroll();
          scrollTimeout = null;
        }, 10);
      }
    }, { passive: true });
  }

  /**
   * Handle header visibility on scroll
   */
  handleHeaderScroll() {
    if (!this.header) return;

    const currentScroll = window.pageYOffset;

    // Hide header when scrolling down past threshold
    if (currentScroll > this.lastScrollPosition && currentScroll > this.scrollThreshold) {
      this.header.style.transform = 'translateY(-100%)';
    } else {
      // Show header when scrolling up or at top
      this.header.style.transform = 'translateY(0)';
    }

    this.lastScrollPosition = currentScroll;
  }

  /**
   * Enhanced scroll animations for projects page
   */
  initializeProjectsScrollAnimations() {
    const projectElements = document.querySelectorAll('.animate-on-scroll');

    if (projectElements.length === 0) {
      return;
    }

    console.log('🎯 Initializing projects scroll animations');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
        }
      });
    }, observerOptions);

    projectElements.forEach(el => {
      observer.observe(el);
    });

    console.log('✅ Projects scroll animations initialized');
  }

  /**
   * Cleanup observers when needed
   */
  destroy() {
    if (this.animationObserver) {
      this.animationObserver.disconnect();
    }
  }
}

// Create and export singleton instance
export const scrollAnimations = new ScrollAnimations();
