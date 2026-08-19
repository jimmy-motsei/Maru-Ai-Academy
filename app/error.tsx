'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-maru-cloud flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-overdue-bg rounded-full flex items-center justify-center mx-auto mb-6"><AlertTriangle className="h-8 w-8 text-maru-teal" aria-hidden="true" /></div>
        <h2 className="text-2xl font-bold text-maru-navy mb-4">
          Something went wrong!
        </h2>
        <p className="text-maru-grey mb-8">
          We apologize for the inconvenience. Please try again or contact support if the problem persists.
        </p>
        <div className="space-x-4">
          <Button variant="primary" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}
