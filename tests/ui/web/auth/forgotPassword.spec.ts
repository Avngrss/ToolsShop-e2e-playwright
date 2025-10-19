import { test, expect } from "@playwright/test";
import { ForgotPasswordPage } from "../../../pages/ForgotPassword";

test.describe("Forgot password functionality", () => {
  let forgotPasswordPage: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.goto();
  });

  test(
    "Set new password successfully",
    { tag: ["@ui", "@auth", "@smoke", "@positive"] },
    async () => {
      await forgotPasswordPage.forgotPasswordForm.setNewPassword(
        "customer@practicesoftwaretesting.com"
      );
      await expect(
        forgotPasswordPage.forgotPasswordForm.successMessage
      ).toBeVisible();
      await expect(
        forgotPasswordPage.forgotPasswordForm.successMessage
      ).toHaveText("Your password is successfully updated!");
    }
  );

  test(
    "Set new password when email field is empty",
    { tag: ["@ui", "@auth", "@smoke", "@negative"] },
    async () => {
      await forgotPasswordPage.forgotPasswordForm.setNewPassword("");
      await expect(
        forgotPasswordPage.forgotPasswordForm.emailError
      ).toBeVisible();
      await expect(forgotPasswordPage.forgotPasswordForm.emailError).toHaveText(
        "Email is required"
      );
    }
  );
});
