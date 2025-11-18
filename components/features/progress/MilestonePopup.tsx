// Milestone Celebration Popup Component

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MilestoneData } from '@/lib/game/types';

interface MilestonePopupProps {
  show: boolean;
  milestoneData: MilestoneData | null;
}

export const MilestonePopup: React.FC<MilestonePopupProps> = ({ show, milestoneData }) => {
  return (
    <AnimatePresence>
      {show && milestoneData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="max-w-md w-full"
          >
            <Card className="bg-[#0D0D0D] border-l-4 border-l-[#70BEFA] border-r border-t border-b border-[#70BEFA]/30 rounded-r-xl shadow-2xl">
              <CardContent className="p-6 space-y-4">
                {/* Pulsating Blue Orb */}
                <div className="flex justify-center">
                  <div className="relative w-24 h-24">
                    {/* Outer glow rings */}
                    <div
                      className="absolute inset-0 rounded-full bg-[#70BEFA]/30 animate-ping"
                      style={{ animationDuration: '2s' }}
                    ></div>
                    <div
                      className="absolute inset-2 rounded-full bg-[#70BEFA]/40 animate-pulse"
                      style={{ animationDuration: '1.5s' }}
                    ></div>
                    {/* Core orb with constant glow */}
                    <div className="absolute inset-6 rounded-full bg-[#70BEFA] shadow-[0_0_40px_rgba(112,190,250,0.8),0_0_80px_rgba(112,190,250,0.6),inset_0_0_20px_rgba(255,255,255,0.5)]"></div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {milestoneData.title}
                  </h3>
                  <Badge className="bg-[#70BEFA]/20 text-[#70BEFA] border-[#70BEFA]/30">
                    {milestoneData.badge}
                  </Badge>
                </div>

                {/* Message */}
                <p className="text-gray-300 text-center text-sm leading-relaxed">
                  {milestoneData.message}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
