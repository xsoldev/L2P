// Progress Bar Component with animation

import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
  completedLessons: number;
  totalLessons: number;
  showCelebration: boolean;
  progressText: string;
  lessonsCompletedText: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  completedLessons,
  totalLessons,
  showCelebration,
  progressText,
  lessonsCompletedText
}) => {
  return (
    <div className="mb-12 space-y-2 relative">
      <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
        <span>{progressText}</span>
        <span>{lessonsCompletedText}</span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="origin-left relative"
      >
        <motion.div
          animate={showCelebration ? {
            boxShadow: [
              '0 0 0px rgba(112, 190, 250, 0)',
              '0 0 15px rgba(112, 190, 250, 0.8)',
              '0 0 0px rgba(112, 190, 250, 0)'
            ]
          } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-full"
        >
          <Progress value={progress} className="h-2" />
        </motion.div>
      </motion.div>
    </div>
  );
};
