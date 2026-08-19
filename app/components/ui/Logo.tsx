import React from 'react'
import Image from 'next/image'

/**
 * The Maru Online logo, from the brand's own asset recoloured to the design
 * system's navy and teal. Ported from components/core/Logo.jsx.
 *
 * Not in the nine components the reskin brief lists, but Header and Footer
 * both need the asset and duplicating the markup in two places is how logo
 * usage drifts. `variant="reversed"` is for navy / dark / photographic
 * backgrounds; `markOnly` is the "m" alone.
 *
 * ┌ FLAG ─────────────────────────────────────────────────────────────────┐
 * │ These are high-res PNG exports, not vector. The design system's own    │
 * │ Logo.prompt.md asks for an SVG master "once available". PNG means the  │
 * │ mark softens on high-DPI displays and cannot be recoloured in CSS.     │
 * │ Do not trace or generate an SVG — that would alter the mark. This      │
 * │ needs a real vector export from the brand source.                      │
 * └────────────────────────────────────────────────────────────────────────┘
 *
 * Intrinsic sizes: full lockup 1681×643, mark 522×317, wordmark 1191×299.
 */

export interface LogoProps {
  variant?: 'primary' | 'reversed'
  markOnly?: boolean
  wordmarkOnly?: boolean
  /** Rendered height in px; width follows the asset's aspect ratio. */
  height?: number
  className?: string
  priority?: boolean
}

const ASSETS = {
  full: { primary: '/brand/maru-logo-primary.png', reversed: '/brand/maru-logo-reversed.png', w: 1681, h: 643 },
  mark: { primary: '/brand/maru-mark.png', reversed: '/brand/maru-mark-reversed.png', w: 522, h: 317 },
  wordmark: { primary: '/brand/maru-wordmark.png', reversed: '/brand/maru-wordmark-reversed.png', w: 1191, h: 299 },
} as const

export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  markOnly = false,
  wordmarkOnly = false,
  height = 40,
  className = '',
  priority = false,
}) => {
  const asset = markOnly ? ASSETS.mark : wordmarkOnly ? ASSETS.wordmark : ASSETS.full
  const src = asset[variant]
  const width = Math.round((asset.w / asset.h) * height)

  return (
    <Image
      src={src}
      alt="Maru Online"
      width={width}
      height={height}
      priority={priority}
      className={`block h-auto w-auto ${className}`}
      style={{ height, width }}
    />
  )
}

export default Logo
