import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./globalSetup.js",
  globalTeardown: "./globalTeardown.js",

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
    storageState: "state.js",
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
