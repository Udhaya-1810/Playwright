import { BasePage } from "./base.page";
import fs from "fs";
import path from "path";

const selectors = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "src/data/selectors.json"), "utf-8"),
);

export class NaukriPage extends BasePage {
  private readonly naukriSelectors = selectors.naukri;

  async search(role: string, skills: string, experience: string, location: string): Promise<void> {
    await this.goto("https://www.naukri.com/");
    await this.fill(this.naukriSelectors.roleInput, `${role}, ${skills}`);
    await this.click(this.naukriSelectors.expyearsdropdown);
    const experienceOptionXpath = this.naukriSelectors.expdroption.replace("{{YEAR}}", `${experience} years`);
    await this.click(experienceOptionXpath);
    await this.fill(this.naukriSelectors.location, location);
    await this.click(this.naukriSelectors.searchButton);
  }

  async getSearchResultLinks(): Promise<{ allUrls: string[]; allTitles: (string | null)[] }> {
    const linksLocator = this.page.locator(this.naukriSelectors.allResults);
    const count = await linksLocator.count();

    const allUrls: string[] = [];
    const allTitles: (string | null)[] = [];

    for (let i = 0; i < count; i++) {
      const link = linksLocator.nth(i);
      const href = await link.getAttribute("href");
      const title = await link.getAttribute("title");

      if (href) {
        allUrls.push(href);
        allTitles.push(title ? title.trim() : null);
      }
    }

    return { allUrls, allTitles };
  }

  async getCompanies(): Promise<string[]> {
    const linksLocator = this.page.locator(this.naukriSelectors.allCompanies);
    const count = await linksLocator.count();
    const allCompanies: string[] = [];

    for (let i = 0; i < count; i++) {
      const title = await linksLocator.nth(i).getAttribute("title");
      if (title && !title.toLowerCase().includes("powered by ambition box")) {
        allCompanies.push(title.trim());
      }
    }
    return allCompanies;
  }

  async getSkills(): Promise<string[]> {
    const allSkills = await this.page
      .locator(this.naukriSelectors.allSkills)
      .evaluateAll((elements) => elements.map((el) => (el as HTMLElement).innerText.trim()));
    return allSkills;
  }
}

