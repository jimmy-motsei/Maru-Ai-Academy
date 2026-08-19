import React from 'react'

/**
 * Maru Online surface card.
 *
 * Per components/core/Card.prompt.md: white, hairline border, 12px radius.
 * The border IS the default elevation — `raised` is only for surfaces that
 * genuinely float above other content. `intelligent` swaps the border to
 * teal to flag an AI/insight panel, which is one of teal's few sanctioned
 * uses.
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Soft navy-tinted shadow, for panels that float above content. */
  raised?: boolean
  /** Teal border — AI / insight panels only. */
  intelligent?: boolean
  /** Calm shadow lift on hover. No transform: the system is not flashy. */
  hover?: boolean
  noPadding?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  raised = false,
  intelligent = false,
  hover = true,
  noPadding = false,
  ...props
}) => (
  <div
    className={[
      'rounded-card border bg-white transition-shadow duration-200',
      intelligent ? 'border-maru-teal-300' : 'border-maru-line',
      raised ? 'shadow-md' : 'shadow-sm',
      hover ? 'hover:shadow-md' : '',
      noPadding ? '' : 'p-6',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </div>
)

export default Card
