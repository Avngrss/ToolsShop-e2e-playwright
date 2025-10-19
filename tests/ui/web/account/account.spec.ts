import { test, expect } from "../../../../fixtures/authenticated";

test("should display user account", async ({ authenticatedPage }) => {
  await authenticatedPage.goto("/account");
  await expect(authenticatedPage.getByText("John Doe")).toBeVisible();
});
