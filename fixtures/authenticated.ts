// fixtures/authenticatedPage.ts
import { test as base, type Page } from "@playwright/test";
import { createUser } from "../utils/userFactory";

interface AuthenticatedFixtures {
  authenticatedPage: Page;
}

export const test = base.extend<AuthenticatedFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const user = createUser();

    const regRes = await page.request.post(
      "https://api.practicesoftwaretesting.com/users/register",
      {
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          address: {
            street: user.street,
            city: user.city,
            state: user.state,
            country: user.country,
            postal_code: user.postalCode,
          },
          phone: user.phone,
          dob: user.dateOfBirth,
          password: user.password,
          email: user.email,
        },
      }
    );
    if (!regRes.ok()) {
      throw new Error(`Registration failed: ${await regRes.text()}`);
    }

    const loginRes = await page.request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: { email: user.email, password: user.password },
      }
    );
    const json = await loginRes.json();
    if (!json.access_token) {
      throw new Error(`Login failed. Response: ${JSON.stringify(json)}`);
    }
    const token = json.access_token;

    await page.addInitScript((token: string) => {
      window.localStorage.setItem("auth-token", token);
    }, token);

    await use(page);

    await context.close();
  },
});

export { expect } from "@playwright/test";
