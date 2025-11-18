// Score Display Component

import React from 'react';

interface ScoreDisplayProps {
  score: number;
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="text-xl sm:text-2xl font-bold text-[#70BEFA] font-mono">{score}</div>
      <div className="text-[10px] text-gray-400 font-mono">PTS</div>
    </div>
  );
};
