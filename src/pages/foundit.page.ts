import { BasePage } from "./base.page";
import fs from "fs";
import path from "path";

const selectors = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "src/data/selectors.json"), "utf-8"),
);

export class FoundItPage extends BasePage {
  private readonly founditSelectors = selectors.foundit;

  async search(role: string, location: string, experienceLabel: string): Promise<void> {
    await this.fill(this.founditSelectors.roleInput, role);
    await this.fill(this.founditSelectors.location, location);
    await this.click(this.founditSelectors.experianceDropdown);
    const expOption = this.founditSelectors.expdroption.replace("{{YEAR}}", experienceLabel);
    await this.click(expOption);
    await this.click(this.founditSelectors.searchButton);
  }

  async getRoles(): Promise<string[]> {
    const roles = this.page.locator(this.founditSelectors.allRole);
    const count = await roles.count();
    const allRoles: string[] = [];

    for (let i = 0; i < count; i++) {
      const title = await roles.nth(i).getAttribute("title");
      if (title) {
        allRoles.push(title.trim());
      }
    }

    return allRoles;
  }
}

