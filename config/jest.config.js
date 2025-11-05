/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  roots: ['../frontend/tests/unit_test'],
  verbose: true,
  testPathIgnorePatterns: ["../frontend/tests/playwright/"],
};

module.exports = config;
