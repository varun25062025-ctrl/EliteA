import { test, expect } from '@playwright/test';

test('EPAM - Services -> Explore Our Client Work navigation', async ({ page }) => {
  // Maximize viewport
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Step 1: Navigate to EPAM homepage
  await page.goto('https://www.epam.com/');
  await page.waitForLoadState('networkidle');

  // Step 2: Click on "Services" link from the header menu
  const servicesLink = page.getByRole('link', { name: /Services/i });
  await servicesLink.waitFor({ state: 'visible', timeout: 5000 });
  await servicesLink.click();
  await page.waitForLoadState('networkidle');

  // Step 3: Click the "Explore Our Client Work" link
  const exploreClientWork = page.getByRole('link', { name: /Explore Our Client Work/i });
  await exploreClientWork.waitFor({ state: 'visible', timeout: 5000 });
  await exploreClientWork.click();
  await page.waitForLoadState('networkidle');

  // Step 4: Verify that the "Client Work" text is visible on the page
  const clientWorkText = page.getByText(/Client Work/i);
  await expect(clientWorkText).toBeVisible({ timeout: 5000 });

  // Step 5: Close the page after 2 seconds (test runner will close browser automatically)
  await page.waitForTimeout(2000);
});
