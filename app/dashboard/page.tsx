import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, Badge, Button } from '@/components/ui'
import Link from 'next/link'
import { DashboardProgress } from './components/DashboardProgress'

export const metadata = {
  title: 'My Dashboard | Maru AI Academy',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  const user = session.user
  const userId = (user as any).id

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            Welcome back, {user?.name || 'Scholar'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your journey to AI mastery.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Progress Component */}
            <DashboardProgress userId={userId} />

            {/* Recommended Next Steps */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
              <div className="space-y-4">
                <Link href="/modules/ai-made-simple" className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      🤖
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">AI Made Simple</h4>
                      <p className="text-sm text-gray-500">Foundations & Safety (Beginner Stream)</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="/modules/prompts-that-work" className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      💡
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Prompts That Work at Work</h4>
                      <p className="text-sm text-gray-500">Master the art of prompting (Beginner Stream)</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl font-bold text-primary-700">
                  {user?.name?.[0] || 'U'}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <div className="mt-1">
                    <Badge variant={(user as any).plan === 'PRO' ? 'success' : 'neutral'}>
                      {(user as any).plan || 'FREE'} PLAN
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {(!((user as any).plan) || (user as any).plan === 'FREE') && (
                  <Link href="/pricing">
                    <Button variant="primary" size="sm" fullWidth className="mb-2">
                      Upgrade to Pro ✨
                    </Button>
                  </Link>
                )}
                <Link href="/settings" className="block text-sm text-gray-600 hover:text-primary-600">
                  ⚙️ Account Settings
                </Link>
                <Link href="/support" className="block text-sm text-gray-600 hover:text-primary-600">
                  💬 Get Support
                </Link>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-primary-50 border-primary-200">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/modules">
                  <Button variant="outline" size="sm" fullWidth>
                    📚 Browse All Modules
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="sm" fullWidth>
                    📧 Contact Us
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="bg-gradient-to-br from-primary-900 to-primary-700 text-white">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-primary-100 mb-4">
                Our AI assistant is available 24/7
              </p>
              <p className="text-xs text-primary-200">
                Click the chat icon in the bottom-right corner! 💬
              </p>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
