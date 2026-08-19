import type { Config } from 'tailwindcss'

/**
 * Maru Online Design System — Tailwind mapping.
 *
 * RULE: there are no hex values in this file. Every colour, radius, shadow and
 * type token resolves to a `--maru-*` custom property declared in
 * styles/maru-design-system/tokens/, which is a verbatim vendored copy of the
 * design system. Change a value there, not here.
 *
 * The two exceptions are `white` and `black`, kept as literals because
 * Tailwind can only apply an opacity modifier (`bg-white/80`) to a colour it
 * can parse — it cannot inject alpha into a `var()`. `white` is identical to
 * `--maru-white`; `black` is not a brand colour and exists only for scrims.
 *
 * `theme.colors` is a full replacement, not an extension. That is deliberate:
 * no un-tokenised Tailwind *default* can survive — anything not listed below
 * generates no CSS.
 *
 * It does NOT catch arbitrary values: `bg-[#3DD6D0]` sidesteps the palette
 * entirely and Tailwind will happily emit it. Those have to be found by
 * grepping for `-[#` and fixed by hand.
 *
 * The Phase 1 compatibility bridge — which re-pointed the old `primary`,
 * `gray`, `green`, `red` and `amber` family names at Maru tokens while the
 * consumer sweep was in flight — was removed at the end of Phase 3. Those
 * class names no longer resolve to anything.
 */

/** The four Maru blue stops. */
const blue = {
  DEFAULT: 'var(--maru-blue)',
  700: 'var(--maru-blue-700)',
  300: 'var(--maru-blue-300)',
  100: 'var(--maru-blue-100)',
}

/**
 * Signature teal — the "intelligent layer".
 *
 * Reserved for kicker labels, the "m" mark, and AI/insight-flavoured surfaces.
 * It is NOT a general UI colour: do not use it for chrome, cards, nav, borders
 * or default buttons. Blue is the action colour. In this app the legitimate
 * uses are roughly kicker labels, PromptGym, and the AI grading surfaces.
 * If teal is appearing more than a handful of times on a page, it is wrong.
 */
const teal = {
  DEFAULT: 'var(--maru-teal)',
  600: 'var(--maru-teal-600)',
  300: 'var(--maru-teal-300)',
  100: 'var(--maru-teal-100)',
}

const status = {
  verified: {
    DEFAULT: 'var(--maru-verified)',
    bg: 'var(--maru-verified-bg)',
    fg: 'var(--maru-verified-fg)',
  },
  atrisk: {
    DEFAULT: 'var(--maru-atrisk)',
    bg: 'var(--maru-atrisk-bg)',
    fg: 'var(--maru-atrisk-fg)',
  },
  overdue: {
    DEFAULT: 'var(--maru-overdue)',
    bg: 'var(--maru-overdue-bg)',
    fg: 'var(--maru-overdue-fg)',
  },
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      white: '#ffffff', // == --maru-white; literal so opacity modifiers work
      black: '#000000', // not a brand colour — scrims and overlays only

      maru: {
        blue,
        teal,
        navy: {
          DEFAULT: 'var(--maru-navy)',
          700: 'var(--maru-navy-700)',
        },
        slate: 'var(--maru-slate)',
        ink: 'var(--maru-ink)',
        grey: {
          DEFAULT: 'var(--maru-grey)',
          300: 'var(--maru-grey-300)',
          'on-dark': 'var(--maru-grey-on-dark)',
        },
        line: 'var(--maru-line)',
        cloud: 'var(--maru-cloud)',
        white: 'var(--maru-white)',
      },

      ...status,
    },

    extend: {
      fontFamily: {
        sans: ['var(--maru-font-body)'],
        body: ['var(--maru-font-body)'],
        display: ['var(--maru-font-display)'],
        heading: ['var(--maru-font-display)'],
        mono: ['var(--maru-font-mono)'],
      },

      /**
       * The Maru type scale: 48 / 36 / 28 / 22 / 18 / 16 / 14 / 12.
       * Line-height 1.2 for headings (>= 22), 1.6 for body (<= 18).
       *
       * The semantic names are what new code should use. The numeric aliases
       * below them are a rung-for-rung substitution of Tailwind's ladder onto
       * this eight-step scale, so existing markup snaps onto the grid without
       * editing every file. Hierarchy is preserved; absolute sizes shift, and
       * everything above 5xl caps at the system's 48px display maximum.
       */
      fontSize: {
        display: ['var(--maru-fs-display)', { lineHeight: 'var(--maru-lh-tight)', letterSpacing: 'var(--maru-tracking-tight)' }],
        h1: ['var(--maru-fs-h1)', { lineHeight: 'var(--maru-lh-tight)' }],
        h2: ['var(--maru-fs-h2)', { lineHeight: 'var(--maru-lh-tight)' }],
        h3: ['var(--maru-fs-h3)', { lineHeight: 'var(--maru-lh-tight)' }],
        h4: ['var(--maru-fs-h4)', { lineHeight: 'var(--maru-lh-body)' }],
        body: ['var(--maru-fs-body)', { lineHeight: 'var(--maru-lh-body)' }],
        small: ['var(--maru-fs-small)', { lineHeight: 'var(--maru-lh-body)' }],
        caption: ['var(--maru-fs-caption)', { lineHeight: 'var(--maru-lh-body)' }],

        xs: ['var(--maru-fs-caption)', { lineHeight: 'var(--maru-lh-body)' }],
        sm: ['var(--maru-fs-small)', { lineHeight: 'var(--maru-lh-body)' }],
        base: ['var(--maru-fs-body)', { lineHeight: 'var(--maru-lh-body)' }],
        lg: ['var(--maru-fs-h4)', { lineHeight: 'var(--maru-lh-body)' }],
        xl: ['var(--maru-fs-h3)', { lineHeight: 'var(--maru-lh-tight)' }],
        '2xl': ['var(--maru-fs-h2)', { lineHeight: 'var(--maru-lh-tight)' }],
        '3xl': ['var(--maru-fs-h1)', { lineHeight: 'var(--maru-lh-tight)' }],
        '4xl': ['var(--maru-fs-display)', { lineHeight: 'var(--maru-lh-tight)', letterSpacing: 'var(--maru-tracking-tight)' }],
        '5xl': ['var(--maru-fs-display)', { lineHeight: 'var(--maru-lh-tight)', letterSpacing: 'var(--maru-tracking-tight)' }],
        '6xl': ['var(--maru-fs-display)', { lineHeight: 'var(--maru-lh-tight)', letterSpacing: 'var(--maru-tracking-tight)' }],
        '7xl': ['var(--maru-fs-display)', { lineHeight: 'var(--maru-lh-tight)', letterSpacing: 'var(--maru-tracking-tight)' }],
        '8xl': ['var(--maru-fs-display)', { lineHeight: 'var(--maru-lh-tight)', letterSpacing: 'var(--maru-tracking-tight)' }],
      },

      lineHeight: {
        tight: 'var(--maru-lh-tight)',
        body: 'var(--maru-lh-body)',
      },

      letterSpacing: {
        kicker: 'var(--maru-tracking-kicker)',
        tight: 'var(--maru-tracking-tight)',
        mono: 'var(--maru-tracking-mono)',
      },

      /**
       * The 8pt grid (4/8/12/16/24/32/48/64/96) is already a subset of
       * Tailwind's default 4px scale, so the default scale is kept and only
       * named aliases are added. The old arbitrary `128`/`144` extensions are
       * removed — nothing referenced them.
       */
      spacing: {
        'maru-1': 'var(--maru-space-1)',
        'maru-2': 'var(--maru-space-2)',
        'maru-3': 'var(--maru-space-3)',
        'maru-4': 'var(--maru-space-4)',
        'maru-5': 'var(--maru-space-5)',
        'maru-6': 'var(--maru-space-6)',
        'maru-7': 'var(--maru-space-7)',
        'maru-8': 'var(--maru-space-8)',
        'maru-9': 'var(--maru-space-9)',
      },

      maxWidth: {
        content: 'var(--maru-content-max)',
      },

      /** 6px inputs · 12px cards · 20px large surfaces · 999px pills & buttons. */
      borderRadius: {
        input: 'var(--maru-radius-sm)',
        card: 'var(--maru-radius-md)',
        surface: 'var(--maru-radius-lg)',
        pill: 'var(--maru-radius-pill)',

        DEFAULT: 'var(--maru-radius-sm)',
        sm: 'var(--maru-radius-sm)',
        md: 'var(--maru-radius-sm)',
        lg: 'var(--maru-radius-md)',
        xl: 'var(--maru-radius-md)',
        '2xl': 'var(--maru-radius-lg)',
        '3xl': 'var(--maru-radius-lg)',
        full: 'var(--maru-radius-pill)',
      },

      /**
       * Navy-tinted, low-contrast elevation. Nothing heavier than
       * --maru-shadow-lg exists, so `xl` and `2xl` both cap there.
       * The old blue `glow` shadows are gone — not in the Maru system.
       */
      boxShadow: {
        sm: 'var(--maru-shadow-sm)',
        DEFAULT: 'var(--maru-shadow-sm)',
        md: 'var(--maru-shadow-md)',
        lg: 'var(--maru-shadow-md)',
        xl: 'var(--maru-shadow-lg)',
        '2xl': 'var(--maru-shadow-lg)',
        none: 'none',
      },

      backgroundImage: {
        /** Reserved for hero, nav and cover surfaces. */
        'maru-navy': 'var(--maru-gradient-navy)',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
