import { Page, Locator } from "@playwright/test";

export class SortComponent {
  readonly page: Page;
  readonly sortInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortInput = page.getByTestId("sort");
  }
}
