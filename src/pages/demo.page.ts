import type { Page, Locator } from "@playwright/test";

export class DemoPage {

    readonly page: Page;
    readonly header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator("h1");
    }

    async gotoPlaywrightHomepage() {
        await this.page.goto("https://playwright.dev/");
    }

    async login(username: string, password: string) {
        
    }
}