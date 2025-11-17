/**
 * Capacitor Platform Detection Utilities
 *
 * Provides helper functions to detect the runtime environment (native vs web)
 * and platform-specific capabilities.
 */

import { Capacitor } from '@capacitor/core';

/**
 * Checks if the app is running on a native platform (Android or iOS)
 * @returns {boolean} True if running on a native platform
 */
export const isNativePlatform = (): boolean => {
  try {
    return Capacitor.isNativePlatform();
  } catch (error) {
    // If Capacitor is not available, assume web platform
    return false;
  }
};

/**
 * Checks if the app is running on Android
 * @returns {boolean} True if running on Android
 */
export const isAndroid = (): boolean => {
  try {
    return Capacitor.getPlatform() === 'android';
  } catch (error) {
    return false;
  }
};

/**
 * Checks if the app is running on iOS
 * @returns {boolean} True if running on iOS
 */
export const isIOS = (): boolean => {
  try {
    return Capacitor.getPlatform() === 'ios';
  } catch (error) {
    return false;
  }
};

/**
 * Checks if the app is running in a web browser
 * @returns {boolean} True if running in a web browser
 */
export const isWeb = (): boolean => {
  try {
    return Capacitor.getPlatform() === 'web';
  } catch (error) {
    return true;
  }
};

/**
 * Gets the current platform name
 * @returns {string} Platform name: 'android', 'ios', or 'web'
 */
export const getPlatform = (): string => {
  try {
    return Capacitor.getPlatform();
  } catch (error) {
    return 'web';
  }
};

/**
 * Checks if a specific plugin is available
 * @param {string} pluginName - Name of the plugin to check
 * @returns {boolean} True if the plugin is available
 */
export const isPluginAvailable = (pluginName: string): boolean => {
  try {
    return Capacitor.isPluginAvailable(pluginName);
  } catch (error) {
    return false;
  }
};

/**
 * Checks if the device is connected to the internet
 * This is a simple check and may not be 100% accurate
 * @returns {boolean} True if online
 */
export const isOnline = (): boolean => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    return navigator.onLine;
  }
  return true;
};

/**
 * Platform-specific configuration
 */
export interface PlatformConfig {
  isNative: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isWeb: boolean;
  platform: string;
  supportsHaptics: boolean;
  supportsShare: boolean;
  supportsFilesystem: boolean;
  supportsPreferences: boolean;
}

/**
 * Gets comprehensive platform information
 * @returns {PlatformConfig} Platform configuration object
 */
export const getPlatformConfig = (): PlatformConfig => {
  const platform = getPlatform();
  const isNative = isNativePlatform();

  return {
    isNative,
    isAndroid: platform === 'android',
    isIOS: platform === 'ios',
    isWeb: platform === 'web',
    platform,
    supportsHaptics: isPluginAvailable('Haptics'),
    supportsShare: isPluginAvailable('Share'),
    supportsFilesystem: isPluginAvailable('Filesystem'),
    supportsPreferences: isPluginAvailable('Preferences'),
  };
};

/**
 * React hook for platform detection
 * Note: This should be wrapped in a proper React hook when used in components
 */
export const usePlatform = () => {
  return getPlatformConfig();
};
