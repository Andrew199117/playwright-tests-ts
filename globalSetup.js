import { chromium, expect } from "@playwright/test";

export default async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/login");

  await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");

  await expect(
    page.getByRole("heading", { name: "Secure Area", exact: true })
  ).toBeVisible();

  await expect(page.getByText("You logged into a secure area!")).toBeVisible();

  await context.storageState({ path: "state.json" });
  await browser.close();
};
