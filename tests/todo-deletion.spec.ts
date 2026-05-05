import { test, expect, Page } from '@playwright/test';

test.describe('Todo Deletion Functionality', () => {
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
    const todos = ['Buy groceries', 'Complete project', 'Call dentist', 'Read book'];
    for (const todo of todos) {
      await page.locator('.new-todo').fill(todo);
      await page.locator('.new-todo').press('Enter');
    }
  });

  test('Delete a single todo', async () => {
    const todoItem = page.locator('.todo-list li', { hasText: 'Buy groceries' });
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
    
    await expect(page.locator('.todo-list li', { hasText: 'Buy groceries' })).toHaveCount(0);
    await expect(page.locator('.todo-list li')).toHaveCount(3);
    await expect(page.locator('.todo-count')).toContainText('3 items left');
  });

  test('Delete multiple todos individually', async () => {
    let todoItem = page.locator('.todo-list li', { hasText: 'Buy groceries' });
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
    
    todoItem = page.locator('.todo-list li', { hasText: 'Complete project' });
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
    
    await expect(page.locator('.todo-list li')).toHaveCount(2);
  });

  test('Clear all completed todos', async () => {
    await page.locator('.todo-list li', { hasText: 'Buy groceries' }).locator('.toggle').click();
    await page.locator('.todo-list li', { hasText: 'Complete project' }).locator('.toggle').click();
    
    await page.locator('.clear-completed').click();
    
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li.completed')).toHaveCount(0);
  });

  test('Clear completed button visibility', async () => {
    // Check that button is disabled initially
    await expect(page.locator('.clear-completed')).toBeDisabled();
    
    // Mark one todo as completed
    await page.locator('.todo-list li', { hasText: 'Buy groceries' }).locator('.toggle').click();
    
    // Now clear completed button should be enabled
    await expect(page.locator('.clear-completed')).toBeEnabled();
  });

  test('Delete the last todo in the list', async () => {
    const todos = page.locator('.todo-list li');
    const count = await todos.count();
    
    for (let i = 0; i < count; i++) {
      const todo = todos.first();
      await todo.hover();
      await todo.locator('.destroy').click();
    }
    
    await expect(page.locator('.todo-list li')).toHaveCount(0);
    await expect(page.locator('.footer')).toHaveCount(0);
  });
});
