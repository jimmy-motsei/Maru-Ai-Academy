import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, Badge, Button } from '@/components/ui'
import Link from 'next/link'

export const metadata = {
  title: 'My Dashboard | Maru AI Academy',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  const user = session.user

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
            
            {/* Active Course Card */}
            <Card className="border-l-4 border-l-primary-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge variant="primary" className="mb-2">In Progress</Badge>
                  <h2 className="text-xl font-bold text-gray-900">Beginner Stream: AI Made Simple</h2>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary-600">25%</span>
                  <p className="text-xs text-gray-500">Complete</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Next Lesson: <strong>Understanding LLMs</strong>
                </p>
                <Link href="/modules/ai-made-simple">
                  <Button size="sm">Continue Learning &rarr;</Button>
                </Link>
              </div>
            </Card>

            {/* Recent Achievements */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <div className="text-3xl mb-2">🔥</div>
                <h3 className="font-bold text-gray-900">Day Streak</h3>
                <p className="text-gray-500 text-sm">3 Days - Keep it up!</p>
              </Card>
              <Card>
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-bold text-gray-900">Certificates</h3>
                <p className="text-gray-500 text-sm">0 Earned</p>
              </Card>
            </div>

            {/* Recommended Next Steps */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
              <div className="space-y-4">
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
                </div>
              </div>
              <div className="space-y-2">
                <Link href="/settings" className="block text-sm text-gray-600 hover:text-primary-600">
                  ⚙️ Account Settings
                </Link>
                <Link href="/api/auth/signout" className="block text-sm text-red-600 hover:text-red-700">
                  🚪 Sign Out
                </Link>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-primary-900 text-white">
              <h3 className="font-bold mb-4">Weekly Goal</h3>
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold">2/5</span>
                <span className="text-primary-200 text-sm">Lessons</span>
              </div>
              <p className="text-sm text-primary-200">
                You're on track! Complete 3 more lessons to hit your weekly target.
              </p>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
