# Playwright Framework

A reusable Playwright test automation framework with Page Object Model (POM), custom fixtures, and UI + API test support.

## Prerequisites

- **Node.js** 18+  
- **npm** (or yarn/pnpm)

## Basic setup

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd PlaywrightFramework
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

Optional: install system dependencies (e.g. on Linux):

```bash
npx playwright install-deps
```

### 3. Run tests

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run Regression` | Run all tests                  |
| `npm run WebTests`    | Run tests tagged `@web`        |
| `npm run APITests`    | Run tests tagged `@API`        |

Examples:

```bash
npm run Regression
npm run WebTests
npm run APITests
```

### 4. View test report (after a run)

```bash
npx playwright show-report
```

## Project structure

```
PlaywrightFramework/
├── playwright.config.js    # Playwright configuration
├── package.json
├── src/
│   ├── config/             # Config helpers (env, testConfig)
│   ├── pages/              # Page Object Model (BasePage, demo pages)
│   ├── fixtures/           # Custom test fixtures
│   ├── data/               # Selectors, test data (optional)
│   ├── api/                # API clients and API test specs
│   └── utils/              # Shared utilities
└── tests/
    ├── ui/                 # UI test specs
    └── api/                # API test entry points
```

## Adding your first test

1. **Page object** – Add a new file under `src/pages/`, e.g. `src/pages/login.page.ts`, extending `BasePage`.
2. **Fixture (optional)** – Register the page in `src/fixtures/test-fixtures.ts` if you want it injected into tests.
3. **Spec** – Add a spec under `tests/ui/` or `tests/api/`, and import `test`/`expect` from `src/fixtures/test-fixtures` for UI tests.

Example UI spec:

```ts
import { test, expect } from "../../src/fixtures/test-fixtures";

test.describe("@web my feature", () => {
  test("does something", async ({ demoPage }) => {
    await demoPage.gotoPlaywrightHomepage();
    await expect(demoPage.header).toContainText("Playwright");
  });
});
```

## Configuration

- **Config file:** `playwright.config.js` – timeout, browser, `testDir`, reporters.
- **Headless:** Change `use.headless` in `playwright.config.js` (e.g. `true` for CI).
- **Base URL:** Set `use.baseURL` in config to avoid repeating full URLs in tests.

## Troubleshooting

- **Browsers not found:** Run `npx playwright install`.
- **Tests not discovered:** Ensure specs are under `tests/` and match the config `testDir`.
- **Module not found:** Use correct relative paths; UI specs in `tests/ui/` import from `../../src/...`.
