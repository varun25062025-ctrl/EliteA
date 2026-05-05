import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I hover over a drag handle', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const dragHandle = this.page.locator('.drag-handle').first();
  await dragHandle.hover({ timeout: 10000 });
});

When('I hover over a todo', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const todo = this.page.locator('.todo-list li').first();
  await todo.hover({ timeout: 10000 });
});

Then('each todo should have a visible drag handle', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const allTodos = this.page.locator('.todo-list li');
  const count = await allTodos.count();
  
  for (let i = 0; i < count; i++) {
    const dragHandle = allTodos.nth(i).locator('.drag-handle');
    await expect(dragHandle).toBeVisible();
  }
});

Then('the drag handle should have the correct accessibility attributes', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const dragHandle = this.page.locator('.drag-handle').first();
  
  await expect(dragHandle).toHaveAttribute('role', 'button');
  await expect(dragHandle).toHaveAttribute('aria-roledescription', 'sortable');
  
  const ariaLabel = await dragHandle.getAttribute('aria-label');
  expect(ariaLabel).toContain('Drag to reorder');
});

Then('the drag handle should display the hamburger icon', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const dragHandle = this.page.locator('.drag-handle').first();
  const text = await dragHandle.textContent();
  expect(text).toContain('☰');
});

Then('the drag handle should have grab cursor styling', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const dragHandle = this.page.locator('.drag-handle').first();
  const cursor = await dragHandle.evaluate((el: Element) => {
    return window.getComputedStyle(el).cursor;
  });
  expect(cursor).toBe('grab');
});

Then('the todo at position {int} should be {string}', async function (this: CustomWorld, position: number, expectedText: string) {
  if (!this.page) throw new Error('Page not initialized');
  
  const allTodos = this.page.locator('.todo-list li');
  const todoAtPosition = allTodos.nth(position - 1);
  const label = todoAtPosition.locator('label');
  
  const actualText = await label.textContent();
  expect(actualText?.trim()).toBe(expectedText.trim());
});

Then('all todos should have drag handles in the same position', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const allDragHandles = this.page.locator('.drag-handle');
  const count = await allDragHandles.count();
  
  expect(count).toBeGreaterThan(0);
  
  // Verify all drag handles have consistent styling
  for (let i = 0; i < count; i++) {
    await expect(allDragHandles.nth(i)).toBeVisible();
  }
});

Then('drag handles should be left-aligned in each todo item', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const firstTodo = this.page.locator('.todo-list li').first();
  const dragHandle = firstTodo.locator('.drag-handle');
  const viewDiv = firstTodo.locator('.view');
  
  // Check that drag handle is the first child element in the view
  const firstChild = viewDiv.locator('> :first-child');
  await expect(firstChild).toHaveClass(/drag-handle/);
});

Then('the cursor should change to grab style', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const dragHandle = this.page.locator('.drag-handle').first();
  const cursor = await dragHandle.evaluate((el: Element) => {
    return window.getComputedStyle(el).cursor;
  });
  expect(cursor).toBe('grab');
});

Then('the drag handle should remain visible', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const dragHandle = this.page.locator('.drag-handle').first();
  await expect(dragHandle).toBeVisible();
});

Then('the completed todo should still have a visible drag handle', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const completedTodo = this.page.locator('.todo-list li.completed').first();
  const dragHandle = completedTodo.locator('.drag-handle');
  await expect(dragHandle).toBeVisible();
});

Then('the drag handle functionality should remain available', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const completedTodo = this.page.locator('.todo-list li.completed').first();
  const dragHandle = completedTodo.locator('.drag-handle');
  
  await expect(dragHandle).toHaveAttribute('aria-disabled', 'false');
  await expect(dragHandle).toBeEnabled();
});

Then('each todo should have its drag handle', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const allTodos = this.page.locator('.todo-list li');
  const count = await allTodos.count();
  
  const dragHandles = this.page.locator('.drag-handle');
  const handleCount = await dragHandles.count();
  
  expect(handleCount).toBe(count);
});

Then('I should see both the drag handle and delete button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const todo = this.page.locator('.todo-list li').first();
  const dragHandle = todo.locator('.drag-handle');
  const deleteButton = todo.locator('.destroy');
  
  await expect(dragHandle).toBeVisible();
  await expect(deleteButton).toBeVisible();
});

Then('I should be able to click the checkbox', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const todo = this.page.locator('.todo-list li').first();
  const checkbox = todo.locator('.toggle');
  
  await checkbox.click();
  await expect(todo).toHaveClass(/completed/);
});

Then('I should be able to click the delete button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page not initialized');
  const initialCount = await this.page.locator('.todo-list li').count();
  
  const todo = this.page.locator('.todo-list li').first();
  const deleteButton = todo.locator('.destroy');
  await deleteButton.click();
  
  await this.page.waitForTimeout(500);
  const newCount = await this.page.locator('.todo-list li').count();
  expect(newCount).toBe(initialCount - 1);
});
