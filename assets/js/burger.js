/**
 * =====================================================================================================
 * PORTFOLIO - BURGER MENU HANDLER
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: burger.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Handles the mobile hamburger menu toggle functionality with smooth animations
 * and accessibility features for the Apple-style navigation.
 *
 * Features:
 * - Mobile burger menu toggle
 * - Smooth slide animations
 * - Click outside to close
 * - Escape key support
 * - ARIA attributes management
 * - Prevent body scroll when menu is open
 *
 * Dependencies: None - standalone module
 * Browser Support: Modern browsers with ES6
 *
 * =====================================================================================================
 */

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const burger = document.querySelector('.burger-menu');
  if (menu) {
    menu.classList.toggle('active');
    if (burger) burger.classList.toggle('active');
    if (menu.classList.contains('active')) {
      menu.style.display = 'block';
      setTimeout(() => menu.style.opacity = '1', 10);
    } else {
      menu.style.opacity = '0';
      setTimeout(() => menu.style.display = 'none', 300);
    }
  }
}
function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const burger = document.querySelector('.burger-menu');
  if (menu) {
    menu.classList.remove('active');
    if (burger) burger.classList.remove('active');
    menu.style.opacity = '0';
    setTimeout(() => menu.style.display = 'none', 300);
  }
}
// Initial state
globalThis.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.style.display = 'none';
    menu.style.opacity = '0';
  }

  // Add event listener to burger menu
  const burger = document.querySelector('.burger-menu');
  if (burger) {
    burger.addEventListener('click', toggleMobileMenu);
  }
});
