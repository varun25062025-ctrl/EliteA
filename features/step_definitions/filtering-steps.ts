import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I click on the {string} filter', async function (this: CustomWorld, filterName: string) {
  if (!this.page) throw new Error('Page not initialized');
  const filterMap: { [key: string]: string } = {
    'All': '#/',
    'Active': '#/active',
    'Completed': '#/completed'
  };
  const href = filterMap[filterName];
  if (!href) throw new Error(`Unknown filter: ${filterName}`);
  await this.page.locator(`a[href="${href}"]`).click();
});

Then('I should see {int} visible todo(s)', async function (this: CustomWorld, count: number) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.todo-list li:visible')).toHaveCount(count);
});
