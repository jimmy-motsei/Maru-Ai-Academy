'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button, Logo } from '../ui'

/**
 * Site header. White surface, hairline base, Maru wordmark.
 *
 * Nav links use blue-700 on hover rather than blue: at 14–16px they are
 * normal-size text, where --maru-blue is 3.74:1 on white and fails AA.
 * blue-700 is 5.95:1.
 */

const NAV_LINKS = [
  { href: '/modules', label: 'Modules' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
]

const navLinkClass =
  'whitespace-nowrap font-medium text-maru-navy transition-colors hover:text-maru-blue-700 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-blue ' +
  'focus-visible:ring-offset-2 rounded-input'

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 border-b border-maru-line bg-white/95 shadow-sm backdrop-blur-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-blue focus-visible:ring-offset-2"
          >
            <Logo markOnly height={28} priority />
            <span className="whitespace-nowrap font-display text-lg font-semibold text-maru-navy sm:text-xl">Maru AI Academy</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <a
              href="https://maruonline.com"
              className="flex items-center gap-1 whitespace-nowrap rounded-input text-sm font-medium text-maru-grey transition-colors hover:text-maru-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-blue focus-visible:ring-offset-2"
            >
              ← Maru Online
            </a>

            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={navLinkClass}>
                {label}
              </Link>
            ))}

            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm font-medium text-maru-grey lg:block">
                    Hi, {session.user?.name?.split(' ')[0] || 'there'}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-pill border border-maru-blue-100 bg-maru-blue-100 font-semibold text-maru-blue-700">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/signin" className={navLinkClass}>
                  Log in
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">
                    Get started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-input text-maru-navy transition-colors hover:bg-maru-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-blue focus-visible:ring-offset-2 lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="border-t border-maru-line py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="https://maruonline.com"
                className="flex min-h-11 items-center rounded-input font-medium text-maru-grey transition-colors hover:text-maru-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-blue focus-visible:ring-offset-2"
              >
                ← Back to Maru Online
              </a>

              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className={`flex min-h-11 items-center ${navLinkClass}`}>
                  {label}
                </Link>
              ))}

              {session ? (
                <>
                  <Link href="/dashboard" className={`flex min-h-11 items-center ${navLinkClass}`}>
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="flex min-h-11 items-center rounded-input text-left font-medium text-overdue-fg transition-colors hover:text-overdue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-blue focus-visible:ring-offset-2"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className={`flex min-h-11 items-center ${navLinkClass}`}>
                    Log in
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="primary" size="sm" fullWidth>
                      Get started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
