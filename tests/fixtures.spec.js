import { test, expect } from "../fixtures/myFiztures";

test("Token is available", async ({ authToken }) => {
  expect(authToken).toBe("abc123");
});

test("logged page", async ({ loggedPage }) => {
  await loggedPage.goto("https://the-internet.herokuapp.com/secure");

  await expect(
    loggedPage.getByRole("heading", {
      name: "Secure Area",
      exact: true,
    })
  ).toBeVisible({ timeout: 30000 });
});
