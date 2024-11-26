// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: false },
    },
    {
      name: 'api',
      use: {
        baseURL: 'https://dummyjson.com/', // API URL
      } 
    }
    
  ],
  reporter: [['html', { outputFolder: 'test-results' }]],
  use: {
    headless: true, // Can set to false for debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.saucedemo.com'
  },
  workers: 2,
});
