/**
 * Tests for Next.js Configuration
 */

import { describe, it, expect } from 'vitest';
import nextConfig from '@/next.config';

describe('Next.js Configuration', () => {
  describe('Static Export Configuration', () => {
    it('should be configured for static export', () => {
      expect(nextConfig.output).toBe('export');
    });

    it('should have images unoptimized', () => {
      expect(nextConfig.images).toBeDefined();
      expect(nextConfig.images?.unoptimized).toBe(true);
    });

    it('should use trailing slash', () => {
      expect(nextConfig.trailingSlash).toBe(true);
    });

    it('should have correct dist directory', () => {
      expect(nextConfig.distDir).toBe('out');
    });
  });

  describe('Configuration Integrity', () => {
    it('should be a valid configuration object', () => {
      expect(nextConfig).toBeDefined();
      expect(typeof nextConfig).toBe('object');
    });

    it('should have all required properties for Capacitor', () => {
      expect(nextConfig).toHaveProperty('output');
      expect(nextConfig).toHaveProperty('images');
      expect(nextConfig).toHaveProperty('trailingSlash');
      expect(nextConfig).toHaveProperty('distDir');
    });

    it('should have output directory matching Capacitor webDir', () => {
      // This should match the webDir in capacitor.config.ts
      expect(nextConfig.distDir).toBe('out');
    });
  });

  describe('Image Configuration', () => {
    it('should have images configuration', () => {
      expect(nextConfig.images).toBeDefined();
    });

    it('should disable image optimization for static export', () => {
      expect(nextConfig.images?.unoptimized).toBe(true);
    });
  });

  describe('Routing Configuration', () => {
    it('should use trailing slashes for better mobile compatibility', () => {
      expect(nextConfig.trailingSlash).toBe(true);
    });
  });

  describe('Build Output', () => {
    it('should output to "out" directory', () => {
      expect(nextConfig.distDir).toBe('out');
    });

    it('should be a valid directory name', () => {
      expect(nextConfig.distDir).toMatch(/^[a-zA-Z0-9_-]+$/);
    });
  });

  describe('Static Export Compatibility', () => {
    it('should have export mode enabled', () => {
      expect(nextConfig.output).toBe('export');
    });

    it('should not have server-side features enabled', () => {
      // Ensure no conflicting server features are enabled
      expect(nextConfig.output).not.toBe('standalone');
      expect(nextConfig.output).not.toBe('server');
    });
  });
});
