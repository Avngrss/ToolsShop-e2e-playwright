import { test, expect } from "@playwright/test";
import { createUser } from "../../../../utils/userFactory";
import { RegistrationPage } from "../../../pages/RegistrationPage";

test.describe("Registration tests", async () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  test(
    "Should register a new user successfully",
    { tag: ["@ui", "@auth", "@smoke", "@positive"] },
    async ({ page }) => {
      const user = createUser();
      await registrationPage.registerForm.fillForm(user);
      await registrationPage.registerForm.submit();
      await expect(page).toHaveURL(`/auth/login`);
    }
  );

  test(
    "Password visibility toggle @ui @auth",
    { tag: ["@ui", "@auth"] },
    async () => {
      await expect(registrationPage.registerForm.passwordInput).toHaveAttribute(
        "type",
        "password"
      );

      await registrationPage.registerForm.togglePasswordVisibility();
      await expect(registrationPage.registerForm.passwordInput).toHaveAttribute(
        "type",
        "text"
      );

      await registrationPage.registerForm.togglePasswordVisibility();
      await expect(registrationPage.registerForm.passwordInput).toHaveAttribute(
        "type",
        "password"
      );
    }
  );
});
