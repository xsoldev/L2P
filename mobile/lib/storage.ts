import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameProgress } from './game/types';

const STORAGE_KEY = 'prompt_game_progress';

export async function saveProgress(progress: Partial<GameProgress>): Promise<void> {
    try {
        // Get existing progress first to merge
        const existing = await loadProgress();
        const merged = { ...existing, ...progress, lastSaved: new Date().toISOString() };

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (error) {
        console.error('Error saving progress:', error);
        throw error;
    }
}

export async function loadProgress(): Promise<GameProgress | null> {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : null;
    } catch (error) {
        console.error('Error loading progress:', error);
        return null;
    }
}

export async function clearProgress(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing progress:', error);
        throw error;
    }
}
