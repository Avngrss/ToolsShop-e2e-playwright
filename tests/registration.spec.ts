import { test, expect } from "@playwright/test";
import { createUser } from "../utils/userFactory";
import { RegistrationPage } from "../pages/RegistrationPage";

test.describe("Registration tests", async () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    registrationPage.goto();
  });

  test("Should register a new user successfully", async ({ page }) => {
    const user = createUser();
    await registrationPage.fillForm(user);
    await registrationPage.submit();
    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/auth/login"
    );
  });

  test("Password visibility toggle", async () => {
    await expect(registrationPage.passwordInput).toHaveAttribute(
      "type",
      "password"
    );

    await registrationPage.togglePasswordVisibility();
    await expect(registrationPage.passwordInput).toHaveAttribute(
      "type",
      "text"
    );

    await registrationPage.togglePasswordVisibility();
    await expect(registrationPage.passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });
});
