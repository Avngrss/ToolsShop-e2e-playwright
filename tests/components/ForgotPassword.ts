import { Page, Locator } from "@playwright/test";

export class ForgotPasswordForm {
  readonly page: Page;
  readonly emailField: Locator;
  readonly forgotPasswordBtn: Locator;
  readonly emailError: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByTestId("email");
    this.forgotPasswordBtn = page.getByTestId("forgot-password-submit");
    this.emailError = page.getByTestId("email-error");
    this.successMessage = page.locator('div[role="alert"]');
  }

  async setNewPassword(email: string) {
    await this.emailField.fill(email);
    await this.forgotPasswordBtn.click();
  }
}
