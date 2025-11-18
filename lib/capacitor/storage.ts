/**
 * Unified storage abstraction for web (localStorage) and mobile (Capacitor Preferences)
 *
 * This module provides a consistent API for storing and retrieving data across platforms,
 * automatically using localStorage for web and Capacitor Preferences for native mobile.
 */

import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

/**
 * Check if running on native platform
 */
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Set a value in storage
 * @param key - Storage key
 * @param value - Value to store (will be JSON stringified)
 */
export async function setItem<T = any>(key: string, value: T): Promise<void> {
  const stringValue = JSON.stringify(value);

  if (isNativePlatform()) {
    // Use Capacitor Preferences for native platforms
    await Preferences.set({ key, value: stringValue });
  } else {
    // Use localStorage for web
    localStorage.setItem(key, stringValue);
  }
}

/**
 * Get a value from storage
 * @param key - Storage key
 * @returns Parsed value or null if not found
 */
export async function getItem<T = any>(key: string): Promise<T | null> {
  let stringValue: string | null = null;

  if (isNativePlatform()) {
    // Use Capacitor Preferences for native platforms
    const result = await Preferences.get({ key });
    stringValue = result.value;
  } else {
    // Use localStorage for web
    stringValue = localStorage.getItem(key);
  }

  if (stringValue === null) {
    return null;
  }

  try {
    return JSON.parse(stringValue) as T;
  } catch (error) {
    console.error(`Failed to parse storage value for key "${key}":`, error);
    return null;
  }
}

/**
 * Remove a value from storage
 * @param key - Storage key
 */
export async function removeItem(key: string): Promise<void> {
  if (isNativePlatform()) {
    // Use Capacitor Preferences for native platforms
    await Preferences.remove({ key });
  } else {
    // Use localStorage for web
    localStorage.removeItem(key);
  }
}

/**
 * Clear all storage
 * WARNING: This will remove ALL stored data
 */
export async function clear(): Promise<void> {
  if (isNativePlatform()) {
    // Use Capacitor Preferences for native platforms
    await Preferences.clear();
  } else {
    // Use localStorage for web
    localStorage.clear();
  }
}

/**
 * Get all keys in storage
 * Note: Only works on native platform with Capacitor Preferences
 * For web, this will return all localStorage keys
 */
export async function keys(): Promise<string[]> {
  if (isNativePlatform()) {
    // Use Capacitor Preferences for native platforms
    const result = await Preferences.keys();
    return result.keys;
  } else {
    // Use localStorage for web
    return Object.keys(localStorage);
  }
}

/**
 * Check if a key exists in storage
 * @param key - Storage key
 */
export async function hasItem(key: string): Promise<boolean> {
  const value = await getItem(key);
  return value !== null;
}

/**
 * Get multiple values at once
 * @param keys - Array of storage keys
 * @returns Object with key-value pairs
 */
export async function getMultiple<T = any>(keys: string[]): Promise<Record<string, T | null>> {
  const result: Record<string, T | null> = {};

  await Promise.all(
    keys.map(async (key) => {
      result[key] = await getItem<T>(key);
    })
  );

  return result;
}

/**
 * Set multiple values at once
 * @param items - Object with key-value pairs
 */
export async function setMultiple<T = any>(items: Record<string, T>): Promise<void> {
  await Promise.all(
    Object.entries(items).map(async ([key, value]) => {
      await setItem(key, value);
    })
  );
}

/**
 * Storage helper for typed progress data
 */
export interface ProgressData {
  currentScreen: 'welcome' | 'lesson' | 'certificate';
  currentLesson: number;
  score: number;
  completedLessons: string[];
  userName: string;
  userShape: any; // ShapeConfig type from game
  exerciseDifficulty: 'easy' | 'hard';
  language: 'en' | 'fr';
  lastSaved: string;
}

const PROGRESS_KEY = 'learn2prompt-progress';

/**
 * Save game progress
 * @param progress - Progress data to save
 */
export async function saveProgress(progress: ProgressData): Promise<void> {
  await setItem(PROGRESS_KEY, {
    ...progress,
    lastSaved: new Date().toISOString()
  });
}

/**
 * Load game progress
 * @returns Progress data or null if not found
 */
export async function loadProgress(): Promise<ProgressData | null> {
  return await getItem<ProgressData>(PROGRESS_KEY);
}

/**
 * Clear game progress
 */
export async function clearProgress(): Promise<void> {
  await removeItem(PROGRESS_KEY);
}

/**
 * Check if progress exists
 */
export async function hasProgress(): Promise<boolean> {
  return await hasItem(PROGRESS_KEY);
}
