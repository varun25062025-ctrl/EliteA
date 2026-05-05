import { test, expect, Page } from '@playwright/test';

test.describe('Todo Completion Management', () => {
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
    const todos = ['Buy groceries', 'Complete project', 'Call dentist'];
    for (const todo of todos) {
      await page.locator('.new-todo').fill(todo);
      await page.locator('.new-todo').press('Enter');
    }
  });

  test('Mark a single todo as complete', async () => {
    const todoItem = page.locator('.todo-list li', { hasText: 'Buy groceries' });
    await todoItem.locator('.toggle').click();
    
    await expect(todoItem).toHaveClass(/completed/);
    await expect(page.locator('.todo-count')).toContainText('2 items left');
  });

  test('Mark multiple todos as complete', async () => {
    await page.locator('.todo-list li', { hasText: 'Buy groceries' }).locator('.toggle').click();
    await page.locator('.todo-list li', { hasText: 'Complete project' }).locator('.toggle').click();
    
    await expect(page.locator('.todo-list li.completed')).toHaveCount(2);
    await expect(page.locator('.todo-count')).toContainText('1 item left');
  });

  test('Toggle todo completion status', async () => {
    const todoItem = page.locator('.todo-list li', { hasText: 'Buy groceries' });
    
    await todoItem.locator('.toggle').click();
    await expect(todoItem).toHaveClass(/completed/);
    
    await todoItem.locator('.toggle').click();
    await expect(todoItem).not.toHaveClass(/completed/);
    await expect(page.locator('.todo-count')).toContainText('3 items left');
  });

  test('Mark all todos as complete using toggle all', async () => {
    await page.locator('.toggle-all').click();
    
    await expect(page.locator('.todo-list li.completed')).toHaveCount(3);
    await expect(page.locator('.todo-count')).toContainText('0 items left');
  });

  test('Toggle all todos back to active', async () => {
    await page.locator('.toggle-all').click();
    await expect(page.locator('.todo-list li.completed')).toHaveCount(3);
    
    await page.locator('.toggle-all').click();
    await expect(page.locator('.todo-list li.completed')).toHaveCount(0);
    await expect(page.locator('.todo-count')).toContainText('3 items left');
  });
});
