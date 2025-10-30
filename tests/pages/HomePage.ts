import { Page, Locator } from "@playwright/test";
import { Header } from "../components/Header";
import { ProductCardComponent } from "../components/ProductCard";
import { SortComponent } from "../components/SortProducts";
import { SortOptionValue } from "../../types/sortOption";
import { SearchProduct } from "../components/SearchProducts";
import { RangeSliderComponent } from "../components/RangeSlider";

export class HomePage {
  readonly page: Page;
  readonly header: Header;
  readonly productCards: Locator;
  readonly searchCompletedContainer: Locator;
  readonly initialProductCards: Locator;
  readonly initialContainerLocator: Locator;
  readonly sortComponent: SortComponent;
  readonly productCardContainer: Locator;
  readonly searchComponent: SearchProduct;
  readonly searchCaption: Locator;
  readonly noResult: Locator;
  readonly rangeSliderComponent: RangeSliderComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.productCards = page.locator('a.card[data-test^="product-"]');

    this.sortComponent = new SortComponent(page);
    this.productCardContainer = this.page.locator(".container");
    this.searchComponent = new SearchProduct(page);
    this.initialContainerLocator = page.locator(
      'div.col-md-9 > div.container[data-test=""]'
    );
    this.initialProductCards = this.initialContainerLocator.locator(
      'a.card[data-test^="product-"]'
    );
    this.searchCompletedContainer = page.locator(
      'div.col-md-9 > div.container[data-test="search_completed"]'
    );
    this.searchCaption = page.getByTestId("search-caption");
    this.noResult = page.getByTestId("no-results");

    this.rangeSliderComponent = new RangeSliderComponent(page);
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

  async checkIfProductNamesInclude(searchTerm: string): Promise<boolean> {
    const names = await this.getProductNames();
    return names.every((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async getFilteredCards(): Promise<ProductCardComponent[]> {
    const filteredCardLocators = await this.searchCompletedContainer
      .locator('a.card[data-test^="product-"]')
      .all();
    const cards = [];
    for (const locator of filteredCardLocators) {
      await locator.waitFor({ state: "visible" });
      cards.push(new ProductCardComponent(this.page, locator));
    }
    return cards;
  }

  async getFilteredProductNames(): Promise<string[]> {
    const cards = await this.getFilteredCards();
    const names: string[] = [];
    for (const card of cards) {
      const name = await card.getProductName();
      if (name) {
        names.push(name.trim());
      }
    }
    return names;
  }

  async verifyProductsInPriceRangeOrNone(
    min: number,
    max: number
  ): Promise<void> {
    const noResultsVisible = await this.noResult.isVisible();
    const prices = await this.getProductPrices();

    if (noResultsVisible) {
      if (prices.length > 0) {
        throw new Error(
          'Contradiction: "No results" message is visible, but product cards are present.'
        );
      }
      return;
    }
    if (prices.length === 0) {
      throw new Error(
        'No products displayed and "No results" message is not visible — ambiguous state.'
      );
    }
    for (const price of prices) {
      if (price < min || price > max) {
        throw new Error(
          `Product price ${price} is outside the allowed range [${min}, ${max}]`
        );
      }
    }
  }
}
