import { Page, Locator } from "@playwright/test";
import { Header } from "../components/Header";
import { ProductCardComponent } from "../components/ProductCard";

export class ProductDetailPage {
  readonly page: Page;
  readonly header: Header;
  readonly name: Locator;
  readonly unitPrice: Locator;
  readonly description: Locator;
  readonly categoryBadge: Locator;
  readonly brandBadge: Locator;
  readonly addToCartBtn: Locator;
  readonly addToFavoritesBtn: Locator;
  readonly quantityInput: Locator;
  readonly decreaseQtyBtn: Locator;
  readonly increaseQtyBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.name = page.getByTestId("product-name");
    this.unitPrice = page.getByTestId("unit-price");
    this.description = page.getByTestId("product-description");
    this.categoryBadge = page.locator('span[aria-label="category"]');
    this.brandBadge = page.locator('span[aria-label="brand"]');
    this.addToCartBtn = page.getByTestId("add-to-cart");
    this.addToFavoritesBtn = page.getByTestId("add-to-favorites");
    this.quantityInput = page.getByTestId("quantity");
    this.decreaseQtyBtn = page.getByTestId("decrease-quantity");
    this.increaseQtyBtn = page.getByTestId("increase-quantity");
  }
  async getProductName(): Promise<string> {
    return (await this.name.textContent())?.trim() || "";
  }

  async getProductPrice(): Promise<string> {
    return "$" + ((await this.unitPrice.textContent())?.trim() || "");
  }

  async getCategory(): Promise<string> {
    return (await this.categoryBadge.textContent())?.trim() || "";
  }

  async getBrand(): Promise<string> {
    return (await this.brandBadge.textContent())?.trim() || "";
  }

  async getDescription(): Promise<string> {
    return (await this.description.textContent())?.trim() || "";
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }

  async clickAddToFavorites(): Promise<void> {
    await this.addToFavoritesBtn.click();
  }

  async setQuantity(value: number): Promise<void> {
    await this.quantityInput.fill(value.toString());
  }

  async increaseQuantity(): Promise<void> {
    await this.increaseQtyBtn.click();
  }

  async decreaseQuantity(): Promise<void> {
    await this.decreaseQtyBtn.click();
  }
}
