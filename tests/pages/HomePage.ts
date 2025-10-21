import { Page, Locator } from "@playwright/test";
import { Header } from "../components/Header";
import { ProductCardComponent } from "../components/ProductCard";

export class HomePage {
  readonly page: Page;
  readonly header: Header;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.productCards = page.locator('a.card[data-test^="product-"]');
  }

  async goto() {
    await this.page.goto("/");
  }

  async getCardByIndex(index: number): Promise<ProductCardComponent> {
    const card = this.productCards.nth(index);
    await card.waitFor({ state: "visible" });
    return new ProductCardComponent(this.page, card);
  }

  async getAllCards(limit?: number): Promise<ProductCardComponent[]> {
    const totalCount = await this.productCards.count();
    const count =
      limit !== undefined ? Math.min(limit, totalCount) : totalCount;
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(await this.getCardByIndex(i));
    }
    return cards;
  }
}
