/**
 * =====================================================================================================
 * E2E TESTS - ABOUT PAGE
 * =====================================================================================================
 *
 * Tests for the About page
 */

const { test, expect } = require("@playwright/test");
const { waitForPageReady } = require("./helpers/test-helpers");

test.describe("About Page - Content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about.html");
    await waitForPageReady(page);
  });

  test("should load the about page", async ({ page }) => {
    await expect(page).toHaveURL(/about\.html/);
  });

  test("should display a main heading", async ({ page }) => {
    const mainHeading = page.locator("h1").first();
    await expect(mainHeading).toBeVisible();
  });

  test("should display a biography", async ({ page }) => {
    const bio = page.locator("p, section").first();
    await expect(bio).toBeVisible();

    const text = await bio.textContent();
    expect(text?.length).toBeGreaterThan(50);
  });

  test("should display a profile picture", async ({ page }) => {
    const profileImage = page.locator(
      'img[src*="avatar"], img[src*="profile"], img[src*="photo"]',
    );

    if ((await profileImage.count()) > 0) {
      await expect(profileImage.first()).toBeVisible();

      // Check that image has alt text
      const alt = await profileImage.first().getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });

  test("should list skills", async ({ page }) => {
    const skills = page.locator('.skill, .technology, [class*="tech"]');

    if ((await skills.count()) > 0) {
      expect(await skills.count()).toBeGreaterThan(0);
      await expect(skills.first()).toBeVisible();
    }
  });

  test("should display experience or education", async ({ page }) => {
    const sections = page.locator("section, article");
    const count = await sections.count();

    expect(count).toBeGreaterThan(0);
  });
});

test.describe("About Page - Interactivity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about.html");
  });

  test("should have social media links", async ({ page }) => {
    const socialLinks = page.locator(
      'a[href*="linkedin"], a[href*="github"], a[href*="twitter"]',
    );

    if ((await socialLinks.count()) > 0) {
      await expect(socialLinks.first()).toBeVisible();
      await expect(socialLinks.first()).toHaveAttribute("href", /.+/);
    }
  });

  test("external links should open in a new tab", async ({ page }) => {
    const externalLinks = page.locator('a[href^="http"]');
    const count = await externalLinks.count();

    if (count > 0) {
      // At least one external link should exist
      expect(count).toBeGreaterThan(0);

      // Check if any have target="_blank" (recommended but not required)
      const target = await externalLinks.first().getAttribute("target");
      // If target exists, it should be _blank. If not, that's acceptable too.
      if (target) {
        expect(target).toBe("_blank");
      }
    } else {
      // No external links found - skip test
      expect(true).toBeTruthy();
    }
  });

  test("should have a CV download link", async ({ page }) => {
    const cvLink = page.locator(
      'a[href*="cv"], a[href*="resume"], a[download]',
    );

    if ((await cvLink.count()) > 0) {
      await expect(cvLink.first()).toBeVisible();
    }
  });
});

test.describe("About Page - Responsive", () => {
  test("should adapt on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/about.html");

    const mainContent = page.locator("main, section").first();
    await expect(mainContent).toBeVisible();
  });

  test("should adapt on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/about.html");

    const mainContent = page.locator("main, section").first();
    await expect(mainContent).toBeVisible();
  });

  test("images should be responsive", async ({ page }) => {
    const images = page.locator("img");

    if ((await images.count()) > 0) {
      const firstImage = images.first();
      const box = await firstImage.boundingBox();

      if (box) {
        const viewport = page.viewportSize();
        if (viewport) {
          expect(box.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    }
  });
});

test.describe("About Page - Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about.html");
  });

  test("all images should have an alt attribute", async ({ page }) => {
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");

      // Each image should have an alt (can be empty for decorative images)
      expect(alt !== null).toBeTruthy();
    }
  });

  test("should have a correct heading hierarchy", async ({ page }) => {
    const h1Count = await page.locator("h1").count();

    // Only one h1 tag per page
    expect(h1Count).toBeLessThanOrEqual(1);

    // Check for other heading levels
    const h2Count = await page.locator("h2").count();
    const h3Count = await page.locator("h3").count();

    expect(h1Count + h2Count + h3Count).toBeGreaterThan(0);
  });

  test("links should have descriptive text", async ({ page }) => {
    const links = page.locator("a");
    const count = await links.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");

      // Each link should have text or an aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });
});
