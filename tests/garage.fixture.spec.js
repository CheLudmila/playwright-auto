import { test, expect } from '../fixtures/userGarage.fixture';

test('garage fixture', async ({ userGaragePage }) => {
  await expect(userGaragePage.page).toHaveURL(/garage/);
});