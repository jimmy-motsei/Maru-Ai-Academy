import { Metadata } from 'next'
import PricingContent from './PricingContent'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Launch pricing for Maru AI Academy. From free starter plans to team training - find the right plan for your AI learning journey.',
}

/**
 * Deliberately does NOT call getServerSession.
 *
 * Reading the session on the server marks the whole route dynamic, which puts
 * every plan, price and heading behind a Suspense boundary. The only thing
 * that reaches the first HTML flush is app/loading.tsx, so crawlers and AI
 * answer engines received a spinner: measured against a production build, this
 * page shipped 475 words with no <h1>, no prices and no plan names, while
 * /about shipped 1,207 words.
 *
 * Nothing here needs the session on the server. PricingContent reads it
 * client-side with useSession() instead, so the page prerenders in full and
 * the two session-dependent CTAs resolve after hydration.
 */
export default function PricingPage() {
  return <PricingContent />
}
