import { test, expect } from "@playwright/test";

// Task 1: Open a new window
test("TC-01: Open New Window", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/windows");

  const newPagePromise = page.context().waitForEvent("page");

  await page.getByRole("link", { name: "Click Here" }).click();

  const newPage = await newPagePromise;

  await newPage.waitForLoadState();

  await expect(newPage).toHaveURL(/windows\/new/);

  await expect(
    newPage.getByRole("heading", { name: "New Window" })
  ).toBeVisible();
});

// Task 2: Hover over an image and click the link
test("TC-02: Hover and Click Link", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/hovers");

  const image = page.locator(".figure").first();

  await image.hover();

  await expect(image.getByText("name: user1")).toBeVisible();

  await image.getByRole("link", { name: "View profile" }).click();

  await expect(page).toHaveURL(/users\/1/);
});

// Task 3: Press Control key
test("TC-03: Press Control Key", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/key_presses");

  await page.keyboard.press("Control");

  await expect(page.locator("#result")).toHaveText("You entered: CONTROL");
});

// Task 4: Drag and Drop
test("TC-04: Drag and Drop", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop");

  const columnA = page.locator("#column-a");
  const columnB = page.locator("#column-b");

  // Verify initial positions
  await expect(columnA).toHaveText("A");
  await expect(columnB).toHaveText("B");

  // Drag A to B
  await columnA.dragTo(columnB);

  // Verify swapped positions
  await expect(columnA).toHaveText("B");
  await expect(columnB).toHaveText("A");
});

// Task 5: Upload a file
test("TC-05: Upload File", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");

  await page.locator("#file-upload").setInputFiles({
    name: "homework20.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Playwright Homework 20"),
  });

  await page.locator("#file-submit").click();

  await expect(
    page.getByRole("heading", { name: "File Uploaded!" })
  ).toBeVisible();

  await expect(page.locator("#uploaded-files")).toHaveText("homework20.txt");
});

// Task 6: JavaScript Confirm
test("TC-06: JavaScript Confirm", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.once("dialog", async (dialog) => {
    expect(dialog.type()).toBe("confirm");

    expect(dialog.message()).toBe("I am a JS Confirm");

    await dialog.accept();
  });

  await page
    .getByRole("button", {
      name: "Click for JS Confirm",
    })
    .click();

  await expect(page.locator("#result")).toHaveText("You clicked: Ok");
});
