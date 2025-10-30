import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/HomePage";
import {
  isSortedAscendingString,
  isSortedAscendingNumber,
  isSortedAscendingCO2,
  isSortedDescendingString,
  isSortedDescendingNumber,
  isSortedDescendingCO2,
} from "../../../../utils/sortingUtils";

test.describe("Product Sorting", { tag: "@sorting" }, () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test(
    "should sort products by Name (A - Z)",
    { tag: ["@ui", "@smoke", "@positive", "@sorting"] },
    async () => {
      await test.step("Apply Name (A - Z) sort", async () => {
        await homePage.applySort("name,asc");
      });

      const sortedNames =
        await test.step("Get sorted product names", async () => {
          return await homePage.getProductNames();
        });

      await test.step("Verify names are sorted ascending", async () => {
        expect(isSortedAscendingString(sortedNames)).toBe(true);
      });
    }
  );

  test(
    "should sort products by Name (Z - A)",
    { tag: ["@ui", "@positive", "@sorting"] },
    async () => {
      await test.step("Apply Name (Z - A) sort", async () => {
        await homePage.applySort("name,desc");
      });

      const sortedNames =
        await test.step("Get sorted product names", async () => {
          return await homePage.getProductNames();
        });

      await test.step("Verify names are sorted descending", async () => {
        expect(isSortedDescendingString(sortedNames)).toBe(true);
      });
    }
  );

  test(
    "should sort products by Price (Low - High)",
    { tag: ["@ui", "@positive", "@sorting"] },
    async () => {
      await test.step("Apply Price (Low - High) sort", async () => {
        await homePage.applySort("price,asc");
      });

      const sortedPrices =
        await test.step("Get sorted product prices", async () => {
          return await homePage.getProductPrices();
        });

      await test.step("Verify prices are sorted ascending", async () => {
        expect(isSortedAscendingNumber(sortedPrices)).toBe(true);
      });
    }
  );

  test(
    "should sort products by Price (High - Low)",
    { tag: ["@ui", "@positive", "@sorting"] },
    async () => {
      await test.step("Apply Price (High - Low) sort", async () => {
        await homePage.applySort("price,desc");
      });

      const sortedPrices =
        await test.step("Get sorted product prices", async () => {
          return await homePage.getProductPrices();
        });

      await test.step("Verify prices are sorted descending", async () => {
        expect(isSortedDescendingNumber(sortedPrices)).toBe(true);
      });
    }
  );

  test(
    "should sort products by CO₂ Rating (A - E)",
    { tag: ["@ui", "@positive", "@sorting"] },
    async () => {
      await test.step("Apply CO₂ Rating (A - E) sort", async () => {
        await homePage.applySort("co2_rating,asc");
      });

      const sortedRatings =
        await test.step("Get sorted CO₂ ratings", async () => {
          return await homePage.getCO2Ratings();
        });

      await test.step("Verify CO₂ ratings are sorted ascending", async () => {
        expect(isSortedAscendingCO2(sortedRatings)).toBe(true);
      });
    }
  );

  test(
    "should sort products by CO₂ Rating (E - A)",
    { tag: ["@ui", "@positive", "@sorting"] },
    async () => {
      await test.step("Apply CO₂ Rating (E - A) sort", async () => {
        await homePage.applySort("co2_rating,desc");
      });

      const sortedRatings =
        await test.step("Get sorted CO₂ ratings", async () => {
          return await homePage.getCO2Ratings();
        });

      await test.step("Verify CO₂ ratings are sorted descending", async () => {
        expect(isSortedDescendingCO2(sortedRatings)).toBe(true);
      });
    }
  );

  test(
    "should change order after sorting and verify manually",
    { tag: ["@ui", "@positive", "@sorting"] },
    async () => {
      const originalNames =
        await test.step("Get original product names", async () => {
          return await homePage.getProductNames();
        });

      await test.step("Apply Name (A - Z) sort", async () => {
        await homePage.applySort("name,asc");
      });

      const sortedNames =
        await test.step("Get sorted product names", async () => {
          return await homePage.getProductNames();
        });

      await test.step("Verify order has changed", async () => {
        expect(originalNames).not.toEqual(sortedNames);
      });

      await test.step("Verify names are sorted ascending", async () => {
        expect(isSortedAscendingString(sortedNames)).toBe(true);
      });
    }
  );
});
