import { test, expect } from "@playwright/test";
const API_BASE_URL = process.env.API_BASE_URL;

test(
  "should display searched products via API",
  { tag: ["@api", "@products", "@search", "@positive"] },
  async ({ request }) => {
    const res = await request.get(`${API_BASE_URL}/products/search?q=pliers`);
    expect(res.status()).toBe(200);
    const resJson = await res.json();
    expect(resJson).toHaveProperty("data");
    expect(resJson.current_page).toBe(1);
    expect(resJson.total).toBe(4);
    expect(resJson.data.length).toBe(resJson.total);

    for (const product of resJson.data) {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("is_location_offer");
      expect(product).toHaveProperty("is_rental");
      expect(product).toHaveProperty("co2_rating");
      expect(product).toHaveProperty("in_stock");
      expect(product).toHaveProperty("is_eco_friendly");
      expect(product).toHaveProperty("product_image");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("brand");
    }

    for (const product of resJson.data) {
      expect(typeof product.id).toBe("string");
      expect(typeof product.name).toBe("string");
      expect(typeof product.description).toBe("string");
      expect(typeof product.price).toBe("number");
      expect(typeof product.is_location_offer).toBe("boolean");
      expect(typeof product.is_rental).toBe("boolean");
      expect(typeof product.co2_rating).toBe("string");
      expect(typeof product.in_stock).toBe("boolean");
      expect(typeof product.is_eco_friendly).toBe("boolean");
      expect(typeof product.category).toBe("object");
      expect(typeof product.brand).toBe("object");
    }
  }
);

test(
  "should return empty data via API",
  { tag: ["@api", "@products", "@search", "@negative"] },
  async ({ request }) => {
    const res = await request.get(`${API_BASE_URL}/products/search?q=none`);
    expect(res.status()).toBe(200);
    const resJson = await res.json();
    expect(resJson).toHaveProperty("data");
    expect(Array.isArray(resJson.data)).toBeTruthy();
    expect(resJson.data).toHaveLength(0);
  }
);
