import { Page } from "@playwright/test";
import { Header } from "../components/Header";

export class AccountPage {
  readonly header: Header;

  constructor(private page: Page) {
    this.header = new Header(page);
  }
}
