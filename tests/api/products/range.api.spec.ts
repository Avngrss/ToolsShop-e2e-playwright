import { test, expect } from "@playwright/test";
const API_BASE_URL = process.env.API_BASE_URL;

test("Verify Filtering by Price Range (50 - 150)", async ({ request }) => {
  const res = await request.get(
    `${API_BASE_URL}/products?page=0&between=price,50,150&is_rental=false`
  );

  expect(res.status()).toBe(200);

  const responseBody = await res.json();
  expect(responseBody).toHaveProperty("data");
  expect(Array.isArray(responseBody.data)).toBeTruthy();

  const products = responseBody.data;
  expect(products.length).toBeGreaterThan(0);

  for (const product of products) {
    expect(product).toHaveProperty("price");
    expect(typeof product.price).toBe("number");
    expect(product.price).toBeGreaterThanOrEqual(50);
    expect(product.price).toBeLessThanOrEqual(150);
  }
});

test("Verify Filtering by Price Range (0-0)", async ({ request }) => {
  const res = await request.get(
    `${API_BASE_URL}/products?page=0&between=price,0,0&is_rental=false`
  );

  expect(res.status()).toBe(200);

  const responseBody = await res.json();
  expect(responseBody).toHaveProperty("data");
  expect(Array.isArray(responseBody.data)).toBeTruthy();
  expect(responseBody.data).toHaveLength(0);
});

test("Verify Filtering by Price Range (200 - 200)", async ({ request }) => {
  const res = await request.get(
    `${API_BASE_URL}/products?page=0&between=price,200,200&is_rental=false`
  );

  expect(res.status()).toBe(200);

  const responseBody = await res.json();
  expect(responseBody).toHaveProperty("data");
  expect(Array.isArray(responseBody.data)).toBeTruthy();
  expect(responseBody.data).toHaveLength(0);
});
