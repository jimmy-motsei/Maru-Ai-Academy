import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import PricingContent from './PricingContent'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Launch pricing for Maru AI Academy. From free starter plans to team training - find the right plan for your AI learning journey.',
}

export default async function PricingPage() {
  const session = await getServerSession(authOptions)

  return <PricingContent session={session} />
}

