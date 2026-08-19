import React from 'react'
import { fieldControlClass, fieldErrorClass, fieldHintClass, fieldLabelClass } from './field'

/**
 * Maru Online text input — label, optional hint, error state.
 * Use `mono` for IDs, reference numbers and amounts.
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  /** IBM Plex Mono, for IDs / references / amounts. */
  mono?: boolean
  fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  mono = false,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  // useId gives every field a stable id even without a label, so the
  // label/control pairing and aria-describedby cannot silently break.
  const reactId = React.useId()
  const inputId = id || `input-${reactId}`
  const describedBy = error ? `${inputId}-error` : helperText ? `${inputId}-hint` : undefined

  return (
    <div className={[fullWidth ? 'w-full' : '', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className={fieldLabelClass}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={fieldControlClass({ error: Boolean(error), mono })}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className={fieldErrorClass}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-hint`} className={fieldHintClass}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input
