import { test, expect } from "@playwright/test";

test("E2E: Login, add product to cart and checkout", async ({ page }) => {
  const productName = "Sauce Labs Backpack";

  // Step 1: Open website
  await page.goto("https://www.saucedemo.com/v1/");

  // Step 2: Login
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  // Verify login
  await expect(page).toHaveURL(/inventory\.html/);

  // Step 3: Add product to cart
  const product = page
    .locator(".inventory_item")
    .filter({ hasText: productName });

  await product
    .getByRole("button", {
      name: /add to cart/i,
    })
    .click();

  // Verify cart badge
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  // Step 4: Open cart
  await page.locator(".shopping_cart_link").click();

  // Verify cart page
  await expect(page).toHaveURL(/cart\.html/);

  // Step 5: Verify product in cart
  await expect(page.locator(".cart_item .inventory_item_name")).toHaveText(
    productName
  );

  // Step 6: Checkout
  await page.locator(".checkout_button, #checkout").click();

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  // Step 7: Fill checkout information
  await page.locator("#first-name").fill("John");
  await page.locator("#last-name").fill("Doe");
  await page.locator("#postal-code").fill("12345");

  // Step 8: Continue
  await page.locator('#continue, input[value="CONTINUE"]').click();

  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // Verify product in order overview
  await expect(page.locator(".cart_item .inventory_item_name")).toHaveText(
    productName
  );

  // Step 9: Finish order
  await page.locator("#finish, .btn_action.cart_button").click();

  // Step 10: Verify order completed
  await expect(page).toHaveURL(/checkout-complete\.html/);

  await expect(page.getByText(/thank you for your order/i)).toBeVisible();
});
