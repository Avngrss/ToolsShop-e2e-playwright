import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/HomePage";
const API_BASE_URL = process.env.API_BASE_URL;

test.describe("Range Slider Tests", () => {
  test.setTimeout(80000);
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should set range to 50-150", async ({ page }) => {
    await homePage.rangeSliderComponent.setRange(50, 150);
    const range = await homePage.rangeSliderComponent.getRange();
    expect(range.min).toBe(50);
    expect(range.max).toBe(150);
    await page.waitForResponse(
      `${API_BASE_URL}/products?page=0&between=price,50,150&is_rental=false`
    );
    await homePage.verifyProductsInPriceRangeOrNone(50, 150);
  });

  test("should show 'no results' when range is set to 200-200", async ({
    page,
  }) => {
    await homePage.rangeSliderComponent.setMaxValue(200);
    await homePage.rangeSliderComponent.setMinValue(200);

    const range = await homePage.rangeSliderComponent.getRange();
    expect(range.min).toBe(200);
    expect(range.max).toBe(200);
    await page.waitForResponse(
      `${API_BASE_URL}/products?page=0&between=price,200,200&is_rental=false`
    );
    await expect(homePage.noResult).toBeVisible();
  });

  test("should show 'no results' when range is set to 1-1", async ({
    page,
  }) => {
    await homePage.rangeSliderComponent.setMaxValue(1);
    await homePage.rangeSliderComponent.setMinValue(1);

    const range = await homePage.rangeSliderComponent.getRange();
    expect(range.min).toBe(1);
    expect(range.max).toBe(1);
    await page.waitForResponse(
      `${API_BASE_URL}/products?page=0&between=price,1,1&is_rental=false`
    );
    await expect(homePage.noResult).toBeVisible();
  });
});
