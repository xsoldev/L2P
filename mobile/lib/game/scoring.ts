// Scoring and milestone logic for the Prompt Engineering Game

import { MilestoneData } from './types';

/**
 * Calculate points for a successful exercise completion
 * Points decrease with each attempt, minimum 10 points
 * If a suggestion was used, apply 1/10 penalty
 */
export function calculateExercisePoints(
    exerciseAttempts: number,
    usedSuggestion: boolean
): number {
    let points = Math.max(30 - (exerciseAttempts * 5), 10);

    // Apply 1/10 penalty if user used a suggestion
    if (usedSuggestion) {
        points = Math.floor(points / 10);
    }

    return points;
}

/**
 * Calculate overall progress percentage
 */
export function calculateProgress(currentLesson: number, totalLessons: number): number {
    return ((currentLesson + 1) / totalLessons) * 100;
}

/**
 * Get milestone data for specific lesson IDs
 */
export const MILESTONES: Record<string, MilestoneData> = {
    'exercise4': {
        title: "Halfway There! 🎯",
        message: "You're mastering prompt engineering! Your prompts are getting more specific and effective.",
        badge: "50% Complete"
    }
};

/**
 * Check if a lesson ID is a milestone
 */
export function isMilestone(lessonId: string): boolean {
    return lessonId in MILESTONES;
}

/**
 * Get milestone data for a lesson
 */
export function getMilestone(lessonId: string): MilestoneData | null {
    return MILESTONES[lessonId] || null;
}
