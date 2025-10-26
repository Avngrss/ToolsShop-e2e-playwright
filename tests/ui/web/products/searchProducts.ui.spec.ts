import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/HomePage";

test.describe("Product Search on HomePage", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test(
    "should filter products when search query is entered and submitted",
    { tag: ["@ui", "@products", "@smoke", "@positive"] },
    async ({ page }) => {
      const searchQuery = "pliers";
      await homePage.fillSearch(searchQuery);
      expect(await homePage.getCurrentSearchQuery()).toBe(searchQuery);
      await homePage.clickSearchButton();
      await expect(homePage.searchCompletedContainer).not.toHaveText("");
      const filteredNames = await homePage.getFilteredProductNames();
      for (const name of filteredNames) {
        expect(name.toLowerCase()).toContain(searchQuery.toLowerCase());
      }
      await expect(homePage.searchCaption).toBeVisible();
      await expect(homePage.searchCaption).toHaveText(
        `Searched for: ${searchQuery}`
      );
    }
  );
  test(
    "should display no result when search query is entered and submitted if there no products",
    { tag: ["@ui", "@products", "@smoke", "@negative"] },
    async ({ page }) => {
      const searchQuery = "none";
      await homePage.fillSearch(searchQuery);
      expect(await homePage.getCurrentSearchQuery()).toBe(searchQuery);
      await homePage.clickSearchButton();
      await expect(homePage.searchCompletedContainer).not.toHaveText("");
      const filteredNames = await homePage.getFilteredProductNames();
      for (const name of filteredNames) {
        expect(name.toLowerCase()).toContain(searchQuery.toLowerCase());
      }
      await expect(homePage.noResult).toBeVisible();
      await expect(homePage.noResult).toHaveText(
        `There are no products found.`
      );
    }
  );
});
