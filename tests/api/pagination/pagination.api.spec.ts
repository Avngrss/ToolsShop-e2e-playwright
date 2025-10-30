import { test, expect, APIResponse } from "@playwright/test";
import { buildProductParams } from "../../../utils/productParams";
const API_BASE_URL = process.env.API_BASE_URL;

test("should return valid product structure with non-empty data array from page 1", async ({
  request,
}) => {
  const params = buildProductParams({ page: 1 });

  let response: APIResponse;
  await test.step("Send GET request to /products...", async () => {
    response = await request.get(`${API_BASE_URL}/products`, { params });
  });

  await test.step("Validate response status code is 200", () => {
    expect(response.status()).toBe(200);
  });

  let body: any;
  await test.step("Parse response JSON and validate top-level structure", async () => {
    body = await response.json();
    expect(body).toHaveProperty("current_page");
    expect(body.current_page).toBe(1);
    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  await test.step("Validate structure and content of each product in data array", () => {
    for (const [index, product] of body.data.entries()) {
      test.step(`Validate product #${index + 1} (ID: ${product.id})`, () => {
        expect(product).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          price: expect.any(Number),
          is_location_offer: expect.any(Boolean),
          is_rental: expect.any(Boolean),
          co2_rating: expect.any(String),
          in_stock: expect.any(Boolean),
          is_eco_friendly: expect.any(Boolean),
        });

        expect(product).toHaveProperty("product_image");
        expect(product.product_image).toMatchObject({
          id: expect.any(String),
          by_name: expect.any(String),
          by_url: expect.any(String),
          source_name: expect.any(String),
          source_url: expect.any(String),
          file_name: expect.any(String),
          title: expect.any(String),
        });

        expect(product).toHaveProperty("category");
        expect(product.category).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          slug: expect.any(String),
        });

        expect(product).toHaveProperty("brand");
        expect(product.brand).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
        });
        expect(product.is_rental).toBe(false);
        expect(product.price).toBeGreaterThanOrEqual(1);
        expect(product.price).toBeLessThanOrEqual(100);
      });
    }
  });
});

test("Validate last page returns correct data and metadata", async ({
  request,
}) => {
  const PAGE_SIZE = 9;

  const firstPageParams = buildProductParams({ page: 1, min: 1, max: 100 });
  const firstRes = await request.get(`${API_BASE_URL}/products`, {
    params: firstPageParams,
  });
  const firstBody = await firstRes.json();

  const total = firstBody.total;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  test.skip(
    totalPages <= 1,
    "Only one page available, skipping last page test"
  );

  await test.step(`Fetch last page (page ${totalPages})`, async () => {
    const lastRes = await request.get(`${API_BASE_URL}/products`, {
      params: buildProductParams({ page: totalPages, min: 1, max: 100 }),
    });

    expect(lastRes.status()).toBe(200);
    const lastBody = await lastRes.json();

    expect(lastBody.current_page).toBe(totalPages);
    expect(lastBody.total).toBe(total);
    expect(lastBody.data.length).toBeGreaterThan(0);
    expect(lastBody.data.length).toBeLessThanOrEqual(PAGE_SIZE);
  });
});

test("Validate non-existent page returns empty data", async ({ request }) => {
  const resInvalid = await request.get(`${API_BASE_URL}/products`, {
    params: buildProductParams({ page: 9999, min: 1, max: 1000 }),
  });
  const dataInvalid = await resInvalid.json();

  expect(dataInvalid.data).toEqual([]);
});
