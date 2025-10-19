import { Page } from "@playwright/test";
import { Header } from "../components/Header";
import { ForgotPasswordForm } from "../components/ForgotPassword";

export class ForgotPasswordPage {
  readonly page: Page;
  readonly header: Header;
  readonly forgotPasswordForm: ForgotPasswordForm;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.forgotPasswordForm = new ForgotPasswordForm(page);
  }

  async goto() {
    await this.page.goto("auth/forgot-password");
  }
}
