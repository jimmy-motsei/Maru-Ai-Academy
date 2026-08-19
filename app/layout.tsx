// Maru AI Academy v1.1.0 - Jan 9, 2026
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Header, Footer } from './components/layouts'
import { SessionProvider } from './components/providers'
import { brandTokens } from './lib/brand-tokens'

/**
 * The Maru Online Design System's three families, self-hosted by next/font.
 *
 * The system's own tokens/fonts.css pulls these from Google Fonts with an
 * @import, which is a render-blocking request; next/font serves them from our
 * own origin instead. Weights are exactly those the system specifies — do not
 * add more. app/globals.css re-points --maru-font-* at these faces.
 */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Viewport metadata is a plain string, so it cannot read the CSS token.
  themeColor: brandTokens.navy,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://academy.maruonline.com'),
  title: {
    default: 'Maru AI Academy - Master AI Productivity',
    template: '%s | Maru AI Academy',
  },
  description: 'AI Productivity Training Platform for African Professionals. Learn to use AI effectively in your business - from basic concepts to advanced team automation.',
  manifest: '/manifest.json',
  keywords: ['AI training', 'AI productivity', 'business automation', 'AI academy', 'Africa', 'professional development'],
  authors: [{ name: 'Maru AI Academy', url: 'https://academy.maruonline.com' }],
  creator: 'Maru Online',
  publisher: 'Maru Online',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://academy.maruonline.com',
    siteName: 'Maru AI Academy',
    title: 'Maru AI Academy - Master AI Productivity',
    description: 'Transform your business workflows with AI. Learn from basic concepts to advanced automation for African professionals.',
    images: [
      {
        url: '/social-launch.png',
        width: 1200,
        height: 630,
        alt: 'Maru AI Academy - AI Productivity Training',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maru AI Academy - Master AI Productivity',
    description: 'AI Productivity Training Platform for African Professionals',
    images: ['/social-launch.png'],
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://academy.maruonline.com',
  },
}

import ChatWidget from './components/ChatWidget'

// ... existing imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${poppins.variable} ${plexMono.variable}`}>
      <body className="font-sans">
        <SessionProvider>
          {/* Visible only on keyboard focus — lets keyboard and screen-reader
              users jump the nav instead of tabbing it on every page. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                       focus:rounded-pill focus:bg-maru-navy focus:px-5 focus:py-2.5
                       focus:font-semibold focus:text-white focus:outline-none
                       focus:ring-2 focus:ring-maru-blue focus:ring-offset-2"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1} className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </SessionProvider>
      </body>
    </html>
  )
}

