import { describe, it, expect } from 'vitest';
import {
  calculateTotalScore,
  calculateProgress,
  getAchievementLevel,
  calculateAverageScore,
  isPassingScore,
  formatScore,
  calculateTimeBonus,
} from '@/lib/scoring';

describe('Scoring utility functions', () => {
  describe('calculateTotalScore', () => {
    it('should sum all lesson scores', () => {
      // Arrange
      const scores = [50, 75, 85];

      // Act
      const result = calculateTotalScore(scores);

      // Assert
      expect(result).toBe(210);
    });

    it('should return 0 for empty array', () => {
      // Arrange & Act
      const result = calculateTotalScore([]);

      // Assert
      expect(result).toBe(0);
    });

    it('should handle single score', () => {
      // Arrange & Act
      const result = calculateTotalScore([100]);

      // Assert
      expect(result).toBe(100);
    });
  });

  describe('calculateProgress', () => {
    it('should calculate correct percentage', () => {
      // Arrange & Act
      const result = calculateProgress(3, 10);

      // Assert
      expect(result).toBe(30);
    });

    it('should return 0 when total is 0', () => {
      // Arrange & Act
      const result = calculateProgress(5, 0);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 100 when completed equals total', () => {
      // Arrange & Act
      const result = calculateProgress(10, 10);

      // Assert
      expect(result).toBe(100);
    });

    it('should round to nearest integer', () => {
      // Arrange & Act
      const result = calculateProgress(1, 3);

      // Assert
      expect(result).toBe(33);
    });
  });

  describe('getAchievementLevel', () => {
    it('should return platinum for scores >= 200', () => {
      // Arrange & Act
      const result = getAchievementLevel(210);

      // Assert
      expect(result).toBe('platinum');
    });

    it('should return gold for scores >= 150 and < 200', () => {
      // Arrange & Act
      const result = getAchievementLevel(175);

      // Assert
      expect(result).toBe('gold');
    });

    it('should return silver for scores >= 100 and < 150', () => {
      // Arrange & Act
      const result = getAchievementLevel(125);

      // Assert
      expect(result).toBe('silver');
    });

    it('should return bronze for scores < 100', () => {
      // Arrange & Act
      const result = getAchievementLevel(50);

      // Assert
      expect(result).toBe('bronze');
    });

    it('should handle boundary values correctly', () => {
      // Arrange & Act & Assert
      expect(getAchievementLevel(200)).toBe('platinum');
      expect(getAchievementLevel(150)).toBe('gold');
      expect(getAchievementLevel(100)).toBe('silver');
      expect(getAchievementLevel(0)).toBe('bronze');
    });
  });

  describe('calculateAverageScore', () => {
    it('should calculate average of multiple scores', () => {
      // Arrange
      const scores = [80, 90, 70];

      // Act
      const result = calculateAverageScore(scores);

      // Assert
      expect(result).toBe(80);
    });

    it('should return 0 for empty array', () => {
      // Arrange & Act
      const result = calculateAverageScore([]);

      // Assert
      expect(result).toBe(0);
    });

    it('should round to nearest integer', () => {
      // Arrange
      const scores = [85, 90, 88];

      // Act
      const result = calculateAverageScore(scores);

      // Assert
      expect(result).toBe(88);
    });
  });

  describe('isPassingScore', () => {
    it('should return true for scores above threshold', () => {
      // Arrange & Act
      const result = isPassingScore(75);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for scores below threshold', () => {
      // Arrange & Act
      const result = isPassingScore(65);

      // Assert
      expect(result).toBe(false);
    });

    it('should use custom threshold when provided', () => {
      // Arrange & Act
      const result = isPassingScore(80, 85);

      // Assert
      expect(result).toBe(false);
    });

    it('should return true for score equal to threshold', () => {
      // Arrange & Act
      const result = isPassingScore(70, 70);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe('formatScore', () => {
    it('should format score with comma separators', () => {
      // Arrange & Act
      const result = formatScore(1000);

      // Assert
      expect(result).toBe('1,000');
    });

    it('should handle small numbers', () => {
      // Arrange & Act
      const result = formatScore(50);

      // Assert
      expect(result).toBe('50');
    });
  });

  describe('calculateTimeBonus', () => {
    it('should give 50 points for completing 80% faster', () => {
      // Arrange & Act
      const result = calculateTimeBonus(16, 20);

      // Assert
      expect(result).toBe(50);
    });

    it('should give 25 points for completing on time', () => {
      // Arrange & Act
      const result = calculateTimeBonus(20, 20);

      // Assert
      expect(result).toBe(25);
    });

    it('should give 0 points for completing over time', () => {
      // Arrange & Act
      const result = calculateTimeBonus(25, 20);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 0 for invalid completion time', () => {
      // Arrange & Act
      const result = calculateTimeBonus(0, 20);

      // Assert
      expect(result).toBe(0);
    });
  });
});
