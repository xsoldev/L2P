// Hook for managing the main game state

import { useState, useEffect } from 'react';
import type { MilestoneData } from '@/lib/game/types';
import { getMilestone } from '@/lib/game/scoring';

export function useGameState() {
  const [showNameInput, setShowNameInput] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showProgressCelebration, setShowProgressCelebration] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneData, setMilestoneData] = useState<MilestoneData | null>(null);
  const [easyModeEnabled, setEasyModeEnabled] = useState(false);

  /**
   * Check and display milestone if lesson is a milestone
   */
  const checkMilestone = (lessonId: string) => {
    const milestone = getMilestone(lessonId);
    if (milestone) {
      setMilestoneData(milestone);
      setShowMilestone(true);

      // Auto-dismiss milestone after 2.5 seconds
      setTimeout(() => {
        setShowMilestone(false);
      }, 2500);
    }
  };

  /**
   * Show progress celebration animation
   */
  const celebrateProgress = () => {
    setShowProgressCelebration(true);
    setTimeout(() => {
      setShowProgressCelebration(false);
    }, 1500);
  };

  return {
    // Dialog states
    showNameInput,
    setShowNameInput,
    showResetDialog,
    setShowResetDialog,
    showProgressCelebration,
    showMilestone,
    milestoneData,
    easyModeEnabled,
    setEasyModeEnabled,

    // Actions
    checkMilestone,
    celebrateProgress
  };
}
