/**
 * =====================================================================================================
 * PORTFOLIO - MODULE ANIMATIONS
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Portfolio Personnel
 * File: animations.js
 * Version: 2.1.0
 * Last Updated: July 2025
 *
 * Description:
 * Module de gestion des animations au scroll et comportements
 * d'apparition avec Intersection Observer optimisé.
 *
 * Features:
 * - Animations d'apparition au scroll
 * - Intersection Observer performant
 * - Auto-masquage du header intelligent
 * - Gestion de la direction de scroll
 * - Animations fluides et optimisées GPU
 * - Debouncing pour les performances
 *
 * Dependencies: Intersection Observer API, utils.js
 * Browser Support: Modern browsers avec Intersection Observer
 *
 * =====================================================================================================
 */

'use strict';

import { forceProjectCardVisibility } from './utils.js';

/**
 * Scroll Animation Manager
 * Handles scroll-triggered animations using Intersection Observer
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

    // Force immediate visibility for project cards (no delay on load) using shared utility
    const projectCards = document.querySelectorAll('.project-card-enhanced, .project-card');
    const cardsProcessed = forceProjectCardVisibility(projectCards);
    console.log(`🎬 ${cardsProcessed} project cards forced visible immediately`);

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

        // Add staggered animation delay for visual appeal
        const delay = Math.random() * 0.3;
        target.style.animationDelay = `${delay}s`;

        // Apply animation classes based on element type
        if (target.classList.contains('animate-on-scroll')) {
          target.classList.add('animate-in');
        } else if (target.classList.contains('fade-in')) {
          target.classList.add('animate-fade-in');
        }

        // Stop observing once animated
        this.animationObserver.unobserve(target);
      }
    }, observerOptions);

    // Start observing all animated elements EXCEPT project cards
    let observedCount = 0;
    for (const element of animatedElements) {
      // Skip project cards - they're already visible
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
