import { test as base } from "@playwright/test";
import { DemoPage } from "../pages/demo.page";

type Fixtures = {
  demoPage: DemoPage;
};

export const test = base.extend<Fixtures>({
  demoPage: async ({ page }, use) => {
    await use(new DemoPage(page));
  },
});

export const expect = test.expect;

