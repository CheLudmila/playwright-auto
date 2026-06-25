import { test, expect } from '@playwright/test';

test('Profile displays mocked user data', async ({ page }) => {
  await page.route('**/api/users/profile', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          userId: 999999,
          photoFilename: 'default-user.png',
          name: 'Test',
          lastName: 'Automation',
        },
      }),
    });
  });

  await page.goto('/panel/profile');

  await expect(
    page.locator('.profile_name')
  ).toHaveText('Test Automation');
});