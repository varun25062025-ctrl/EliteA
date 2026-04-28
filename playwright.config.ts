import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60_000,
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10_000,
    navigationTimeout: 60_000,
  },
  testDir: './tests',
});
