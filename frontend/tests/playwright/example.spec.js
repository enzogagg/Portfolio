// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage before each test
    await page.goto("/");
  });

  test("should have the correct title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Enzo Gaggiotti/);
  });

  test("should display the main header", async ({ page }) => {
    // Expect the main header to be visible.
    await expect(page.locator("#main-header")).toBeVisible();
  });
});
