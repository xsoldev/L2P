import { test, expect } from '@playwright/test';

test.describe('Welcome Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the welcome screen with main title', async ({ page }) => {
    // Arrange & Act - page is already loaded in beforeEach

    // Assert
    await expect(page.getByText('Write prompts')).toBeVisible();
    await expect(page.getByText('that actually work')).toBeVisible();
  });

  test('should display the three principles section', async ({ page }) => {
    // Arrange & Act - page is already loaded

    // Assert
    await expect(page.getByText('THE THREE PRINCIPLES')).toBeVisible();
    await expect(page.getByText('Break it down')).toBeVisible();
    await expect(page.getByText('Be specific')).toBeVisible();
    await expect(page.getByText('Iterate quickly')).toBeVisible();
  });

  test('should display course statistics', async ({ page }) => {
    // Arrange & Act - page is already loaded

    // Assert
    await expect(page.getByText('3 lessons')).toBeVisible();
    await expect(page.getByText('4 exercises')).toBeVisible();
    await expect(page.getByText('~30 min')).toBeVisible();
  });

  test('should have a start course button', async ({ page }) => {
    // Arrange & Act - page is already loaded

    // Assert
    const startButton = page.getByRole('button', { name: /start course/i });
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
  });

  test('should display free course badge', async ({ page }) => {
    // Arrange & Act - page is already loaded

    // Assert
    await expect(page.getByText('Free • No signup required')).toBeVisible();
  });

  test('should navigate to first lesson on start button click', async ({ page }) => {
    // Arrange
    const startButton = page.getByRole('button', { name: /start course/i });

    // Act
    await startButton.click();

    // Assert
    // Wait for navigation or content change
    await page.waitForTimeout(500);

    // Check that we've moved away from the welcome screen
    // This might need adjustment based on actual navigation behavior
    const hasNavigated = await page.locator('body').evaluate((el) => {
      return !el.textContent?.includes('Write prompts that actually work');
    });

    expect(hasNavigated).toBeTruthy();
  });
});
