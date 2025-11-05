/**
 * =====================================================================================================
 * PORTFOLIO - ANIMATIONS MODULE
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: animations.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Scroll animations and reveal behaviors management module
 * with optimized Intersection Observer.
 *
 * Features:
 * - Scroll reveal animations
 * - Performant Intersection Observer
 * - Intelligent header auto-hide
 * - Scroll direction management
 * - Smooth GPU-optimized animations
 * - Performance debouncing
 *
 * Dependencies: Intersection Observer API
 * Browser Support: Modern browsers with Intersection Observer
 *
 * =====================================================================================================
 */

'use strict';

/**
 * Scroll Animation Manager
 * Handles scroll-triggered animations using Intersection Observer
 * NOTE: Project cards initialization is handled by the projects module
 */
export class ScrollAnimations {
  lastScrollPosition = 0;
  scrollThreshold = 100;
  header = null;
  animationObserver = null;
  isInitialized = false;

  /**
   * Initialize scroll animations and header behavior
   */
  init() {
    if (this.isInitialized) {
      return;
    }

    this.header = document.getElementById('main-header');
    this.setupScrollAnimations();
    this.setupHeaderScroll();
    this.isInitialized = true;

    console.log('✅ Scroll animations initialized');
  }

  /**
   * Initialize scroll-triggered animations using Intersection Observer
   * NOTE: Project cards are initialized by the projects module to avoid duplication
   */
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .animate-on-scroll');

    if (animatedElements.length === 0) {
      console.log('No animated elements found');
      return;
    }

    // Force immediate visibility for filter buttons (critical UI elements)
    const filterButtons = document.querySelectorAll('.filter-btn');
    for (const btn of filterButtons) {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
      btn.classList.add('animate-in');
    }

    // Also ensure the filter container is visible
    const filterContainer = document.querySelector('.flex.flex-wrap.justify-center.gap-4.mb-20.animate-on-scroll');
    if (filterContainer) {
      filterContainer.style.opacity = '1';
      filterContainer.style.transform = 'translateY(0)';
      filterContainer.classList.add('animate-in');
    }

    // NOTE: Project cards visibility is handled by the projects module (Single Responsibility)
    // This prevents duplication and race conditions

    // Intersection Observer options
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    // Create observer instance
    this.animationObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const target = entry.target;
        target.style.opacity = '1';
        target.style.transform = 'none';
        this.animationObserver.unobserve(target);
      }
    }, observerOptions);

    // Start observing all animated elements EXCEPT project cards
    let observedCount = 0;
    for (const element of animatedElements) {
      if (element.classList.contains('project-card-enhanced') || element.classList.contains('project-card')) {
        continue;
      }
      this.animationObserver.observe(element);
      observedCount++;
    }

    const projectCardsCount = animatedElements.length - observedCount;
    console.log(`🎬 Animation Observer: ${observedCount} elements observed (${projectCardsCount} project cards excluded)`);
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
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      }
    }, observerOptions);

    for (const el of projectElements) {
      observer.observe(el);
    }

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
