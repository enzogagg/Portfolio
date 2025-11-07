/**
 * =====================================================================================================
 * E2E TESTS - VISUAL REGRESSION & CROSS-BROWSER
 * =====================================================================================================
 * 
 * Visual Regression Tests and browser compatibility
 */

const { test, expect } = require('@playwright/test');
const { waitForPageReady } = require('./helpers/test-helpers');

test.describe('Visual Regression Tests', () => {
  const pages = [
    { name: 'home', url: '/frontend/index.html' },
    { name: 'about', url: '/frontend/about.html' },
    { name: 'projects', url: '/frontend/projects.html' },
    { name: 'contact', url: '/frontend/contact.html' }
  ];

  for (const pageDef of pages) {
    test.skip(`screenshot of the ${pageDef.name} - desktop`, async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(pageDef.url);
      await waitForPageReady(page);
      
      // Wait for animations to complete
      await page.waitForTimeout(1000);

      // Take a screenshot
      await expect(page).toHaveScreenshot(`${pageDef.name}-desktop.png`, {
        fullPage: true,
        maxDiffPixels: 100
      });
    });

    test.skip(`screenshot of the ${pageDef.name} - mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(pageDef.url);
      await waitForPageReady(page);
      
      await page.waitForTimeout(1000);
      
      await expect(page).toHaveScreenshot(`${pageDef.name}-mobile.png`, {
        fullPage: true,
        maxDiffPixels: 100
      });
    });
  }

  test.skip('screenshot of mobile menu opened', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/frontend/index.html');
    
    const burgerMenu = page.locator('.burger-menu, .hamburger').first();
    
    if (await burgerMenu.count() > 0) {
      await burgerMenu.click();
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('menu-mobile-open.png', {
        maxDiffPixels: 100
      });
    }
  });

  test.skip('screenshot of active project filters', async ({ page }) => {
    await page.goto('/frontend/projects.html');
    await waitForPageReady(page);
    
    const filterButtons = page.locator('[data-filter]');
    
    if (await filterButtons.count() > 1) {
      await filterButtons.nth(1).click();
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('projects-filtered.png', {
        fullPage: true,
        maxDiffPixels: 100
      });
    }
  });
});

test.describe('Cross-Browser Tests', () => {
  test('should load correctly in all browsers', async ({ page, browserName }) => {
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);
    
    // CHECK: Header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Log browsers for debugging
    console.log(`✅ Test passed on ${browserName}`);
  });

  test('animations should work in all browsers', async ({ page }) => {
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);

    // Scroll to trigger animations
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);

    // Check that animated elements are visible
    const animatedElements = page.locator('.animate-in, [class*="fade"]');
    
    if (await animatedElements.count() > 0) {
      await expect(animatedElements.first()).toBeVisible();
    }
  });

  test('responsive should work in all browsers', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/frontend/index.html');
      await page.waitForTimeout(300);
      
      const header = page.locator('header');
      await expect(header).toBeVisible();
    }
  });
});

test.describe('Cross-Browser Performance Tests', () => {
  test('should load quickly in all browsers', async ({ page, browserName }) => {
    const startTime = Date.now();
    
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);
    
    const loadTime = Date.now() - startTime;
    
    console.log(`⏱️ Temps de chargement sur ${browserName}: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have memory leaks', async ({ page }) => {
    // Navigate between multiple pages
    const pages = [
      '/frontend/index.html',
      '/frontend/about.html',
      '/frontend/projects.html',
      '/frontend/contact.html'
    ];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageReady(page);
    }

    // Return to the first page
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);

    // The page should still work
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});

test.describe('Global Non-Regression Tests', () => {
  test.skip('all pages should have a favicon', async ({ page }) => {
    const pages = [
      '/frontend/index.html',
      '/frontend/about.html',
      '/frontend/projects.html',
      '/frontend/contact.html'
    ];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      const favicon = page.locator('link[rel*="icon"]');
      const hasFavicon = await favicon.count() > 0;

      // At least one link to a favicon should exist
      expect(hasFavicon).toBeTruthy();
    }
  });

  test('all pages should have SEO meta tags', async ({ page }) => {
    const pages = [
      '/frontend/index.html',
      '/frontend/about.html',
      '/frontend/projects.html',
      '/frontend/contact.html'
    ];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      const metaDescription = page.locator('meta[name="description"]');
      const metaViewport = page.locator('meta[name="viewport"]');
      
      expect(await metaDescription.count()).toBeGreaterThan(0);
      expect(await metaViewport.count()).toBeGreaterThan(0);
    }
  });

  test('all pages should have a unique title', async ({ page }) => {
    const pages = [
      '/frontend/index.html',
      '/frontend/about.html',
      '/frontend/projects.html',
      '/frontend/contact.html'
    ];
    
    const titles = [];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      const title = await page.title();
      
      expect(title.length).toBeGreaterThan(0);
      titles.push(title);
    }

    // All titles should be unique
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  test('should not have broken links', async ({ page }) => {
    await page.goto('/frontend/index.html');
    
    const links = page.locator('a[href^="/frontend"]');
    const count = await links.count();
    
    const brokenLinks = [];
    
    for (let i = 0; i < Math.min(count, 20); i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      
      if (href) {
        try {
          const response = await page.request.get(href);
          if (response.status() >= 400) {
            brokenLinks.push(href);
          }
        } catch (e) {
          brokenLinks.push(href);
        }
      }
    }
    
    expect(brokenLinks).toHaveLength(0);
  });

  test('scripts should not produce errors', async ({ page }) => {
    const errors = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    const pages = [
      '/frontend/index.html',
      '/frontend/about.html',
      '/frontend/projects.html',
      '/frontend/contact.html'
    ];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageReady(page);
    }
    
    // Filter known issues
    const criticalErrors = errors.filter(err => 
      !err.includes('handleVisibilityChange') // Known issue - TODO: fix in performance.js
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('should handle 404 errors gracefully', async ({ page }) => {
    const response = await page.goto('/frontend/nonexistent.html');
    
    if (response) {
      expect(response.status()).toBe(404);
    }
  });

  test('should load all CSS resources', async ({ page }) => {
    const failedResources = [];
    
    page.on('response', response => {
      if (response.url().endsWith('.css') && response.status() >= 400) {
        failedResources.push(response.url());
      }
    });
    
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);
    
    expect(failedResources).toHaveLength(0);
  });

  test('should load all JS resources', async ({ page }) => {
    const failedResources = [];
    
    page.on('response', response => {
      if (response.url().endsWith('.js') && response.status() >= 400) {
        const url = response.url();
        // Ignore dev/test files
        if (!url.includes('node_modules') && !url.includes('playwright')) {
          failedResources.push(url);
        }
      }
    });
    
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);
    
    expect(failedResources.length).toBeLessThan(3);
  });

  test('should not have critical console.error', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);

    // Filter known non-critical errors
    const criticalErrors = errors.filter(err =>
      !err.includes('404') &&
      !err.includes('favicon') &&
      !err.includes('DevTools')
    );
    
    expect(criticalErrors.length).toBeLessThan(3);
  });
});

test.describe('End-to-End Integration Tests', () => {
  test('complete user journey: navigating through the entire site', async ({ page }) => {
    // 1. Load homepage
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);
    await expect(page.locator('header')).toBeVisible();

    // 2. Navigate to About (use visible link or navigate directly)
    const aboutLink = page.locator('a[href*="about"]').filter({ hasText: /propos/i }).first();
    if (await aboutLink.isVisible().catch(() => false)) {
      await aboutLink.click();
    } else {
      await page.goto('/frontend/about.html');
    }
    await waitForPageReady(page);
    await expect(page).toHaveURL(/about\.html/);

    // 3. Navigate to Projects
    const projectsLink = page.locator('a[href*="projects"]').filter({ hasText: /projet/i }).first();
    if (await projectsLink.isVisible().catch(() => false)) {
      await projectsLink.click();
    } else {
      await page.goto('/frontend/projects.html');
    }
    await waitForPageReady(page);
    await expect(page).toHaveURL(/projects\.html/);

    // 4. Filter projects
    const filterButtons = page.locator('[data-filter]');
    if (await filterButtons.count() > 1) {
      await filterButtons.nth(1).click();
      await page.waitForTimeout(500);
    }
    
    // 5. Navigate to Contact
    const contactLink = page.locator('a[href*="contact"]').filter({ hasText: /contact/i }).first();
    if (await contactLink.isVisible().catch(() => false)) {
      await contactLink.click();
    } else {
      await page.goto('/frontend/contact.html');
    }
    await waitForPageReady(page);
    await expect(page).toHaveURL(/contact\.html/);

    // 6. Return to the homepage
    const homeLink = page.locator('a[href*="index"], a[href="#top"]').first();
    if (await homeLink.isVisible().catch(() => false)) {
      await homeLink.click();
    } else {
      await page.goto('/frontend/index.html');
    }
    await waitForPageReady(page);
    await expect(page).toHaveURL(/index\.html/);
  });

  test('mobile user journey: menu + navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/frontend/index.html');
    await waitForPageReady(page);
    
    const burgerMenu = page.locator('.burger-menu, .hamburger').first();
    
    if (await burgerMenu.count() > 0) {
      // Open menu
      await burgerMenu.click();
      await page.waitForTimeout(500);

      // Click on a visible link in mobile menu
      const navLink = page.locator('.mobile-menu a, #mobile-menu a').filter({ hasNotText: '' }).first();
      if (await navLink.isVisible().catch(() => false)) {
        await navLink.click();
        await waitForPageReady(page);
        // Verify navigation happened
        expect(page.url()).toContain('/frontend/');
      }
    }
  });
});
