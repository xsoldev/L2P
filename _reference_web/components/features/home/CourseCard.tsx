'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, Lock } from 'lucide-react'

interface CourseCardProps {
  slug: string
  name: string
  description: string
  icon: string
  color: string
  difficulty: string
  targetAge?: string | null
  lessonsCount: number
  completedLessons?: number
  isLocked?: boolean
}

export function CourseCard({
  slug,
  name,
  description,
  icon,
  color,
  difficulty,
  targetAge,
  lessonsCount,
  completedLessons = 0,
  isLocked = false,
}: CourseCardProps) {
  const progress = lessonsCount > 0 ? (completedLessons / lessonsCount) * 100 : 0
  const isCompleted = progress === 100

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-blue-100 text-blue-700',
    advanced: 'bg-purple-100 text-purple-700',
  }

  return (
    <Link href={isLocked ? '#' : `/courses/${slug}`} className={isLocked ? 'cursor-not-allowed' : ''}>
      <motion.div
        whileHover={isLocked ? {} : { scale: 1.02, y: -4 }}
        whileTap={isLocked ? {} : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Card
          className={`relative overflow-hidden p-6 h-full transition-all duration-300 ${
            isLocked
              ? 'opacity-60 bg-secondary/50'
              : 'hover:shadow-lg hover:shadow-primary/5'
          }`}
          style={{
            borderLeftWidth: '4px',
            borderLeftColor: isLocked ? '#D2D2D7' : color
          }}
        >
          {/* Lock overlay for locked courses */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <div className="bg-secondary rounded-full p-3">
                <Lock className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          )}

          {/* Course Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
            style={{ backgroundColor: `${color}15` }}
          >
            {icon}
          </div>

          {/* Course Info */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-semibold text-foreground">{name}</h3>
              {!isLocked && (
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge
                variant="secondary"
                className={difficultyColors[difficulty as keyof typeof difficultyColors] || difficultyColors.beginner}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              {targetAge && (
                <Badge variant="outline" className="text-xs">
                  Ages {targetAge}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {lessonsCount} lessons
              </Badge>
            </div>
          </div>

          {/* Progress (if started) */}
          {completedLessons > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium" style={{ color: isCompleted ? '#34C759' : color }}>
                  {isCompleted ? 'Completed!' : `${completedLessons}/${lessonsCount}`}
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2"
                style={{
                  ['--progress-foreground' as string]: isCompleted ? '#34C759' : color
                }}
              />
            </div>
          )}

          {/* Completed badge */}
          {isCompleted && (
            <div className="absolute top-4 right-4">
              <div className="bg-green-100 rounded-full p-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </Link>
  )
}
