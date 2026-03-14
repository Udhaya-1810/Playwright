import type { APIRequestContext } from "@playwright/test";

export class ExampleApiClient {
  constructor(private readonly request: APIRequestContext, private readonly baseUrl: string) {}

  async getStatusOk() {
    const response = await this.request.get(`${this.baseUrl}/status/200`);
    return response;
  }
}

