import { test, expect } from "@playwright/test";
const API_BASE_URL = process.env.API_BASE_URL;

test(
  "API returns correct product",
  { tag: ["@api", "@products", "@positive"] },
  async ({ request }) => {
    const listResponse = await request.get(`${API_BASE_URL}/products`);
    expect(listResponse.status()).toBe(200);
    const responseJson = await listResponse.json();
    expect(responseJson).toHaveProperty("data");
    expect(responseJson.data).toBeInstanceOf(Array);

    expect(responseJson.data.length).toBeGreaterThan(0);
    const firstProductId = responseJson.data[0].id;

    const res = await request.get(`${API_BASE_URL}/products/${firstProductId}`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.name).toBe("Combination Pliers");
    expect(data.price).toBe(14.15);
  }
);
