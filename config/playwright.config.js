// @ts-check
const path = require('path');
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '../frontend/tests/playwright',
  timeout: 60000,
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
    actionTimeout: 15000,
  },
  expect: {
    timeout: 15000,
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'python3 -m http.server 8000',
    url: 'http://localhost:8000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
    cwd: path.join(__dirname, '..', 'frontend'),
  },
});
