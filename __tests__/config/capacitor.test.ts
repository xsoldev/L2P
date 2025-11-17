/**
 * Tests for Capacitor Configuration Validation
 */

import { describe, it, expect } from 'vitest';
import config from '@/capacitor.config';

describe('Capacitor Configuration', () => {
  describe('Basic Configuration', () => {
    it('should have correct app ID', () => {
      expect(config.appId).toBe('com.novagenlabs.learn2prompt');
    });

    it('should have correct app name', () => {
      expect(config.appName).toBe('Learn2Prompt');
    });

    it('should point to correct web directory', () => {
      expect(config.webDir).toBe('out');
    });

    it('should be a valid object', () => {
      expect(config).toBeDefined();
      expect(typeof config).toBe('object');
    });

    it('should have all required properties', () => {
      expect(config).toHaveProperty('appId');
      expect(config).toHaveProperty('appName');
      expect(config).toHaveProperty('webDir');
    });
  });

  describe('Android Configuration', () => {
    it('should have Android configuration', () => {
      expect(config.android).toBeDefined();
      expect(typeof config.android).toBe('object');
    });

    it('should allow mixed content', () => {
      expect(config.android?.allowMixedContent).toBe(true);
    });

    it('should have correct background color', () => {
      expect(config.android?.backgroundColor).toBe('#0D0D0D');
    });

    it('should have build options configured', () => {
      expect(config.android?.buildOptions).toBeDefined();
      expect(typeof config.android?.buildOptions).toBe('object');
    });

    it('should have release type set to APK', () => {
      expect(config.android?.buildOptions?.releaseType).toBe('APK');
    });

    it('should have keystore properties defined', () => {
      expect(config.android?.buildOptions).toHaveProperty('keystorePath');
      expect(config.android?.buildOptions).toHaveProperty('keystorePassword');
      expect(config.android?.buildOptions).toHaveProperty('keystoreAlias');
    });
  });

  describe('Plugin Configuration', () => {
    it('should have plugins configuration', () => {
      expect(config.plugins).toBeDefined();
      expect(typeof config.plugins).toBe('object');
    });

    describe('SplashScreen Plugin', () => {
      it('should have SplashScreen configuration', () => {
        expect(config.plugins?.SplashScreen).toBeDefined();
      });

      it('should have correct launch show duration', () => {
        expect(config.plugins?.SplashScreen?.launchShowDuration).toBe(2000);
      });

      it('should have correct background color', () => {
        expect(config.plugins?.SplashScreen?.backgroundColor).toBe('#0D0D0D');
      });

      it('should disable spinner', () => {
        expect(config.plugins?.SplashScreen?.showSpinner).toBe(false);
      });

      it('should have correct Android spinner style', () => {
        expect(config.plugins?.SplashScreen?.androidSpinnerStyle).toBe('large');
      });

      it('should be full screen', () => {
        expect(config.plugins?.SplashScreen?.splashFullScreen).toBe(true);
      });

      it('should be immersive', () => {
        expect(config.plugins?.SplashScreen?.splashImmersive).toBe(true);
      });
    });

    describe('StatusBar Plugin', () => {
      it('should have StatusBar configuration', () => {
        expect(config.plugins?.StatusBar).toBeDefined();
      });

      it('should have dark style', () => {
        expect(config.plugins?.StatusBar?.style).toBe('dark');
      });

      it('should have correct background color', () => {
        expect(config.plugins?.StatusBar?.backgroundColor).toBe('#0D0D0D');
      });
    });

    describe('Keyboard Plugin', () => {
      it('should have Keyboard configuration', () => {
        expect(config.plugins?.Keyboard).toBeDefined();
      });

      it('should resize body', () => {
        expect(config.plugins?.Keyboard?.resize).toBe('body');
      });

      it('should have dark style', () => {
        expect(config.plugins?.Keyboard?.style).toBe('dark');
      });

      it('should resize on full screen', () => {
        expect(config.plugins?.Keyboard?.resizeOnFullScreen).toBe(true);
      });
    });
  });

  describe('Configuration Integrity', () => {
    it('should have consistent color scheme', () => {
      const darkColor = '#0D0D0D';
      expect(config.android?.backgroundColor).toBe(darkColor);
      expect(config.plugins?.SplashScreen?.backgroundColor).toBe(darkColor);
      expect(config.plugins?.StatusBar?.backgroundColor).toBe(darkColor);
    });

    it('should have consistent dark theme', () => {
      expect(config.plugins?.StatusBar?.style).toBe('dark');
      expect(config.plugins?.Keyboard?.style).toBe('dark');
    });

    it('should not have unexpected properties', () => {
      const validProperties = [
        'appId',
        'appName',
        'webDir',
        'android',
        'plugins',
      ];

      const configKeys = Object.keys(config);
      configKeys.forEach(key => {
        expect(validProperties).toContain(key);
      });
    });
  });

  describe('App ID Validation', () => {
    it('should follow reverse domain notation', () => {
      const parts = config.appId.split('.');
      expect(parts.length).toBeGreaterThanOrEqual(3);
      expect(parts[0]).toBe('com');
      expect(parts[1]).toBe('novagenlabs');
      expect(parts[2]).toBe('learn2prompt');
    });

    it('should not contain invalid characters', () => {
      expect(config.appId).toMatch(/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/);
    });

    it('should not start with a number', () => {
      expect(config.appId).not.toMatch(/^\d/);
    });
  });

  describe('App Name Validation', () => {
    it('should be a non-empty string', () => {
      expect(config.appName).toBeTruthy();
      expect(typeof config.appName).toBe('string');
      expect(config.appName.length).toBeGreaterThan(0);
    });

    it('should not exceed reasonable length', () => {
      expect(config.appName.length).toBeLessThanOrEqual(30);
    });

    it('should be descriptive', () => {
      expect(config.appName).toContain('Learn');
      expect(config.appName).toContain('Prompt');
    });
  });

  describe('Web Directory Validation', () => {
    it('should be a valid directory name', () => {
      expect(config.webDir).toMatch(/^[a-zA-Z0-9_-]+$/);
    });

    it('should match Next.js static export directory', () => {
      expect(config.webDir).toBe('out');
    });
  });

  describe('Color Validation', () => {
    it('should use valid hex color format', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

      expect(config.android?.backgroundColor).toMatch(hexColorRegex);
      expect(config.plugins?.SplashScreen?.backgroundColor).toMatch(hexColorRegex);
      expect(config.plugins?.StatusBar?.backgroundColor).toMatch(hexColorRegex);
    });

    it('should use dark colors', () => {
      const darkColor = '#0D0D0D';
      const colors = [
        config.android?.backgroundColor,
        config.plugins?.SplashScreen?.backgroundColor,
        config.plugins?.StatusBar?.backgroundColor,
      ];

      colors.forEach(color => {
        expect(color).toBe(darkColor);
      });
    });
  });

  describe('Build Configuration', () => {
    it('should have proper release type', () => {
      const validReleaseTypes = ['APK', 'AAB'];
      expect(validReleaseTypes).toContain(config.android?.buildOptions?.releaseType);
    });

    it('should have keystore configuration structure', () => {
      const buildOptions = config.android?.buildOptions;
      expect(buildOptions).toHaveProperty('keystorePath');
      expect(buildOptions).toHaveProperty('keystorePassword');
      expect(buildOptions).toHaveProperty('keystoreAlias');
    });
  });

  describe('Plugin Settings', () => {
    it('should have reasonable splash screen duration', () => {
      const duration = config.plugins?.SplashScreen?.launchShowDuration;
      expect(duration).toBeGreaterThanOrEqual(1000);
      expect(duration).toBeLessThanOrEqual(5000);
    });

    it('should have valid keyboard resize mode', () => {
      const validResizeModes = ['native', 'body', 'ionic', 'none'];
      expect(validResizeModes).toContain(config.plugins?.Keyboard?.resize);
    });

    it('should have valid status bar style', () => {
      const validStyles = ['light', 'dark', 'default'];
      expect(validStyles).toContain(config.plugins?.StatusBar?.style);
    });
  });
});
