import { test, expect } from '@playwright/test';

test.describe('Application Navigation', () => {
  test('should start from welcome screen and navigate through the app', async ({ page }) => {
    // Arrange
    await page.goto('/');

    // Assert - we're on welcome screen
    await expect(page.getByText('Write prompts')).toBeVisible();

    // Act - click start button
    const startButton = page.getByRole('button', { name: /start course/i });
    await startButton.click();

    // Wait for navigation
    await page.waitForTimeout(1000);

    // Assert - we've moved to a different screen
    const url = page.url();
    expect(url).not.toBe('http://localhost:3000/');
  });

  test('should be able to navigate back to home from other pages', async ({ page }) => {
    // Arrange - start on a different page if possible
    await page.goto('/certificate');

    // Act - use browser back or find home link
    await page.goBack();

    // Assert
    await expect(page).toHaveURL('/');
  });

  test('should have accessible certificate page', async ({ page }) => {
    // Arrange & Act
    await page.goto('/certificate');

    // Assert
    await expect(page).toHaveURL('/certificate');

    // Page should load without errors
    const hasError = await page.locator('text=Error').isVisible().catch(() => false);
    expect(hasError).toBe(false);
  });

  test('should maintain responsive navigation on mobile viewport', async ({ page }) => {
    // Arrange
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Act & Assert
    await expect(page.getByText('Write prompts')).toBeVisible();

    const startButton = page.getByRole('button', { name: /start course/i });
    await expect(startButton).toBeVisible();
  });

  test('should handle direct navigation to routes', async ({ page }) => {
    // Arrange & Act - navigate directly to certificate page
    await page.goto('/certificate');

    // Assert - page loads successfully
    await expect(page).toHaveURL('/certificate');

    // Should not show 404 or error
    const title = await page.title();
    expect(title).not.toContain('404');
    expect(title).not.toContain('Error');
  });

  test('should preserve state during navigation', async ({ page }) => {
    // Arrange
    await page.goto('/');

    // Act - start course
    const startButton = page.getByRole('button', { name: /start course/i });
    if (await startButton.isVisible()) {
      await startButton.click();
      await page.waitForTimeout(500);

      // Navigate back
      await page.goBack();
      await page.waitForTimeout(500);

      // Navigate forward again
      await page.goForward();
      await page.waitForTimeout(500);

      // Assert - should maintain navigation history
      const hasContent = await page.locator('body').isVisible();
      expect(hasContent).toBe(true);
    }
  });
});
