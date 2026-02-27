'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChevronDown, ChevronUp, Lock } from 'lucide-react'
import { LessonItem } from './LessonItem'

interface Lesson {
  id: string
  name: string
  type: 'lesson' | 'exercise' | 'quiz'
  order: number
  xpReward: number
  isCompleted?: boolean
  isLocked?: boolean
}

interface UnitCardProps {
  id: string
  name: string
  description?: string
  icon?: string
  order: number
  lessons: Lesson[]
  courseSlug: string
  courseColor: string
  completedLessons: string[]
  currentLessonId?: string
  isExpanded?: boolean
}

export function UnitCard({
  id,
  name,
  description,
  icon,
  order,
  lessons,
  courseSlug,
  courseColor,
  completedLessons,
  currentLessonId,
  isExpanded: initialExpanded = false,
}: UnitCardProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  const completedInUnit = lessons.filter(l => completedLessons.includes(l.id)).length
  const progress = lessons.length > 0 ? (completedInUnit / lessons.length) * 100 : 0
  const isUnitCompleted = progress === 100

  // Determine which lessons are locked
  const lessonsWithStatus = lessons.map((lesson, index) => {
    // First lesson is never locked
    if (index === 0) {
      return { ...lesson, isCompleted: completedLessons.includes(lesson.id), isLocked: false }
    }
    // Subsequent lessons are locked if previous lesson isn't completed
    const previousLesson = lessons[index - 1]
    const isLocked = !completedLessons.includes(previousLesson.id)
    return { ...lesson, isCompleted: completedLessons.includes(lesson.id), isLocked }
  })

  return (
    <Card className="overflow-hidden">
      {/* Unit Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-6 flex items-center gap-4 hover:bg-secondary/30 transition-colors text-left"
      >
        {/* Unit Number/Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: `${courseColor}15` }}
        >
          {icon || order}
        </div>

        {/* Unit Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground">UNIT {order}</span>
            {isUnitCompleted && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                Complete
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground truncate">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground truncate mt-0.5">{description}</p>
          )}

          {/* Progress */}
          <div className="flex items-center gap-3 mt-2">
            <Progress
              value={progress}
              className="h-1.5 flex-1"
              style={{ ['--progress-foreground' as string]: courseColor }}
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {completedInUnit}/{lessons.length}
            </span>
          </div>
        </div>

        {/* Expand/Collapse */}
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Lessons List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border">
              {lessonsWithStatus.map((lesson, index) => (
                <LessonItem
                  key={lesson.id}
                  {...lesson}
                  courseSlug={courseSlug}
                  courseColor={courseColor}
                  isCurrent={lesson.id === currentLessonId}
                  isLast={index === lessonsWithStatus.length - 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
