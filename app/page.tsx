'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { HeroSection, CourseCard } from '@/components/features/home'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { User, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const courses = [
  {
    slug: 'business',
    name: 'Business',
    description: 'Emails, reports, and workflows.',
    image: '/assets/courses/business-icon.png',
    color: '#007AFF',
    difficulty: 'intermediate',
    targetAge: null,
    lessonsCount: 15,
  },
  {
    slug: 'creative',
    name: 'Creative',
    description: 'Stories, copy, and images.',
    image: '/assets/courses/creative-icon.png',
    color: '#FF2D55',
    difficulty: 'intermediate',
    targetAge: null,
    lessonsCount: 15,
  },
  {
    slug: 'kids',
    name: 'Kids',
    description: 'Fun AI adventures.',
    image: '/assets/courses/kids-icon.png',
    color: '#FF9500',
    difficulty: 'beginner',
    targetAge: '8-14',
    lessonsCount: 15,
  },
  {
    slug: 'elderly',
    name: 'Seniors',
    description: 'Simple and clear.',
    image: '/assets/courses/elderly-icon.png',
    color: '#34C759',
    difficulty: 'beginner',
    targetAge: '65+',
    lessonsCount: 15,
  },
]

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav - Apple style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="text-sm font-medium text-foreground">
              Learn2Prompt
            </Link>

            <div className="flex items-center gap-4">
              {status === 'loading' ? (
                <div className="w-6 h-6 rounded-full bg-secondary animate-pulse" />
              ) : session ? (
                <div className="flex items-center gap-3">
                  <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {session.user?.name?.split(' ')[0] || 'Profile'}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link href="/auth/signin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection />

      {/* Courses - Apple-style section */}
      <section id="courses" className="py-32 scroll-mt-20">
        <div className="container mx-auto px-6">
          {/* Section header - centered, minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              Choose your path.
            </h2>
            <p className="text-xl text-muted-foreground mt-4">
              Four courses. Same principles. Different applications.
            </p>
          </motion.div>

          {/* Course grid - clean, spacious */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {courses.map((course, index) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/courses/${course.slug}`} className="block group">
                  <div className="text-center p-6 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={course.image}
                        alt={course.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {course.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Apple minimal section */}
      <section className="py-32 bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-8">
              Three ideas.<br />
              <span className="text-muted-foreground">That's all you need.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 text-left">
              <div>
                <div className="text-6xl font-light text-muted-foreground/30 mb-4">1</div>
                <h3 className="text-lg font-medium text-foreground mb-2">Be specific</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Vague prompts get vague results. Say exactly what you need.
                </p>
              </div>
              <div>
                <div className="text-6xl font-light text-muted-foreground/30 mb-4">2</div>
                <h3 className="text-lg font-medium text-foreground mb-2">Add context</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  AI doesn't know your situation. Give it background.
                </p>
              </div>
              <div>
                <div className="text-6xl font-light text-muted-foreground/30 mb-4">3</div>
                <h3 className="text-lg font-medium text-foreground mb-2">Iterate</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your first try won't be perfect. Refine and improve.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - minimal */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-6">
              Ready to start?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Pick a course and write your first prompt in minutes.
            </p>
            <Link href="#courses">
              <Button
                size="lg"
                className="h-12 px-8 text-lg font-normal rounded-full"
              >
                Get started
              </Button>
            </Link>
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
