import { expect, test } from '@playwright/test';
import { PAGE_TITLE } from '~/constants';
import HomePage from '~/pages/ui/homePage';

const path = '/';

let page: HomePage;
test.beforeEach(async ({ page: pageParam }) => {
  page = new HomePage(pageParam);
  await pageParam.goto(path);
});

test(`Page title should be ${PAGE_TITLE}`, async () => {
  const pageTitle = await page.getPageTitle();
  expect(pageTitle).toBe(PAGE_TITLE);
});

test('Load more button should be disappeared after clicking', async () => {
  await page.getLoadMoreButton().click();
  const isLoadMoreBtnVisible = await page.getLoadMoreButton().isVisible();
  expect(isLoadMoreBtnVisible).toBe(false);
});

test('Verify navigate to detail post in overview post', async ({}) => {
  await page.waitForResponse('/api/blog/get-all?page=1&limit=1');
  const overviewPostElement = page.getOverviewPostElement();
  const dataHomePage = await page.getOverviewPostData();
  const link = overviewPostElement.locator('div .p-8.text-white.flex.flex-col.self-end.w-full a');
  await link.click();

  const dataDetailPage = await getDataOfDetailPage();
  expect(dataDetailPage).toEqual(dataHomePage);
});

test('Verify navigate to detail post in list posts', async ({}) => {
  await page.waitForResponse('/api/blog/get-all?page=1&limit=7');
  const firstPostElement = page.getFirstPostOfListElement();
  const dataHomePage = await page.getFirstPostOfListData();
  const link = firstPostElement.locator('> a');
  await link.click();

  const dataDetailPage = await getDataOfDetailPage();
  expect(dataDetailPage).toEqual(dataHomePage);
});

const getDataOfDetailPage = async () => {
  await page.waitForURL('/post/*');
  await page.waitForResponse(/\/api\/blog\/[a-zA-Z0-9_-]+/);

  const informationElement = page.locator('header~div .flex.flex-col.items-center.justify-center');
  const titleDetailPage = await informationElement
    .locator('.mt-3.font-semibold.md\\:text-5xl.text-center.text-4xl')
    .textContent();
  const writtenByDetailPage = await informationElement.locator('.flex.flex-col .text-sm.font-semibold').textContent();
  const PublishOnDetailPage = await informationElement
    .locator('span.text-primary.font-semibold', { hasText: 'Publised' })
    .textContent();
  const fileUnderDetailPage = await informationElement.locator('div.rounded-full').textContent();
  return {
    title: titleDetailPage,
    writtenBy: writtenByDetailPage,
    publishedOn: PublishOnDetailPage.replace('Publised ', ''),
    fileUnder: fileUnderDetailPage,
  };
};
