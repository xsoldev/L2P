'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  BookOpen,
  PenTool,
  Zap,
} from 'lucide-react'
import { getLesson } from '@/content/courses'
import { LessonContent } from '@/components/features/lessons/LessonContent'
import { ExerciseView } from '@/components/features/lessons/ExerciseView'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const slug = params.slug as string
  const lessonId = params.lessonId as string

  const [isComplete, setIsComplete] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)

  // Get lesson data from content
  const lessonData = getLesson(slug, lessonId)

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Lesson Not Found</h2>
          <p className="text-muted-foreground mb-4">This lesson doesn&apos;t exist or is not available yet.</p>
          <Link href={`/courses/${slug}`}>
            <Button>Back to Course</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const { lesson, unit, course, nextLesson } = lessonData
  const isExercise = lesson.type === 'exercise'
  const courseColor = course.color

  const handleLessonComplete = async () => {
    // Save progress to API (lessons don't award XP, only track completion)
    try {
      await fetch(`/api/courses/${slug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson.id,
          xpEarned: 0, // Lessons don't award XP
          nextLessonId: nextLesson?.id || null
        })
      })
    } catch (error) {
      console.error('Failed to save progress:', error)
    }

    // Auto-advance to next lesson without showing completion screen
    if (nextLesson) {
      router.push(`/courses/${slug}/learn/${nextLesson.id}`)
    } else {
      // Last lesson in course - go back to course page
      router.push(`/courses/${slug}`)
    }
  }

  const handleExerciseComplete = async (score: number) => {
    // Scale XP based on score (score is 0-100)
    const xp = Math.round(lesson.xpReward * (score / 100))
    setEarnedXP(xp)
    setIsComplete(true)

    // Save progress to API
    try {
      await fetch(`/api/courses/${slug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson.id,
          xpEarned: xp,
          nextLessonId: nextLesson?.id || null
        })
      })
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  const handleContinue = () => {
    if (nextLesson) {
      router.push(`/courses/${slug}/learn/${nextLesson.id}`)
    } else {
      router.push(`/courses/${slug}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link
              href={`/courses/${slug}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Course</span>
            </Link>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {unit.name}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                {lesson.xpReward} XP
              </Badge>
            </div>
          </div>

          {/* Progress bar */}
          <Progress
            value={isComplete ? 100 : isExercise ? 50 : 80}
            className="h-1"
            style={{ ['--progress-foreground' as string]: courseColor }}
          />
        </div>
      </header>

      <main className={`container mx-auto px-4 py-8 ${isExercise && !isComplete ? 'max-w-7xl' : 'max-w-3xl'}`}>
        <AnimatePresence mode="wait">
          {isComplete ? (
            // Completion Screen
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${courseColor}20` }}
              >
                <Check className="w-12 h-12" style={{ color: courseColor }} />
              </motion.div>

              <h2 className="text-2xl font-bold text-foreground mb-2">
                Exercise Complete!
              </h2>
              <p className="text-muted-foreground mb-6">
                {nextLesson ? 'Great work! Ready to continue?' : 'You\'ve finished this unit!'}
              </p>

              {/* Only show XP for exercises */}
              {earnedXP > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 mb-8"
                >
                  <div className="flex items-center gap-1 px-4 py-2 bg-amber-50 rounded-full">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span className="text-lg font-bold text-amber-600">+{earnedXP} XP</span>
                  </div>
                </motion.div>
              )}

              <Button
                size="lg"
                className="gap-2"
                style={{ backgroundColor: courseColor }}
                onClick={handleContinue}
              >
                {nextLesson ? 'Next Lesson' : 'Back to Course'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ) : (
            // Lesson/Exercise Content
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${courseColor}15` }}
                >
                  {isExercise ? (
                    <PenTool className="w-6 h-6" style={{ color: courseColor }} />
                  ) : (
                    <BookOpen className="w-6 h-6" style={{ color: courseColor }} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {isExercise ? 'Exercise' : 'Lesson'}
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
                </div>
              </div>

              {/* Content based on type */}
              {isExercise ? (
                <Card className="p-6">
                  <ExerciseView
                    lesson={lesson}
                    courseColor={courseColor}
                    onComplete={handleExerciseComplete}
                  />
                </Card>
              ) : (
                <>
                  <Card className="p-6 mb-8">
                    <LessonContent lesson={lesson} courseColor={courseColor} />
                  </Card>

                  {/* Continue Button */}
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="gap-2"
                      style={{ backgroundColor: courseColor }}
                      onClick={handleLessonComplete}
                    >
                      {nextLesson
                        ? nextLesson.type === 'exercise'
                          ? 'Start Exercise'
                          : 'Continue'
                        : 'Finish Course'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
