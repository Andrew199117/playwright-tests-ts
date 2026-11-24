import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  reporter: [
    ["list"],
    [
      "html",
      {
        open: "never",
        outputFolder: "playwright-report",
      },
    ],
  ],

  use: {
    baseURL: "https://www.saucedemo.com/v1/",

    trace: "on",
    screenshot: "on",

    viewport: {
      width: 1280,
      height: 720,
    },
  },

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
});
