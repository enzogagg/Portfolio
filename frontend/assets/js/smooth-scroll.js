/* global Lenis, ScrollTrigger, gsap */
/**
 * =====================================================================================================
 * PORTFOLIO - SMOOTH SCROLL (LENIS)
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: smooth-scroll.js
 * Version: 1.0.0 (Level 10)
 *
 * Description:
 * Implements Lenis for buttery smooth scrolling.
 *
 * =====================================================================================================
 */

(function () {
  "use strict";

  if (typeof Lenis === "undefined") {
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Integrate with GSAP ScrollTrigger if available
  if (typeof ScrollTrigger !== "undefined") {
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Expose lenis instance globally if needed
  window.lenis = lenis;
})();
