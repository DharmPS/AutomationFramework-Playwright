import { Page, test } from '@playwright/test';

class Utils {
  public static async navigateTo(page: Page) {
    await test.step('Navigate to the homepage', async () => {
      await page.goto('/');
    });
  }
}

export { Utils };
