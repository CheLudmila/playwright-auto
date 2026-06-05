import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';

test.describe('Registration', () => {

  test('Positive registration', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    const email = `aqa-${Date.now()}@test.com`;

    await registrationPage.openRegistrationForm();

    await registrationPage.register({
      name: 'Anna',
      lastName: 'Smith',
      email,
      password: 'Test1234',
      repeatPassword: 'Test1234'
    });

    await expect(page).toHaveURL(/garage/);
  });

  test('Name is required', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.triggerNameValidation();

    await expect(
      registrationPage.nameRequiredError
    ).toBeVisible();
  });

  test('Last name is required', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.triggerLastNameValidation();

    await expect(
      registrationPage.lastNameRequiredError
    ).toBeVisible();
  });

  test('Invalid email', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.triggerEmailValidation(
      'wrong-email'
    );

    await expect(
      registrationPage.emailIncorrectError
    ).toBeVisible();
  });

  test('Weak password', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.triggerPasswordValidation(
      '123'
    );

    await expect(
      registrationPage.passwordValidationError
    ).toBeVisible();
  });

  test('Passwords do not match', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.openRegistrationForm();

    await registrationPage.triggerPasswordMismatchValidation(
      'Test1234',
      'Test9999'
    );

    await expect(
      registrationPage.passwordMismatchError
    ).toBeVisible();
  });

});