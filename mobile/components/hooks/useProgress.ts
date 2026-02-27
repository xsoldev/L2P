// Hook for managing game progress persistence with cross-platform storage

import { useState, useEffect } from 'react';
import { saveProgress, loadProgress, clearProgress } from '@/lib/storage';
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
    const [lessonScores, setLessonScores] = useState<Record<string, number>>({});
    const [stars, setStars] = useState<Record<string, number>>({});
    const [streak, setStreak] = useState(0);
    const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);

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
                    setLanguage(progress.language as Language || 'en');
                    setLessonScores(progress.lessonScores || {});
                    setStars(progress.stars || {});
                    setStreak(progress.streak || 0);
                    setLastActiveDate(progress.lastActiveDate || null);
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

    // Save progress to storage whenever key state changes
    useEffect(() => {
        if (isLoadingProgress) return;

        const saveProgressAsync = async () => {
            try {
                await saveProgress({
                    currentScreen,
                    currentLesson,
                    score,
                    completedLessons,
                    userName,
                    userShape: userShape as any,
                    exerciseDifficulty,
                    language,
                    lessonScores,
                    stars,
                    streak,
                    lastActiveDate,
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
        lessonScores,
        stars,
        streak,
        lastActiveDate,
        isLoadingProgress
    ]);

    /**
     * Calculate current level based on score
     */
    const getLevel = () => {
        if (score < 100) return 1;
        if (score < 300) return 2;
        if (score < 600) return 3;
        if (score < 1000) return 4;
        return 5; // Master
    };

    /**
     * Update streak based on activity
     */
    const updateStreak = () => {
        const today = new Date().toISOString().split('T')[0];

        if (lastActiveDate === today) {
            return; // Already active today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActiveDate === yesterdayStr) {
            // Consecutive day
            setStreak(prev => prev + 1);
        } else {
            // Streak broken or first day
            setStreak(1);
        }

        setLastActiveDate(today);
    };

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
        setLessonScores({});
        setStars({});
        setStreak(0);
        setLastActiveDate(null);

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
        lessonScores,
        stars,
        streak,
        level: getLevel(),

        // Setters
        setCurrentScreen,
        setCurrentLesson,
        setScore,
        setCompletedLessons,
        setUserName,
        setUserShape,
        setExerciseDifficulty,
        setLanguage,
        setLessonScores,
        setStars,

        // Actions
        resetProgress,
        updateStreak
    };
}
