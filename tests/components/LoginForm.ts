import { Page, Locator } from "@playwright/test";

export class LoginForm {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly googleButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-submit");
    this.forgotPasswordLink = page.getByTestId("forgot-password-link");
    this.googleButton = page.locator(".google-sign-in-button");
    this.registerLink = page.getByTestId("register-link");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async registerLinkNavigation() {
    await this.registerLink.click();
  }

  async forgotPasswordLinkNavigation() {
    await this.forgotPasswordLink.click();
  }
}
