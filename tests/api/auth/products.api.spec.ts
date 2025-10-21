import { test, expect } from "@playwright/test";

test(
  "API returns correct product",
  { tag: ["@api", "@products", "@positive"] },
  async ({ request }) => {
    const res = await request.get(
      "https://api.practicesoftwaretesting.com/products/01K83YVH843CWAM05M4DMJ8W8C"
    );
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.name).toBe("Combination Pliers");
    expect(data.price).toBe(14.15);
  }
);
