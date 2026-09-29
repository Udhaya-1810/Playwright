import {test, expect} from '@playwright/test'
import {POM_Demo} from "../../src/pages/POM_demo.page"; 

test.describe("@web demo", () => {
    test("Open url and validate logout functionality", async ({ page }) => {
      await page.goto("https://www.saucedemo.com/")
      let obj = new POM_Demo(page)
      await obj.login("standard_user","secret_sauce")
      await obj.logout()
      await expect(page).toHaveURL("https://www.saucedemo.com/")
      await expect(page.locator("#login-button")).toBeVisible()
    })
    });