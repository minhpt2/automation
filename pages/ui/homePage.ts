import { type Page, type Locator } from '@playwright/test';
import CorePage from './core';

interface Post {
  title: string;
  writtenBy: string;
  publishedOn: string;
  fileUnder: string;
}

class HomePage extends CorePage {
  readonly homePageElement: Locator;

  constructor(page: Page) {
    super(page);
    this.homePageElement = page.locator('header~div');
  }

  public getLoadMoreButton(): Locator {
    return this.homePageElement.locator('button', { hasText: 'Load more' });
  }

  public getOverviewPostElement(): Locator {
    return this.homePageElement.locator('.container.mx-auto.flex.flex-col.max-w-6xl.px-4.md\\:px-6 > .relative');
  }

  public async getOverviewPostData(): Promise<Post> {
    const overViewElement = this.getOverviewPostElement();

    const title = await overViewElement.locator('.text-2xl.font-semibold.mb-2').textContent();
    const writtenBy = await overViewElement
      .locator('span', { hasText: 'Written by' })
      .locator('~div .text-sm.font-semibold')
      .textContent();
    const publishedOn = await overViewElement
      .locator('span', {
        hasText: 'Published on',
      })
      .locator('~span')
      .textContent();
    const fileUnder = await overViewElement
      .locator('span', {
        hasText: 'File under',
      })
      .locator('~div .inline-flex.items-center.rounded-full')
      .textContent();

    return { title, writtenBy, publishedOn, fileUnder };
  }

  public getFirstPostOfListElement(): Locator {
    return this.homePageElement
      .locator('.place-self-center.max-w-6xl.gap-8.flex-wrap.my-16.container .w-\\[346px\\].flex.flex-col.gap-5.my-4')
      .first();
  }

  public async getFirstPostOfListData(): Promise<Post> {
    const firstPostOfListElement = this.getFirstPostOfListElement();

    const title = await firstPostOfListElement.locator('> .flex.flex-col.gap-2 span.font-semibold').textContent();
    const writtenBy = await firstPostOfListElement.locator('> .flex.gap-2 span.text-sm.font-semibold').textContent();
    const publishedOn = await firstPostOfListElement.locator('> .flex.gap-2 span.text-sm.font-light').textContent();
    const fileUnder = await firstPostOfListElement.locator('> .flex.flex-col.gap-2 span.text-primary').textContent();

    return { title, writtenBy, publishedOn, fileUnder };
  }
}

export default HomePage;
