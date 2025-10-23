import { test, expect } from "@playwright/test";
const API_BASE_URL = process.env.API_BASE_URL;

test(
  "API returns correct product",
  { tag: ["@api", "@products", "@positive"] },
  async ({ request }) => {
    const res = await request.get(
      `${API_BASE_URL}/products/01K8972SPXW1EMDYAC7DEM6TGC`
    );
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.name).toBe("Combination Pliers");
    expect(data.price).toBe(14.15);
  }
);
