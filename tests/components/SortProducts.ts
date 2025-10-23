import { Page, Locator } from "@playwright/test";
import { SortOptionValue } from "../../types/sortOption";

export class SortComponent {
  readonly page: Page;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortSelect = page.getByTestId("sort");
  }

  async selectSortOption(optionValue: SortOptionValue) {
    await this.sortSelect.selectOption({ value: optionValue });
    await this.sortSelect.page().waitForLoadState("networkidle");
  }
}
