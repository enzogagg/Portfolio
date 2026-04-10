/**
 * =====================================================================================================
 * E2E TEST HELPERS
 * =====================================================================================================
 *
 * Shared utility functions for E2E tests
 */

/**
 * Wait for the page to be fully ready
 * This includes waiting for network idle and for the loader to disappear
 *
 * @param {import('@playwright/test').Page} page - The page object
 * @param {Object} options - Additional options
 * @param {boolean} options.waitForContent - Wait for main content to be visible
 */
async function waitForPageReady(page, options = {}) {
  const { waitForContent = true, waitUntil = "networkidle" } = options;

  await page.waitForLoadState(waitUntil);

  // Wait for components to be loaded
  try {
    await page.evaluate(() => {
      if (window.waitForComponents) {
        return window.waitForComponents();
      }
      return Promise.resolve();
    });
    // Give extra time for any scripts that run after component loading
    await page.waitForTimeout(300);
  } catch (error) {
    // Components might not use the loader system
  }

  // Wait for loader to disappear (if it exists)
  try {
    await page.waitForSelector(".minimal-loader", {
      state: "hidden",
      timeout: 10000,
    });
  } catch (error) {
    // Loader might not exist or already hidden, that's ok
  }

  // Wait for main content to be visible
  if (waitForContent) {
    try {
      await page.waitForSelector("main, body > div:not(.minimal-loader)", {
        state: "visible",
        timeout: 5000,
      });
      // Wait for animations to settle
      await page.waitForTimeout(500);
    } catch (error) {
      // Content might be structured differently, that's ok
    }
  }
}

/**
 * Navigate to a page and wait for it to be ready
 *
 * @param {import('@playwright/test').Page} page - The page object
 * @param {string} url - The URL to navigate to
 */
async function gotoAndWaitForReady(page, url) {
  await page.goto(url);
  await waitForPageReady(page);
}

module.exports = {
  waitForPageReady,
  gotoAndWaitForReady,
};
