import { type Page, type Locator } from '@playwright/test';
import CorePage from './core';

class DetailPage extends CorePage {
  private detailPageElement: Locator;

  constructor(page: Page) {
    super(page);
    this.detailPageElement = page.locator('header~div');
  }

  getTextAreaElement(): Locator {
    return this.detailPageElement.locator('textarea');
  }

  getButtonSubmitCommentElement(): Locator {
    return this.detailPageElement.locator('button');
  }

  async getLatestComment(): Promise<string> {
    return await this.detailPageElement.locator('.flex.flex-col.gap-2').first().locator('.ml-12').textContent();
  }
}

export default DetailPage;