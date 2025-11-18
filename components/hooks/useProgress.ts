// Hook for managing game progress persistence with cross-platform storage

import { useState, useEffect } from 'react';
import { saveProgress, loadProgress, clearProgress } from '@/lib/capacitor/storage';
import type { GameScreen, ExerciseDifficulty } from '@/lib/game/types';
import type { Language } from '@/lib/i18n';

interface GameProgress {
  currentScreen: GameScreen;
  currentLesson: number;
  score: number;
  completedLessons: string[];
  userName: string;
  userShape: string | null;
  exerciseDifficulty: ExerciseDifficulty;
  language: Language;
}

const DEFAULT_PROGRESS: GameProgress = {
  currentScreen: 'welcome',
  currentLesson: 0,
  score: 0,
  completedLessons: [],
  userName: '',
  userShape: null,
  exerciseDifficulty: 'easy',
  language: 'en'
};

export function useProgress() {
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('welcome');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [score, setScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [userName, setUserName] = useState('');
  const [userShape, setUserShape] = useState<string | null>(null);
  const [exerciseDifficulty, setExerciseDifficulty] = useState<ExerciseDifficulty>('easy');
  const [language, setLanguage] = useState<Language>('en');

  // Load progress from storage on mount
  useEffect(() => {
    const loadSavedProgress = async () => {
      try {
        const progress = await loadProgress();
        if (progress) {
          setCurrentScreen(progress.currentScreen || 'welcome');
          setCurrentLesson(progress.currentLesson || 0);
          setScore(progress.score || 0);
          setCompletedLessons(progress.completedLessons || []);
          setUserName(progress.userName || '');
          setUserShape(progress.userShape as string | null || null);
          setExerciseDifficulty(progress.exerciseDifficulty || 'easy');
          setLanguage(progress.language || 'en');
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        // Mark loading as complete
        setTimeout(() => setIsLoadingProgress(false), 100);
      }
    };

    loadSavedProgress();
  }, []);

  // Save progress to storage whenever key state changes (but not on initial mount)
  useEffect(() => {
    if (isLoadingProgress) return; // Don't save during initial load

    const saveProgressAsync = async () => {
      try {
        await saveProgress({
          currentScreen,
          currentLesson,
          score,
          completedLessons,
          userName,
          userShape: userShape as any, // Storage expects any type for userShape
          exerciseDifficulty,
          language,
          lastSaved: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };

    saveProgressAsync();
  }, [
    currentScreen,
    currentLesson,
    score,
    completedLessons,
    userName,
    userShape,
    exerciseDifficulty,
    language,
    isLoadingProgress
  ]);

  /**
   * Reset all progress to defaults
   */
  const resetProgress = async () => {
    setCurrentScreen('welcome');
    setCurrentLesson(0);
    setScore(0);
    setCompletedLessons([]);
    setUserName('');
    setUserShape(null);
    setExerciseDifficulty('easy');
    // Don't reset language
    try {
      await clearProgress();
    } catch (error) {
      console.error('Error clearing progress:', error);
    }
  };

  return {
    // State
    currentScreen,
    currentLesson,
    score,
    completedLessons,
    userName,
    userShape,
    exerciseDifficulty,
    language,
    isLoadingProgress,

    // Setters
    setCurrentScreen,
    setCurrentLesson,
    setScore,
    setCompletedLessons,
    setUserName,
    setUserShape,
    setExerciseDifficulty,
    setLanguage,

    // Actions
    resetProgress
  };
}
