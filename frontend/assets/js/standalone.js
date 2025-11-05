/**
 * =====================================================================================================
 * PORTFOLIO - STANDALONE APPLICATION
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: standalone.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Standalone version of the portfolio working without a local server
 * (compatible with file://) with all features in a single file.
 *
 * Features:
 * - Single file for standalone usage
 * - Exclusive dark mode without theme switching
 * - Mobile navigation with Apple-style hamburger menu
 * - Auto-hide header on scroll
 * - Smooth animations and transitions
 * - Project filtering with persistent state
 * - Integrated accessibility manager
 * - Compatible with file:// protocol
 *
 * Dependencies: None - self-contained file
 * Browser Support: ES6+ without modules, modern browsers
 *
 * =====================================================================================================
 */

'use strict';

(function () {
  /**
   * Portfolio Standalone Application
   * Main application class that manages all functionality
   */
  class PortfolioApp {
    constructor() {
      this.isInitialized = false;
      this.modules = {};
      this.lastScrollY = window.scrollY;
      this.scrollDirection = 'up';
      this.isHeaderVisible = true;
    }

    /**
     * Initialize the entire application
     */
    async init() {
      if (this.isInitialized || document.readyState === 'loading') {
        return;
      }

      console.info('🚀 Initializing Portfolio Application (Standalone)...');

      // Critical: Ensure filter buttons are always visible
      this.ensureFiltersVisible();

      // Add progressive enhancement class
      document.body.classList.add('js-enabled');
      document.documentElement.classList.add('dark'); // Force dark mode only

      try {
        // Initialize all modules
        this.initializeNavigation();
        this.initializeProjects();
        this.initializeAnimations();
        this.initializeAccessibility();
        this.setupGlobalFunctions();
        this.setupEventListeners();

        this.isInitialized = true;
        console.info('✅ Portfolio Application initialized successfully');
      } catch (error) {
        console.error('❌ Error initializing application:', error);
        // Ensure filters are visible even if initialization fails
        this.ensureFiltersVisible();
      }
    }

    /**
     * Critical Filter Visibility Fix
     * Ensures filter buttons are always visible in all environments
     */
    ensureFiltersVisible() {
      const filterButtons = document.querySelectorAll('.filter-btn');

      filterButtons.forEach((btn) => {
        if (btn) {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
          btn.style.visibility = 'visible';
          btn.style.display = 'inline-flex';
        }
      });

      // Double-check after a brief delay
      setTimeout(() => {
        filterButtons.forEach((btn) => {
          if (btn) {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
            btn.style.visibility = 'visible';
            btn.style.display = 'inline-flex';
          }
        });
      }, 100);

      console.info('🔧 Filter visibility enforced');
    }

    /**
     * Navigation Module
     * Mobile menu and header functionality
     */
    initializeNavigation() {
      const mobileMenuToggle = document.querySelector('.burger-menu');
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

      // Mobile menu toggle functionality
      const toggleMobileMenu = () => {
        if (mobileMenu && mobileMenuToggle) {
          const isActive = mobileMenu.classList.contains('active');

          mobileMenu.classList.toggle('active');
          mobileMenuToggle.classList.toggle('active');

          // Manage body scroll
          document.body.style.overflow = isActive ? 'auto' : 'hidden';

          // Update ARIA attributes
          mobileMenuToggle.setAttribute('aria-expanded', !isActive);
          mobileMenu.setAttribute('aria-hidden', isActive);
        }
      };

      // Close mobile menu
      const closeMobileMenu = () => {
        if (mobileMenu && mobileMenuToggle) {
          mobileMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
          document.body.style.overflow = 'auto';

          // Update ARIA attributes
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
        }
      };

      // Event listeners
      if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        mobileMenuToggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
          }
        });
      }

      // Close menu when clicking nav links
      mobileNavLinks.forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          if (
            !mobileMenu.contains(e.target) &&
            !mobileMenuToggle.contains(e.target)
          ) {
            closeMobileMenu();
          }
        }
      });

      // Initialize header auto-hide
      this.initializeHeaderAutoHide();

      this.modules.navigation = {
        toggle: toggleMobileMenu,
        close: closeMobileMenu,
      };

      console.info('📱 Navigation module initialized');
    }

    /**
     * Header Auto-Hide Functionality
     * Hide/show header based on scroll direction
     */
    initializeHeaderAutoHide() {
      const header = document.querySelector('header');
      if (!header) {
        return;
      }

      let ticking = false;

      const updateHeader = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
          // Scrolling down
          if (this.scrollDirection !== 'down') {
            this.scrollDirection = 'down';
            header.classList.add('header-hidden');
            header.classList.remove('header-visible');
            this.isHeaderVisible = false;
          }
        } else if (currentScrollY < this.lastScrollY) {
          // Scrolling up
          if (this.scrollDirection !== 'up') {
            this.scrollDirection = 'up';
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            this.isHeaderVisible = true;
          }
        }

        // Add scrolled class for enhanced glassmorphism
        if (currentScrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        this.lastScrollY = currentScrollY;
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateHeader);
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /**
     * Projects Module
     * Project filtering and search functionality
     */
    initializeProjects() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll(
        '.project-card, .project-card-enhanced',
      );
      const projectsContainer = document.querySelector('.projects-grid, .grid');

      if (!filterButtons.length || !projectCards.length) {
        console.info('📁 No projects or filters found');
        return;
      }

      // Filter functionality
      const filterProjects = (category) => {
        console.info(`🔍 Filtering projects by: ${category}`);

        projectCards.forEach((card) => {
          const cardCategories = card.dataset.category
            ? card.dataset.category.toLowerCase().split(' ')
            : [];

          const shouldShow =
            category === 'all' ||
            cardCategories.includes(category.toLowerCase());

          if (shouldShow) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            card.classList.add('visible');

            // Trigger entrance animation
            setTimeout(() => {
              card.classList.add('animate-in');
            }, 50);
          } else {
            card.style.display = 'none';
            card.classList.add('hidden');
            card.classList.remove('visible', 'animate-in');
          }
        });

        // Update active filter button
        filterButtons.forEach((btn) => {
          btn.classList.remove('active', 'bg-blue-500', 'text-white');
          btn.classList.add('bg-white/10', 'text-white/70');
        });

        const activeButton = document.querySelector(
          `[data-filter="${category}"]`,
        );
        if (activeButton) {
          activeButton.classList.add('active', 'bg-blue-500', 'text-white');
          activeButton.classList.remove('bg-white/10', 'text-white/70');
        }

        // Trigger container animation
        if (projectsContainer) {
          projectsContainer.classList.add('filtering');
          setTimeout(() => {
            projectsContainer.classList.remove('filtering');
          }, 300);
        }
      };

      // Set up filter button event listeners
      filterButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const category = button.dataset.filter || 'all';
          filterProjects(category);
        });

        // Keyboard support
        button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const category = button.dataset.filter || 'all';
            filterProjects(category);
          }
        });
      });

      // Initialize with 'all' filter
      filterProjects('all');

      // Ensure filters remain visible
      this.ensureFiltersVisible();

      // Re-check filter visibility periodically
      setInterval(() => {
        this.ensureFiltersVisible();
      }, 2000);

      this.modules.projects = { filter: filterProjects };
      console.info('📁 Projects module initialized');
    }

    /**
     * Animations Module
     * Scroll-triggered animations and visual effects
     */
    initializeAnimations() {
      // Intersection Observer for scroll animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      };

      const animateOnScroll = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Add staggered delay for multiple elements
            const delay =
              Array.from(entry.target.parentNode.children).indexOf(
                entry.target,
              ) * 100;
            entry.target.style.transitionDelay = `${delay}ms`;

            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(
        animateOnScroll,
        observerOptions,
      );

      // Observe elements with animation classes
      const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .fade-in, .slide-up',
      );
      animatedElements.forEach((el) => {
        observer.observe(el);
      });

      // Special handling for filter buttons
      const filterButtons = document.querySelectorAll('.filter-btn');
      filterButtons.forEach((btn) => {
        // Force immediate visibility
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
        btn.style.visibility = 'visible';
        btn.classList.add('animate-in');
      });

      // Floating animations for special elements
      const floatingElements = document.querySelectorAll(
        '.floating, .floating-avatar',
      );
      floatingElements.forEach((el) => {
        el.style.animationPlayState = 'running';
      });

      this.modules.animations = { observer };
      console.info('✨ Animations module initialized');
    }

    /**
     * Accessibility Module
     * Keyboard navigation and ARIA compliance
     */
    initializeAccessibility() {
      // Skip to main content functionality
      const skipLink = document.querySelector('.skip-nav, .skip-link');
      if (skipLink) {
        skipLink.addEventListener('click', (e) => {
          e.preventDefault();
          const main = document.querySelector('main');
          if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      // Keyboard navigation for interactive elements
      const interactiveElements = document.querySelectorAll(
        'button, [role="button"], .filter-btn, .project-action-btn, .nav-link',
      );

      interactiveElements.forEach((element) => {
        // Ensure proper focus states
        element.addEventListener('focus', () => {
          element.classList.add('focus-visible');
        });

        element.addEventListener('blur', () => {
          element.classList.remove('focus-visible');
        });

        // Keyboard activation
        element.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (!element.href) {
              // Don't prevent default for links
              e.preventDefault();
              element.click();
            }
          }
        });
      });

      // Announce page changes for screen readers
      const announcePageChange = (message) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
          document.body.removeChild(announcement);
        }, 1000);
      };

      // Focus management for modal-like elements
      const trapFocus = (element) => {
        const focusable = element.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusable.length) {
          focusable[0].focus();
        }
      };

      this.modules.accessibility = {
        announce: announcePageChange,
        trapFocus: trapFocus,
      };

      console.info('♿ Accessibility module initialized');
    }

    /**
     * Global Functions Setup
     * Expose necessary functions to global scope
     */
    setupGlobalFunctions() {
      // Make navigation functions globally available
      window.toggleMobileMenu = () => {
        if (this.modules.navigation) {
          this.modules.navigation.toggle();
        }
      };

      window.closeMobileMenu = () => {
        if (this.modules.navigation) {
          this.modules.navigation.close();
        }
      };

      // Make project filtering globally available
      window.filterProjects = (category) => {
        if (this.modules.projects) {
          this.modules.projects.filter(category);
        }
      };

      // Debug function for development
      window.portfolioDebug = () => {
        console.info('Portfolio App Debug Info:', {
          initialized: this.isInitialized,
          modules: Object.keys(this.modules),
          scrollDirection: this.scrollDirection,
          headerVisible: this.isHeaderVisible,
        });
      };

      console.info('🌐 Global functions exposed');
    }

    /**
     * Event Listeners Setup
     * Global event listeners for the application
     */
    setupEventListeners() {
      // Handle page visibility changes
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          // Re-ensure filter visibility when page becomes visible
          this.ensureFiltersVisible();
        }
      });

      // Handle window resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // Close mobile menu on resize to desktop
          if (window.innerWidth > 768 && this.modules.navigation) {
            this.modules.navigation.close();
          }

          // Re-ensure filter visibility after resize
          this.ensureFiltersVisible();
        }, 250);
      });

      // Handle escape key for closing modals/menus
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.modules.navigation) {
            this.modules.navigation.close();
          }
        }
      });

      // Handle smooth scrolling for anchor links
      document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor && anchor.getAttribute('href') !== '#') {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            const offsetTop = target.offsetTop - 80; // Account for header
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }
        }
      });

      console.info('👂 Event listeners set up');
    }

    /**
     * Performance Monitoring
     * Basic performance monitoring and optimization
     */
    monitorPerformance() {
      // Monitor scroll performance
      let scrolling = false;
      window.addEventListener(
        'scroll',
        () => {
          if (!scrolling) {
            requestAnimationFrame(() => {
              scrolling = false;
            });
            scrolling = true;
          }
        },
        { passive: true },
      );

      // Monitor filter performance
      const originalFilter = this.modules.projects?.filter;
      if (originalFilter) {
        this.modules.projects.filter = (category) => {
          const start = performance.now();
          originalFilter(category);
          const end = performance.now();
          console.info(`Filter operation took ${end - start} milliseconds`);
        };
      }
    }
  }

  /**
   * Application Initialization
   * Initialize the app when DOM is ready
   */
  const app = new PortfolioApp();

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
  } else {
    app.init();
  }

  // Fallback initialization after window load
  window.addEventListener('load', () => {
    if (!app.isInitialized) {
      app.init();
    }
  });

  // Expose app to global scope for debugging
  window.PortfolioApp = app;

  console.info('📋 Standalone application loaded');
})();

/* =====================================================================================================
   END OF STANDALONE APPLICATION
   ===================================================================================================== */
