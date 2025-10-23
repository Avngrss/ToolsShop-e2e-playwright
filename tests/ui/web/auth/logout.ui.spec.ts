import { test, expect } from "@playwright/test";
import { Header } from "../../../components/Header";
import { LoginPage } from "../../../pages/SigninPage";
import { loadUser } from "../../../../utils/userStorage";
const WEB_BASE_URL = process.env.WEB_BASE_URL;

test(
  "should logout successfully",
  { tag: ["@ui", "@auth"] },
  async ({ page }) => {
    const userCredential = loadUser();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginForm.login(
      userCredential.email,
      userCredential.password
    );
    await expect(page).toHaveURL(`/account`);
    const profileHeading = page.getByTestId("page-title");
    await expect(profileHeading).toBeVisible();
    await expect(profileHeading).toHaveText("My account");

    const header = new Header(page);
    await header.logout();
    await expect(page).toHaveURL(`/auth/login`);
    expect(await new Header(page).isLoggedIn()).toBe(false);
  }
);
