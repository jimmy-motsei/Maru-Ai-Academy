import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui'
import { Book, Video, Code, FileText, Zap, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation | Maru AI Academy',
  description: 'Comprehensive guides and documentation for Maru AI Academy',
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-maru-cloud py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-maru-navy mb-4">Documentation & guides</h1>
          <p className="text-xl text-maru-grey">Everything you need to master AI productivity</p>
        </div>

        {/* Quick Start */}
        <Card className="p-8 mb-12 bg-maru-blue-100 border-maru-blue-100">
          <div className="flex items-start gap-4">
            <Zap className="w-12 h-12 text-maru-blue-700 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-maru-navy mb-2">Quick start guide</h2>
              <p className="text-maru-grey mb-4">
                New to Maru AI Academy? Start here to learn the basics and get up to speed quickly.
              </p>
              <div className="space-y-2">
                <Link href="/auth/signup" className="text-maru-blue-700 hover:text-maru-blue-700 font-semibold block">
                  1. Create your free account →
                </Link>
                <Link href="/modules" className="text-maru-blue-700 hover:text-maru-blue-700 font-semibold block">
                  2. Explore the Beginner Stream →
                </Link>
                <Link href="/dashboard" className="text-maru-blue-700 hover:text-maru-blue-700 font-semibold block">
                  3. Track your progress →
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Getting Started */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Book className="w-10 h-10 text-maru-blue-700 mb-4" />
            <h3 className="text-xl font-bold text-maru-navy mb-3">Getting started</h3>
            <ul className="space-y-2 text-maru-grey">
              <li>
                <Link href="#intro" className="hover:text-maru-blue-700 transition-colors">
                  → Introduction to AI Productivity
                </Link>
              </li>
              <li>
                <Link href="#account" className="hover:text-maru-blue-700 transition-colors">
                  → Setting up your account
                </Link>
              </li>
              <li>
                <Link href="#first-module" className="hover:text-maru-blue-700 transition-colors">
                  → Completing your first module
                </Link>
              </li>
              <li>
                <Link href="#navigation" className="hover:text-maru-blue-700 transition-colors">
                  → Navigating the platform
                </Link>
              </li>
            </ul>
          </Card>

          {/* Learning Paths */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <FileText className="w-10 h-10 text-maru-blue-700 mb-4" />
            <h3 className="text-xl font-bold text-maru-navy mb-3">Learning paths</h3>
            <ul className="space-y-2 text-maru-grey">
              <li>
                <Link href="/modules" className="hover:text-maru-blue-700 transition-colors">
                  → Beginner Stream (Free)
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-maru-blue-700 transition-colors">
                  → Intermediate Stream (Pro)
                </Link>
              </li>
              <li>
                <Link href="#certificates" className="hover:text-maru-blue-700 transition-colors">
                  → Earning certificates
                </Link>
              </li>
              <li>
                <Link href="#progress" className="hover:text-maru-blue-700 transition-colors">
                  → Tracking your progress
                </Link>
              </li>
            </ul>
          </Card>

          {/* Video Tutorials */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Video className="w-10 h-10 text-maru-blue-700 mb-4" />
            <h3 className="text-xl font-bold text-maru-navy mb-3">Video tutorials</h3>
            <ul className="space-y-2 text-maru-grey">
              <li>
                <Link href="#platform-tour" className="hover:text-maru-blue-700 transition-colors">
                  → Platform walkthrough
                </Link>
              </li>
              <li>
                <Link href="#module-demo" className="hover:text-maru-blue-700 transition-colors">
                  → Module completion demo
                </Link>
              </li>
              <li>
                <Link href="#ai-tools" className="hover:text-maru-blue-700 transition-colors">
                  → AI tools overview
                </Link>
              </li>
              <li>
                <Link href="#tips" className="hover:text-maru-blue-700 transition-colors">
                  → Learning tips & tricks
                </Link>
              </li>
            </ul>
          </Card>

          {/* Module Guides */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Code className="w-10 h-10 text-maru-blue-700 mb-4" />
            <h3 className="text-xl font-bold text-maru-navy mb-3">Module guides</h3>
            <ul className="space-y-2 text-maru-grey">
              <li>
                <Link href="/modules/ai-made-simple" className="hover:text-maru-blue-700 transition-colors">
                  → AI Made Simple
                </Link>
              </li>
              <li>
                <Link href="/modules/prompts-that-work" className="hover:text-maru-blue-700 transition-colors">
                  → Prompts That Work
                </Link>
              </li>
              <li>
                <Link href="/modules/picking-tools" className="hover:text-maru-blue-700 transition-colors">
                  → Picking Tools
                </Link>
              </li>
              <li>
                <Link href="/modules/first-workflow" className="hover:text-maru-blue-700 transition-colors">
                  → Your First Workflow
                </Link>
              </li>
            </ul>
          </Card>

          {/* Team Features */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Users className="w-10 h-10 text-maru-blue-700 mb-4" />
            <h3 className="text-xl font-bold text-maru-navy mb-3">For teams</h3>
            <ul className="space-y-2 text-maru-grey">
              <li>
                <Link href="/pricing" className="hover:text-maru-blue-700 transition-colors">
                  → Team plans
                </Link>
              </li>
              <li>
                <Link href="#team-management" className="hover:text-maru-blue-700 transition-colors">
                  → Managing team members
                </Link>
              </li>
              <li>
                <Link href="#reporting" className="hover:text-maru-blue-700 transition-colors">
                  → Progress reporting
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-maru-blue-700 transition-colors">
                  → Enterprise solutions
                </Link>
              </li>
            </ul>
          </Card>

          {/* Account & Billing */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <FileText className="w-10 h-10 text-maru-blue-700 mb-4" />
            <h3 className="text-xl font-bold text-maru-navy mb-3">Account & billing</h3>
            <ul className="space-y-2 text-maru-grey">
              <li>
                <Link href="/settings" className="hover:text-maru-blue-700 transition-colors">
                  → Account settings
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-maru-blue-700 transition-colors">
                  → Upgrade your plan
                </Link>
              </li>
              <li>
                <Link href="#billing" className="hover:text-maru-blue-700 transition-colors">
                  → Billing & payments
                </Link>
              </li>
              <li>
                <Link href="#cancel" className="hover:text-maru-blue-700 transition-colors">
                  → Cancel subscription
                </Link>
              </li>
            </ul>
          </Card>
        </div>

        {/* Support CTA */}
        <Card className="p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-maru-navy mb-2">Can't find what you're looking for?</h2>
          <p className="text-maru-grey mb-6">
            Our support team is here to help you succeed
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/support">
              <button className="px-6 py-3 bg-maru-blue text-white rounded-lg font-semibold hover:bg-maru-blue-700 transition-colors">
                Contact Support
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 border-2 border-maru-line text-maru-grey rounded-lg font-semibold hover:border-maru-blue hover:text-maru-blue-700 transition-colors">
                Send Feedback
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
