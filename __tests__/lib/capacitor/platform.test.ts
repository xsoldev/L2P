/**
 * Tests for Capacitor Platform Detection Utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as platformModule from '@/lib/capacitor/platform';

// Mock the Capacitor import
vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: vi.fn(() => false),
    getPlatform: vi.fn(() => 'web'),
    isPluginAvailable: vi.fn(() => false),
  },
}));

// Import after mocking
import { Capacitor } from '@capacitor/core';
import {
  isNativePlatform,
  isAndroid,
  isIOS,
  isWeb,
  getPlatform,
  isPluginAvailable,
  isOnline,
  getPlatformConfig,
} from '@/lib/capacitor/platform';

describe('Platform Detection Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isNativePlatform', () => {
    it('should return true when running on native platform', () => {
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);
      expect(isNativePlatform()).toBe(true);
    });

    it('should return false when running on web', () => {
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false);
      expect(isNativePlatform()).toBe(false);
    });

    it('should return false when Capacitor is not available', () => {
      vi.mocked(Capacitor.isNativePlatform).mockImplementation(() => {
        throw new Error('Capacitor not available');
      });
      expect(isNativePlatform()).toBe(false);
    });

    it('should handle errors gracefully', () => {
      vi.mocked(Capacitor.isNativePlatform).mockImplementation(() => {
        throw new Error('Capacitor error');
      });
      expect(isNativePlatform()).toBe(false);
    });
  });

  describe('isAndroid', () => {
    it('should return true when running on Android', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('android');
      expect(isAndroid()).toBe(true);
    });

    it('should return false when not running on Android', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('ios');
      expect(isAndroid()).toBe(false);
    });

    it('should return false when running on web', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('web');
      expect(isAndroid()).toBe(false);
    });

    it('should return false when Capacitor is not available', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => {
        throw new Error('Capacitor not available');
      });
      expect(isAndroid()).toBe(false);
    });

    it('should handle errors gracefully', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => {
        throw new Error('Platform error');
      });
      expect(isAndroid()).toBe(false);
    });
  });

  describe('isIOS', () => {
    it('should return true when running on iOS', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('ios');
      expect(isIOS()).toBe(true);
    });

    it('should return false when not running on iOS', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('android');
      expect(isIOS()).toBe(false);
    });

    it('should return false when running on web', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('web');
      expect(isIOS()).toBe(false);
    });

    it('should return false when Capacitor is not available', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => {
        throw new Error('Capacitor not available');
      });
      expect(isIOS()).toBe(false);
    });

    it('should handle errors gracefully', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => {
        throw new Error('Platform error');
      });
      expect(isIOS()).toBe(false);
    });
  });

  describe('isWeb', () => {
    it('should return true when running on web', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('web');
      expect(isWeb()).toBe(true);
    });

    it('should return false when running on Android', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('android');
      expect(isWeb()).toBe(false);
    });

    it('should return false when running on iOS', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('ios');
      expect(isWeb()).toBe(false);
    });

    it('should return true when Capacitor is not available', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => { throw new Error("Capacitor not available"); });
      expect(isWeb()).toBe(true);
    });

    it('should handle errors gracefully and default to web', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => {
        throw new Error('Platform error');
      });
      expect(isWeb()).toBe(true);
    });
  });

  describe('getPlatform', () => {
    it('should return "android" when on Android', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('android');
      expect(getPlatform()).toBe('android');
    });

    it('should return "ios" when on iOS', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('ios');
      expect(getPlatform()).toBe('ios');
    });

    it('should return "web" when on web', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('web');
      expect(getPlatform()).toBe('web');
    });

    it('should return "web" when Capacitor is not available', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => { throw new Error("Capacitor not available"); });
      expect(getPlatform()).toBe('web');
    });

    it('should handle errors gracefully and default to web', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => {
        throw new Error('Platform error');
      });
      expect(getPlatform()).toBe('web');
    });
  });

  describe('isPluginAvailable', () => {
    it('should return true when plugin is available', () => {
      vi.mocked(Capacitor.isPluginAvailable).mockReturnValue(true);
      expect(isPluginAvailable('Haptics')).toBe(true);
      expect(vi.mocked(Capacitor.isPluginAvailable)).toHaveBeenCalledWith('Haptics');
    });

    it('should return false when plugin is not available', () => {
      vi.mocked(Capacitor.isPluginAvailable).mockReturnValue(false);
      expect(isPluginAvailable('Haptics')).toBe(false);
    });

    it('should return false when Capacitor is not available', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => { throw new Error("Capacitor not available"); });
      expect(isPluginAvailable('Haptics')).toBe(false);
    });

    it('should handle errors gracefully', () => {
      vi.mocked(Capacitor.isPluginAvailable).mockImplementation(() => {
        throw new Error('Plugin error');
      });
      expect(isPluginAvailable('Haptics')).toBe(false);
    });

    it('should check for multiple plugins', () => {
      vi.mocked(Capacitor.isPluginAvailable).mockImplementation((name) => {
        return ['Haptics', 'Share', 'Filesystem'].includes(name);
      });

      expect(isPluginAvailable('Haptics')).toBe(true);
      expect(isPluginAvailable('Share')).toBe(true);
      expect(isPluginAvailable('Filesystem')).toBe(true);
      expect(isPluginAvailable('UnknownPlugin')).toBe(false);
    });
  });

  describe('isOnline', () => {
    it('should return true when navigator.onLine is true', () => {
      Object.defineProperty(window.navigator, 'onLine', {
        writable: true,
        value: true,
      });
      expect(isOnline()).toBe(true);
    });

    it('should return false when navigator.onLine is false', () => {
      Object.defineProperty(window.navigator, 'onLine', {
        writable: true,
        value: false,
      });
      expect(isOnline()).toBe(false);
    });

    it('should return true when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      expect(isOnline()).toBe(true);
      global.window = originalWindow;
    });
  });

  describe('getPlatformConfig', () => {
    it('should return complete config for Android', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('android');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);
      vi.mocked(Capacitor.isPluginAvailable).mockImplementation((name) => {
        return ['Haptics', 'Share', 'Filesystem', 'Preferences'].includes(name);
      });

      const config = getPlatformConfig();

      expect(config).toEqual({
        isNative: true,
        isAndroid: true,
        isIOS: false,
        isWeb: false,
        platform: 'android',
        supportsHaptics: true,
        supportsShare: true,
        supportsFilesystem: true,
        supportsPreferences: true,
      });
    });

    it('should return complete config for iOS', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('ios');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);
      vi.mocked(Capacitor.isPluginAvailable).mockImplementation((name) => {
        return ['Haptics', 'Share', 'Filesystem', 'Preferences'].includes(name);
      });

      const config = getPlatformConfig();

      expect(config).toEqual({
        isNative: true,
        isAndroid: false,
        isIOS: true,
        isWeb: false,
        platform: 'ios',
        supportsHaptics: true,
        supportsShare: true,
        supportsFilesystem: true,
        supportsPreferences: true,
      });
    });

    it('should return complete config for web', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('web');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false);
      vi.mocked(Capacitor.isPluginAvailable).mockReturnValue(false);

      const config = getPlatformConfig();

      expect(config).toEqual({
        isNative: false,
        isAndroid: false,
        isIOS: false,
        isWeb: true,
        platform: 'web',
        supportsHaptics: false,
        supportsShare: false,
        supportsFilesystem: false,
        supportsPreferences: false,
      });
    });

    it('should return partial plugin support config', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('android');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);
      vi.mocked(Capacitor.isPluginAvailable).mockImplementation((name) => {
        return ['Share', 'Preferences'].includes(name);
      });

      const config = getPlatformConfig();

      expect(config.supportsShare).toBe(true);
      expect(config.supportsPreferences).toBe(true);
      expect(config.supportsHaptics).toBe(false);
      expect(config.supportsFilesystem).toBe(false);
    });

    it('should handle errors gracefully and return web config', () => {
      vi.mocked(Capacitor.getPlatform).mockImplementation(() => {
        throw new Error('Config error');
      });
      vi.mocked(Capacitor.isNativePlatform).mockImplementation(() => {
        throw new Error('Config error');
      });

      const config = getPlatformConfig();

      expect(config.platform).toBe('web');
      expect(config.isNative).toBe(false);
      expect(config.isWeb).toBe(true);
    });
  });

  describe('Platform-specific scenarios', () => {
    it('should correctly identify native Android with all plugins', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('android');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);
      vi.mocked(Capacitor.isPluginAvailable).mockReturnValue(true);

      expect(isNativePlatform()).toBe(true);
      expect(isAndroid()).toBe(true);
      expect(isIOS()).toBe(false);
      expect(isWeb()).toBe(false);
      expect(getPlatform()).toBe('android');
      expect(isPluginAvailable('Haptics')).toBe(true);
    });

    it('should correctly identify native iOS with all plugins', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('ios');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(true);
      vi.mocked(Capacitor.isPluginAvailable).mockReturnValue(true);

      expect(isNativePlatform()).toBe(true);
      expect(isAndroid()).toBe(false);
      expect(isIOS()).toBe(true);
      expect(isWeb()).toBe(false);
      expect(getPlatform()).toBe('ios');
      expect(isPluginAvailable('Share')).toBe(true);
    });

    it('should correctly identify web without plugins', () => {
      vi.mocked(Capacitor.getPlatform).mockReturnValue('web');
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false);
      vi.mocked(Capacitor.isPluginAvailable).mockReturnValue(false);

      expect(isNativePlatform()).toBe(false);
      expect(isAndroid()).toBe(false);
      expect(isIOS()).toBe(false);
      expect(isWeb()).toBe(true);
      expect(getPlatform()).toBe('web');
      expect(isPluginAvailable('Haptics')).toBe(false);
    });
  });
});
