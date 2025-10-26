import { Page, Locator } from "@playwright/test";

export class SearchProduct {
  readonly page: Page;
  readonly searchQuery: Locator;
  readonly searchReset: Locator;
  readonly searchSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchQuery = page.getByTestId("search-query");
    this.searchReset = page.getByTestId("search-reset");
    this.searchSubmit = page.getByTestId("search-submit");
  }
}
