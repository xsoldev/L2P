'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogIn, LogOut, User, Loader2 } from 'lucide-react'

interface AuthButtonProps {
  className?: string
  showName?: boolean
}

export function AuthButton({ className, showName = true }: AuthButtonProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Button variant="ghost" size="sm" disabled className={className}>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {showName && (
          <div className="flex items-center gap-2">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || ''}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {session.user?.name || session.user?.email}
            </span>
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
          className={className}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => signIn()}
      className={className}
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  )
}
