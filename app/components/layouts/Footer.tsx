import Link from 'next/link'
import { Logo } from '../ui'

/**
 * Site footer. Navy surface with the reversed logo lockup.
 *
 * Body copy uses --maru-grey-on-dark, the token the design system provides
 * for exactly this (8.13:1 on navy). Links go teal-300 on hover — 6.52:1 —
 * rather than blue, which is unreadable against navy.
 */

const QUICK_LINKS = [
  { href: '/modules', label: 'Modules' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
]

const RESOURCE_LINKS = [
  { href: '/docs', label: 'Documentation' },
  { href: '/support', label: 'Support' },
  { href: '/contact', label: 'Contact' },
]

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms of service' },
  { href: '/refund-policy', label: 'Refund policy' },
  { href: '/cancellation-policy', label: 'Cancellation policy' },
]

const footerLinkClass =
  'rounded-input transition-colors hover:text-maru-teal-300 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-teal-300 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-maru-navy'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-maru-navy text-maru-grey-on-dark">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="mb-4 inline-flex rounded-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-maru-navy"
            >
              <Logo variant="reversed" height={32} />
            </Link>
            <p className="max-w-md">
              Master AI productivity tools and transform your business workflows. Learn from basic AI concepts to
              advanced team automation.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-maru-navy-700 pt-8 md:flex-row">
          <p className="text-sm">
            © <span className="font-mono tracking-mono">{currentYear}</span> Maru AI Academy. All rights reserved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 md:mt-0 md:gap-6">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={`text-sm ${footerLinkClass}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
