import React from 'react'

/**
 * The recurring Maru section label that sits above a heading — uppercase
 * Poppins in teal, wide tracking. Ported from components/core/KickerLabel.jsx;
 * the Academy had no equivalent.
 *
 * This is one of teal's sanctioned uses. On navy or dark surfaces pass
 * `onDark` so it takes teal-300, which clears AA against navy at 6.52:1
 * (plain teal on navy does not).
 *
 *   <KickerLabel>What you will learn</KickerLabel>
 *   <KickerLabel onDark>04 · Curriculum</KickerLabel>
 */

export interface KickerLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  /** Use on navy / dark / photographic backgrounds. */
  onDark?: boolean
}

export const KickerLabel: React.FC<KickerLabelProps> = ({
  children,
  onDark = false,
  className = '',
  ...props
}) => (
  <p
    className={[
      'font-display text-caption font-semibold uppercase tracking-kicker',
      onDark ? 'text-maru-teal-300' : 'text-maru-teal',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </p>
)

export default KickerLabel
