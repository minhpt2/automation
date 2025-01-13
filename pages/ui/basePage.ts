import { Locator, Page } from '@playwright/test';
import { ETheme } from '~/constants';
import CorePage from './core';

class BasePage extends CorePage {
  readonly headerElement: Locator;
  readonly footerElement: Locator;

  constructor(page: Page) {
    super(page);
    this.headerElement = page.locator('header');
    this.footerElement = page.locator('.w-full.container.max-w-6xl.px-5.self-center');
  }

  public async useTheme(theme: ETheme) {
    await this.page.emulateMedia({ colorScheme: theme });
  }

  public getLogoHeaderLink(): Locator {
    return this.headerElement.locator('a');
  }

  public getToggleDarkThemeButton(): Locator {
    return this.page.locator('button[aria-label="Toggle dark mode"]');
  }

  public getLogoFooterLink(): Locator {
    return this.footerElement.locator('a');
  }

  public async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  public async getTheme(): Promise<string> {
    return await this.page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('color-scheme'));
  }
}

export default BasePage;
