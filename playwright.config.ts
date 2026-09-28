// @ts-check
import { defineConfig, devices } from "@playwright/test";


export default defineConfig({
  testDir: "./tests",
  /* Increased timeout to 120s to allow Gemini and PDF generation to finish without crashing */
  timeout: 120 * 1000,
  retries: 0,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  /* Shared settings for all the projects below. */
  use: {
    browserName: "chromium",
    channel: "msedge", 
    headless: true, // Set to false so you can see the scraping happen
    screenshot: "on",
    trace: "retain-on-failure",
  },
});