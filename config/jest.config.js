/** @type {import('jest').Config} */
const path = require('path');

const config = {
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname, '..'),
  roots: ['<rootDir>/frontend/tests/unit_test'],
  verbose: true,
  testPathIgnorePatterns: ["<rootDir>/frontend/tests/playwright/"],
  transform: {
    '^.+\\.js$': ['babel-jest', { configFile: path.resolve(__dirname, 'babel.config.js') }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(some-esm-package)/)',
  ],
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: [
    '<rootDir>/frontend/assets/js/**/*.js',
    '!<rootDir>/frontend/assets/js/**/*.test.js',
    '!<rootDir>/frontend/assets/js/**/standalone.js',
  ],
};

module.exports = config;
