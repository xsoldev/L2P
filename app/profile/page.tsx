'use client'

import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User, LogOut, Sparkles, BookOpen, Trophy, Flame } from 'lucide-react'

interface UserStats {
  totalXp: number
  level: number
  streakCount: number
  courseProgress: {
    courseSlug: string
    courseName: string
    courseIcon: string
    courseColor: string
    completedLessons: number
    totalLessons: number
    totalXpEarned: number
    completedAt: string | null
  }[]
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchUserStats()
    } else if (status === 'unauthenticated') {
      setIsLoading(false)
    }
  }, [status, session])

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/user/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Not signed in
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-background">
        {/* Minimal nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-12">
              <Link href="/" className="text-sm font-medium text-foreground">
                Learn2Prompt
              </Link>
            </div>
          </div>
        </nav>

        {/* Centered sign-in prompt - Apple minimal style */}
        <div className="flex items-center justify-center min-h-screen px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-8">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Sign in to view your profile.
            </h1>

            <p className="text-lg text-muted-foreground mb-10">
              Track your progress, achievements, and learning journey.
            </p>

            <Link href="/auth/signin">
              <Button
                size="lg"
                className="h-12 px-8 text-base font-normal rounded-full"
              >
                Sign in
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  // Loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-12">
              <Link href="/" className="text-sm font-medium text-foreground">
                Learn2Prompt
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
        </div>
      </div>
    )
  }

  const user = session?.user
  const coursesStarted = stats?.courseProgress?.length || 0
  const coursesCompleted = stats?.courseProgress?.filter(c => c.completedAt)?.length || 0
  const totalLessonsCompleted = stats?.courseProgress?.reduce((sum, c) => sum + c.completedLessons, 0) || 0

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="text-sm font-medium text-foreground">
              Learn2Prompt
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section - user info */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Avatar */}
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || 'Profile'}
                className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-border/50"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6 border-2 border-border/50">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
            )}

            <h1 className="text-5xl md:text-6xl font-semibold text-foreground tracking-tight mb-2">
              {user?.name?.split(' ')[0] || 'Your Profile'}
            </h1>

            {user?.email && (
              <p className="text-lg text-muted-foreground">
                {user.email}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats section - minimal cards */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-12 text-center">
              Your learning stats.
            </h2>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {/* Total XP */}
              <Card variant="filled" padding="spacious" className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <div className="text-3xl font-semibold text-foreground">
                    {stats?.totalXp || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
              </Card>

              {/* Courses started */}
              <Card variant="filled" padding="spacious" className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <div className="text-3xl font-semibold text-foreground">
                    {coursesStarted}
                  </div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
              </Card>

              {/* Lessons completed */}
              <Card variant="filled" padding="spacious" className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  <div className="text-3xl font-semibold text-foreground">
                    {totalLessonsCompleted}
                  </div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                </div>
              </Card>

              {/* Streak */}
              <Card variant="filled" padding="spacious" className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <div className="text-3xl font-semibold text-foreground">
                    {stats?.streakCount || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course progress section */}
      {stats?.courseProgress && stats.courseProgress.length > 0 && (
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-12 text-center">
                Your courses.
              </h2>

              <div className="space-y-6">
                {stats.courseProgress.map((course, index) => (
                  <motion.div
                    key={course.courseSlug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/courses/${course.courseSlug}`}>
                      <Card variant="default" className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{course.courseIcon}</div>
                              <div>
                                <CardTitle className="text-xl">
                                  {course.courseName}
                                </CardTitle>
                                <CardDescription className="mt-1">
                                  {course.completedLessons} of {course.totalLessons} lessons completed
                                </CardDescription>
                              </div>
                            </div>
                            {course.completedAt && (
                              <Badge variant="success">Completed</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <Progress
                              value={(course.completedLessons / course.totalLessons) * 100}
                              className="h-2"
                            />
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {Math.round((course.completedLessons / course.totalLessons) * 100)}% complete
                              </span>
                              <span className="text-muted-foreground">
                                {course.totalXpEarned} XP earned
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Settings section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-12">
              Settings.
            </h2>

            <div className="flex flex-col items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="h-12 px-8 rounded-full gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - ultra minimal */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>Learn2Prompt by Novagen Labs</span>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <a
                href="https://novagenlabs.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Novagen Labs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
