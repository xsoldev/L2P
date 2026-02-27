'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
              Terms of Service
            </h1>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">Using Learn2Prompt</h2>
                <p className="leading-relaxed">
                  Learn2Prompt is an educational platform for prompt engineering.
                  Use it to learn, practice, and improve your AI communication skills.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">Your account</h2>
                <p className="leading-relaxed">
                  Creating an account is optional. If you do, you're responsible for
                  keeping your credentials secure. Use a strong password.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">Acceptable use</h2>
                <p className="leading-relaxed">
                  Don't use our platform to generate harmful, illegal, or abusive content.
                  Don't attempt to break or exploit the system. Be respectful.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">AI responses</h2>
                <p className="leading-relaxed">
                  AI-generated content is for educational purposes. We don't guarantee
                  accuracy. Always verify important information independently.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">Changes</h2>
                <p className="leading-relaxed">
                  We may update these terms. Continued use after changes means
                  you accept the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-foreground mb-3">Contact</h2>
                <p className="leading-relaxed">
                  Questions? Reach us at{' '}
                  <a
                    href="mailto:legal@novagenlabs.ai"
                    className="text-foreground hover:underline"
                  >
                    legal@novagenlabs.ai
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
