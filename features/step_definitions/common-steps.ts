import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I navigate to the TodoMVC application', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  await this.page.goto('http://localhost:7002');
  await this.page.waitForLoadState('networkidle');
});

Given('I clear all existing todos', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const todos = this.page.locator('.todo-list li');
  const count = await todos.count();
  for (let i = 0; i < count; i++) {
    const todo = todos.first();
    await todo.hover();
    await todo.locator('.destroy').click();
  }
});

Given('I have the following todos:', async function (this: CustomWorld, dataTable) {
  if (!this.page) throw new Error('Page not initialized');
  const rows = dataTable.raw();
  for (const row of rows) {
    const todoText = row[0];
    await this.page.locator('.new-todo').fill(todoText);
    await this.page.locator('.new-todo').press('Enter');
  }
});

Given('I have the following todos in order:', async function (this: CustomWorld, dataTable) {
  if (!this.page) throw new Error('Page not initialized');
  const rows = dataTable.raw();
  for (const row of rows) {
    const todoText = row[0];
    await this.page.locator('.new-todo').fill(todoText);
    await this.page.locator('.new-todo').press('Enter');
  }
});

When('I create a todo with text {string}', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  await this.page.locator('.new-todo').fill(text);
  await this.page.locator('.new-todo').press('Enter');
});

When('I press Enter on an empty todo input', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  await this.page.locator('.new-todo').press('Enter');
});

When('I create a todo with {int} characters', async function (this: CustomWorld, length: number) {
  if (!this.page) throw new Error('Page not initialized');
  const longText = 'A'.repeat(length);
  this.longText = longText;
  await this.page.locator('.new-todo').fill(longText);
  await this.page.locator('.new-todo').press('Enter');
});

Then('I should see the todo {string} in the list', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.todo-list li label')).toContainText(text);
});

Then('the todo count should show {string}', async function (this: CustomWorld, count: string) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.todo-count')).toContainText(count);
});

Then('the input field should be empty', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.new-todo')).toHaveValue('');
});

Then('I should see {int} todo(s) in the list', async function (this: CustomWorld, count: number) {
  if (!this.page) throw new Error('Page not initialized');
  await expect(this.page.locator('.todo-list li')).toHaveCount(count);
});

Then('I should see a todo containing {string}', async function (this: CustomWorld, text: string) {
  if (!this.page) throw new Error('Page not initialized');
  const labelText = await this.page.locator('.todo-list li label').textContent();
  expect(labelText).toContain(text);
});

Then('the todo should contain the long text', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  if (!this.longText) throw new Error('Long text not stored');
  await expect(this.page.locator('.todo-list li label')).toContainText(this.longText);
});
