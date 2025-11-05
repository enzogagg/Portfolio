/**
 * =====================================================================================================
 * PORTFOLIO - MODULE LOADER
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: module-loader.js
 * Version: 2.1.0
 * Last Updated: November 2025
 *
 * Description:
 * Detects the protocol and loads the appropriate module (standalone or ES6)
 * to ensure compatibility with both file:// and http:// protocols.
 *
 * Features:
 * - Protocol detection (file:// vs http://)
 * - Dynamic script loading
 * - Standalone fallback for local files
 * - ES6 module support for server
 *
 * Dependencies: None - bootstrap module
 * Browser Support: Modern browsers
 *
 * =====================================================================================================
 */

(function () {
  'use strict';

  if (globalThis.location && globalThis.location.protocol === 'file:') {
    // File protocol mode - Load standalone script
    const script = document.createElement('script');
    script.src = 'assets/js/standalone.js';
    document.head.appendChild(script);
  } else {
    // HTTP protocol mode - Load ES6 module
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'assets/js/app.js';
    document.head.appendChild(script);
  }
})();
