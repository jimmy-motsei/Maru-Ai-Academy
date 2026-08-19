'use client';

import { useState } from 'react';
import { Badge, Button, Card } from '@/components/ui';
import Link from 'next/link';
import PaystackButton from '@/components/pricing/PaystackButton';
import CurrencySelector from '@/components/pricing/CurrencySelector';
import { PRICING, Currency } from '@/lib/pricing';

interface PricingContentProps {
  session: any;
}

export default function PricingContent({ session }: PricingContentProps) {
  const [currency, setCurrency] = useState<Currency>('ZAR');
  const user = session?.user;
  const pricing = PRICING[currency];

  return (
    <div className="bg-maru-cloud min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-maru-navy text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Launch Pricing – Limited Time Offer
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-maru-navy mb-6">
            Invest in your future productivity
          </h1>
          <p className="text-xl text-maru-grey mb-8">
            Simple, transparent pricing. Choose the plan that fits your learning goals.
          </p>
          
          <CurrencySelector selected={currency} onChange={setCurrency} />
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Free Explorer Tier */}
          <Card className="relative flex flex-col p-6 border hover:border-maru-blue-100" hover>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-maru-navy">Free explorer</h3>
              <p className="text-maru-grey text-sm mt-1">Start your AI journey.</p>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-maru-navy font-mono tracking-mono">{pricing.symbol}0</span>
              <span className="text-maru-grey text-sm">/month</span>
            </div>
            <Link href={session ? "/dashboard" : "/auth/signup?plan=starter"} className="w-full mb-6">
              <Button variant="secondary" fullWidth size="sm">{session ? 'Go to Dashboard' : 'Get Started Free'}</Button>
            </Link>
            
            <div className="space-y-3 flex-grow">
              <p className="font-medium text-maru-navy text-sm">Includes:</p>
              <ul className="space-y-2 text-maru-grey text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-verified-fg mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  First Module Free
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-verified-fg mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Basic Prompt Library
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-verified-fg mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  AI Learning Assistant
                </li>
              </ul>
            </div>
          </Card>

          {/* Learner Tier */}
          <Card className="relative flex flex-col p-6 border hover:border-maru-blue-100" hover>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-maru-navy">AI cadet</h3>
              <p className="text-maru-grey text-sm mt-1">Beginner Stream access.</p>
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-maru-navy font-mono tracking-mono">{pricing.symbol}{pricing.LEARNER}</span>
              <span className="text-maru-grey text-sm">/month</span>
              {currency === 'ZAR' && <span className="text-xs text-maru-grey font-mono tracking-mono">($11)</span>}
            </div>
            
            <div className="w-full mb-6">
              {session ? (
                <PaystackButton
                  email={user?.email || ''}
                  amount={pricing.LEARNER}
                  currency={currency}
                  plan="LEARNER"
                  userId={(user as any)?.id || ''}
                  label="Subscribe"
                />
              ) : (
                <Link href="/auth/signup?plan=learner">
                  <Button variant="secondary" fullWidth size="sm">Start 7-Day Trial</Button>
                </Link>
              )}
            </div>
            
            <div className="space-y-3 flex-grow">
              <p className="font-medium text-maru-navy text-sm">Everything in Free, plus:</p>
              <ul className="space-y-2 text-maru-grey text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <strong>All Beginner Modules</strong>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Prompt Templates
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Aviator Badge
                </li>
              </ul>
            </div>
          </Card>

          {/* Pro Tier (Popular) */}
          <Card className="relative flex flex-col p-6 border-2 border-maru-blue shadow-xl scale-105 z-10" hover>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maru-navy text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              BEST VALUE
            </div>
            <div className="mb-4 mt-2">
              <h3 className="text-lg font-bold text-maru-navy">AI captain</h3>
              <p className="text-maru-grey text-sm mt-1">Full access to all content.</p>
            </div>
            <div className="mb-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-maru-navy font-mono tracking-mono">{pricing.symbol}{pricing.PRO}</span>
              <span className="text-maru-grey text-sm">/month</span>
              {currency === 'ZAR' && <span className="text-xs text-maru-grey font-mono tracking-mono">($22)</span>}
            </div>
            <p className="text-xs text-verified-fg font-medium mb-4">Launch price – save 28%</p>
            
            <div className="w-full mb-6">
              {session ? (
                <PaystackButton
                  email={user?.email || ''}
                  amount={pricing.PRO}
                  currency={currency}
                  plan="PRO"
                  userId={(user as any)?.id || ''}
                />
              ) : (
                <Link href="/auth/signup?plan=pro">
                  <Button variant="primary" fullWidth size="sm">Start 7-Day Free Trial</Button>
                </Link>
              )}
            </div>
            
            <div className="space-y-3 flex-grow">
              <p className="font-medium text-maru-navy text-sm">Everything in AI Cadet, plus:</p>
              <ul className="space-y-2 text-maru-grey text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <strong>All Intermediate Modules</strong>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Full Resource Library
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  AI Learning Assistant
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Accomplishment Badge
                </li>
              </ul>
            </div>
          </Card>

          {/* Team Tier */}
          <Card className="relative flex flex-col p-6 border hover:border-maru-blue-100" hover>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-maru-navy">AI crew</h3>
              <p className="text-maru-grey text-sm mt-1">For organizations (5+ seats).</p>
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-maru-navy font-mono tracking-mono">{pricing.symbol}{pricing.TEAM}</span>
              <span className="text-maru-grey text-sm">/user/mo</span>
              {currency === 'ZAR' && <span className="text-xs text-maru-grey font-mono tracking-mono">($16)</span>}
            </div>
            <div className="w-full mb-6">
              <Link href="/contact">
                <Button variant="secondary" fullWidth size="sm">Contact Sales</Button>
              </Link>
            </div>
            
            <div className="space-y-3 flex-grow">
              <p className="font-medium text-maru-navy text-sm">Everything in Pro, plus:</p>
              <ul className="space-y-2 text-maru-grey text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Admin Dashboard
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Team Analytics
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Custom Learning Paths
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-maru-blue-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Priority Support
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* View All Courses CTA */}
        <div className="mt-16 text-center">
          <p className="text-maru-grey mb-4">
            Want to see what you'll learn?
          </p>
          <Link href="/modules">
            <Button variant="secondary" size="lg">
              View Full Curriculum →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
