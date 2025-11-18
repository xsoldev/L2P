import { describe, it, expect } from 'vitest';
import { getTranslations, createTranslator, type Language } from '@/lib/i18n';

describe('i18n utility functions', () => {
  describe('getTranslations', () => {
    it('should return English translations for "en" language', () => {
      // Arrange & Act
      const translations = getTranslations('en');

      // Assert
      expect(translations).toBeDefined();
      expect(translations.welcome).toBeDefined();
      expect(translations.welcome.title).toBe('Write prompts');
    });

    it('should return French translations for "fr" language', () => {
      // Arrange & Act
      const translations = getTranslations('fr');

      // Assert
      expect(translations).toBeDefined();
      expect(translations.welcome).toBeDefined();
    });

    it('should fallback to English for invalid language', () => {
      // Arrange & Act
      const translations = getTranslations('invalid' as Language);

      // Assert
      expect(translations).toBeDefined();
      expect(translations.welcome.title).toBe('Write prompts');
    });
  });

  describe('createTranslator', () => {
    it('should translate nested keys correctly', () => {
      // Arrange
      const t = createTranslator('en');

      // Act
      const result = t('welcome.title');

      // Assert
      expect(result).toBe('Write prompts');
    });

    it('should translate deeply nested keys', () => {
      // Arrange
      const t = createTranslator('en');

      // Act
      const result = t('welcome.principles.breakItDown.title');

      // Assert
      expect(result).toBe('Break it down');
    });

    it('should return fallback for missing keys', () => {
      // Arrange
      const t = createTranslator('en');

      // Act
      const result = t('nonexistent.key', 'Fallback text');

      // Assert
      expect(result).toBe('Fallback text');
    });

    it('should return key itself if no fallback provided for missing key', () => {
      // Arrange
      const t = createTranslator('en');

      // Act
      const result = t('nonexistent.key');

      // Assert
      expect(result).toBe('nonexistent.key');
    });

    it('should handle French translations', () => {
      // Arrange
      const t = createTranslator('fr');

      // Act
      const result = t('welcome.title');

      // Assert
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should handle partial key paths gracefully', () => {
      // Arrange
      const t = createTranslator('en');

      // Act
      const result = t('welcome.nonexistent.deeply.nested', 'Default');

      // Assert
      expect(result).toBe('Default');
    });

    it('should work with different language instances', () => {
      // Arrange
      const tEn = createTranslator('en');
      const tFr = createTranslator('fr');

      // Act
      const enResult = tEn('welcome.free');
      const frResult = tFr('welcome.free');

      // Assert
      expect(enResult).toBeDefined();
      expect(frResult).toBeDefined();
      expect(enResult).not.toBe(frResult);
    });
  });
});
