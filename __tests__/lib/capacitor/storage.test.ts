import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import {
  setItem,
  getItem,
  removeItem,
  clear,
  keys,
  hasItem,
  getMultiple,
  setMultiple,
  saveProgress,
  loadProgress,
  clearProgress,
  hasProgress,
  type ProgressData,
} from '@/lib/capacitor/storage';

// Mock Capacitor
vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: vi.fn(() => false), // Default to web platform
  },
}));

// Mock Preferences
vi.mock('@capacitor/preferences', () => ({
  Preferences: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
    keys: vi.fn(),
  },
}));

describe('Storage Abstraction', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  describe('Web Platform (localStorage)', () => {
    beforeEach(() => {
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false);
    });

    describe('setItem', () => {
      it('should store a string value', async () => {
        await setItem('test-key', 'test-value');
        expect(localStorage.getItem('test-key')).toBe(JSON.stringify('test-value'));
      });

      it('should store an object value', async () => {
        const testObj = { name: 'John', age: 30 };
        await setItem('test-obj', testObj);
        expect(localStorage.getItem('test-obj')).toBe(JSON.stringify(testObj));
      });

      it('should store an array value', async () => {
        const testArray = [1, 2, 3, 4, 5];
        await setItem('test-array', testArray);
        expect(localStorage.getItem('test-array')).toBe(JSON.stringify(testArray));
      });

      it('should store a boolean value', async () => {
        await setItem('test-bool', true);
        expect(localStorage.getItem('test-bool')).toBe(JSON.stringify(true));
      });

      it('should store null', async () => {
        await setItem('test-null', null);
        expect(localStorage.getItem('test-null')).toBe(JSON.stringify(null));
      });
    });

    describe('getItem', () => {
      it('should retrieve a stored string value', async () => {
        localStorage.setItem('test-key', JSON.stringify('test-value'));
        const value = await getItem('test-key');
        expect(value).toBe('test-value');
      });

      it('should retrieve a stored object value', async () => {
        const testObj = { name: 'John', age: 30 };
        localStorage.setItem('test-obj', JSON.stringify(testObj));
        const value = await getItem('test-obj');
        expect(value).toEqual(testObj);
      });

      it('should return null for non-existent key', async () => {
        const value = await getItem('non-existent');
        expect(value).toBeNull();
      });

      it('should return null for invalid JSON', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        localStorage.setItem('invalid-json', 'not valid json {]');
        const value = await getItem('invalid-json');
        expect(value).toBeNull();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
      });

      it('should handle type parameter correctly', async () => {
        interface User {
          name: string;
          age: number;
        }
        const user: User = { name: 'John', age: 30 };
        localStorage.setItem('user', JSON.stringify(user));
        const value = await getItem<User>('user');
        expect(value).toEqual(user);
        expect(value?.name).toBe('John');
      });
    });

    describe('removeItem', () => {
      it('should remove an item from storage', async () => {
        localStorage.setItem('test-key', JSON.stringify('test-value'));
        await removeItem('test-key');
        expect(localStorage.getItem('test-key')).toBeNull();
      });

      it('should not throw error when removing non-existent item', async () => {
        await expect(removeItem('non-existent')).resolves.not.toThrow();
      });
    });

    describe('clear', () => {
      it('should clear all storage', async () => {
        localStorage.setItem('key1', 'value1');
        localStorage.setItem('key2', 'value2');
        localStorage.setItem('key3', 'value3');

        await clear();

        expect(localStorage.length).toBe(0);
      });
    });

    describe('keys', () => {
      it('should return all storage keys', async () => {
        localStorage.setItem('key1', 'value1');
        localStorage.setItem('key2', 'value2');
        localStorage.setItem('key3', 'value3');

        const allKeys = await keys();

        expect(allKeys).toContain('key1');
        expect(allKeys).toContain('key2');
        expect(allKeys).toContain('key3');
        expect(allKeys.length).toBe(3);
      });

      it('should return empty array when storage is empty', async () => {
        const allKeys = await keys();
        expect(allKeys).toEqual([]);
      });
    });

    describe('hasItem', () => {
      it('should return true when item exists', async () => {
        localStorage.setItem('test-key', JSON.stringify('test-value'));
        const exists = await hasItem('test-key');
        expect(exists).toBe(true);
      });

      it('should return false when item does not exist', async () => {
        const exists = await hasItem('non-existent');
        expect(exists).toBe(false);
      });
    });

    describe('getMultiple', () => {
      it('should retrieve multiple values at once', async () => {
        localStorage.setItem('key1', JSON.stringify('value1'));
        localStorage.setItem('key2', JSON.stringify('value2'));
        localStorage.setItem('key3', JSON.stringify('value3'));

        const values = await getMultiple(['key1', 'key2', 'key3']);

        expect(values).toEqual({
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
        });
      });

      it('should return null for non-existent keys', async () => {
        localStorage.setItem('key1', JSON.stringify('value1'));

        const values = await getMultiple(['key1', 'non-existent']);

        expect(values).toEqual({
          key1: 'value1',
          'non-existent': null,
        });
      });
    });

    describe('setMultiple', () => {
      it('should set multiple values at once', async () => {
        await setMultiple({
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
        });

        expect(localStorage.getItem('key1')).toBe(JSON.stringify('value1'));
        expect(localStorage.getItem('key2')).toBe(JSON.stringify('value2'));
        expect(localStorage.getItem('key3')).toBe(JSON.stringify('value3'));
      });
    });
  });

  describe('Native Platform (Capacitor Preferences)', () => {
    beforeEach(() => {
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);
    });

    describe('setItem', () => {
      it('should use Preferences.set on native platform', async () => {
        await setItem('test-key', 'test-value');

        expect(Preferences.set).toHaveBeenCalledWith({
          key: 'test-key',
          value: JSON.stringify('test-value'),
        });
      });

      it('should store an object using Preferences', async () => {
        const testObj = { name: 'John', age: 30 };
        await setItem('test-obj', testObj);

        expect(Preferences.set).toHaveBeenCalledWith({
          key: 'test-obj',
          value: JSON.stringify(testObj),
        });
      });
    });

    describe('getItem', () => {
      it('should use Preferences.get on native platform', async () => {
        vi.mocked(Preferences.get).mockResolvedValue({ value: JSON.stringify('test-value') });

        const value = await getItem('test-key');

        expect(Preferences.get).toHaveBeenCalledWith({ key: 'test-key' });
        expect(value).toBe('test-value');
      });

      it('should return null when Preferences.get returns null', async () => {
        vi.mocked(Preferences.get).mockResolvedValue({ value: null });

        const value = await getItem('non-existent');

        expect(value).toBeNull();
      });

      it('should parse object values from Preferences', async () => {
        const testObj = { name: 'John', age: 30 };
        vi.mocked(Preferences.get).mockResolvedValue({ value: JSON.stringify(testObj) });

        const value = await getItem('test-obj');

        expect(value).toEqual(testObj);
      });
    });

    describe('removeItem', () => {
      it('should use Preferences.remove on native platform', async () => {
        await removeItem('test-key');

        expect(Preferences.remove).toHaveBeenCalledWith({ key: 'test-key' });
      });
    });

    describe('clear', () => {
      it('should use Preferences.clear on native platform', async () => {
        await clear();

        expect(Preferences.clear).toHaveBeenCalled();
      });
    });

    describe('keys', () => {
      it('should use Preferences.keys on native platform', async () => {
        vi.mocked(Preferences.keys).mockResolvedValue({ keys: ['key1', 'key2', 'key3'] });

        const allKeys = await keys();

        expect(Preferences.keys).toHaveBeenCalled();
        expect(allKeys).toEqual(['key1', 'key2', 'key3']);
      });
    });
  });

  describe('Progress Data Helpers', () => {
    const mockProgress: ProgressData = {
      currentScreen: 'lesson',
      currentLesson: 5,
      score: 120,
      completedLessons: ['0', '1', '2', '3', '4'],
      userName: 'Test User',
      userShape: { type: 'circle', name: 'Azure Orb' },
      exerciseDifficulty: 'hard',
      language: 'en',
      lastSaved: '2025-11-17T00:00:00.000Z',
    };

    beforeEach(() => {
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false);
    });

    describe('saveProgress', () => {
      it('should save progress with updated timestamp', async () => {
        await saveProgress(mockProgress);

        const stored = localStorage.getItem('learn2prompt-progress');
        const parsed = JSON.parse(stored!);

        expect(parsed.currentScreen).toBe('lesson');
        expect(parsed.currentLesson).toBe(5);
        expect(parsed.score).toBe(120);
        expect(parsed.userName).toBe('Test User');
        expect(parsed.lastSaved).toBeDefined();
        // Verify lastSaved is a recent ISO timestamp
        const savedDate = new Date(parsed.lastSaved);
        expect(savedDate.getTime()).toBeGreaterThan(Date.now() - 1000); // Within last second
      });
    });

    describe('loadProgress', () => {
      it('should load saved progress', async () => {
        localStorage.setItem('learn2prompt-progress', JSON.stringify(mockProgress));

        const progress = await loadProgress();

        expect(progress).toEqual(mockProgress);
      });

      it('should return null when no progress exists', async () => {
        const progress = await loadProgress();

        expect(progress).toBeNull();
      });
    });

    describe('clearProgress', () => {
      it('should remove progress data', async () => {
        localStorage.setItem('learn2prompt-progress', JSON.stringify(mockProgress));

        await clearProgress();

        expect(localStorage.getItem('learn2prompt-progress')).toBeNull();
      });
    });

    describe('hasProgress', () => {
      it('should return true when progress exists', async () => {
        localStorage.setItem('learn2prompt-progress', JSON.stringify(mockProgress));

        const exists = await hasProgress();

        expect(exists).toBe(true);
      });

      it('should return false when no progress exists', async () => {
        const exists = await hasProgress();

        expect(exists).toBe(false);
      });
    });
  });
});
