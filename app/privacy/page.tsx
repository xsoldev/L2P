'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-12">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-8">
              Privacy Policy
            </h1>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">What we collect</h2>
                <p className="leading-relaxed">
                  When you use Learn2Prompt, we collect only what's necessary: your email address
                  if you sign in, and your learning progress. That's it.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">How we use it</h2>
                <p className="leading-relaxed">
                  Your data syncs your progress across devices. We don't sell it,
                  share it with advertisers, or use it for anything else.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">AI interactions</h2>
                <p className="leading-relaxed">
                  Your prompts are sent to AI providers to generate responses.
                  We don't store your conversations after your session ends.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">Your control</h2>
                <p className="leading-relaxed">
                  You can use Learn2Prompt without an account. Delete your account anytime
                  and we'll remove all your data.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">Contact</h2>
                <p className="leading-relaxed">
                  Questions? Reach us at{' '}
                  <a
                    href="mailto:privacy@novagenlabs.ai"
                    className="text-foreground hover:underline"
                  >
                    privacy@novagenlabs.ai
                  </a>
                </p>
              </section>

              <p className="text-sm pt-8 border-t border-border/50">
                Last updated: December 2024
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
