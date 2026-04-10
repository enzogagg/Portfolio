/**
 * =====================================================================================================
 * PORTFOLIO - VISUAL EFFECTS
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: visual-effects.js
 * Version: 3.0.0
 *
 * Description:
 * Manages advanced visual effects: Custom Cursor, 3D Tilt, Spotlight, Magnetic Buttons.
 *
 * =====================================================================================================
 */

(function () {
  "use strict";

  /**
   * Initialization
   */
  function initAll() {
    initTiltEffect();
    initSpotlightEffect();
    initMagneticButtons();
  }
  function initTiltEffect() {
    const cards = document.querySelectorAll(
      ".project-card-home, .tech-card, .glass-card-premium, .project-card-enhanced",
    );

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      });
    });
  }

  /**
   * Spotlight Effect
   */
  function initSpotlightEffect() {
    const cards = document.querySelectorAll(
      ".project-card-home, .tech-card, .glass-card-premium, .project-card-enhanced",
    );

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
          radial-gradient(
            circle at ${x}px ${y}px, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.01) 40%, 
            transparent 100%
          ),
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 100%
          )
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.background = "";
      });
    });
  }

  /**
   * Magnetic Buttons
   */
  function initMagneticButtons() {
    const buttons = document.querySelectorAll(
      "a.glass-button, button.glass-button, .project-btn",
    );

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
