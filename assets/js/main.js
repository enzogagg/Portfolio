// ========================================
// PORTFOLIO MAIN JAVASCRIPT
// Modern Interactive Portfolio Website
// Author: Enzo Gaggiotti
// ========================================

'use strict';

// ========== GLOBAL VARIABLES ==========
let lastScrollPosition = 0;
const SCROLL_THRESHOLD = 100;

// ========== THEME MANAGEMENT ==========
/**
 * Toggle between light and dark themes
 * Saves preference to localStorage and updates DOM classes
 */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');

  console.log('Toggle theme called. Current isDark:', isDark);

  if (isDark) {
    // Switch to light theme
    html.classList.remove('dark');
    html.classList.remove('bg-neutral-950', 'text-white');
    html.classList.add('bg-white', 'text-gray-900');
    localStorage.setItem('theme', 'light');
    console.log('Switched to light theme');
  } else {
    // Switch to dark theme
    html.classList.add('dark');
    html.classList.remove('bg-white', 'text-gray-900');
    html.classList.add('bg-neutral-950', 'text-white');
    localStorage.setItem('theme', 'dark');
    console.log('Switched to dark theme');
  }
}

/**
 * Load saved theme from localStorage or default to light
 * Applies theme on initial page load
 */
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const html = document.documentElement;

  console.log('Loading theme:', savedTheme);

  if (savedTheme === 'dark') {
    html.classList.add('dark');
    html.classList.remove('bg-white', 'text-gray-900');
    html.classList.add('bg-neutral-950', 'text-white');
  } else {
    html.classList.remove('dark');
    html.classList.remove('bg-neutral-950', 'text-white');
    html.classList.add('bg-white', 'text-gray-900');
  }

  console.log('Theme loaded. Current classes:', html.className);
}

// ========== MOBILE NAVIGATION ==========
/**
 * Toggle mobile menu visibility
 * Handles hamburger menu animation and mobile nav state
 */
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerMenu = document.querySelector('.burger-menu');

  if (!mobileMenu || !burgerMenu) return;

  // Toggle active states
  mobileMenu.classList.toggle('active');
  burgerMenu.classList.toggle('active');

  // Prevent body scroll when menu is open
  document.body.classList.toggle('menu-open', mobileMenu.classList.contains('active'));
}

/**
 * Close mobile menu and reset states
 * Used when clicking menu items or outside the menu
 */
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerMenu = document.querySelector('.burger-menu');

  if (!mobileMenu || !burgerMenu) return;

  // Remove active states
  mobileMenu.classList.remove('active');
  burgerMenu.classList.remove('active');
  document.body.classList.remove('menu-open');
}

// ========== HEADER SCROLL BEHAVIOR ==========
/**
 * Handle header visibility on scroll
 * Hides header when scrolling down, shows when scrolling up
 * Improves UX by providing more screen real estate when reading
 */
function handleHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const currentScroll = window.pageYOffset;

  // Hide header when scrolling down past threshold
  if (currentScroll > lastScrollPosition && currentScroll > SCROLL_THRESHOLD) {
    header.style.transform = 'translateY(-100%)';
  } else {
    // Show header when scrolling up or at top
    header.style.transform = 'translateY(0)';
  }

  lastScrollPosition = currentScroll;
}

// ========== SCROLL ANIMATIONS ==========
/**
 * Initialize scroll-triggered animations using Intersection Observer
 * Provides better performance than scroll event listeners
 * Animates elements when they come into viewport
 */
function initializeScrollAnimations() {
  // Elements that should animate on scroll
  const animatedElements = document.querySelectorAll('.fade-in, .animate-on-scroll');

  if (animatedElements.length === 0) return;

  // Intersection Observer options
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully visible
  };

  // Create observer instance
  const animationObserver = new IntersectionObserver((entries) => {
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
      animationObserver.unobserve(target);
    });
  }, observerOptions);

  // Start observing all animated elements
  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });
}

// ========== KEYBOARD ACCESSIBILITY ==========
/**
 * Enhance keyboard navigation accessibility
 * Shows focus indicators only when using keyboard navigation
 * Improves UX for both keyboard and mouse users
 */
function initializeKeyboardNavigation() {
  // Track keyboard usage
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  // Track mouse usage
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}

// ========== SMOOTH SCROLL NAVIGATION ==========
/**
 * Initialize smooth scrolling for anchor links
 * Handles internal navigation and active states
 * Provides better UX than default browser jump behavior
 */
function initializeSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      // Smooth scroll to target
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update active navigation states
      updateActiveNavigation(this);

      // Close mobile menu if open
      closeMobileMenu();
    });
  });
}

/**
 * Update active navigation link state
 * @param {Element} activeLink - The clicked navigation link
 */
function updateActiveNavigation(activeLink) {
  // Remove active class from all nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });

  // Add active class to clicked link
  activeLink.classList.add('active');
}

// ========== PERFORMANCE OPTIMIZATIONS ==========
/**
 * Optimize performance for interactive elements
 * Uses will-change property strategically to improve animations
 * Prevents unnecessary repaints and layout thrashing
 */
function initializePerformanceOptimizations() {
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

  // Optimize scroll performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    // Debounce scroll events for better performance
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        handleHeaderScroll();
        scrollTimeout = null;
      }, 10);
    }
  }, { passive: true });
}

// ========== EVENT LISTENERS ==========
/**
 * Set up global event listeners for user interactions
 * Handles keyboard shortcuts, click outside events, and other UX improvements
 */
function setupEventListeners() {
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'Escape':
        closeMobileMenu();
        break;
      case 't':
        // Toggle theme with 't' key (when not typing in form)
        if (!e.target.matches('input, textarea')) {
          toggleTheme();
        }
        break;
    }
  });

  // Click outside mobile menu to close
  document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerMenu = document.querySelector('.burger-menu');

    if (!mobileMenu || !burgerMenu) return;

    // Close menu if clicking outside of menu elements
    if (!burgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Handle window resize for mobile menu
  window.addEventListener('resize', () => {
    // Close mobile menu on desktop breakpoint
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });
}

// ========== INITIAL NAVIGATION STATE ==========
/**
 * Set initial active navigation state based on current page
 * Ensures correct navigation highlighting on page load
 */
function setInitialNavigationState() {
  const currentPath = window.location.pathname;
  const isHomePage = currentPath === '/' ||
                     currentPath.endsWith('index.html') ||
                     currentPath === '';

  if (isHomePage) {
    const homeLink = document.querySelector('nav a[href="#top"]');
    if (homeLink) {
      homeLink.classList.add('active');
    }
  }
}

// ========== APPLICATION INITIALIZATION ==========
/**
 * Main initialization function
 * Runs when DOM is fully loaded and sets up all functionality
 * Ensures proper order of initialization for optimal performance
 */
function initializeApplication() {
  console.log('🚀 Initializing Portfolio Application...');

  try {
    // Core functionality
    loadTheme();
    setInitialNavigationState();

    // User interaction features
    initializeKeyboardNavigation();
    initializeSmoothScroll();
    setupEventListeners();

    // Visual enhancements
    initializeScrollAnimations();
    initializePerformanceOptimizations();

    // Page-specific functionality
    initializeProjectsPage();
    initializeProjectsScrollAnimations();

    console.log('✅ Portfolio Application initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing application:', error);
  }
}

// ========== DOM READY EVENT ==========
/**
 * Wait for DOM to be fully loaded before initializing
 * Ensures all elements are available for manipulation
 */
document.addEventListener('DOMContentLoaded', initializeApplication);

// ========== EXPOSE GLOBAL FUNCTIONS ==========
/**
 * Make certain functions globally available for HTML onclick handlers
 * Required for theme toggle button and mobile menu interactions
 */
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// ========== PROJECTS PAGE FUNCTIONALITY ==========
/**
 * Initialize project filtering and animations for projects page
 * Only runs if project-related elements are present on the page
 */
function initializeProjectsPage() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Only initialize if we're on the projects page
  if (filterButtons.length === 0 || projectCards.length === 0) {
    return;
  }

  console.log('🎯 Initializing projects page functionality');

  // Project filtering functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter project cards with smooth animations
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          // Show card
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide card
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  console.log('✅ Projects page functionality initialized');
}

/**
 * Enhanced scroll animations for projects page
 * Extends the base scroll animations with project-specific behavior
 */
function initializeProjectsScrollAnimations() {
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
