import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/HomePage";
import { ProductDetailPage } from "../../../pages/ProductDetailPage";
const API_BASE_URL = process.env.API_BASE_URL;

test.describe("Products card page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test(
    "displays product name, price, and CO2 rating",
    { tag: ["@ui", "@products", "@smoke", "@positive"] },
    async () => {
      const card = await homePage.getCardByIndex(0);
      expect(await card.getProductName()).toBeTruthy();
      expect(await card.getProductPrice()).toMatch(/^\$\d+\.\d{2}$/);
      expect(["A", "B", "C", "D", "E"]).toContain(await card.getCo2Rating());
    }
  );

  test(
    "product image is loaded",
    { tag: ["@ui", "@products", "@positive"] },
    async () => {
      const card = await homePage.getCardByIndex(0);
      expect(await card.isImageLoaded()).toBe(true);
    }
  );

  test(
    "clicking card navigates to product detail page",
    { tag: ["@ui", "@products", "@smoke", "@positive"] },
    async ({ page }) => {
      const card = await homePage.getCardByIndex(0);
      const expectedProductId = await card.getProductId();
      await card.click();
      await expect(page).toHaveURL(`/product/${expectedProductId}`);

      const detailPage = new ProductDetailPage(page);
      expect(await detailPage.getProductName()).toBe("Combination Pliers");
      expect(await detailPage.getProductPrice()).toBe("$14.15");
      expect(await detailPage.getCategory()).toBe("Pliers");
      expect(await detailPage.getBrand()).toBe("ForgeFlex Tools");
    }
  );

  test(
    "UI product data matches API response",
    { tag: ["@ui", "@products", "@smoke", "@positive"] },
    async ({ request }) => {
      const apiResponse = await request.get(`${API_BASE_URL}/products?page=1`);
      const apiProducts = await apiResponse.json();

      const uiCards = await homePage.getAllCards(apiProducts.length);

      for (let i = 0; i < apiProducts.length; i++) {
        const apiProduct = apiProducts[i];
        const uiCard = uiCards[i];

        expect(await uiCard.getProductName()).toBe(apiProduct.name);
        expect(await uiCard.getProductPrice()).toBe(
          `$${apiProduct.price.toFixed(2)}`
        );
        expect(await uiCard.getCo2Rating()).toBe(apiProduct.co2Rating);
      }
    }
  );
});
