import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    // Arrange & Act
    const result = cn('px-4', 'py-2');

    // Assert
    expect(result).toBe('px-4 py-2');
  });

  it('should handle conditional classes', () => {
    // Arrange & Act
    const result = cn('base-class', true && 'conditional-class', false && 'ignored-class');

    // Assert
    expect(result).toBe('base-class conditional-class');
  });

  it('should override conflicting Tailwind classes', () => {
    // Arrange & Act
    const result = cn('px-4 py-2', 'px-8');

    // Assert
    expect(result).toBe('py-2 px-8');
  });

  it('should handle empty inputs', () => {
    // Arrange & Act
    const result = cn();

    // Assert
    expect(result).toBe('');
  });

  it('should handle undefined and null values', () => {
    // Arrange & Act
    const result = cn('valid-class', undefined, null, 'another-class');

    // Assert
    expect(result).toBe('valid-class another-class');
  });

  it('should merge multiple arrays of classes', () => {
    // Arrange & Act
    const result = cn(['class1', 'class2'], ['class3', 'class4']);

    // Assert
    expect(result).toBe('class1 class2 class3 class4');
  });

  it('should handle object notation for conditional classes', () => {
    // Arrange & Act
    const result = cn({
      'active': true,
      'disabled': false,
      'primary': true,
    });

    // Assert
    expect(result).toBe('active primary');
  });

  it('should handle duplicate classes', () => {
    // Arrange & Act
    const result = cn('duplicate', 'other', 'duplicate');

    // Assert
    // Note: cn may not deduplicate non-conflicting classes, which is expected behavior
    expect(result).toContain('duplicate');
    expect(result).toContain('other');
  });
});
