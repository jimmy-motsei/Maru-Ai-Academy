import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, Badge, Button } from '@/components/ui'
import Link from 'next/link'
import { DashboardProgress } from './components/DashboardProgress'
import { BadgeShowcase } from './components/BadgeShowcase'
import { getUserBadges } from '@/lib/badges'
import { Lightbulb } from 'lucide-react'

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
  const userBadges = await getUserBadges(userId)

  return (
    <div className="min-h-screen bg-maru-cloud py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-heading font-bold text-maru-navy">
            Welcome back, {user?.name || 'Scholar'}!</h1>
          <p className="text-maru-grey mt-2">
            Continue your journey to AI mastery.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Progress Component */}
            <DashboardProgress userId={userId} />

            {/* Badges */}
            <BadgeShowcase userBadges={userBadges} />


            {/* Recommended Next Steps */}
            <div>
              <h2 className="text-xl font-bold text-maru-navy mb-4">Recommended for you</h2>
              <div className="space-y-4">
                <Link href="/modules/ai-made-simple" className="block p-4 bg-white rounded-xl border border-maru-line hover:border-maru-blue-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-maru-blue-100 rounded-lg flex items-center justify-center mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-maru-navy">AI made simple</h4>
                      <p className="text-sm text-maru-grey">Foundations & Safety (Beginner Stream)</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="/modules/prompts-that-work" className="block p-4 bg-white rounded-xl border border-maru-line hover:border-maru-blue-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-verified-bg rounded-lg flex items-center justify-center mr-4"><Lightbulb className="h-8 w-8 text-maru-teal" aria-hidden="true" /></div>
                    <div>
                      <h4 className="font-semibold text-maru-navy">Prompts that work at work</h4>
                      <p className="text-sm text-maru-grey">Master the art of prompting (Beginner Stream)</p>
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
                <div className="w-12 h-12 bg-maru-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-maru-blue-700">
                  {user?.name?.[0] || 'U'}
                </div>
                <div>
                  <p className="font-bold text-maru-navy">{user?.name}</p>
                  <p className="text-sm text-maru-grey">{user?.email}</p>
                  <div className="mt-1">
                    <Badge variant={(user as any).plan === 'PRO' ? 'blue' : 'neutral'}>
                      {(user as any).plan || 'FREE'} PLAN
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {(!((user as any).plan) || (user as any).plan === 'FREE') && (
                  <Link href="/pricing">
                    <Button variant="primary" size="sm" fullWidth className="mb-2">
                      Upgrade to Pro</Button>
                  </Link>
                )}
                <Link href="/settings" className="block text-sm text-maru-grey hover:text-maru-blue-700">Account Settings
                </Link>
                <Link href="/support" className="block text-sm text-maru-grey hover:text-maru-blue-700">Get Support
                </Link>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-maru-blue-100 border-maru-blue-100">
              <h3 className="font-bold text-maru-navy mb-4">Quick actions</h3>
              <div className="space-y-3">
                <Link href="/modules">
                  <Button variant="secondary" size="sm" fullWidth>Browse All Modules
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="sm" fullWidth>Contact Us
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="surface-navy text-white">
              <h3 className="font-bold mb-2">Need help?</h3>
              <p className="text-sm text-maru-blue-100 mb-4">
                Our AI assistant is available 24/7
              </p>
              <p className="text-xs text-maru-blue-100">
                Click the chat icon in the bottom-right corner!</p>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
