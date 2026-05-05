import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I delete the todo {string}', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  const todoItem = this.page.locator('.todo-list li', { hasText: text });
  await todoItem.hover();
  await todoItem.locator('.destroy').click();
});

When('I click the clear completed button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  await this.page.locator('.clear-completed').click();
});

When('I delete all todos one by one', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const todos = this.page.locator('.todo-list li');
  const count = await todos.count();
  for (let i = 0; i < count; i++) {
    const todo = todos.first();
    await todo.hover();
    await todo.locator('.destroy').click();
  }
});

Then('I should not see the todo {string}', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.todo-list li', { hasText: text })).toHaveCount(0);
});

Then('the clear completed button should be disabled', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.clear-completed')).toBeDisabled();
});

Then('the clear completed button should be enabled', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.clear-completed')).toBeEnabled();
});

Then('the footer should not be visible', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.footer')).toHaveCount(0);
});
