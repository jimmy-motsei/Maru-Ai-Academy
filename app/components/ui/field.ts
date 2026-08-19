/**
 * Shared field styling for Input and Textarea.
 *
 * The two components had byte-identical class strings before the reskin and
 * had already drifted apart in small ways. Keeping the styling in one place
 * means a token change lands on both.
 *
 * Per components/core/Input.prompt.md: 6px radius, line border, blue focus
 * ring, `mono` variant for IDs, reference numbers and amounts.
 */

export const fieldLabelClass = 'mb-2 block text-sm font-medium text-maru-navy'

export const fieldHintClass = 'mt-1.5 text-sm text-maru-grey'

export const fieldErrorClass = 'mt-1.5 text-sm text-overdue-fg'

export function fieldControlClass(opts: { error?: boolean; mono?: boolean }): string {
  return [
    'w-full rounded-input border bg-white px-3 py-2.5 text-maru-navy',
    'placeholder:text-maru-grey-300',
    'transition-[border-color,box-shadow] duration-150',
    'focus:outline-none focus:ring-[3px]',
    'disabled:cursor-not-allowed disabled:bg-maru-cloud disabled:text-maru-grey-300',
    opts.mono ? 'font-mono tracking-mono' : '',
    opts.error
      ? 'border-overdue focus:border-overdue focus:ring-overdue-bg'
      : 'border-maru-line focus:border-maru-blue focus:ring-maru-blue-100',
  ]
    .filter(Boolean)
    .join(' ')
}
