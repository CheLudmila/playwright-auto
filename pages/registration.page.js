export class RegistrationPage {
  constructor(page) {
    this.page = page;

    // Buttons
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.registerButton = page.getByRole('button', { name: 'Register' });

    // Inputs
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');

    // Validation messages
    this.nameRequiredError = page.getByText('Name required');
    this.lastNameRequiredError = page.getByText('Last name required');
    this.emailIncorrectError = page.getByText('Email is incorrect');
    this.passwordMismatchError = page.getByText('Passwords do not match');

    this.passwordValidationError = page.getByText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  }

  async openRegistrationForm() {
    await this.page.goto('/');
    await this.signUpButton.click();
  }

  async fillRegistrationForm(user) {
    await this.nameInput.fill(user.name);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.repeatPassword);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async register(user) {
    await this.fillRegistrationForm(user);
    await this.clickRegister();
  }

  async triggerNameValidation() {
    await this.nameInput.click();
    await this.lastNameInput.click();
  }

  async triggerLastNameValidation() {
    await this.lastNameInput.click();
    await this.emailInput.click();
  }

  async triggerEmailValidation(email) {
    await this.emailInput.fill(email);
    await this.passwordInput.click();
  }

  async triggerPasswordValidation(password) {
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.click();
  }

  async triggerPasswordMismatchValidation(
    password,
    repeatPassword
  ) {
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
    await this.nameInput.click();
  }
}