import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';

test.describe('Registration', () => {

  test('Positive registration', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    const random = Date.now();

    await registrationPage.openRegistrationForm();

    await registrationPage.register({
      name: 'Anna',
      lastName: 'Smith',
      email: `aqa-${random}@test.com`,
      password: 'Test1234',
      repeatPassword: 'Test1234'
    });

    await expect(page).toHaveURL(/garage/);
  });

 test('Name is required', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.openRegistrationForm();

  await registrationPage.nameInput.click();
  await registrationPage.lastNameInput.click();

  await expect(page.getByText('Name required')).toBeVisible();
});

  test('Last name is required', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.lastNameInput.click();
    await registrationPage.lastNameInput.blur();

    await expect(page.getByText('Last name required')).toBeVisible();
  });

  test('Invalid email', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.emailInput.fill('wrong-email');
    await registrationPage.emailInput.blur();

    await expect(page.getByText('Email is incorrect')).toBeVisible();
  });

  test('Weak password', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.passwordInput.fill('123');
    await registrationPage.passwordInput.blur();

    await expect(
      page.getByText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      )
    ).toBeVisible();
  });

  test('Passwords do not match', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.passwordInput.fill('Test1234');
    await registrationPage.repeatPasswordInput.fill('Test9999');
    await registrationPage.repeatPasswordInput.blur();

    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

});