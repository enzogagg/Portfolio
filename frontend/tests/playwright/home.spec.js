/**
 * =====================================================================================================
 * E2E TESTS - HOME PAGE
 * =====================================================================================================
 *
 * Functional and non-regression tests for the homepage
 */

const { test, expect } = require("@playwright/test");
const { waitForPageReady } = require("./helpers/test-helpers");

test.describe("Homepage - Functional Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/index.html");
    await waitForPageReady(page);
  });

  test("should load the homepage with the correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio|Enzo/i);
  });

  test("should display the header with navigation", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check that navigation exists (might be hidden on mobile, visible on desktop)
    const nav = page.locator("nav");
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThan(0);

    // Verify specific links exist somewhere in the page (desktop nav or mobile menu)
    const aboutLink = page.locator('a[href*="about"]');
    const projectsLink = page.locator('a[href*="projects"]');
    const contactLink = page.locator('a[href*="contact"]');

    expect(await aboutLink.count()).toBeGreaterThan(0);
    expect(await projectsLink.count()).toBeGreaterThan(0);
    expect(await contactLink.count()).toBeGreaterThan(0);
  });

  test("should display the hero section", async ({ page }) => {
    const heroSection = page.locator("section").first();
    await expect(heroSection).toBeVisible();

    // Check main content
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("should have a footer with information", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});

// Separate test for console errors (needs to attach listener before navigation)
test.describe("Homepage - Console Errors", () => {
  test("should not have critical console errors", async ({ page }) => {
    const errors = [];

    // Attach listener BEFORE navigation
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/index.html");
    await waitForPageReady(page);

    // Filter known non-critical errors
    const criticalErrors = errors.filter(
      (err) =>
        !err.includes("404") &&
        !err.includes("favicon") &&
        !err.includes("ERR_NAME_NOT_RESOLVED") && // DNS lookup failures for external resources
        !err.includes("Failed to load resource") && // Missing external resources
        !err.includes("cookie") && // Cookie errors from Matomo analytics
        !err.includes("_pk_testcookie"), // Matomo test cookie errors
    );

    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe("Homepage - Additional Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/index.html");
    await waitForPageReady(page);
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check that burger menu is visible on mobile
    const burgerMenu = page.locator(
      '.burger-menu, .hamburger, [aria-label*="menu"]',
    );
    if ((await burgerMenu.count()) > 0) {
      await expect(burgerMenu.first()).toBeVisible();
    }
  });

  test("should load all important images", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    const images = page.locator("img[src]");
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Check that images load
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const src = await img.getAttribute("src");
        if (src && !src.startsWith("data:")) {
          await expect(img).toBeVisible();
        }
      }
    }
  });

  test("should have meta tags for SEO", async ({ page }) => {
    // Check important meta tags
    const metaDescription = page.locator('meta[name="description"]');
    const metaViewport = page.locator('meta[name="viewport"]');

    expect(await metaDescription.count()).toBeGreaterThan(0);
    expect(await metaViewport.count()).toBeGreaterThan(0);
  });

  test("should allow smooth scroll to sections", async ({ page }) => {
    const anchorLinks = page.locator('a[href^="#"]');
    const count = await anchorLinks.count();

    if (count > 0) {
      const firstAnchor = anchorLinks.first();
      await firstAnchor.click();

      // Wait for scroll to finish
      await page.waitForTimeout(500);

      // Page should not have reloaded
      await expect(page).toHaveURL(/index\.html/);
    }
  });
});

test.describe("Homepage - Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/index.html");
  });

  test("should have appropriate ARIA attributes", async ({ page }) => {
    // Check that interactive elements have labels
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute("aria-label");
      const textContent = await button.textContent();

      // Each button should have either an aria-label or text
      expect(ariaLabel || textContent?.trim()).toBeTruthy();
    }
  });

  test("should allow keyboard navigation", async ({ page, browserName }) => {
    // Skip on webkit due to focus issues
    if (browserName === "webkit") {
      test.skip();
      return;
    }

    // Test keyboard navigation with Tab
    // Focus the page first
    await page.click("body");
    await page.keyboard.press("Tab");
    await page.waitForTimeout(100);

    // Check that an element has focus (or at least body has focus)
    const focusedElement = page.locator(":focus");
    const count = await focusedElement.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should have sufficient color contrast", async ({ page }) => {
    // Basic test: Check that main text elements are visible and readable
    const mainHeading = page.locator("h1").first();
    await expect(mainHeading).toBeVisible();

    const paragraphs = page.locator("p");
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);

    // Verify that text is not completely transparent or invisible
    if (count > 0) {
      const firstPara = paragraphs.first();
      await expect(firstPara).toBeVisible();
    }
  });
});

test.describe("Homepage - Performance Tests", () => {
  test("should load in less than 3 seconds", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test("should not have major blocking resources", async ({ page }) => {
    const responses = [];

    page.on("response", (response) => {
      responses.push({
        url: response.url(),
        status: response.status(),
      });
    });

    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");

    // Check that there are not too many failed requests
    const failedRequests = responses.filter((r) => r.status >= 400);
    const criticalFailed = failedRequests.filter(
      (r) => !r.url.includes("favicon") && !r.url.includes("analytics"),
    );

    expect(criticalFailed.length).toBeLessThan(3);
  });
});
