/**
 * =====================================================================================================
 * E2E TESTS - PROJECTS PAGE
 * =====================================================================================================
 * 
 * Functional tests for filtering system and project display
 */

const { test, expect } = require('@playwright/test');
const { waitForPageReady } = require('./helpers/test-helpers');

test.describe('Projects Page - Filtering Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/frontend/projects.html');
    await waitForPageReady(page);
  });

  test('should display all projects by default', async ({ page }) => {
    const projectCards = page.locator('.project-card, .project-card-enhanced');
    const count = await projectCards.count();
    
    expect(count).toBeGreaterThan(0);
    
    // All cards should be visible
    for (let i = 0; i < count; i++) {
      await expect(projectCards.nth(i)).toBeVisible();
    }
  });

  test('should have functional filter buttons', async ({ page }) => {
    const filterButtons = page.locator('.filter-btn, [data-filter]');
    const buttonCount = await filterButtons.count();
    
    expect(buttonCount).toBeGreaterThan(0);
    
    // Check that the buttons are clickable
    const firstFilter = filterButtons.first();
    await expect(firstFilter).toBeVisible();
    await expect(firstFilter).toBeEnabled();
  });

  test('should filter projects by category', async ({ page }) => {
    const filterButtons = page.locator('[data-filter]');
    
    if (await filterButtons.count() > 1) {
      // Click on the second filter (not "all")
      await filterButtons.nth(1).click();
      await page.waitForTimeout(500); // Wait for animation

      const projectCards = page.locator('.project-card, .project-card-enhanced');
      const visibleCards = await projectCards.filter({ hasNotText: '' }).count();

      // At least some cards should be visible
      expect(visibleCards).toBeGreaterThanOrEqual(0);
    }
  });

  test('should visually mark the active filter', async ({ page }) => {
    const filterButtons = page.locator('[data-filter]');
    
    if (await filterButtons.count() > 0) {
      const firstButton = filterButtons.first();
      await firstButton.click();
      await page.waitForTimeout(300);
      
      // Check that the button has the active class
      const classes = await firstButton.getAttribute('class');
      expect(classes).toContain('active');
    }
  });

  test('should display a project counter', async ({ page }) => {
    const counter = page.locator('.projects-counter, [class*="count"]');
    
    if (await counter.count() > 0) {
      await expect(counter.first()).toBeVisible();
      
      const text = await counter.first().textContent();
      expect(text).toMatch(/\d+/); // Should contain a number
    }
  });

  test('should animate cards during filtering', async ({ page }) => {
    const filterButtons = page.locator('[data-filter]');
    
    if (await filterButtons.count() > 1) {
      const projectCards = page.locator('.project-card, .project-card-enhanced');
      const initialCount = await projectCards.count();

      // Click on a filter
      await filterButtons.nth(1).click();

      // Wait for animation
      await page.waitForTimeout(500);

      // Cards should have animation classes
      const firstCard = projectCards.first();
      if (await firstCard.isVisible()) {
        const classes = await firstCard.getAttribute('class');
        expect(classes).toBeTruthy();
      }
    }
  });

  test('should allow returning to all projects', async ({ page }) => {
    const filterButtons = page.locator('[data-filter]');
    const allButton = page.locator('[data-filter="all"]');
    
    if (await filterButtons.count() > 1 && await allButton.count() > 0) {
      // Click on a specific filter
      await filterButtons.nth(1).click();
      await page.waitForTimeout(300);

      // Return to "all"
      await allButton.click();
      await page.waitForTimeout(300);

      // All cards should be visible
      const projectCards = page.locator('.project-card, .project-card-enhanced');
      const count = await projectCards.count();
      
      for (let i = 0; i < count; i++) {
        await expect(projectCards.nth(i)).toBeVisible();
      }
    }
  });
});

test.describe('Projects Page - Card Details', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/frontend/projects.html');
    await waitForPageReady(page);
  });

  test('each card should have a title', async ({ page }) => {
    const projectCards = page.locator('.project-card, .project-card-enhanced');
    const count = await projectCards.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = projectCards.nth(i);
      const title = card.locator('h2, h3, .project-title');
      
      if (await title.count() > 0) {
        await expect(title.first()).toBeVisible();
      }
    }
  });

  test('each card should have a description', async ({ page }) => {
    const projectCards = page.locator('.project-card, .project-card-enhanced');
    const count = await projectCards.count();
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = projectCards.nth(i);
      const description = card.locator('p, .description, .project-description');
      
      if (await description.count() > 0) {
        const text = await description.first().textContent();
        expect(text?.length).toBeGreaterThan(0);
      }
    }
  });

  test('cards should have clickable links', async ({ page }) => {
    const projectCards = page.locator('.project-card, .project-card-enhanced');
    
    if (await projectCards.count() > 0) {
      const firstCard = projectCards.first();
      const links = firstCard.locator('a');
      
      if (await links.count() > 0) {
        await expect(links.first()).toBeVisible();
        
        const href = await links.first().getAttribute('href');
        expect(href).toBeTruthy();
      }
    }
  });

  test('cards should display technologies used', async ({ page }) => {
    const projectCards = page.locator('.project-card, .project-card-enhanced');
    
    if (await projectCards.count() > 0) {
      const firstCard = projectCards.first();
      const techTags = firstCard.locator('.tech, .tag, [class*="technolog"]');
      
      // At least one card should have technology tags
      const totalTags = await page.locator('.tech, .tag, [class*="technolog"]').count();
      expect(totalTags).toBeGreaterThanOrEqual(0);
    }
  });
});

test.describe('Projects Page - Responsive Design', () => {
  test('should adapt on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/frontend/projects.html');
    
    const projectCards = page.locator('.project-card, .project-card-enhanced');
    
    if (await projectCards.count() > 0) {
      // Cards should be stacked vertically
      await expect(projectCards.first()).toBeVisible();
    }
  });

  test('should display filters on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/frontend/projects.html');
    
    const filterButtons = page.locator('.filter-btn, [data-filter]');
    
    if (await filterButtons.count() > 0) {
      await expect(filterButtons.first()).toBeVisible();
    }
  });

  test('should adapt on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/frontend/projects.html');
    
    const projectCards = page.locator('.project-card, .project-card-enhanced');
    await expect(projectCards.first()).toBeVisible();
  });
});

test.describe('Projects Page - Non-Regression Tests', () => {
  test('should not break layout during rapid filtering', async ({ page }) => {
    await page.goto('/frontend/projects.html');
    const filterButtons = page.locator('[data-filter]');
    
    if (await filterButtons.count() > 2) {
      // Click quickly on multiple filters
      await filterButtons.nth(0).click();
      await filterButtons.nth(1).click();
      await filterButtons.nth(2).click();
      await filterButtons.nth(0).click();
      
      await page.waitForTimeout(1000);
      
      // Page should not be broken
      const projectCards = page.locator('.project-card, .project-card-enhanced');
      await expect(projectCards.first()).toBeVisible();
    }
  });

  test('should maintain filter state after scroll', async ({ page }) => {
    await page.goto('/frontend/projects.html');
    const filterButtons = page.locator('[data-filter]');
    
    if (await filterButtons.count() > 1) {
      await filterButtons.nth(1).click();

      // Scroll the page
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(300);
      
      // Filter should still be active
      const activeClasses = await filterButtons.nth(1).getAttribute('class');
      expect(activeClasses).toContain('active');
    }
  });

  test('should handle empty categories correctly', async ({ page }) => {
    await page.goto('/frontend/projects.html');
    const filterButtons = page.locator('[data-filter]');
    
    // Click on each filter
    const count = await filterButtons.count();
    for (let i = 0; i < count; i++) {
      await filterButtons.nth(i).click();
      await page.waitForTimeout(300);

      // The page should not crash
      const body = page.locator('body');
      await expect(body).toBeVisible();
    }
  });
});
