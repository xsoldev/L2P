'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CertificatePage() {
  const userName = 'Alex Chen'
  const score = 185
  const completedLessons = 7
  const courseName = 'Business'

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Certificate content - centered and minimal */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            {/* Massive congratulations */}
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-semibold text-foreground leading-[1.05] tracking-tight mb-6">
              Well done.
            </h1>

            {/* User name */}
            <p className="text-[clamp(1.5rem,4vw,2rem)] text-muted-foreground font-normal mb-20">
              {userName}
            </p>

            {/* Course completion */}
            <div className="space-y-2 mb-20">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                Completed
              </p>
              <p className="text-3xl font-semibold text-foreground">
                {courseName}
              </p>
            </div>

            {/* Stats - minimal, clean */}
            <div className="flex items-center justify-center gap-16 mb-20 text-center">
              <div>
                <div className="text-4xl font-semibold text-foreground mb-1">
                  {completedLessons}
                </div>
                <div className="text-sm text-muted-foreground">
                  Lessons
                </div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-foreground mb-1">
                  {score}
                </div>
                <div className="text-sm text-muted-foreground">
                  Points
                </div>
              </div>
            </div>

            {/* Simple divider */}
            <div className="w-24 h-px bg-border mx-auto mb-20"></div>

            {/* Branding - understated */}
            <div className="space-y-2 mb-20">
              <p className="text-sm text-muted-foreground">
                Learn2Prompt
              </p>
              <p className="text-xs text-muted-foreground/70">
                Novagen Labs
              </p>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Link href="/">
                <Button size="lg" className="h-12 px-8 text-base rounded-full">
                  Continue learning
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Share at learn2prompt.xyz
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
