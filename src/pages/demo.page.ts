import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class DemoPage extends BasePage {
  readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator("h1");
  }

  async gotoPlaywrightHomepage() {
    await this.goto("https://playwright.dev/");
  }
}

