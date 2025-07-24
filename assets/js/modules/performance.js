// ========================================
// PERFORMANCE OPTIMIZATION MODULE
// Handles performance improvements and monitoring
// ========================================

'use strict';

/**
 * Performance Manager
 * Handles performance optimizations and monitoring
 */
export class PerformanceManager {
  constructor() {
    this.init();
  }

  /**
   * Initialize performance optimizations
   */
  init() {
    this.initializeInteractiveOptimizations();
    this.setupPreloadOptimizations();
    this.monitorPerformance();

    console.log('✅ Performance optimizations initialized');
  }

  /**
   * Optimize performance for interactive elements
   * Uses will-change property strategically to improve animations
   */
  initializeInteractiveOptimizations() {
    // Optimize project cards hover performance
    const projectCards = document.querySelectorAll('.project-card, .tech-card');

    projectCards.forEach(card => {
      // Prepare for smooth hover animations
      card.addEventListener('mouseenter', function() {
        this.style.willChange = 'transform, box-shadow';
      });

      // Clean up after hover to save memory
      card.addEventListener('mouseleave', function() {
        this.style.willChange = 'auto';
      });
    });

    // Optimize glass buttons
    const glassButtons = document.querySelectorAll('.glass-button');
    glassButtons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.willChange = 'transform, background, border-color';
      });

      button.addEventListener('mouseleave', function() {
        this.style.willChange = 'auto';
      });
    });

    console.log(`Optimized ${projectCards.length + glassButtons.length} interactive elements`);
  }

  /**
   * Setup preload optimizations for critical resources
   */
  setupPreloadOptimizations() {
    // Preload critical fonts
    this.preloadFont('Inter', 'wght@400;600;800');

    // Preload critical images
    const criticalImages = [
      '/assets/images/avatar.png',
      '/assets/images/avatar-stylisé.png'
    ];

    criticalImages.forEach(src => {
      this.preloadImage(src);
    });
  }

  /**
   * Preload a font
   * @param {string} fontFamily - The font family name
   * @param {string} fontWeight - The font weight specification
   */
  preloadFont(fontFamily, fontWeight) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:${fontWeight}&display=swap`;
    document.head.appendChild(link);
  }

  /**
   * Preload an image
   * @param {string} src - The image source URL
   */
  preloadImage(src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }

  /**
   * Monitor performance metrics
   */
  monitorPerformance() {
    // Log performance metrics in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.logPerformanceMetrics();
    }

    // Monitor long tasks
    this.monitorLongTasks();
  }

  /**
   * Log performance metrics to console
   */
  logPerformanceMetrics() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];

        console.group('🚀 Performance Metrics');
        console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
        console.log(`Load Complete: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        console.log(`Total Load Time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);

        // Log LCP if available
        if ('PerformanceObserver' in window) {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lcp = entries[entries.length - 1];
            console.log(`Largest Contentful Paint: ${lcp.startTime}ms`);
          }).observe({ entryTypes: ['largest-contentful-paint'] });
        }

        console.groupEnd();
      }, 100);
    });
  }

  /**
   * Monitor long tasks that might affect performance
   */
  monitorLongTasks() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });
    }
  }

  /**
   * Optimize images with lazy loading
   */
  initializeLazyLoading() {
    // Use native lazy loading where supported
    const images = document.querySelectorAll('img[data-src]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading
      images.forEach(img => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
      });
    } else {
      // Fallback with Intersection Observer
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Debounce function for performance optimization
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Execute immediately
   * @returns {Function} Debounced function
   */
  debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  /**
   * Throttle function for performance optimization
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Create and export singleton instance
export const performanceManager = new PerformanceManager();
