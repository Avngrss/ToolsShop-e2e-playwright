import { test, expect } from "@playwright/test";
import { validContactFormData } from "../../../types/ContactFormData";

test(
  "should submit contact form  via API",
  { tag: ["@api", "@contactForm", "@smoke", "@positive"] },
  async ({ request }) => {
    const { firstName, lastName, email, subject, message } =
      validContactFormData;
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/messages",
      {
        data: { firstName, lastName, email, subject, message },
      }
    );
    expect(res.status()).toBe(200);
  }
);
