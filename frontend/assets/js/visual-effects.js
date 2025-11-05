/**
 * =====================================================================================================
 * PORTFOLIO - VISUAL EFFECTS
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: visual-effects.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Manages floating particles and parallax effect on gradient orbs
 * for enhanced visual experience with optimized performance.
 *
 * Features:
 * - 30 floating particles generation
 * - Parallax scroll effect on orbs
 * - RequestAnimationFrame optimization
 * - Passive event listeners
 * - GPU-accelerated transforms
 *
 * Dependencies: None - standalone module
 * Browser Support: Modern browsers with requestAnimationFrame
 *
 * =====================================================================================================
 */

(function () {
  'use strict';

  /**
   * Generates 30 floating particles in the mesh-gradient-bg container
   */
  function initFloatingParticles() {
    const particlesContainer = document.querySelector('.mesh-gradient-bg');
    if (!particlesContainer) {
      return;
    }

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('floating-particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${8 + Math.random() * 8}s`;
      particlesContainer.appendChild(particle);
    }
  }

  /**
   * Parallax effect on .mesh-gradient-orb elements on scroll
   * Optimized with requestAnimationFrame
   */
  function initParallaxEffect() {
    const orbs = document.querySelectorAll('.mesh-gradient-orb');
    if (orbs.length === 0) {
      return;
    }

    let ticking = false;
    let lastScrollY = 0;

    globalThis.addEventListener(
      'scroll',
      () => {
        lastScrollY = globalThis.scrollY;

        if (!ticking) {
          globalThis.requestAnimationFrame(() => {
            for (let i = 0; i < orbs.length; i++) {
              const speed = 0.15 + i * 0.05;
              orbs[i].style.transform = `translateY(${lastScrollY * speed}px)`;
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  /**
   * Initialization on DOMContentLoaded
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initFloatingParticles();
      initParallaxEffect();
    });
  } else {
    initFloatingParticles();
    initParallaxEffect();
  }
})();
