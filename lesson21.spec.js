import { test } from "@playwright/test";

test.only("logged is opened", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/secure");
});
