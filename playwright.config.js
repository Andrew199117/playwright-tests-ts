import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  reporter: "html",

  globalSetup: "./globalSetup.js",
  globalTeardown: "./globalTeardown.js",

  use: {
    baseURL: "https://the-internet.herokuapp.com",
    storageState: "state.json",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
