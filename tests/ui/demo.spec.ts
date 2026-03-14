import { test, expect } from "../../src/fixtures/test-fixtures";

test.describe("@web demo", () => {
  test("opens Playwright homepage and checks title", async ({ demoPage }) => {
    await demoPage.gotoPlaywrightHomepage();
    await expect(demoPage.header).toContainText("Playwright");
  });
});

