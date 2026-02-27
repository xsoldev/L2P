'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { HeroSection, CourseCard, StreakWidget, StreakWidgetPlaceholder } from '@/components/features/home'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User, Settings, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

// Static course data (matches seed data)
const courses = [
  {
    slug: 'business',
    name: 'Business Prompting',
    description: 'Master prompt engineering for professional productivity. Learn to write emails, create reports, analyze data, and automate workflows.',
    icon: '💼',
    color: '#007AFF',
    difficulty: 'intermediate',
    targetAge: null,
    lessonsCount: 15,
  },
  {
    slug: 'creative',
    name: 'Creative Prompting',
    description: 'Unleash your creativity with AI. Master storytelling, copywriting, and image generation prompts for creative professionals.',
    icon: '🎨',
    color: '#FF2D55',
    difficulty: 'intermediate',
    targetAge: null,
    lessonsCount: 15,
  },
  {
    slug: 'kids',
    name: 'AI Adventures',
    description: 'A fun journey into the world of AI! Learn how to talk to computers and create amazing things together.',
    icon: '🚀',
    color: '#FF9500',
    difficulty: 'beginner',
    targetAge: '8-14',
    lessonsCount: 15,
  },
  {
    slug: 'elderly',
    name: 'AI Made Simple',
    description: 'A gentle, clear introduction to using AI assistants. Learn at your own pace with practical examples for everyday life.',
    icon: '📚',
    color: '#34C759',
    difficulty: 'beginner',
    targetAge: '65+',
    lessonsCount: 15,
  },
]

export default function Home() {
  const { data: session, status } = useSession()

  // TODO: Fetch user progress from API when database is connected
  const userProgress = {
    streakCount: 0,
    xp: 0,
    level: 1,
    dailyGoalCompleted: false,
    weeklyXp: 0,
    courseProgress: {} as Record<string, number>,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="font-semibold text-foreground">Learn2Prompt</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Leaderboard
              </Link>
            </div>

            {/* Auth */}
            <div className="flex items-center gap-3">
              {status === 'loading' ? (
                <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
              ) : session ? (
                <div className="flex items-center gap-2">
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="gap-2">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline">{session.user?.name?.split(' ')[0]}</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut()}
                    className="text-muted-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* User Progress Widget (if logged in) */}
        {session ? (
          <div className="mb-12">
            <StreakWidget
              streakCount={userProgress.streakCount}
              xp={userProgress.xp}
              level={userProgress.level}
              dailyGoalCompleted={userProgress.dailyGoalCompleted}
              weeklyXp={userProgress.weeklyXp}
            />
          </div>
        ) : (
          <div className="mb-12">
            <StreakWidgetPlaceholder />
          </div>
        )}

        {/* Courses Section */}
        <section id="courses" className="scroll-mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Choose Your Path
              </h2>
              <p className="text-muted-foreground mt-1">
                Select a course tailored to your needs
              </p>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard
                  {...course}
                  completedLessons={userProgress.courseProgress[course.slug] || 0}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Learn With Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our interactive courses make learning prompt engineering fun and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Learn by Doing',
                description: 'Practice with real AI responses. Every lesson includes hands-on exercises.',
              },
              {
                icon: '🎮',
                title: 'Gamified Learning',
                description: 'Earn XP, maintain streaks, unlock achievements, and compete on leaderboards.',
              },
              {
                icon: '📱',
                title: 'Learn Anywhere',
                description: 'Progress syncs across devices. Continue where you left off.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Master AI Prompting?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of learners who have improved their AI communication skills.
            </p>
            <Link href="#courses">
              <Button size="lg" className="text-base px-8">
                Start Learning Free
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">L</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Learn2Prompt by Novagen Labs
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
