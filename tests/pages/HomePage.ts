import { Page, Locator } from "@playwright/test";
import { Header } from "../components/Header";
import { ProductCardComponent } from "../components/ProductCard";
import { SortComponent } from "../components/SortProducts";
import { SortOptionValue } from "../../types/sortOption";

export class HomePage {
  readonly page: Page;
  readonly header: Header;
  readonly productCards: Locator;
  readonly sortComponent: SortComponent;
  readonly productCardContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.productCards = page.locator('a.card[data-test^="product-"]');
    this.sortComponent = new SortComponent(page);
    this.productCardContainer = this.page.locator(".container");
  }

  async goto() {
    await this.page.goto("/");
  }
  // Get product cards
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

  async getProductNames(): Promise<string[]> {
    const cards = await this.getAllCards();
    const names: string[] = [];
    for (const card of cards) {
      const name = await card.getProductName();
      if (name) {
        names.push(name);
      }
    }
    return names;
  }

  async getProductPrices(): Promise<number[]> {
    const cards = await this.getAllCards();
    const prices: number[] = [];
    for (const card of cards) {
      const priceText = await card.getProductPrice();
      const cleanText = priceText.replace(/[^\d.]/g, "");
      const numberText = cleanText.replace(/,/g, "");
      const price = parseFloat(numberText);
      if (!isNaN(price)) {
        prices.push(price);
      }
    }
    return prices;
  }

  async getCO2Ratings(): Promise<string[]> {
    const cards = await this.getAllCards();
    const ratings: string[] = [];
    for (const card of cards) {
      const rating = await card.getCo2Rating();
      if (rating) {
        ratings.push(rating);
      }
    }
    return ratings;
  }

  //Sort products methods
  async applySort(optionValue: SortOptionValue) {
    await this.sortComponent.selectSortOption(optionValue);
    await this.page.waitForLoadState("networkidle");
  }

  isSortedAscendingString(arr: string[]): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }
  isSortedDescendingString(arr: string[]): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) {
        return false;
      }
    }
    return true;
  }

  isSortedAscendingNumber(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }

  isSortedDescendingNumber(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) {
        return false;
      }
    }
    return true;
  }

  isSortedAscendingCO2(arr: string[]): boolean {
    const ratingToValue = (rating: string): number =>
      ({ A: 1, B: 2, C: 3, D: 4, E: 5 }[rating] || 0);
    for (let i = 1; i < arr.length; i++) {
      if (ratingToValue(arr[i]) < ratingToValue(arr[i - 1])) {
        return false;
      }
    }
    return true;
  }

  isSortedDescendingCO2(arr: string[]): boolean {
    const ratingToValue = (rating: string): number =>
      ({ A: 1, B: 2, C: 3, D: 4, E: 5 }[rating] || 0);
    for (let i = 1; i < arr.length; i++) {
      if (ratingToValue(arr[i]) > ratingToValue(arr[i - 1])) {
        return false;
      }
    }
    return true;
  }

  async getNameAfterSort(
    optionValue: "name,asc" | "name,desc"
  ): Promise<string[]> {
    await this.applySort(optionValue);
    return await this.getProductNames();
  }

  async getPriceAfterSort(
    optionValue: "price,asc" | "price,desc"
  ): Promise<number[]> {
    await this.applySort(optionValue);
    return await this.getProductPrices();
  }

  async getCO2RatingAfterSort(
    optionValue: "co2_rating,asc" | "co2_rating,desc"
  ): Promise<string[]> {
    await this.applySort(optionValue);
    return await this.getCO2Ratings();
  }
}
