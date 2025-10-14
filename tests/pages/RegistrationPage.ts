import { Page } from "@playwright/test";
import { Header } from "../components/Header";
import { RegisterForm } from "../components/RegisterForm";

export class RegistrationPage {
  readonly header: Header;
  readonly registerForm: RegisterForm;

  constructor(private page: Page) {
    this.header = new Header(page);
    this.registerForm = new RegisterForm(page);
  }

  async goto() {
    await this.page.goto("auth/register");
  }
}
