// Hook for managing exercise evaluation and scoring

import { useState } from 'react';
import type { Evaluation, ChartConfig } from '@/lib/game/types';
import { evaluatePrompt, generateVisualization } from '@/lib/game/evaluation';
import { calculateExercisePoints } from '@/lib/game/scoring';
import type { Language } from '@/lib/i18n';

export function useExerciseEvaluation() {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [generatedChart, setGeneratedChart] = useState<ChartConfig | null>(null);
  const [exerciseAttempts, setExerciseAttempts] = useState(0);
  const [usedSuggestion, setUsedSuggestion] = useState(false);

  /**
   * Evaluate a user's prompt submission
   */
  const evaluateExercise = async (
    userPrompt: string,
    aiResponse: string,
    criteria: string,
    lessonContext: string,
    language: Language
  ): Promise<Evaluation> => {
    const result = await evaluatePrompt(
      userPrompt,
      aiResponse,
      criteria,
      lessonContext,
      language
    );

    setEvaluation(result);
    setExerciseAttempts((prev) => prev + 1);

    return result;
  };

  /**
   * Generate a chart visualization for the exercise
   */
  const generateChart = async (
    userPrompt: string,
    salesData: any
  ): Promise<ChartConfig | null> => {
    const chart = await generateVisualization(userPrompt, salesData);
    setGeneratedChart(chart);
    return chart;
  };

  /**
   * Calculate points earned for the current exercise
   */
  const getPointsEarned = (): number => {
    if (!evaluation?.passed) return 0;
    return calculateExercisePoints(exerciseAttempts, usedSuggestion);
  };

  /**
   * Reset exercise state for next exercise
   */
  const resetExercise = () => {
    setEvaluation(null);
    setGeneratedChart(null);
    setExerciseAttempts(0);
    setUsedSuggestion(false);
  };

  return {
    // State
    evaluation,
    generatedChart,
    exerciseAttempts,
    usedSuggestion,

    // Setters
    setEvaluation,
    setGeneratedChart,
    setUsedSuggestion,

    // Actions
    evaluateExercise,
    generateChart,
    getPointsEarned,
    resetExercise
  };
}
