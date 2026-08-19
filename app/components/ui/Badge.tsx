import React from 'react'

/**
 * Maru Online badge.
 *
 * Two jobs in one component:
 *
 * 1. Emphasis chips — `neutral` / `blue` / `teal` / `navy`, per
 *    components/core/Badge.prompt.md. Counts, categories, "New".
 * 2. The status language — `verified` / `atrisk` / `overdue`, per
 *    components/core/StatusPill.prompt.md. The design system is explicit that
 *    these are a GENERIC state language, so they are the correct vocabulary
 *    for course progress (complete / in progress / locked). Do not invent a
 *    parallel set.
 *
 * Status tones render a dot alongside the label because the system requires
 * colour + dot + label, never colour alone.
 *
 * `teal` is the signature accent — use it for AI/insight labels only.
 */

export type BadgeTone =
  | 'neutral'
  | 'blue'
  | 'teal'
  | 'navy'
  | 'verified'
  | 'atrisk'
  | 'overdue'
  // Deprecated pre-reskin aliases, removed in Phase 3.
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: BadgeTone
  size?: 'sm' | 'md' | 'lg'
  /** Status tones show a dot by default; set explicitly to override. */
  dot?: boolean
}

/** Pre-reskin names mapped onto the system's vocabulary. */
const alias: Record<string, Exclude<BadgeTone, 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>> = {
  primary: 'blue',
  info: 'blue',
  // `secondary` was the violet ramp. Maru has no purple, and teal is reserved,
  // so it lands on neutral rather than borrowing the signature accent.
  secondary: 'neutral',
  success: 'verified',
  warning: 'atrisk',
  danger: 'overdue',
}

const toneClasses = {
  neutral: 'border border-maru-line bg-maru-cloud text-maru-grey',
  blue: 'bg-maru-blue-100 text-maru-blue-700',
  teal: 'bg-maru-teal-100 text-maru-teal-600',
  navy: 'bg-maru-navy text-white',
  verified: 'bg-verified-bg text-verified-fg',
  atrisk: 'bg-atrisk-bg text-atrisk-fg',
  overdue: 'bg-overdue-bg text-overdue-fg',
} as const

const dotClasses = {
  verified: 'bg-verified',
  atrisk: 'bg-atrisk',
  overdue: 'bg-overdue',
  neutral: 'bg-maru-grey-300',
  blue: 'bg-maru-blue',
  teal: 'bg-maru-teal',
  navy: 'bg-white',
} as const

const sizeClasses = {
  sm: 'px-2 py-0.5 text-caption',
  md: 'px-2.5 py-1 text-caption',
  lg: 'px-3 py-1.5 text-sm',
} as const

const STATUS_TONES = ['verified', 'atrisk', 'overdue'] as const

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot,
  className = '',
  ...props
}) => {
  const tone = (alias[variant] ?? variant) as keyof typeof toneClasses
  const showDot = dot ?? (STATUS_TONES as readonly string[]).includes(tone)

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-pill font-semibold',
        toneClasses[tone],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {showDot && (
        <span className={`h-1.5 w-1.5 flex-none rounded-pill ${dotClasses[tone]}`} aria-hidden="true" />
      )}
      {children}
    </span>
  )
}

export default Badge
