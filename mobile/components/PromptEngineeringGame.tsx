import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useProgress, useGameState } from '@/components/hooks';
import { createTranslator, getTranslations } from '@/lib/i18n';
import { WelcomeScreen } from '@/components/screens/WelcomeScreen';
import { LessonScreen } from '@/components/screens/LessonScreen';
import { ExerciseScreen } from '@/components/screens/ExerciseScreen';
import { CertificateScreen } from '@/components/screens/CertificateScreen';
import { LessonContent } from '@/components/content/LessonContent';
import { MapScreen } from '@/components/screens/MapScreen';

export const PromptEngineeringGame = () => {
    const {
        currentScreen, setCurrentScreen,
        currentLesson, setCurrentLesson,
        score, setScore,
        completedLessons, setCompletedLessons,
        userName, setUserName,
        userShape, setUserShape,
        exerciseDifficulty, setExerciseDifficulty,
        language, setLanguage,
        isLoadingProgress,
        resetProgress,
        stars, setStars,
        lessonScores, setLessonScores,
        updateStreak
    } = useProgress();

    const {
        showNameInput, setShowNameInput,
        showResetDialog, setShowResetDialog,
        showProgressCelebration,
        showMilestone,
        milestoneData,
        easyModeEnabled, setEasyModeEnabled,
        checkMilestone,
        celebrateProgress
    } = useGameState();

    const t = createTranslator(language);
    const translations = getTranslations(language);
    const lessons = translations.lessons;

    // Find current lesson object
    const currentLessonObj = lessons[currentLesson];

    if (isLoadingProgress) {
        return (
            <View className="flex-1 items-center justify-center bg-[#0A1929]">
                <ActivityIndicator size="large" color="#70BEFA" />
            </View>
        );
    }

    const handleStart = () => {
        setCurrentScreen('map');
    };

    const handleSelectLesson = (index: number) => {
        setCurrentLesson(index);
        const lesson = lessons[index];
        if (lesson.type === 'exercise') {
            setCurrentScreen('exercise');
        } else {
            setCurrentScreen('lesson');
        }
    };

    const handleLessonComplete = () => {
        if (currentLessonObj && !completedLessons.includes(currentLessonObj.id)) {
            setCompletedLessons([...completedLessons, currentLessonObj.id]);
        }
        // Go back to map to show progress
        setCurrentScreen('map');
    };

    const handleExerciseComplete = (exerciseScore: number) => {
        // Update total score
        const oldLessonScore = lessonScores[currentLessonObj.id] || 0;
        const scoreDiff = exerciseScore - oldLessonScore;

        // Only add points if this is a better score
        if (scoreDiff > 0) {
            setScore(score + scoreDiff);
            setLessonScores({
                ...lessonScores,
                [currentLessonObj.id]: exerciseScore
            });
        }

        // Calculate stars
        let starCount = 1;
        if (exerciseScore >= 90) starCount = 3;
        else if (exerciseScore >= 70) starCount = 2;

        // Update stars if better
        const currentStars = stars[currentLessonObj.id] || 0;
        if (starCount > currentStars) {
            setStars({
                ...stars,
                [currentLessonObj.id]: starCount
            });
        }

        if (currentLessonObj && !completedLessons.includes(currentLessonObj.id)) {
            setCompletedLessons([...completedLessons, currentLessonObj.id]);
        }

        // Update streak
        updateStreak();

        // Go back to map
        setCurrentScreen('map');
    };

    const handleReset = async () => {
        await resetProgress();
        setCurrentScreen('welcome');
        setCurrentLesson(0);
        setScore(0);
    };

    if (currentScreen === 'welcome') {
        return <WelcomeScreen onStart={handleStart} t={t} />;
    }

    if (currentScreen === 'map') {
        return (
            <MapScreen
                onStartLesson={handleSelectLesson}
            />
        );
    }

    if (currentScreen === 'certificate') {
        return (
            <CertificateScreen
                userName={userName}
                score={score}
                onReset={handleReset}
                t={t}
            />
        );
    }

    if (!currentLessonObj) {
        return (
            <View className="flex-1 items-center justify-center bg-[#0A1929]">
                <ActivityIndicator size="large" color="#70BEFA" />
            </View>
        );
    }

    if (currentScreen === 'exercise' || currentLessonObj.type === 'exercise') {
        return (
            <ExerciseScreen
                lesson={currentLessonObj}
                onComplete={handleExerciseComplete}
                onBack={() => setCurrentScreen('map')}
                t={t}
            />
        );
    }

    return (
        <LessonScreen
            lesson={currentLessonObj}
            onComplete={handleLessonComplete}
            onBack={() => setCurrentScreen('map')}
            t={t}
            content={<LessonContent lesson={currentLessonObj} />}
        />
    );
};
