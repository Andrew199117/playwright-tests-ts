import { test, expect } from "@playwright/test";

// TC-01: Check secure page
test("logged is opened @smoke", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/secure");

  await expect(
    page.getByRole("heading", {
      name: "Secure Area",
      exact: true,
    })
  ).toBeVisible({ timeout: 30000 });
});

// TC-02: Complex locators
test("Complex locators", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/challenging_dom");

  // Find row with text Iuvaret5 and click Delete
  await page
    .locator("tbody tr")
    .filter({ hasText: "Iuvaret5" })
    .getByRole("link", { name: "delete" })
    .click();

  // Find third row and click first link
  await page.locator("tbody tr").nth(2).locator("a").first().click();
});

// TC-03: Describe block
test.describe("describe block", () => {
  test("secure page is opened", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/secure");

    await expect(
      page.getByRole("heading", {
        name: "Secure Area",
        exact: true,
      })
    ).toBeVisible({ timeout: 3000 });
  });

  test("Complex locators", async ({ page }) => {
    test.setTimeout(40000);

    await page.goto("https://the-internet.herokuapp.com/challenging_dom");

    // Find row containing Iuvaret5 and click delete
    await page
      .locator("tbody tr")
      .filter({ hasText: "Iuvaret5" })
      .getByRole("link", { name: "delete" })
      .click();

    // Find third row and click first link
    await page.locator("tbody tr").nth(2).locator("a").first().click();
  });
});
