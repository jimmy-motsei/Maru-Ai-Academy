import React from 'react'

/**
 * Maru Online button.
 *
 * Grammar follows components/core/Button.prompt.md: `primary` for the main
 * action, `secondary` for alternatives, `ghost` for low emphasis, and `accent`
 * — teal — for AI/insight actions ONLY. Teal is the signature "intelligent
 * layer" colour and must not become a general-purpose button; if you are
 * reaching for `accent` for an ordinary action, use `primary`.
 *
 * Pill radius per readme.md, tokens/spacing.css and the written spec. The
 * upstream Button.jsx reference uses 6px and is the outlier — see the
 * "Known upstream issue" note in styles/maru-design-system/README.md.
 *
 * Hover darkens the fill. The button never resizes on press.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** `outline` is a deprecated alias for `secondary`, removed in Phase 3. */
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  children: React.ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill ' +
  'font-semibold leading-none transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maru-blue ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

const variantClasses: Record<Exclude<ButtonVariant, 'outline'>, string> = {
  primary:
    'border border-maru-blue bg-maru-blue text-white ' +
    'hover:border-maru-blue-700 hover:bg-maru-blue-700 ' +
    'active:border-maru-blue-700 active:bg-maru-blue-700',
  secondary:
    'border border-maru-line bg-white text-maru-navy ' +
    'hover:bg-maru-cloud active:bg-maru-cloud',
  ghost:
    'border border-transparent bg-transparent text-maru-blue-700 ' +
    'hover:bg-maru-blue-100 active:bg-maru-blue-100',
  // Teal. AI / insight actions only.
  accent:
    'border border-maru-teal bg-maru-teal text-white ' +
    'hover:border-maru-teal-600 hover:bg-maru-teal-600 ' +
    'active:border-maru-teal-600 active:bg-maru-teal-600',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'min-h-11 px-5 py-2.5 text-base',
  lg: 'min-h-11 px-6 py-3 text-lg',
  icon: 'h-11 w-11 p-0',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const resolved = variant === 'outline' ? 'secondary' : variant

  return (
    <button
      className={[
        base,
        variantClasses[resolved],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin motion-reduce:animate-none"
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
          {children}
        </>
      ) : (
        <>
          {iconLeft}
          {children}
          {iconRight}
        </>
      )}
    </button>
  )
}

export default Button
