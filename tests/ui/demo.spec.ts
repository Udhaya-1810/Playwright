import { test, expect } from "../../src/fixtures/test-fixtures";
import { DemoPage } from "../../src/pages/demo.page"; 

test.describe("@web demo", () => {
  test("opens Playwright homepage and checks title", async ({ page }) => {
    await page.goto("https://practice.rcvacademy.com/multiple-windows")
    const [newpage]=await Promise.all([
      page.waitForEvent("popup"),
      page.getByTestId('open-new-window-btn').click()
    ]);
    newpage.waitForLoadState()
    console.log(await newpage.title())
    expect(newpage).toHaveTitle("New Window — Software Testing Mentor & RCV Academy")
    await newpage.getByRole('textbox',{name:'New window text input'}).fill("asif")
    await newpage.getByRole('button',{name:'Close This Window'}).click()

  });
});

