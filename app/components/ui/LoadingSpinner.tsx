import React from 'react'

/**
 * Maru Online loading spinner. Blue, since it stands in for a pending action.
 * Announced to screen readers and stilled under prefers-reduced-motion.
 */

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Announced to assistive technology. */
  label?: string
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  label = 'Loading',
}) => (
  <div className={`flex items-center justify-center ${className}`} role="status">
    <svg
      className={`animate-spin text-maru-blue motion-reduce:animate-none ${sizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span className="sr-only">{label}</span>
  </div>
)

export default LoadingSpinner
