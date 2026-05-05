import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';

export interface TodoWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  longText?: string;
}

export class CustomWorld extends World implements TodoWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  longText?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
      args: ['--start-maximized']
    });
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true
    });
    this.page = await this.context.newPage();
  }

  async cleanup() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
