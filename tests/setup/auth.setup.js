import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('#signinEmail').fill(process.env.USER_EMAIL);
  await page.locator('#signinPassword').fill(process.env.USER_PASSWORD);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL(/garage/);

  await page.context().storageState({
    path: 'storageState.json',
  });
});