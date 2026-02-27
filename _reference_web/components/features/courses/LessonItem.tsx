'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Lock, BookOpen, PenTool, HelpCircle, Zap } from 'lucide-react'

interface LessonItemProps {
  id: string
  name: string
  type: 'lesson' | 'exercise' | 'quiz'
  order: number
  xpReward: number
  isCompleted?: boolean
  isLocked?: boolean
  isCurrent?: boolean
  isLast?: boolean
  courseSlug: string
  courseColor: string
}

export function LessonItem({
  id,
  name,
  type,
  order,
  xpReward,
  isCompleted = false,
  isLocked = false,
  isCurrent = false,
  isLast = false,
  courseSlug,
  courseColor,
}: LessonItemProps) {
  const TypeIcon = type === 'exercise' ? PenTool : type === 'quiz' ? HelpCircle : BookOpen
  const typeLabel = type === 'exercise' ? 'Exercise' : type === 'quiz' ? 'Quiz' : 'Lesson'

  const content = (
    <div
      className={`flex items-center gap-4 p-4 transition-colors ${
        isLocked
          ? 'opacity-50 cursor-not-allowed'
          : isCurrent
          ? 'bg-primary/5'
          : 'hover:bg-secondary/50'
      } ${!isLast ? 'border-b border-border' : ''}`}
    >
      {/* Status Icon */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isCompleted
            ? 'bg-green-100'
            : isLocked
            ? 'bg-secondary'
            : isCurrent
            ? ''
            : 'bg-secondary'
        }`}
        style={
          isCurrent && !isCompleted
            ? { backgroundColor: `${courseColor}20`, borderWidth: 2, borderColor: courseColor }
            : undefined
        }
      >
        {isCompleted ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : isLocked ? (
          <Lock className="w-4 h-4 text-muted-foreground" />
        ) : (
          <TypeIcon
            className="w-5 h-5"
            style={{ color: isCurrent ? courseColor : 'currentColor' }}
          />
        )}
      </div>

      {/* Lesson Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase">{typeLabel}</span>
          {isCurrent && !isCompleted && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${courseColor}20`, color: courseColor }}
            >
              Continue
            </span>
          )}
        </div>
        <h4 className="font-medium text-foreground truncate">{name}</h4>
      </div>

      {/* XP Badge */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0">
        <Zap className="w-4 h-4 text-amber-500" />
        <span>{xpReward} XP</span>
      </div>
    </div>
  )

  if (isLocked) {
    return content
  }

  return (
    <Link href={`/courses/${courseSlug}/learn/${id}`}>
      <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.1 }}>
        {content}
      </motion.div>
    </Link>
  )
}
