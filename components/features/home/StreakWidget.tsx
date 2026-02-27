'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Flame, Zap, Trophy, Target } from 'lucide-react'

interface StreakWidgetProps {
  streakCount: number
  xp: number
  level: number
  dailyGoalCompleted: boolean
  weeklyXp: number
}

export function StreakWidget({
  streakCount,
  xp,
  level,
  dailyGoalCompleted,
  weeklyXp,
}: StreakWidgetProps) {
  // XP thresholds for each level
  const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800]
  const levelNames = ['Beginner', 'Novice', 'Apprentice', 'Practitioner', 'Expert', 'Master', 'Grandmaster', 'Prompt Wizard']

  const currentLevelXp = levelThresholds[level - 1] || 0
  const nextLevelXp = levelThresholds[level] || levelThresholds[levelThresholds.length - 1]
  const xpProgress = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Progress</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Streak */}
          <div className="text-center p-3 rounded-xl bg-orange-50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className={`w-5 h-5 ${streakCount > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
              <span className="text-2xl font-bold text-orange-600">{streakCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Day Streak</span>
          </div>

          {/* XP */}
          <div className="text-center p-3 rounded-xl bg-blue-50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{xp}</span>
            </div>
            <span className="text-xs text-muted-foreground">Total XP</span>
          </div>

          {/* Level */}
          <div className="text-center p-3 rounded-xl bg-purple-50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold text-purple-600">{level}</span>
            </div>
            <span className="text-xs text-muted-foreground">{levelNames[level - 1] || 'Beginner'}</span>
          </div>

          {/* Daily Goal */}
          <div className="text-center p-3 rounded-xl bg-green-50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className={`w-5 h-5 ${dailyGoalCompleted ? 'text-green-500' : 'text-muted-foreground'}`} />
              <span className="text-2xl font-bold text-green-600">
                {dailyGoalCompleted ? '✓' : '○'}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Daily Goal</span>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Level {level}</span>
            <span className="text-muted-foreground">{xp - currentLevelXp} / {nextLevelXp - currentLevelXp} XP</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(xpProgress, 100)}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
            />
          </div>
          {level < levelThresholds.length && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {nextLevelXp - xp} XP to reach {levelNames[level]}
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

// Default export for when user is not logged in
export function StreakWidgetPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Flame className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Track Your Progress</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Sign in to save your progress, maintain streaks, and compete on leaderboards.
            </p>
            <a
              href="/auth/signin"
              className="text-sm font-medium text-primary hover:underline"
            >
              Sign in now →
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
