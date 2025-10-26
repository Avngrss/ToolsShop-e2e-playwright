import { test, expect, APIRequestContext } from "@playwright/test";
import { Product } from "../../../types/product";

const API_BASE_URL = process.env.API_BASE_URL;

test.describe("Products API Sorting Smoke Tests", () => {
  let request: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: API_BASE_URL,
      // extraHTTPHeaders: {
      //   'Authorization': 'Bearer ...',
      // },
    });
  });
  test.afterAll(async () => {
    await request.dispose();
  });

  const baseUrl = "/products?page=0&between=price,1,100&is_rental=false";

  test(
    "should sort products by Name (A - Z)",
    { tag: ["@api", "@products", "@sort", "@positive"] },
    async () => {
      const url = `${baseUrl}&sort=name,asc`;
      const response = await request.get(url);

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody.data)).toBe(true);

      const products = responseBody.data as Product[];
      if (products.length > 1) {
        for (let i = 1; i < products.length; i++) {
          const comparisonResult = products[i - 1].name
            .toLowerCase()
            .localeCompare(products[i].name.toLowerCase(), undefined, {
              numeric: true,
              sensitivity: "base",
            });
          expect(comparisonResult).toBeLessThanOrEqual(0);
        }
      }
      products.forEach((product: Product) => {
        expect(product.price).toBeGreaterThanOrEqual(1);
        expect(product.price).toBeLessThanOrEqual(100);
        expect(product.is_rental).toBe(false);
      });
    }
  );

  test(
    "should sort products by Name (Z - A)",
    { tag: ["@api", "@products", "@sort", "@positive"] },
    async () => {
      const url = `${baseUrl}&sort=name,desc`;
      const response = await request.get(url);

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody.data)).toBe(true);

      const products = responseBody.data as Product[];
      if (products.length > 1) {
        for (let i = 1; i < products.length; i++) {
          const comparisonResult = products[i - 1].name
            .toLowerCase()
            .localeCompare(products[i].name.toLowerCase(), undefined, {
              numeric: true,
              sensitivity: "base",
            });
          expect(comparisonResult).toBeGreaterThanOrEqual(0);
        }
      }
      products.forEach((product: Product) => {
        expect(product.price).toBeGreaterThanOrEqual(1);
        expect(product.price).toBeLessThanOrEqual(100);
        expect(product.is_rental).toBe(false);
      });
    }
  );

  test(
    "should sort products by Price (High - Low)",
    { tag: ["@api", "@products", "@sort", "@positive"] },
    async () => {
      const url = `${baseUrl}&sort=price,desc`;
      const response = await request.get(url);

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody.data)).toBe(true);

      const products = responseBody.data as Product[];
      if (products.length > 1) {
        for (let i = 1; i < products.length; i++) {
          expect(products[i - 1].price).toBeGreaterThanOrEqual(
            products[i].price
          );
        }
      }
      products.forEach((product: Product) => {
        expect(product.price).toBeGreaterThanOrEqual(1);
        expect(product.price).toBeLessThanOrEqual(100);
        expect(product.is_rental).toBe(false);
      });
    }
  );

  test(
    "should sort products by Price (Low - High)",
    { tag: ["@api", "@products", "@sort", "@positive"] },
    async () => {
      const url = `${baseUrl}&sort=price,asc`;
      const response = await request.get(url);

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody.data)).toBe(true);

      const products = responseBody.data as Product[];
      if (products.length > 1) {
        for (let i = 1; i < products.length; i++) {
          expect(products[i - 1].price).toBeLessThanOrEqual(products[i].price);
        }
      }

      products.forEach((product: Product) => {
        expect(product.price).toBeGreaterThanOrEqual(1);
        expect(product.price).toBeLessThanOrEqual(100);
        expect(product.is_rental).toBe(false);
      });
    }
  );

  test(
    "should sort products by CO₂ Rating (A - E)",
    { tag: ["@api", "@products", "@sort", "@positive"] },
    async () => {
      const url = `${baseUrl}&sort=co2_rating,asc`;
      const response = await request.get(url);

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody.data)).toBe(true);

      const products = responseBody.data as Product[];
      const ratingToValue = (rating: string): number =>
        ({ A: 1, B: 2, C: 3, D: 4, E: 5 }[rating] || 0);
      if (products.length > 1) {
        for (let i = 1; i < products.length; i++) {
          expect(ratingToValue(products[i - 1].co2_rating)).toBeLessThanOrEqual(
            ratingToValue(products[i].co2_rating)
          );
        }
      }
      products.forEach((product: Product) => {
        expect(product.price).toBeGreaterThanOrEqual(1);
        expect(product.price).toBeLessThanOrEqual(100);
        expect(product.is_rental).toBe(false);
      });
    }
  );

  test(
    "should sort products by CO₂ Rating (E - A)",
    { tag: ["@api", "@products", "@sort", "@positive"] },
    async () => {
      const url = `${baseUrl}&sort=co2_rating,desc`;
      const response = await request.get(url);

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody.data)).toBe(true);

      const products = responseBody.data as Product[];
      const ratingToValue = (rating: string): number =>
        ({ A: 1, B: 2, C: 3, D: 4, E: 5 }[rating] || 0);
      if (products.length > 1) {
        for (let i = 1; i < products.length; i++) {
          expect(
            ratingToValue(products[i - 1].co2_rating)
          ).toBeGreaterThanOrEqual(ratingToValue(products[i].co2_rating));
        }
      }
      products.forEach((product: Product) => {
        expect(product.price).toBeGreaterThanOrEqual(1);
        expect(product.price).toBeLessThanOrEqual(100);
        expect(product.is_rental).toBe(false);
      });
    }
  );
});
