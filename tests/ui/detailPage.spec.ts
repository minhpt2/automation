import { test, expect } from '@playwright/test';
import DetailPage from '~/pages/ui/detailPage';

const path = '/post/the-impact-of-technology-on-the-workplace-how-technology-is-changing-1734887716925';
const pathCommentEndpoint = 'api/comment/get-all-comment-blog';

let page: DetailPage;
test.beforeEach(async ({ page: pageParam }) => {
  page = new DetailPage(pageParam);
  await pageParam.goto(path);
});

test('User can comment successfully', async () => {
  const beforeCommentCount = (await page.waitForResponse(pathCommentEndpoint))?.data?.data?.length;
  const textAreaElement = page.getTextAreaElement();
  const submitButtonCommentElement = page.getButtonSubmitCommentElement();
  const comment = `att abcxyz ${new Date().getTime()}`;
  textAreaElement.fill(comment);
  submitButtonCommentElement.click();
  const afterCommentCount = (await page.waitForResponse(pathCommentEndpoint))?.data?.data?.length;
  expect(afterCommentCount).toBeGreaterThan(beforeCommentCount);
  const latestComment = await page.getLatestComment();
  expect(latestComment).toBe(comment);
});
