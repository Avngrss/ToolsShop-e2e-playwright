import { test, expect } from "@playwright/test";
import { ContactUsPage } from "../../../pages/ContactPage";
import { validContactFormData } from "../../../../types/ContactFormData";
const API_BASE_URL = process.env.API_BASE_URL;

test.describe("Contact us form tests", () => {
  let contactUsPage: ContactUsPage;

  test.beforeEach(async ({ page }) => {
    contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();
  });

  test(
    "Success submit contactUs form",
    { tag: ["@ui", "@contactForm", "@smoke", "@positive"] },
    async ({ page }) => {
      const responsePromise = page.waitForResponse(
        (resp) =>
          resp.url().includes(`${API_BASE_URL}/messages`) &&
          resp.status() === 200
      );
      await contactUsPage.contactForm.submitContactForm(validContactFormData);
      await responsePromise;
      await expect(contactUsPage.contactForm.successMessage).toBeVisible();
      await expect(contactUsPage.contactForm.successMessage).toHaveText(
        " Thanks for your message! We will contact you shortly. "
      );
    }
  );
});
