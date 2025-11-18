// Hook for managing game progress persistence in localStorage

import { useState, useEffect } from 'react';
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

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('learn2prompt-progress');
    if (savedProgress) {
      try {
        const progress: GameProgress = JSON.parse(savedProgress);
        setCurrentScreen(progress.currentScreen || 'welcome');
        setCurrentLesson(progress.currentLesson || 0);
        setScore(progress.score || 0);
        setCompletedLessons(progress.completedLessons || []);
        setUserName(progress.userName || '');
        setUserShape(progress.userShape || null);
        setExerciseDifficulty(progress.exerciseDifficulty || 'easy');
        setLanguage(progress.language || 'en');
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
    // Mark loading as complete after a brief delay to ensure state is updated
    setTimeout(() => setIsLoadingProgress(false), 100);
  }, []);

  // Save progress to localStorage whenever key state changes (but not on initial mount)
  useEffect(() => {
    if (isLoadingProgress) return; // Don't save during initial load

    const progress: GameProgress = {
      currentScreen,
      currentLesson,
      score,
      completedLessons,
      userName,
      userShape,
      exerciseDifficulty,
      language,
    };
    localStorage.setItem('learn2prompt-progress', JSON.stringify(progress));
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
  const resetProgress = () => {
    setCurrentScreen('welcome');
    setCurrentLesson(0);
    setScore(0);
    setCompletedLessons([]);
    setUserName('');
    setUserShape(null);
    setExerciseDifficulty('easy');
    // Don't reset language
    localStorage.removeItem('learn2prompt-progress');
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
