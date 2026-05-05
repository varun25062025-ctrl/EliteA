import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';

setDefaultTimeout(60000);

Before(async function (this: CustomWorld) {
  await this.init();
});

After({timeout: 60000}, async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.cleanup();
});

BeforeAll(async function () {
  console.log('Starting BDD test execution...');
});

AfterAll(async function () {
  console.log('BDD test execution completed.');
});
