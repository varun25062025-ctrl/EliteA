// Playwright TypeScript script for EPAM Client Work navigation
// Initial skeleton file. Placeholder will be replaced with full test code.

import { test, expect } from '@playwright/test';

// Test: EPAM - Navigate to Client Work via Services -> Explore Our Client Work
test('Navigate EPAM site and verify Client Work page', async ({ page, browser }) => {
  // Step 1: Open EPAM homepage and maximize (set a large viewport)
  await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Ensure header is loaded
  const servicesLink = page.getByRole('link', { name: /Services/i });
  await servicesLink.waitFor({ state: 'visible', timeout: 10000 });

  // Step 2: Click on "Services" in header
  await servicesLink.click();
  await page.waitForLoadState('networkidle');

  // Step 3: Click the "Explore Our Client Work" link
  const exploreClientWork = page.getByRole('link', { name: /Explore Our Client Work/i });
  // In case the link is a button or uses different casing, try a fallback text selector
  if (!(await exploreClientWork.count())) {
    // fallback locator by text
    await page.locator('text=/Explore\s+Our\s+Client\s+Work/i').first().waitFor({ state: 'visible', timeout: 8000 });
    await page.locator('text=/Explore\s+Our\s+Client\s+Work/i').first().click();
  } else {
    await exploreClientWork.waitFor({ state: 'visible', timeout: 8000 });
    await exploreClientWork.click();
  }

  // Wait for navigation to finish
  await page.waitForLoadState('networkidle');

  // Step 4: Verify that the "Client Work" text is visible on the page
  const clientWorkText = page.getByText(/Client Work/i);
  await clientWorkText.waitFor({ state: 'visible', timeout: 10000 });
  await expect(clientWorkText).toBeVisible();

  // Step 5: Close the browser after 2 seconds
  await page.waitForTimeout(2000);
  await browser.close();
});
