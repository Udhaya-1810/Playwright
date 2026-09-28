import { test, expect } from "../../src/fixtures/test-fixtures";
import { TestConfig } from "../../src/config/testConfig";

test.describe("OrangeHRM application login functionality",()=>{
    test("login to the application",async({page})=>{
        await page.goto(TestConfig.orangewebsite);
        await expect(page).toHaveTitle("OrangeHRM"); // assertion
        const username=await page.locator("//div[contains(@class,'orangehrm-demo-credentials')]/p").first().textContent();
        const password=await page.locator("//div[contains(@class,'orangehrm-demo-credentials')]/p").last().textContent();
        console.log(username+" "+password);
        const usernameValue=username?.split(':')[1].trim();
        const passwordValue=password?.split(':')[1].trim();
        console.log(usernameValue+" "+passwordValue);
        await page.locator("//input[@name='username']").fill(usernameValue || "");
        await page.pause();
        await page.locator("//input[@name='password']").fill(passwordValue || "");
        await page.locator("//button[@type='submit']").click();
        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
        await page.getByRole('heading', { name: 'Dashboard' }).isVisible();
    })
    test.only("switching frames and tabs",async({page})=>{
        await page.goto("https://practice.rcvacademy.com/login");
        await page.getByRole('textbox',{name : 'username'}).fill("asif");
        await page.getByPlaceholder("Enter your password").fill("pass");
        await page.getByRole('button',{name:'Sign in'}).click();
        expect(await page.locator("//div[@id='login-message']/span").innerText()).toBe("Invalid credentials. Try admin / password.");
        await page.getByTestId("goto-register").click();
       
       
})
})
