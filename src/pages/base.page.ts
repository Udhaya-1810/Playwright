import type { Page, Locator } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  buildFromTemplate(template: string, replacements: Record<string, string>): string {
    return Object.entries(replacements).reduce((acc, [key, value]) => {
      return acc.replace(new RegExp(`{{${key}}}`, "g"), value);
    }, template);
  }
}

