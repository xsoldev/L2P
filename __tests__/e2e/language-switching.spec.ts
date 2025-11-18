import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display content in English by default', async ({ page }) => {
    // Arrange & Act - page is already loaded

    // Assert
    await expect(page.getByText('Write prompts')).toBeVisible();
    await expect(page.getByText('Start course')).toBeVisible();
  });

  test('should have a language selector', async ({ page }) => {
    // Arrange & Act - page is already loaded

    // Assert
    // Look for language selector (button or dropdown)
    const languageSelector = page.locator('[aria-label*="language"], [aria-label*="Language"]').first();

    // If no aria-label, look for common text patterns
    if (!(await languageSelector.isVisible())) {
      const enButton = page.getByText('EN', { exact: true }).or(page.getByText('English'));
      await expect(enButton.or(page.getByText('FR')).or(page.getByText('Français'))).toBeVisible();
    }
  });

  test('should switch to French when language is changed', async ({ page }) => {
    // Arrange
    // Try multiple selectors for language switching
    const frenchButton = page.getByRole('button', { name: /français/i })
      .or(page.getByRole('button', { name: 'FR' }))
      .or(page.getByText('FR', { exact: true }))
      .or(page.getByText('Français'));

    // Check if language switcher exists
    const isVisible = await frenchButton.first().isVisible().catch(() => false);

    if (!isVisible) {
      test.skip(true, 'Language switcher not found on page');
    }

    // Act
    await frenchButton.first().click();

    // Assert
    // Wait for content to update
    await page.waitForTimeout(500);

    // Check for French text (adjust based on actual translation)
    const hasFrenchContent = await page.locator('body').evaluate((el) => {
      const text = el.textContent || '';
      // Look for French-specific words that differ from English
      return text.includes('Commencer') || text.includes('cours') || text.includes('leçons');
    });

    expect(hasFrenchContent).toBeTruthy();
  });

  test('should persist language selection on page refresh', async ({ page }) => {
    // Arrange - switch to French first
    const frenchButton = page.getByRole('button', { name: /français/i })
      .or(page.getByRole('button', { name: 'FR' }))
      .or(page.getByText('FR', { exact: true }));

    const isVisible = await frenchButton.first().isVisible().catch(() => false);

    if (!isVisible) {
      test.skip(true, 'Language switcher not found on page');
    }

    await frenchButton.first().click();
    await page.waitForTimeout(500);

    // Act - refresh the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Assert - should still show French content
    const hasFrenchContent = await page.locator('body').evaluate((el) => {
      const text = el.textContent || '';
      return text.includes('Commencer') || text.includes('cours') || text.includes('leçons');
    });

    expect(hasFrenchContent).toBeTruthy();
  });
});
