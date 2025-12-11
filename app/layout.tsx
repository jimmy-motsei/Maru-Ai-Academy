import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { Header, Footer } from './components/layouts'
import { SessionProvider } from './components/providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
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
    locale: 'en_US',
    url: 'https://academy.maruonline.com',
    siteName: 'Maru AI Academy',
    title: 'Maru AI Academy - Master AI Productivity',
    description: 'Transform your business workflows with AI. Learn from basic concepts to advanced automation for African professionals.',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://academy.maruonline.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans">
        <SessionProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}

