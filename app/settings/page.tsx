import { Metadata } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, Input, Button, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Settings | Maru AI Academy',
  description: 'Manage your account settings and preferences',
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const user = session.user as any

  return (
    <div className="min-h-screen bg-maru-cloud py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="text-maru-grey hover:text-maru-blue-700 mb-4 inline-flex items-center text-sm font-medium transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-maru-navy mt-4">Account settings</h1>
          <p className="text-maru-grey mt-2">Manage your profile and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-maru-navy mb-4">Profile information</h2>
            <form className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                defaultValue={user.name || ''}
                placeholder="Your full name"
                fullWidth
              />
              <Input
                label="Email Address"
                type="email"
                defaultValue={user.email || ''}
                disabled
                fullWidth
              />
              <p className="text-sm text-maru-grey">
                Contact support to change your email address
              </p>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          </Card>

          {/* Plan Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-maru-navy mb-4">Subscription plan</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-maru-grey">Current Plan</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={user.plan === 'FREE' ? 'neutral' : 'blue'}>
                    {user.plan || 'FREE'} PLAN
                  </Badge>
                </div>
              </div>
              {(!user.plan || user.plan === 'FREE') && (
                <Link href="/pricing">
                  <Button variant="primary">
                    Upgrade to Pro
                  </Button>
                </Link>
              )}
            </div>
            {user.plan === 'PRO' && (
              <p className="text-sm text-maru-grey">
                You have access to all modules and learning paths.
              </p>
            )}
          </Card>

          {/* Security */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-maru-navy mb-4">Security</h2>
            <form className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                fullWidth
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                fullWidth
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                fullWidth
              />
              <Button variant="primary" type="submit">
                Update Password
              </Button>
            </form>
          </Card>

          {/* Preferences */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-maru-navy mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p id="notify-email-label" className="font-medium text-maru-navy">Email Notifications</p>
                  <p className="text-sm text-maru-grey">Receive updates about new modules and features</p>
                </div>
                <input type="checkbox" defaultChecked aria-labelledby="notify-email-label" className="h-5 w-5 accent-maru-blue" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p id="notify-progress-label" className="font-medium text-maru-navy">Progress Emails</p>
                  <p className="text-sm text-maru-grey">Weekly summary of your learning progress</p>
                </div>
                <input type="checkbox" defaultChecked aria-labelledby="notify-progress-label" className="h-5 w-5 accent-maru-blue" />
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-overdue-bg">
            <h2 className="text-xl font-semibold text-overdue-fg mb-4">Danger zone</h2>
            <p className="text-maru-grey mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="secondary" className="text-overdue-fg border-overdue hover:bg-overdue-bg">
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
