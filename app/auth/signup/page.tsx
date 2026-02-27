'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    try {
      // Create account
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setIsLoading(false)
        return
      }

      // Sign in automatically after signup
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError('Account created but sign in failed. Please try signing in.')
        setIsLoading(false)
        return
      }

      // Redirect to home
      router.push('/')
      router.refresh()
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

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

      {/* Centered content */}
      <div className="pt-32 pb-20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-md"
        >
          {/* Massive heading */}
          <h1 className="text-[clamp(2.5rem,7vw,4rem)] font-semibold text-foreground leading-[1.05] tracking-tight mb-2 text-center">
            Get started.
          </h1>

          <p className="text-xl text-muted-foreground text-center mb-16">
            Create an account to save your progress.
          </p>

          {/* Form - clean and minimal */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-2xl text-center">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <label htmlFor="name" className="text-sm text-muted-foreground">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 px-4 text-base"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="email" className="text-sm text-muted-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12 px-4 text-base"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="password" className="text-sm text-muted-foreground">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12 px-4 text-base"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="confirmPassword" className="text-sm text-muted-foreground">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="h-12 px-4 text-base"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base rounded-full mt-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">or</span>
            </div>
          </div>

          {/* Social sign in - minimal */}
          <div className="space-y-3">
            <Button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              variant="outline"
              className="w-full h-12 text-base rounded-full"
            >
              Continue with Google
            </Button>

            <Button
              onClick={() => signIn('github', { callbackUrl: '/' })}
              variant="outline"
              className="w-full h-12 text-base rounded-full"
            >
              Continue with GitHub
            </Button>
          </div>

          {/* Sign in link */}
          <p className="text-sm text-center text-muted-foreground mt-12">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
