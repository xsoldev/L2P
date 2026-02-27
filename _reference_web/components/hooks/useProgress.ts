// Hook for managing game progress persistence with dual storage support
// - API storage for authenticated users
// - localStorage fallback for guests

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { saveProgress as saveToLocal, loadProgress as loadFromLocal, clearProgress as clearFromLocal } from '@/lib/storage';
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
  lastSaved?: string;
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
  const { data: session, status } = useSession();
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('welcome');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [score, setScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [userName, setUserName] = useState('');
  const [userShape, setUserShape] = useState<string | null>(null);
  const [exerciseDifficulty, setExerciseDifficulty] = useState<ExerciseDifficulty>('easy');
  const [language, setLanguage] = useState<Language>('en');

  const isAuthenticated = status === 'authenticated' && session?.user?.id;

  // Apply progress to state
  const applyProgress = useCallback((progress: Partial<GameProgress>) => {
    if (progress.currentScreen) setCurrentScreen(progress.currentScreen);
    if (typeof progress.currentLesson === 'number') setCurrentLesson(progress.currentLesson);
    if (typeof progress.score === 'number') setScore(progress.score);
    if (progress.completedLessons) setCompletedLessons(progress.completedLessons);
    if (progress.userName !== undefined) setUserName(progress.userName);
    if (progress.userShape !== undefined) setUserShape(progress.userShape);
    if (progress.exerciseDifficulty) setExerciseDifficulty(progress.exerciseDifficulty);
    if (progress.language) setLanguage(progress.language);
  }, []);

  // Load progress from API (authenticated) or localStorage (guest)
  const loadSavedProgress = useCallback(async () => {
    try {
      setIsLoadingProgress(true);

      if (isAuthenticated) {
        // Fetch from API
        const response = await fetch('/api/progress');
        if (response.ok) {
          const progress = await response.json();
          applyProgress(progress);
        }
      } else if (status === 'unauthenticated') {
        // Fallback to localStorage for guests
        const progress = await loadFromLocal();
        if (progress) {
          applyProgress(progress);
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      // Fallback to localStorage on error
      const progress = await loadFromLocal();
      if (progress) applyProgress(progress);
    } finally {
      setTimeout(() => setIsLoadingProgress(false), 100);
    }
  }, [isAuthenticated, status, applyProgress]);

  // Migrate localStorage to database on first authenticated load
  const migrateLocalToDatabase = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const localProgress = await loadFromLocal();
      if (!localProgress) return;

      // Check if local progress has meaningful data
      const hasLocalProgress =
        localProgress.score > 0 ||
        (localProgress.completedLessons && localProgress.completedLessons.length > 0) ||
        localProgress.currentScreen !== 'welcome';

      if (!hasLocalProgress) return;

      // Fetch current database progress
      const response = await fetch('/api/progress');
      const dbProgress = await response.json();

      // Check if we should merge (local has more progress than db)
      const shouldMerge =
        localProgress.score > (dbProgress.score || 0) ||
        (localProgress.completedLessons?.length || 0) > (dbProgress.completedLessons?.length || 0);

      if (shouldMerge) {
        setIsSyncing(true);

        // Merge progress - take the best of both
        const mergedProgress = {
          ...localProgress,
          score: Math.max(localProgress.score || 0, dbProgress.score || 0),
          completedLessons: [...new Set([
            ...(localProgress.completedLessons || []),
            ...(dbProgress.completedLessons || []),
          ])],
          // Prefer local user customizations
          userName: localProgress.userName || dbProgress.userName || '',
          userShape: localProgress.userShape || dbProgress.userShape || null,
        };

        await fetch('/api/progress', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mergedProgress),
        });

        applyProgress(mergedProgress);
        setIsSyncing(false);
      }
    } catch (error) {
      console.error('Migration error:', error);
      setIsSyncing(false);
    }
  }, [isAuthenticated, applyProgress]);

  // Load on mount and when auth status changes
  useEffect(() => {
    if (status !== 'loading') {
      loadSavedProgress();
      if (isAuthenticated) {
        migrateLocalToDatabase();
      }
    }
  }, [status, isAuthenticated, loadSavedProgress, migrateLocalToDatabase]);

  // Save progress to API (authenticated) or localStorage (guest)
  useEffect(() => {
    if (isLoadingProgress || status === 'loading') return;

    const saveProgressAsync = async () => {
      const progressData: GameProgress = {
        currentScreen,
        currentLesson,
        score,
        completedLessons,
        userName,
        userShape,
        exerciseDifficulty,
        language,
        lastSaved: new Date().toISOString(),
      };

      try {
        if (isAuthenticated) {
          // Save to API
          await fetch('/api/progress', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(progressData),
          });
        }
        // Always save to localStorage as backup/guest fallback
        await saveToLocal(progressData);
      } catch (error) {
        console.error('Error saving progress:', error);
        // Fallback to localStorage on error
        await saveToLocal(progressData);
      }
    };

    // Debounce saves
    const timeoutId = setTimeout(saveProgressAsync, 500);
    return () => clearTimeout(timeoutId);
  }, [
    isAuthenticated,
    status,
    isLoadingProgress,
    currentScreen,
    currentLesson,
    score,
    completedLessons,
    userName,
    userShape,
    exerciseDifficulty,
    language,
  ]);

  // Reset progress
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
      if (isAuthenticated) {
        await fetch('/api/progress', { method: 'DELETE' });
      }
      await clearFromLocal();
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
    isSyncing,
    isAuthenticated: !!isAuthenticated,

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
    resetProgress,
  };
}
