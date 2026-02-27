'use client'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getCourse } from '@/content/courses'
import { BookOpen, Zap, Clock, ChevronRight, Play, Check, Lock, Loader2 } from 'lucide-react'

// Course metadata
const courseMetadata: Record<string, { image: string; gradient: string }> = {
  business: {
    image: '/assets/courses/business-icon.png',
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent'
  },
  creative: {
    image: '/assets/courses/creative-icon.png',
    gradient: 'from-pink-500/20 via-pink-500/5 to-transparent'
  },
  kids: {
    image: '/assets/courses/kids-icon.png',
    gradient: 'from-orange-500/20 via-orange-500/5 to-transparent'
  },
  elderly: {
    image: '/assets/courses/elderly-icon.png',
    gradient: 'from-green-500/20 via-green-500/5 to-transparent'
  },
}

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string
  const { data: session, status } = useSession()

  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [totalXpEarned, setTotalXpEarned] = useState(0)
  const [isLoadingProgress, setIsLoadingProgress] = useState(false)

  const course = getCourse(slug)
  const metadata = courseMetadata[slug]

  // Fetch progress from API when session is available
  useEffect(() => {
    async function fetchProgress() {
      if (!session?.user) return

      setIsLoadingProgress(true)
      try {
        const response = await fetch(`/api/courses/${slug}/progress`)
        if (response.ok) {
          const data = await response.json()
          setCompletedLessons(data.completedLessons || [])
          setTotalXpEarned(data.totalXpEarned || 0)
        }
      } catch (error) {
        console.error('Failed to fetch progress:', error)
      } finally {
        setIsLoadingProgress(false)
      }
    }

    fetchProgress()
  }, [session, slug])

  // Determine current lesson (first uncompleted lesson)
  const allLessonsFlat = course?.units.flatMap(u => u.lessons) || []
  const currentLessonId = allLessonsFlat.find(l => !completedLessons.includes(l.id))?.id
    || course?.units[0]?.lessons[0]?.id

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Coming soon
            </h1>
            <p className="text-muted-foreground mb-8">
              This course is still being crafted.
            </p>
            <Link href="/">
              <Button variant="outline" className="rounded-full">
                Back to courses
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  // Flatten all lessons for stats
  const allLessons = course.units.flatMap(u => u.lessons)
  const totalLessons = allLessons.length
  const exerciseCount = allLessons.filter(l => l.type === 'exercise').length
  const totalXp = allLessons.reduce((sum, l) => sum + l.xpReward, 0)
  const completedCount = completedLessons.length
  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0
  const estimatedTime = Math.ceil(totalLessons * 4)

  const courseImage = metadata?.image || '/assets/courses/business-icon.png'
  const gradientClass = metadata?.gradient || 'from-blue-500/20 via-blue-500/5 to-transparent'

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Courses
            </Link>
            {currentLessonId && (
              <Link href={`/courses/${slug}/learn/${currentLessonId}`}>
                <Button size="sm" className="h-9 px-5 rounded-full gap-2" style={{ backgroundColor: course.color }}>
                  {isLoadingProgress ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                  {completedCount > 0 ? 'Continue' : 'Start'}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-14">
        {/* Hero with gradient accent */}
        <section className={`relative overflow-hidden`}>
          {/* Subtle gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-b ${gradientClass} pointer-events-none`} />

          <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Course image - offset for asymmetry */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex-shrink-0"
              >
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5"
                  style={{ boxShadow: `0 25px 50px -12px ${course.color}40` }}
                >
                  <Image
                    src={courseImage}
                    alt={course.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Course info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1 min-w-0"
              >
                <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
                  {course.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Master prompt engineering for professional productivity and business applications.
                </p>

                {/* Stats - bento-style row */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 text-sm">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{totalLessons}</span>
                    <span className="text-muted-foreground">lessons</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{estimatedTime}</span>
                    <span className="text-muted-foreground">min</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 text-sm">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-foreground font-medium">{totalXp}</span>
                    <span className="text-muted-foreground">XP</span>
                  </div>
                </div>

                {/* Progress (if logged in and has progress) */}
                {session && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 max-w-sm"
                  >
                    {isLoadingProgress ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading progress...
                      </div>
                    ) : completedCount > 0 ? (
                      <>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Your progress</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-xs text-amber-600">
                              <Zap className="w-3 h-3" />
                              {totalXpEarned} XP earned
                            </span>
                            <span className="font-medium" style={{ color: course.color }}>
                              {Math.round(progress)}%
                            </span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: course.color }}
                          />
                        </div>
                      </>
                    ) : null}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Units - clean list design */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="space-y-3">
            {course.units.map((unit, unitIndex) => {
              const unitLessons = unit.lessons
              const completedInUnit = unitLessons.filter(l => completedLessons.includes(l.id)).length
              const unitProgress = unitLessons.length > 0 ? (completedInUnit / unitLessons.length) * 100 : 0
              const isUnitComplete = unitProgress === 100

              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + unitIndex * 0.08,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <div className="rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-border transition-colors">
                    {/* Unit header */}
                    <div className="p-5 md:p-6">
                      <div className="flex items-start gap-4">
                        {/* Unit number - cleaner than emoji */}
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-semibold flex-shrink-0"
                          style={{
                            backgroundColor: isUnitComplete ? `${course.color}15` : 'hsl(var(--secondary))',
                            color: isUnitComplete ? course.color : 'hsl(var(--muted-foreground))'
                          }}
                        >
                          {isUnitComplete ? <Check className="w-5 h-5" /> : unitIndex + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Unit {unitIndex + 1}
                            </span>
                            {isUnitComplete && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">
                                Complete
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {unit.name}
                          </h3>

                          {/* Unit progress bar */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${unitProgress}%`,
                                  backgroundColor: course.color
                                }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground tabular-nums">
                              {completedInUnit}/{unitLessons.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lessons list */}
                    <div className="border-t border-border/40">
                      {unitLessons.map((lesson, lessonIndex) => {
                        const isCompleted = completedLessons.includes(lesson.id)
                        // TODO: Re-enable locking after testing
                        // const isLocked = lessonIndex > 0 && !completedLessons.includes(unitLessons[lessonIndex - 1].id)
                        const isLocked = false // TESTING: All lessons unlocked
                        const isCurrent = lesson.id === currentLessonId
                        const isExercise = lesson.type === 'exercise'

                        return (
                          <Link
                            key={lesson.id}
                            href={isLocked ? '#' : `/courses/${slug}/learn/${lesson.id}`}
                            className={`
                              flex items-center gap-4 px-5 md:px-6 py-4
                              transition-colors
                              ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary/40'}
                              ${lessonIndex !== unitLessons.length - 1 ? 'border-b border-border/30' : ''}
                            `}
                            onClick={e => isLocked && e.preventDefault()}
                          >
                            {/* Status indicator */}
                            <div
                              className={`
                                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium
                                ${isCompleted
                                  ? 'text-white'
                                  : isCurrent
                                    ? 'ring-2 ring-offset-2 ring-offset-background'
                                    : 'bg-secondary text-muted-foreground'
                                }
                              `}
                              style={{
                                backgroundColor: isCompleted ? course.color : isCurrent ? `${course.color}20` : undefined,
                                '--tw-ring-color': isCurrent ? course.color : undefined,
                                color: isCurrent && !isCompleted ? course.color : undefined
                              } as React.CSSProperties}
                            >
                              {isCompleted ? (
                                <Check className="w-4 h-4" />
                              ) : isLocked ? (
                                <Lock className="w-3.5 h-3.5" />
                              ) : (
                                lessonIndex + 1
                              )}
                            </div>

                            {/* Lesson info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${isCompleted ? 'text-muted-foreground' : 'text-foreground'}`}>
                                  {lesson.title}
                                </span>
                                {isExercise && (
                                  <span
                                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                                    style={{
                                      backgroundColor: `${course.color}15`,
                                      color: course.color
                                    }}
                                  >
                                    Exercise
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* XP reward */}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Zap className="w-3 h-3 text-amber-500" />
                              {lesson.xpReward}
                            </div>

                            {/* Arrow */}
                            {!isLocked && (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
