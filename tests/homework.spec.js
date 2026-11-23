import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory\.html/);
});

// TC-01: Successful Login
test("TC-01: Successful Login", async ({ page }) => {
  // Verify successful login
  await expect(page).toHaveURL(/inventory\.html/);

  // Verify that products are displayed
  await expect(page.locator(".inventory_item")).toHaveCount(6);

  // Verify that shopping cart is visible
  await expect(page.locator(".shopping_cart_link")).toBeVisible();

  // Screenshot assertion
  await expect(page).toHaveScreenshot("products-page.png");
});

// TC-02: Add Product to Cart
test("TC-02: Add Product to Cart", async ({ page }) => {
  const product = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });

  await product
    .getByRole("button", {
      name: /add to cart/i,
    })
    .click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  await page.locator(".shopping_cart_link").click();

  await expect(page).toHaveURL(/cart\.html/);

  await expect(page.locator(".cart_item .inventory_item_name")).toHaveText(
    "Sauce Labs Backpack"
  );

  await expect(page).toHaveScreenshot("cart-page.png");
});

// TC-03: Successful Checkout
test("TC-03: Successful Checkout", async ({ page }) => {
  const product = page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" });

  await product
    .getByRole("button", {
      name: /add to cart/i,
    })
    .click();

  await page.locator(".shopping_cart_link").click();

  await page.locator(".checkout_button").click();

  await page.locator("#first-name").fill("John");
  await page.locator("#last-name").fill("Doe");
  await page.locator("#postal-code").fill("12345");

  await page.locator("#continue").click();

  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await expect(page.locator(".cart_item .inventory_item_name")).toHaveText(
    "Sauce Labs Backpack"
  );

  await page.getByRole("button", { name: /finish/i }).click();

  await expect(page).toHaveURL(/checkout-complete\.html/);

  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!"
  );

  await expect(page).toHaveScreenshot("checkout-complete.png", {
    maxDiffPixels: 100,
  });
});
