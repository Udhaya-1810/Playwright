import { test, expect } from "@playwright/test";
import { ExampleApiClient } from "../clients/exampleApiClient";

test.describe("@API example", () => {
  test("@API status endpoint returns 200", async ({ request }) => {
    const client = new ExampleApiClient(request, "https://httpbin.org");
    const response = await client.getStatusOk();
    expect(response.status()).toBe(200);
  });
});

