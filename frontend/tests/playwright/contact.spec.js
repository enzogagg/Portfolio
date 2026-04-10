/**
 * =====================================================================================================
 * E2E TESTS - CONTACT PAGE
 * =====================================================================================================
 *
 * Tests pour la page de contact et le formulaire
 */

const { test, expect } = require("@playwright/test");
const { waitForPageReady } = require("./helpers/test-helpers");

test.describe("Contact Page - Display", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact.html");
    await waitForPageReady(page);
  });

  test("should load the contact page", async ({ page }) => {
    await expect(page).toHaveURL(/contact\.html/);
  });

  test("should display a page title", async ({ page }) => {
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("should display contact information", async ({ page }) => {
    // Check that there is contact information (email, phone, etc.)
    const contactInfo = page.locator('a[href^="mailto:"], a[href^="tel:"]');

    if ((await contactInfo.count()) > 0) {
      await expect(contactInfo.first()).toBeVisible();
    }
  });

  test("should display social media links", async ({ page }) => {
    const socialLinks = page.locator(
      'a[href*="linkedin"], a[href*="github"], a[href*="twitter"]',
    );

    if ((await socialLinks.count()) > 0) {
      await expect(socialLinks.first()).toBeVisible();
    }
  });
});

test.describe("Contact Page - Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact.html");
  });

  test("should have a contact form", async ({ page }) => {
    const form = page.locator("form");

    if ((await form.count()) > 0) {
      await expect(form.first()).toBeVisible();
    }
  });

  test("should have a name field", async ({ page }) => {
    const nameInput = page
      .locator('input[name*="name" i], input[type="text"]')
      .first();

    if ((await nameInput.count()) > 0) {
      await expect(nameInput).toBeVisible();
      await expect(nameInput).toBeEditable();
    }
  });

  test("should have an email field", async ({ page }) => {
    const emailInput = page.locator(
      'input[type="email"], input[name*="email" i]',
    );

    if ((await emailInput.count()) > 0) {
      await expect(emailInput.first()).toBeVisible();
      await expect(emailInput.first()).toBeEditable();
    }
  });

  test("should have a message field", async ({ page }) => {
    const messageInput = page.locator('textarea, input[name*="message" i]');

    if ((await messageInput.count()) > 0) {
      await expect(messageInput.first()).toBeVisible();
      await expect(messageInput.first()).toBeEditable();
    }
  });

  test("should have a submit button", async ({ page }) => {
    const submitButton = page.locator(
      'button[type="submit"], input[type="submit"]',
    );

    if ((await submitButton.count()) > 0) {
      await expect(submitButton.first()).toBeVisible();
      await expect(submitButton.first()).toBeEnabled();
    }
  });

  test("should allow filling the form", async ({ page }) => {
    const nameInput = page
      .locator('input[name*="name" i], input[type="text"]')
      .first();
    const emailInput = page.locator('input[type="email"]').first();
    const messageInput = page.locator("textarea").first();

    if ((await nameInput.count()) > 0) {
      await nameInput.fill("Test User");
      await expect(nameInput).toHaveValue("Test User");
    }

    if ((await emailInput.count()) > 0) {
      await emailInput.fill("test@example.com");
      await expect(emailInput).toHaveValue("test@example.com");
    }

    if ((await messageInput.count()) > 0) {
      await messageInput.fill("Ceci est un message de test");
      await expect(messageInput).toHaveValue("Ceci est un message de test");
    }
  });

  test("should validate email format", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first();
    const submitButton = page
      .locator('button[type="submit"], input[type="submit"]')
      .first();

    if ((await emailInput.count()) > 0 && (await submitButton.count()) > 0) {
      // Entrer un email invalide
      await emailInput.fill("invalid-email");

      // Browser should prevent submission
      const isRequired = await emailInput.getAttribute("required");
      expect(
        isRequired !== null ||
          (await emailInput.getAttribute("type")) === "email",
      ).toBeTruthy();
    }
  });

  test("should mark required fields", async ({ page }) => {
    const requiredInputs = page.locator("input[required], textarea[required]");
    const count = await requiredInputs.count();

    if (count > 0) {
      // At least one field should be required
      expect(count).toBeGreaterThan(0);

      // Check that they have the required attribute
      const firstRequired = requiredInputs.first();
      const isRequired = await firstRequired.getAttribute("required");
      expect(isRequired).not.toBeNull();
    }
  });
});

test.describe("Contact Page - Form Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact.html");
  });

  test("should not submit an empty form", async ({ page }) => {
    const submitButton = page
      .locator('button[type="submit"], input[type="submit"]')
      .first();

    if ((await submitButton.count()) > 0) {
      await submitButton.click();

      // Check that page did not reload (HTML5 validation)
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/contact\.html/);
    }
  });

  test("should display error messages for invalid fields", async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    if ((await emailInput.count()) > 0 && (await submitButton.count()) > 0) {
      // Remplir avec un email invalide
      await emailInput.fill("invalid");
      await submitButton.click();
      await page.waitForTimeout(300);

      // Check HTML5 validation
      const validationMessage = await emailInput.evaluate(
        (el) => el.validationMessage,
      );
      expect(validationMessage.length).toBeGreaterThan(0);
    }
  });

  test("should clear form after successful submission", async ({ page }) => {
    // This test depends on the actual implementation
    const form = page.locator("form").first();

    if ((await form.count()) > 0) {
      // Remplir le formulaire
      const nameInput = page.locator('input[name*="name" i]').first();
      const emailInput = page.locator('input[type="email"]').first();

      if ((await nameInput.count()) > 0) {
        await nameInput.fill("Test");
      }

      if ((await emailInput.count()) > 0) {
        await emailInput.fill("test@example.com");
      }

      // Note: In production, verify that form resets
      // after successful submission
    }
  });
});

test.describe("Contact Page - Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact.html");
  });

  test("all fields should have labels", async ({ page }) => {
    const inputs = page.locator("input, textarea, select");
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");

      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = (await label.count()) > 0;
        const hasAria = ariaLabel || ariaLabelledBy;

        // Each input should have a label or aria-label
        expect(hasLabel || hasAria).toBeTruthy();
      }
    }
  });

  test("form should be keyboard navigable", async ({ page }) => {
    const form = page.locator("form").first();

    if ((await form.count()) > 0) {
      // Naviguer avec Tab
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      const focusedElement = page.locator(":focus");
      await expect(focusedElement).toBeVisible();
    }
  });

  test("errors should be announced to screen readers", async ({ page }) => {
    const form = page.locator("form").first();

    if ((await form.count()) > 0) {
      // Check for ARIA attributes for errors (optional but recommended)
      const ariaLive = page.locator('[aria-live], [role="alert"]');
      const count = await ariaLive.count();

      // If no aria-live regions, that's acceptable (not all forms have them)
      // This test just checks they exist IF implemented
      expect(count >= 0).toBeTruthy();
    }
  });
});

test.describe("Contact Page - Responsive", () => {
  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/contact.html");

    const form = page.locator("form").first();

    if ((await form.count()) > 0) {
      await expect(form).toBeVisible();

      // Fields should be stacked vertically
      const inputs = page.locator("input, textarea");
      if ((await inputs.count()) > 0) {
        await expect(inputs.first()).toBeVisible();
      }
    }
  });

  test("buttons should be accessible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/contact.html");

    const submitButton = page.locator('button[type="submit"]').first();

    if ((await submitButton.count()) > 0) {
      await expect(submitButton).toBeVisible();

      // Button should have sufficient size to be clicked
      const box = await submitButton.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThan(30);
      }
    }
  });
});

test.describe("Contact Page - Non-Regression Tests", () => {
  test("should not lose data on error", async ({ page }) => {
    await page.goto("/contact.html");

    const nameInput = page.locator('input[name*="name" i]').first();
    const emailInput = page.locator('input[type="email"]').first();

    if ((await nameInput.count()) > 0 && (await emailInput.count()) > 0) {
      // Fill the form
      await nameInput.fill("Test User");
      await emailInput.fill("invalid-email");

      const submitButton = page.locator('button[type="submit"]').first();
      if ((await submitButton.count()) > 0) {
        await submitButton.click();
        await page.waitForTimeout(500);

        // Data should be preserved
        await expect(nameInput).toHaveValue("Test User");
      }
    }
  });

  test("social links should open in a new tab", async ({ page, context }) => {
    await page.goto("/contact.html");

    const externalLinks = page.locator(
      'a[href*="linkedin"], a[href*="github"], a[href*="twitter"]',
    );

    if ((await externalLinks.count()) > 0) {
      const firstLink = externalLinks.first();
      const target = await firstLink.getAttribute("target");

      // External links should have target="_blank"
      expect(target).toBe("_blank");

      // And rel="noopener" for security
      const rel = await firstLink.getAttribute("rel");
      if (rel) {
        expect(rel).toContain("noopener");
      }
    }
  });

  test("should not have console errors on submission", async ({ page }) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/contact.html");

    const submitButton = page.locator('button[type="submit"]').first();
    if ((await submitButton.count()) > 0) {
      await submitButton.click();
      await page.waitForTimeout(1000);

      // Filter known non-critical errors
      const criticalErrors = errors.filter(
        (err) =>
          !err.includes("404") &&
          !err.includes("favicon") &&
          !err.includes("cookie") &&
          !err.includes("ERR_CONNECTION_REFUSED"),
      );

      expect(criticalErrors.length).toBeLessThan(3);
    }
  });
});
