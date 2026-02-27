'use client'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { UnitCard } from '@/components/features/courses'
import { ArrowLeft, Clock, BookOpen, Zap, Play } from 'lucide-react'
import { getCourse } from '@/content/courses'

// Course metadata for display (fallback for courses without content yet)
const courseMetadata: Record<string, { icon: string; difficulty: string; targetAge: string | null }> = {
  business: { icon: '💼', difficulty: 'intermediate', targetAge: null },
  creative: { icon: '🎨', difficulty: 'intermediate', targetAge: null },
  kids: { icon: '🚀', difficulty: 'beginner', targetAge: '8-14' },
  elderly: { icon: '📚', difficulty: 'beginner', targetAge: '65+' },
}

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string
  const { data: session } = useSession()

  // Get course from content system
  const course = getCourse(slug)
  const metadata = courseMetadata[slug]

  // TODO: Fetch user progress from API
  const completedLessons: string[] = []
  const currentLessonId = course?.units[0]?.lessons[0]?.id

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">This course is coming soon!</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Map lessons to the format expected by UnitCard
  const unitsWithMappedLessons = course.units.map((unit, unitIndex) => ({
    id: unit.id,
    name: unit.name,
    description: '',
    order: unit.order,
    icon: ['🎯', '📊', '🚀'][unitIndex] || '📚',
    lessons: unit.lessons.map((lesson, lessonIndex) => ({
      id: lesson.id,
      name: lesson.title,
      type: lesson.type as 'lesson' | 'exercise' | 'quiz',
      order: lessonIndex + 1,
      xpReward: lesson.xpReward,
    })),
  }))

  const totalLessons = unitsWithMappedLessons.reduce((acc, unit) => acc + unit.lessons.length, 0)
  const totalXp = unitsWithMappedLessons.reduce(
    (acc, unit) => acc + unit.lessons.reduce((a, l) => a + l.xpReward, 0),
    0
  )
  const completedCount = completedLessons.length
  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-blue-100 text-blue-700',
    advanced: 'bg-purple-100 text-purple-700',
  }

  const difficulty = metadata?.difficulty || 'intermediate'
  const icon = metadata?.icon || '📚'
  const targetAge = metadata?.targetAge

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Courses</span>
            </Link>
            {currentLessonId && (
              <Link href={`/courses/${slug}/learn/${currentLessonId}`}>
                <Button size="sm" className="gap-2" style={{ backgroundColor: course.color }}>
                  <Play className="w-4 h-4" />
                  Continue
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Course Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Course Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0"
              style={{ backgroundColor: `${course.color}15` }}
            >
              {icon}
            </div>

            {/* Course Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className={difficultyColors[difficulty]}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Badge>
                {targetAge && (
                  <Badge variant="outline">Ages {targetAge}</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{course.name}</h1>
              <p className="text-muted-foreground text-lg">Master prompt engineering for professional productivity and business applications.</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>{totalXp} total XP</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>~{Math.ceil(totalLessons * 5)} min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {session && completedCount > 0 && (
            <div className="mt-6 p-4 bg-secondary/30 rounded-xl">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground font-medium">Your Progress</span>
                <span className="text-muted-foreground">{completedCount}/{totalLessons} completed</span>
              </div>
              <Progress
                value={progress}
                className="h-3"
                style={{ ['--progress-foreground' as string]: course.color }}
              />
            </div>
          )}
        </motion.div>

        {/* Units */}
        <div className="space-y-4">
          {unitsWithMappedLessons.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <UnitCard
                {...unit}
                courseSlug={slug}
                courseColor={course.color}
                completedLessons={completedLessons}
                currentLessonId={currentLessonId}
                isExpanded={index === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Start Button (if not started) */}
        {completedCount === 0 && currentLessonId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <Link href={`/courses/${slug}/learn/${currentLessonId}`}>
              <Button
                size="lg"
                className="text-base px-8 h-12 shadow-lg gap-2"
                style={{ backgroundColor: course.color }}
              >
                <Play className="w-5 h-5" />
                Start Learning
              </Button>
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  )
}
