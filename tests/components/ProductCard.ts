import { Page, Locator } from "@playwright/test";

export class ProductCardComponent {
  readonly root: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly co2Rating: Locator;
  readonly image: Locator;

  constructor(page: Page, cardLocator: Locator) {
    this.root = cardLocator;
    this.name = this.root.getByTestId("product-name");
    this.price = this.root.getByTestId("product-price");
    this.co2Rating = this.root.getByTestId("co2-rating-badge");
    this.image = this.root.locator(".card-img-top");
  }

  async getProductName(): Promise<string> {
    return (await this.name.textContent())?.trim() || "";
  }

  async getProductPrice(): Promise<string> {
    return (await this.price.textContent())?.trim() || "";
  }

  async getCo2Rating(): Promise<string> {
    const activeLetter = await this.co2Rating
      .locator(".co2-letter.active")
      .textContent();
    return activeLetter?.trim() || "";
  }

  async click(): Promise<void> {
    await this.root.click();
  }

  async isImageLoaded(): Promise<boolean> {
    await this.image.waitFor({ state: "visible" });
    return await this.image.isVisible();
  }

  async getProductId(): Promise<string> {
    const dataTest = await this.root.getAttribute("data-test");
    return dataTest?.replace("product-", "") || "";
  }
}
