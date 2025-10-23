import { test, expect } from "@playwright/test";
import { loadUser } from "../../../../utils/userStorage";
import { LoginPage } from "../../../pages/SigninPage";
const WEB_BASE_URL = process.env.WEB_BASE_URL;

test.describe("Login tests", async () => {
  let loginPage: LoginPage;
  const userCredential = loadUser();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test(
    "Should successfully login",
    { tag: ["@ui", "@auth", "@smoke", "@positive"] },
    async ({ page }) => {
      await loginPage.loginForm.login(
        userCredential.email,
        userCredential.password
      );

      await expect(page).toHaveURL(`${WEB_BASE_URL}/account`);
      const profileHeading = page.getByTestId("page-title");
      await expect(profileHeading).toBeVisible();
      await expect(profileHeading).toHaveText("My account");
    }
  );
});

test.describe("Register link navigation", () => {
  test(
    "Check register link",
    { tag: ["@ui", "@navigation", "@positive"] },
    async ({ page }) => {
      let loginPage: LoginPage;

      loginPage = new LoginPage(page);
      await loginPage.loginForm.registerLinkNavigation();
      await expect(page).toHaveURL(`${WEB_BASE_URL}/auth/register`);
    }
  );
});

test.describe("Forgot your password link navigation", () => {
  test(
    "Forgot your password link",
    { tag: ["@ui", "@navigation", "@positive"] },
    async ({ page }) => {
      let loginPage: LoginPage;

      loginPage = new LoginPage(page);
      await loginPage.loginForm.forgotPasswordLinkNavigation();
      await expect(page).toHaveURL(`${WEB_BASE_URL}/auth/forgot-password`);
    }
  );
});

test.describe("Logout test", async () => {
  let loginPage: LoginPage;
  const userCredential = loadUser();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test(
    "Should successfully login",
    { tag: ["@ui", "@auth", "@smoke", "@positive"] },
    async ({ page }) => {
      await loginPage.loginForm.login(
        userCredential.email,
        userCredential.password
      );
      await expect(page).toHaveURL(`${WEB_BASE_URL}/account`);
      const profileHeading = page.getByTestId("page-title");
      await expect(profileHeading).toBeVisible();
      await expect(profileHeading).toHaveText("My account");
    }
  );
});
