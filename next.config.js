/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude the old API folder from the build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /**
   * /modules is retired in favour of /learn.
   *
   * /modules rendered client-side from the Cloud Run API at
   * NEXT_PUBLIC_API_URL, which returns 503 on every endpoint — including its
   * own root and /health. Live visitors to academy.maruonline.com/modules got
   * "Error loading modules: Failed to fetch". /learn shows the same curriculum
   * from app/types/curriculum.ts, needs no API, and prerenders.
   *
   * Only the four Beginner modules are deep-linkable at /learn/<slug>; the
   * Intermediate stream is a locked teaser on the index. So the four are
   * mapped precisely and everything else lands on the index rather than
   * 404ing. Remove these rules if the API is ever brought back.
   */
  async redirects() {
    const beginner = [
      'ai-made-simple',
      'prompts-that-work',
      'no-code-quick-wins',
      'first-live-workflow',
    ]
    return [
      { source: '/modules', destination: '/learn', permanent: true },
      ...beginner.map((slug) => ({
        source: `/modules/${slug}`,
        destination: `/learn/${slug}`,
        permanent: true,
      })),
      // Intermediate slugs and any lesson-level deep link have no /learn
      // equivalent yet — send them to the curriculum index, never a 404.
      { source: '/modules/:path*', destination: '/learn', permanent: true },
    ]
  },

  // API rewrites to backend (only for modules API - auth and other routes are local)
  async rewrites() {
    return [
      {
        source: '/api/modules',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/modules`,
      },
      {
        source: '/api/modules/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/modules/:path*`,
      },
    ];
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
