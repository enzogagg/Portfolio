/**
 * =====================================================================================================
 * VISUAL REGRESSION TESTS
 * =====================================================================================================
 *
 * Author: Enzo Gaggiotti
 * Project: Personal Portfolio
 * File: regression.spec.js
 * Version: 1.0.0
 * Last Updated: November 2025
 *
 * Description:
 * This suite performs visual regression tests across the entire portfolio.
 * It captures screenshots of key pages on different viewports and compares them
 * against baseline snapshots to detect any unintended visual changes in layout,
 * styling, or content.
 *
 * To update snapshots, run:
 * npx playwright test regression.spec.js --update-snapshots
 *
 * =====================================================================================================
 */

const { test, expect } = require("@playwright/test");
const { waitForPageReady } = require("./helpers/test-helpers");

const pages = [
  { name: "Home", path: "/index.html" },
  { name: "Projects", path: "/projects.html" },
  { name: "About", path: "/about.html" },
  { name: "Contact", path: "/contact.html" },
  { name: "Portfolio project page", path: "/portfolio-project.html" },
  { name: "Aquarium project page", path: "/aquarium-project.html" },
  { name: "Network project page", path: "/network-project.html" },
];

test.describe("Visual Regression Testing", () => {
  for (const pageInfo of pages) {
    test(`should match snapshot for ${pageInfo.name} page`, async ({
      page,
    }) => {
      await page.goto(pageInfo.path);
      await waitForPageReady(page);

      // Additional waits for specific pages
      if (pageInfo.name === "Projects") {
        await expect(page.locator(".filter-btn").first()).toBeVisible({
          timeout: 15000,
        });
        await expect(
          page.locator(".project-card-enhanced, .project-card").first(),
        ).toBeVisible({ timeout: 15000 });
        await page
          .locator(
            ".project-card.animate-in, .project-card-enhanced.animate-in",
          )
          .first()
          .waitFor();
      }

      // For project detail pages, wait for the main title
      if (pageInfo.name.includes("project page")) {
        const mainTitle = page.locator("h1").first();
        await expect(mainTitle).toBeVisible({ timeout: 10000 });
        // Wait for animations and content to fully load
        await page.waitForTimeout(1000);
      }

      const locatorsToHide = [
        page.locator(".floating-avatar"),
        page.locator(".floating-particle"),
      ];

      for (const locator of locatorsToHide) {
        await locator.evaluateAll((elements) =>
          elements.forEach((el) =>
            el.style.setProperty("visibility", "hidden", "important"),
          ),
        );
      }

      await expect(page).toHaveScreenshot(
        `${pageInfo.name.toLowerCase()}-page.png`,
        {
          fullPage: true,
          animations: "disabled",
          timeout: 30000,
        },
      );
    });
  }
});
