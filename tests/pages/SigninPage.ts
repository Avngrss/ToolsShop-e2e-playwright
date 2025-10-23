import { Page } from "@playwright/test";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";

export class LoginPage {
  readonly header: Header;
  readonly loginForm: LoginForm;

  constructor(private page: Page) {
    this.header = new Header(page);
    this.loginForm = new LoginForm(page);
  }

  async goto() {
    await this.page.goto("/auth/login");
  }
}
