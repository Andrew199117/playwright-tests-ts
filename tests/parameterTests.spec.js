import { test, expect } from "@playwright/test";
const loginCases = [
  {
    username: "tomsmith",
    password: "SuperSecretPassword!",
    expected: "You logged into a secure area!",
  },
  {
    username: "tomsmith",
    password: "wrongPassword",
    expected: "Your username is invalid!",
  },
  {
    usernname: "123",
    password: "SuperSecretPassword!",
    expected: "Your username is invalid!",
  },
];

loginCases.forEach(({ userName, password, expected }) => {
  test(`Login: ${userName} ${password}`, async ({ page }) => {
    await page.goto("https://the-internet-herokuapp.com/login");
    await page.getByRole("textbox", { name: "Username" }).fill(userName);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#flash")).toContainText(expected);
  });
});
