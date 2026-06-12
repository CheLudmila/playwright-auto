import { expect } from '@playwright/test';

export class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.signUpButton = page.getByRole('button', { name: 'Sign up' });

    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');

    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async openRegistrationForm() {
    await this.page.goto('https://qauto.forstudy.space/');
    await this.signUpButton.click();
  }

  async register(user) {
    await this.nameInput.fill(user.name);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.repeatPassword);

    await this.registerButton.click();
  }
}