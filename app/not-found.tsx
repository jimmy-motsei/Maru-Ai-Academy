import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved or doesn't exist.
        </p>
        <div className="space-x-4">
          <Link href="/">
            <Button variant="primary">Go Home</Button>
          </Link>
          <Link href="/modules">
            <Button variant="outline">Browse Modules</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
