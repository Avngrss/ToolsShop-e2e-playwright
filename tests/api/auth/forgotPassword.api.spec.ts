import { test, expect } from "@playwright/test";
const API_BASE_URL = process.env.API_BASE_URL;

test(
  "should reject login with wrong email",
  { tag: ["@api", "@auth", "@positive", "@smoke"] },
  async ({ request }) => {
    const res = await request.post(`${API_BASE_URL}/forgot-password`, {
      data: {
        email: "customer@m",
      },
    });
    expect(res.status()).toBe(404);
  }
);
