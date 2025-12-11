import { Metadata } from 'next'
import { Badge, Button, Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for Maru AI Academy. From free starter plans to team training - find the right plan for your AI learning journey.',
  openGraph: {
    title: 'Pricing - Maru AI Academy',
    description: 'Invest in your future productivity. Simple, transparent pricing with a 30-day money-back guarantee.',
  },
}

export default function PricingPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">Flexible Pricing</Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
            Invest in Your Future Productivity
          </h1>
          <p className="text-xl text-gray-600">
            Simple, transparent pricing. Choose the plan that fits your learning goals.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Free Tier */}
          <Card className="relative flex flex-col p-8 border hover:border-primary-200" hover>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">Starter</h3>
              <p className="text-gray-500 mt-2">For individuals just exploring AI.</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500">/month</span>
            </div>
            <Button variant="outline" fullWidth className="mb-8">Get Started Free</Button>
            
            <div className="space-y-4 flex-grow">
              <p className="font-semibold text-gray-900">Includes:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Module 1 of Beginner Stream
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Basic Prompt Library
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Community Forum Access
                </li>
              </ul>
            </div>
          </Card>

          {/* Pro Tier (Popular) */}
          <Card className="relative flex flex-col p-8 border-2 border-primary-500 shadow-xl scale-105 z-10" hover>
            <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              MOST POPULAR
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">Pro Academy</h3>
              <p className="text-gray-500 mt-2">For professionals serious about upskilling.</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$29</span>
              <span className="text-gray-500">/month</span>
            </div>
            <Button variant="primary" fullWidth className="mb-8">Start 7-Day Free Trial</Button>
            
            <div className="space-y-4 flex-grow">
              <p className="font-semibold text-gray-900">Everything in Starter, plus:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <strong>All Beginner & Intermediate Modules</strong>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Full Resource Library & Templates
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Weekly Live Q&A Sessions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Certificate of Completion
                </li>
              </ul>
            </div>
          </Card>

          {/* Team Tier */}
          <Card className="relative flex flex-col p-8 border hover:border-primary-200" hover>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">Team</h3>
              <p className="text-gray-500 mt-2">For organizations training their workforce.</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$99</span>
              <span className="text-gray-500">/month per 5 seats</span>
            </div>
            <Button variant="outline" fullWidth className="mb-8">Contact Sales</Button>
            
            <div className="space-y-4 flex-grow">
              <p className="font-semibold text-gray-900">Everything in Pro, plus:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Admin Dashboard & Analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Team Progress Tracking
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Custom Learning Paths
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Priority Support
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Guarantee */}
        <div className="text-center mt-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-6">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-gray-600">
            If you're not completely satisfied with the course content, we'll refund your subscription. No questions asked.
          </p>
        </div>
      </div>
    </div>
  )
}
