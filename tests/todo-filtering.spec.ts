import { test, expect, Page } from '@playwright/test';

test.describe('Todo Filtering Functionality', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Clear existing todos
    const existingTodos = page.locator('.todo-list li');
    const count = await existingTodos.count();
    for (let i = 0; i < count; i++) {
      const todo = existingTodos.first();
      await todo.hover();
      await todo.locator('.destroy').click();
    }
    
    // Create test todos
    const todos = ['Buy groceries', 'Complete project', 'Call dentist', 'Read book', 'Exercise'];
    for (const todo of todos) {
      await page.locator('.new-todo').fill(todo);
      await page.locator('.new-todo').press('Enter');
    }
    
    // Mark some as completed
    await page.locator('.todo-list li', { hasText: 'Buy groceries' }).locator('.toggle').click();
    await page.locator('.todo-list li', { hasText: 'Complete project' }).locator('.toggle').click();
  });

  test('View all todos', async () => {
    await page.locator('a[href="#/"]').click();
    await expect(page.locator('.todo-list li')).toHaveCount(5);
  });

  test('View only active todos', async () => {
    await page.locator('a[href="#/active"]').click();
    await expect(page.locator('.todo-list li:visible')).toHaveCount(3);
    await expect(page.locator('.todo-count')).toContainText('3 items left');
  });

  test('View only completed todos', async () => {
    await page.locator('a[href="#/completed"]').click();
    await expect(page.locator('.todo-list li:visible')).toHaveCount(2);
  });

  test('Filter selection persists', async () => {
    await page.locator('a[href="#/active"]').click();
    await page.locator('a[href="#/"]').click();
    await expect(page.locator('.todo-list li')).toHaveCount(5);
  });

  test('Active filter shows newly created todo', async () => {
    await page.locator('a[href="#/active"]').click();
    await page.locator('.new-todo').fill('New task');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-count')).toContainText('4 items left');
  });
});
