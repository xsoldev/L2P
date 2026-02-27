'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
      <div className="container mx-auto px-4">
        {/* Centered, minimal content - Apple style */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Massive headline - Apple's signature */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(3rem,8vw,6rem)] font-semibold text-foreground leading-[1.05] tracking-tight"
          >
            Learn to prompt.
          </motion.h1>

          {/* Secondary line - slightly muted */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(1.5rem,4vw,2.5rem)] text-muted-foreground font-normal mt-2 tracking-tight"
          >
            Get better results from AI.
          </motion.p>

          {/* Minimal CTA - lots of breathing room */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-12"
          >
            <Link href="#courses">
              <Button
                size="lg"
                className="h-12 px-8 text-lg font-normal rounded-full"
              >
                Start learning
              </Button>
            </Link>
          </motion.div>

          {/* Simple metadata - understated */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-sm text-muted-foreground/70"
          >
            Free. No account required.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
