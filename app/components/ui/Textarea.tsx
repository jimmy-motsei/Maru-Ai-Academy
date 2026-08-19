import React from 'react'
import { fieldControlClass, fieldErrorClass, fieldHintClass, fieldLabelClass } from './field'

/** Maru Online textarea. Matches Input's field styling exactly — see ./field. */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  mono?: boolean
  fullWidth?: boolean
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  mono = false,
  fullWidth = false,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const reactId = React.useId()
  const inputId = id || `textarea-${reactId}`
  const describedBy = error ? `${inputId}-error` : helperText ? `${inputId}-hint` : undefined

  return (
    <div className={[fullWidth ? 'w-full' : '', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className={fieldLabelClass}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
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

export default Textarea
