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
 */
async function waitForPageReady(page) {
  await page.waitForLoadState('networkidle');
  
  // Wait for loader to disappear (if it exists)
  try {
    await page.waitForSelector('.minimal-loader', { state: 'hidden', timeout: 10000 });
  } catch (error) {
    // Loader might not exist or already hidden, that's ok
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
  gotoAndWaitForReady
};
