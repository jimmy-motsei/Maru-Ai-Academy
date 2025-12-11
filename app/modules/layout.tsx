import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Curriculum',
  description: 'Explore the complete Maru AI Academy curriculum. Beginner and Intermediate streams covering AI fundamentals, prompting, automation, and governance.',
  openGraph: {
    title: 'Curriculum - Maru AI Academy',
    description: 'Comprehensive AI training curriculum - from beginner to intermediate. Master AI productivity step by step.',
  },
}

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
