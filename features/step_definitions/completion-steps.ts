import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I mark the todo {string} as complete', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  const todoItem = this.page.locator('.todo-list li', { hasText: text });
  await todoItem.locator('.toggle').click();
});

When('I mark the todo {string} as incomplete', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  const todoItem = this.page.locator('.todo-list li', { hasText: text });
  await todoItem.locator('.toggle').click();
});

When('I click the toggle all button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  await this.page.locator('.toggle-all').click();
});

Then('the todo {string} should be marked as completed', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  const todoItem = this.page.locator('.todo-list li', { hasText: text });
  await expect(todoItem).toHaveClass(/completed/);
});

Then('the todo {string} should not be marked as completed', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  const todoItem = this.page.locator('.todo-list li', { hasText: text });
  await expect(todoItem).not.toHaveClass(/completed/);
});

Then('I should see {int} completed todo(s)', async function (this: CustomWorld, count: number) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.todo-list li.completed')).toHaveCount(count);
});
