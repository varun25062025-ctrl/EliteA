import { test, expect, Page } from '@playwright/test';

test.describe('Todo Creation and Management', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Clear any existing todos
    const todos = page.locator('.todo-list li');
    const count = await todos.count();
    for (let i = 0; i < count; i++) {
      const todo = todos.first();
      await todo.hover();
      await todo.locator('.destroy').click();
    }
  });

  test('Create a single todo item', async () => {
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');
    
    await expect(page.locator('.todo-list li label')).toContainText('Buy groceries');
    await expect(page.locator('.todo-count')).toContainText('1 item left');
    await expect(page.locator('.new-todo')).toHaveValue('');
  });

  test('Create multiple todo items', async () => {
    const todos = ['Buy groceries', 'Complete project', 'Call dentist'];
    
    for (const todo of todos) {
      await page.locator('.new-todo').fill(todo);
      await page.locator('.new-todo').press('Enter');
    }
    
    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.locator('.todo-count')).toContainText('3 items left');
  });

  test('Cannot create empty todo', async () => {
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });

  test('Create todo with special characters', async () => {
    const specialText = 'Test @#$% special & characters!';
    await page.locator('.new-todo').fill(specialText);
    await page.locator('.new-todo').press('Enter');
    
    // Use textContent to handle HTML encoding
    const labelText = await page.locator('.todo-list li label').textContent();
    expect(labelText).toContain('Test @#$% special');
    expect(labelText).toContain('characters!');
  });

  test('Create todo with very long text', async () => {
    const longText = 'A'.repeat(200);
    await page.locator('.new-todo').fill(longText);
    await page.locator('.new-todo').press('Enter');
    
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li label')).toContainText(longText);
  });
});
