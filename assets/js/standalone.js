// ========================================
// PORTFOLIO - STANDALONE VERSION
// Compatible with file:// protocol (no server needed)
// ========================================

'use strict';

(function() {
  // Portfolio Application
  class PortfolioApp {
    constructor() {
      this.isInitialized = false;
      this.modules = {};
    }

    async init() {
      if (this.isInitialized || document.readyState === 'loading') {
        return;
      }

      console.log('🚀 Initializing Portfolio Application (Standalone)...');

      // CRITICAL: Force filter visibility immediately for all environments
      this.ensureFiltersVisible();

      // Add js-enabled class for progressive enhancement
      document.body.classList.add('js-enabled');

      try {
        this.initializeTheme();
        this.initializeNavigation();
        this.initializeProjects();
        this.initializeAnimations();
        this.setupGlobalFunctions();

        this.isInitialized = true;
        console.log('✅ Portfolio Application initialized successfully');
      } catch (error) {
        console.error('❌ Error initializing application:', error);
      }
    }

    // Theme Management
    initializeTheme() {
      const storageKey = 'theme';

      const setLightTheme = () => {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(storageKey, 'light');
      };

      const setDarkTheme = () => {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(storageKey, 'dark');
      };

      const toggleTheme = () => {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark');

        if (isDark) {
          setLightTheme();
        } else {
          setDarkTheme();
        }
      };

      // Load saved theme
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme === 'light') {
        setLightTheme();
      } else {
        setDarkTheme();
      }

      this.modules.theme = { toggle: toggleTheme };
    }

    // Navigation Management
    initializeNavigation() {
      const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
          mobileMenu.classList.toggle('active');
        }
      };

      const closeMobileMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
          mobileMenu.classList.remove('active');
        }
      };

      // Header auto-hide on scroll functionality
      this.initializeHeaderAutoHide();

      this.modules.navigation = {
        toggleMobileMenu,
        closeMobileMenu
      };
    }

    // Header Auto-Hide Functionality
    initializeHeaderAutoHide() {
      const header = document.getElementById('main-header') || document.querySelector('header');
      if (!header) {
        console.log('Header not found, skipping auto-hide initialization');
        return;
      }

      let lastScrollY = window.scrollY;
      let isScrolling = false;

      // Throttle scroll events for better performance
      const throttle = (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
          const currentTime = Date.now();
          
          if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
          } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
          }
        };
      };

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 100; // Start hiding after 100px of scroll

        // Don't hide header if we're at the top of the page
        if (currentScrollY < scrollThreshold) {
          header.classList.remove('header-hidden');
          header.classList.add('header-visible');
          lastScrollY = currentScrollY;
          return;
        }

        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
          // Scrolling down - hide header
          header.classList.add('header-hidden');
          header.classList.remove('header-visible');
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show header
          header.classList.remove('header-hidden');
          header.classList.add('header-visible');
        }

        lastScrollY = currentScrollY;
      };

      // Use throttled scroll handler
      const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps

      // Add scroll event listener
      window.addEventListener('scroll', throttledHandleScroll, { passive: true });

      // Initialize header state
      header.classList.add('header-visible');

      console.log('🎯 Header auto-hide functionality initialized');
    }

    // Projects Filtering
    initializeProjects() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll('.project-card');

      if (filterButtons.length === 0 || projectCards.length === 0) {
        console.log('Projects page elements not found, skipping initialization');
        return;
      }

      console.log('🎯 Initializing projects page functionality');

      // Force visibility immediately for filter buttons and container
      this.ensureFiltersVisible();

      // Reset project cards
      projectCards.forEach(card => {
        card.style.display = '';
        card.style.opacity = '';
        card.style.transform = '';
        card.classList.remove('project-hidden', 'project-filtering');

        // Also ensure cards are visible
        if (card.classList.contains('animate-on-scroll')) {
          card.classList.add('animate-in');
        }
      });

      // Filter function
      const filterProjects = (filter) => {
        console.log(`Filtering projects by: ${filter}`);

        projectCards.forEach(card => {
          const category = card.dataset.category;

          if (filter === 'all' || category === filter) {
            // Show card
            card.classList.remove('project-hidden');
            card.classList.add('project-filtering');

            setTimeout(() => {
              card.classList.remove('project-filtering');
            }, 300);
          } else {
            // Hide card
            card.classList.add('project-filtering');

            setTimeout(() => {
              card.classList.add('project-hidden');
              card.classList.remove('project-filtering');
            }, 300);
          }
        });
      };

      // Update active button
      const updateActiveButton = (activeButton) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
      };

      // Setup event listeners
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.dataset.filter;
          filterProjects(filter);
          updateActiveButton(button);
        });
      });

      console.log('✅ Projects page functionality initialized');
    }

    // Ensure filter buttons are always visible (critical for all environments)
    ensureFiltersVisible() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const filterContainer = document.querySelector('.flex.flex-wrap.justify-center.gap-4.mb-20.animate-on-scroll');

      // Force visibility for all filter buttons
      filterButtons.forEach(btn => {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
        btn.style.visibility = 'visible';
        btn.classList.add('animate-in');
      });

      // Force visibility for filter container
      if (filterContainer) {
        filterContainer.style.opacity = '1';
        filterContainer.style.transform = 'translateY(0)';
        filterContainer.style.visibility = 'visible';
        filterContainer.classList.add('animate-in');
      }

      console.log('🔧 Filter visibility forced for production environment');
    }

    // Basic animations
    initializeAnimations() {
      // For file:// protocol, immediately show all animate-on-scroll elements
      if (window.location.protocol === 'file:') {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
          el.classList.add('animate-in');
        });
        console.log('✅ Forced animation visibility for file:// protocol');
        return;
      }

      // Intersection Observer for scroll animations
      if ('IntersectionObserver' in window) {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        }, observerOptions);

        // Observe elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
          observer.observe(el);
        });

        console.log('✅ Intersection Observer animations initialized');
      } else {
        // Fallback: immediately show all elements if IntersectionObserver not supported
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
          el.classList.add('animate-in');
        });
        console.log('✅ Fallback animation visibility applied');
      }
    }

    // Setup global functions
    setupGlobalFunctions() {
      window.toggleTheme = () => {
        this.modules.theme.toggle();
      };

      window.toggleMobileMenu = () => {
        this.modules.navigation.toggleMobileMenu();
      };

      window.closeMobileMenu = () => {
        this.modules.navigation.closeMobileMenu();
      };

      console.log('🔗 Global functions setup complete');
    }
  }

  // Initialize when DOM is ready
  const app = new PortfolioApp();

  // Critical: Emergency filter visibility for standalone environment
  function emergencyFilterVisibility() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterContainer = document.querySelector('.flex.flex-wrap.justify-center.gap-4.mb-20.animate-on-scroll');

    filterButtons.forEach(btn => {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
      btn.style.visibility = 'visible';
      btn.classList.add('animate-in');
    });

    if (filterContainer) {
      filterContainer.style.opacity = '1';
      filterContainer.style.transform = 'translateY(0)';
      filterContainer.style.visibility = 'visible';
      filterContainer.classList.add('animate-in');
    }
  }

  // Execute immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      emergencyFilterVisibility();
      app.init();
    });
  } else {
    emergencyFilterVisibility();
    app.init();
  }

  // Backup execution
  setTimeout(emergencyFilterVisibility, 50);

})();
