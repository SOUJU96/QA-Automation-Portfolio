const { defineConfig } = require('@playwright/test');

// API-only suite: no browser needed, so it runs fast in CI.
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: { Accept: 'application/json' },
  },
});
