import { test, expect } from "@playwright/test";

test("Успешный логин на сайте SauceDemo", async ({ page }) => {
  // 1. Открываем страницу авторизации v1
  await page.goto("https://saucedemo.com");

  // 2. Вводим имя пользователя и пароль
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");

  // 3. Кликаем по кнопке Login
  await page.locator("#login-button").click();

  // 4. Проверяем успешность авторизации
  // Ищем элемент с текстом "Products", который гарантированно появляется после входа
  const headerTitle = page.locator("span, div").getByText("Products");

  // Ждем, пока элемент станет видимым
  await expect(headerTitle).toBeVisible({ timeout: 7000 });
});
