/**
 * Storage utility for Web Platform (localStorage)
 * Replaces the Capacitor-based storage abstraction.
 */

export interface StorageOptions {
    key: string;
    value: any;
}

/**
 * Save data to localStorage
 */
export async function setItem<T = any>(key: string, value: T): Promise<void> {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        throw error;
    }
}

/**
 * Load data from localStorage
 */
export async function getItem<T = any>(key: string): Promise<T | null> {
    try {
        const item = localStorage.getItem(key);
        if (!item) return null;
        return JSON.parse(item) as T;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

/**
 * Remove data from localStorage
 */
export async function removeItem(key: string): Promise<void> {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        throw error;
    }
}

/**
 * Clear all data from localStorage
 */
export async function clear(): Promise<void> {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        throw error;
    }
}

// Game-specific helpers
const PROGRESS_KEY = 'prompt_game_progress';

export async function saveProgress(progress: any): Promise<void> {
    await setItem(PROGRESS_KEY, progress);
}

export async function loadProgress(): Promise<any | null> {
    return getItem(PROGRESS_KEY);
}

export async function clearProgress(): Promise<void> {
    await removeItem(PROGRESS_KEY);
}
