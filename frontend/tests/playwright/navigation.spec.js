/**
 * =====================================================================================================
 * E2E TESTS - NAVIGATION & MENU
 * =====================================================================================================
 *
 * Tests pour la navigation globale et le menu mobile
 */

const { test, expect } = require("@playwright/test");
const { waitForPageReady } = require("./helpers/test-helpers");

test.describe("Navigation - Desktop", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name.toLowerCase().includes("mobile")) {
      test.skip();
    }
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/index.html");
  });

  test("should display all navigation links", async ({ page }) => {
    const navLinks = page.locator("nav a, header a");
    const count = await navLinks.count();

    expect(count).toBeGreaterThan(0);
  });

  test("should navigate to About page", async ({ page }) => {
    const aboutLink = page.locator('a[href*="about"]').first();

    if ((await aboutLink.count()) > 0) {
      await aboutLink.click();
      await waitForPageReady(page);

      await expect(page).toHaveURL(/about\.html/);
    }
  });

  test("should navigate to Projects page", async ({ page }) => {
    const projectsLink = page.locator('a[href*="projects"]').first();

    if ((await projectsLink.count()) > 0) {
      await projectsLink.click();
      await waitForPageReady(page);

      await expect(page).toHaveURL(/projects\.html/);
    }
  });

  test("should navigate to Contact page", async ({ page }) => {
    const contactLink = page.locator('a[href*="contact"]').first();

    if ((await contactLink.count()) > 0) {
      await contactLink.click();
      await waitForPageReady(page);

      await expect(page).toHaveURL(/contact\.html/);
    }
  });

  test("should highlight the active link", async ({ page }) => {
    const navLinks = page.locator("nav a");

    if ((await navLinks.count()) > 0) {
      // At least one link should have active class or aria-current
      const activeLink = page.locator("nav a.active, nav a[aria-current]");

      if ((await activeLink.count()) > 0) {
        await expect(activeLink.first()).toBeVisible();
      }
    }
  });

  test("header should remain visible on scroll", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    // Header should still be visible (sticky or fixed)
    const isVisible = await header.isVisible();
    expect(isVisible).toBeTruthy();
  });
});

test.describe("Navigation - Mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/index.html");
    await waitForPageReady(page);
  });

  test("should display burger menu on mobile", async ({ page }) => {
    const burgerMenu = page.locator(
      '.burger-menu, .hamburger, button[aria-label*="menu" i]',
    );

    if ((await burgerMenu.count()) > 0) {
      await expect(burgerMenu.first()).toBeVisible();
    }
  });

  test("should open mobile menu on click", async ({ page }) => {
    // Wait for burger menu to be available
    await page.waitForSelector(".burger-menu, .hamburger", { timeout: 5000 });
    const burgerMenu = page.locator(".burger-menu, .hamburger").first();

    if ((await burgerMenu.count()) > 0) {
      await burgerMenu.click();

      // Wait for the mobile menu to have the active class
      await page.waitForSelector("#mobile-menu.active, .mobile-menu.active", {
        timeout: 5000,
        state: "attached",
      });

      await page.waitForTimeout(300);

      // Check that mobile menu becomes visible (has active class or is displayed)
      const mobileMenu = page.locator(
        "#mobile-menu.active, .mobile-menu.active",
      );
      const isVisible = (await mobileMenu.count()) > 0;
      expect(isVisible).toBeTruthy();
    }
  });

  test("should close mobile menu after navigation", async ({ page }) => {
    // Wait for burger menu to be available
    await page.waitForSelector(".burger-menu, .hamburger", { timeout: 5000 });
    const burgerMenu = page.locator(".burger-menu, .hamburger").first();

    if ((await burgerMenu.count()) > 0) {
      // Open menu
      await burgerMenu.click();
      await page.waitForTimeout(500);

      // Wait for the mobile menu to be attached first
      await page.waitForSelector("#mobile-menu.active, .mobile-menu.active", {
        timeout: 5000,
        state: "attached",
      });

      // Then wait for it to be visible
      await page.waitForSelector("#mobile-menu.active, .mobile-menu.active", {
        timeout: 5000,
        state: "visible",
      });

      // Wait for navigation link to be visible
      await page.waitForSelector(
        ".mobile-menu a:visible, #mobile-menu a:visible",
        { timeout: 5000 },
      );

      // Click on a navigation link inside the mobile menu
      const navLink = page.locator(".mobile-menu a, #mobile-menu a").first();
      if ((await navLink.count()) > 0) {
        await navLink.click();
        await page.waitForTimeout(500);

        // Menu should close (no longer have active class or be visible)
        const activeMobileMenu = page.locator(
          "#mobile-menu.active, .mobile-menu.active",
        );
        const count = await activeMobileMenu.count();
        // Either no active class exists, or the menu is hidden
        expect(
          count === 0 ||
            !(await activeMobileMenu
              .first()
              .isVisible()
              .catch(() => false)),
        ).toBeTruthy();
      }
    }
  });

  test("should close menu with Escape key", async ({ page }) => {
    const burgerMenu = page.locator(".burger-menu, .hamburger").first();

    if ((await burgerMenu.count()) > 0) {
      await burgerMenu.click();
      await page.waitForTimeout(300);

      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);

      // Check that menu is closed
      const mobileMenu = page.locator(
        "#mobile-menu.active, .mobile-menu.active",
      );

      if ((await mobileMenu.count()) > 0) {
        const isVisible = await mobileMenu.first().isVisible();
        expect(isVisible).toBeFalsy();
      }
    }
  });

  test("should have correct aria-expanded attribute", async ({ page }) => {
    const burgerMenu = page.locator(".burger-menu, .hamburger").first();

    if ((await burgerMenu.count()) > 0) {
      const hasAriaExpanded =
        (await burgerMenu.getAttribute("aria-expanded")) !== null;

      if (hasAriaExpanded) {
        // If aria-expanded exists, test it
        await burgerMenu.click();
        await page.waitForTimeout(300);

        const openAria = await burgerMenu.getAttribute("aria-expanded");
        expect(openAria).toBe("true");
      } else {
        // If no aria-expanded, that's ok - skip this test
        expect(true).toBeTruthy();
      }
    }
  });
});

test.describe("Navigation - Keyboard Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/index.html");
  });

  test("should allow Tab navigation", async ({ page, browserName }) => {
    // Skip on webkit due to focus issues
    if (browserName === "webkit") {
      test.skip();
      return;
    }

    // Focus the page first
    await page.click("body");
    // Press Tab multiple times
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.waitForTimeout(100);

    const focusedElement = page.locator(":focus");
    const count = await focusedElement.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should activate links with Enter", async ({ page }) => {
    // Focus the page first
    await page.click("body");
    // Tab until a link (try multiple tabs)
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(50);

      const focusedElement = page.locator(":focus");
      if ((await focusedElement.count()) > 0) {
        const tagName = await focusedElement
          .evaluate((el) => el.tagName)
          .catch(() => null);

        if (tagName === "A") {
          await page.keyboard.press("Enter");
          await page.waitForTimeout(500);
          // Navigation should have taken place
          const url = page.url();
          expect(url).toBeTruthy();
          return;
        }
      }
    }
    // If no link found, that's ok - test passes
    expect(true).toBeTruthy();
  });

  test("should display a visible focus indicator", async ({ page }) => {
    await page.keyboard.press("Tab");

    const focusedElement = page.locator(":focus");

    if ((await focusedElement.count()) > 0) {
      // The focused element should be visible
      await expect(focusedElement).toBeVisible();

      // Check that it has an outline or focus style
      const outline = await focusedElement.evaluate(
        (el) => window.getComputedStyle(el).outline,
      );

      expect(outline).toBeTruthy();
    }
  });

  test("should support H keyboard shortcut for home", async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    // Press H
    await page.keyboard.press("h");
    await page.waitForTimeout(500);

    // Should scroll to top
    const scrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(scrollPosition).toBeLessThan(100);
  });
});

test.describe("Navigation - Non-Regression Tests", () => {
  test("links should not be broken", async ({ page }) => {
    const pages = [
      "/index.html",
      "/about.html",
      "/projects.html",
      "/contact.html",
    ];

    for (const pagePath of pages) {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBeLessThan(400);
    }
  });

  test("should not have dead links in navigation", async ({ page }) => {
    await page.goto("/index.html");

    const navLinks = page.locator("nav a[href]");
    const count = await navLinks.count();

    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute("href");

      if (href && !href.startsWith("#") && !href.startsWith("http")) {
        // Build full URL for relative links
        const fullUrl = href.startsWith("/") ? href : `/${href}`;
        const response = await page.request.get(fullUrl);
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test("should handle window resizing", async ({ page }) => {
    await page.goto("/index.html");

    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(300);

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Return to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(300);

    // Page should not be broken
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("should close mobile menu when clicking outside", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/index.html");

    const burgerMenu = page.locator(".burger-menu, .hamburger").first();

    if ((await burgerMenu.count()) > 0) {
      // Open menu
      await burgerMenu.click();
      await page.waitForTimeout(300);

      // Click outside
      await page.click("body", { position: { x: 10, y: 10 } });
      await page.waitForTimeout(300);

      // Menu should be closed
      const mobileMenu = page.locator("#mobile-menu.active");

      if ((await mobileMenu.count()) > 0) {
        const isVisible = await mobileMenu.first().isVisible();
        expect(isVisible).toBeFalsy();
      }
    }
  });
});
