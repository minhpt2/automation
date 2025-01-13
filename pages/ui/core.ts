import { Locator, Page } from '@playwright/test';

class CorePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public locator(selectionString: string): Locator {
    return this.page.locator(selectionString);
  }

  public getUrl(): string {
    return this.page.url();
  }

  public getPathName(): string {
    return new URL(this.getUrl()).pathname;
  }

  public async waitForNavigation(): Promise<any> {
    return await this.page.waitForNavigation();
  }

  async go(url: string) {
    return await this.page.goto(url);
  }

  public async pause(): Promise<void> {
    return this.page.pause();
  }

  public async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  public async waitForURL(path: string): Promise<void> {
    await this.page.waitForURL(path);
  }

  public async waitForResponse(path: RegExp | string) {
    let response;

    if (path instanceof RegExp) {
      response = await this.page.waitForResponse((response) => response.url().match(path) && response.status() === 200);
    } else {
      response = await this.page.waitForResponse(
        (response) => response.url().includes(path) && response.status() === 200,
      );
    }
    return await response.json();
  }
}

export default CorePage;
