import { test, expect } from "@playwright/test";

test(
  "should reject login with wrong email",
  { tag: ["@api", "@auth", "@positive", "@smoke"] },
  async ({ request }) => {
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/users/forgot-password",
      {
        data: {
          email: "customer@m",
        },
      }
    );
    expect(res.status()).toBe(404);
  }
);
