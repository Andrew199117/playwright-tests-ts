import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");

  await expect(
    page.getByRole("heading", { name: "Secure Area" })
  ).toBeVisible();

  await expect(page.getByText("You logged into a secure area!")).toBeVisible();
});

test("Complex locators", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/challenging_dom");
  await page
    .locator("tbody tr", { hasText: "Iuvaret5" })
    .locator("a", { hasText: "delete" })
    .click();
  await page.locator("tbody tr").nth(2).locator("a").first().click();
});

test("Frames", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");
  const frame = page.frameLocator("#mce_0_ifr");
  await frame.locator("#tinymce").fill("test");
});

test("Shadow dom", async ({ page }) => {
  await expect(page.locator('#span[slot="my-text"]'));
  const columnA = page.locator("#column-a");
  const columnB = page.locator("#column-b");
  await columnA.dragTo(columnB);
});

test("Upload", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
  await page.locator("#file-upload").setInputFiles("resources/image.jpeg");
  await page.locator("#file-submit").click();
  await expect(page.locator("#uploaded-files")).toHaveText("image.jpeg");
});

test("Upload File", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");

  await page.locator("#file-upload").setInputFiles("resources/image.jpeg");

  await page.locator("#file-submit").click();

  await expect(page.locator("#uploaded-files")).toHaveText("image.jpeg");
});
