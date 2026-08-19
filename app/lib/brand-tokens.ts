/**
 * Maru Online brand colours as literal values.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THIS IS THE ONLY FILE IN THE REPO ALLOWED TO RESTATE A TOKEN AS A HEX STRING.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Everything that renders in a browser must use the CSS custom properties in
 * styles/maru-design-system/tokens/colors.css, via the Tailwind classes in
 * tailwind.config.ts. Use this file only where custom properties genuinely
 * cannot resolve:
 *
 *   - app/components/pdf/CertificatePDF.tsx  @react-pdf/renderer has no
 *                                            CSS-variable support
 *   - app/lib/email.ts                       email clients do not resolve
 *   - app/actions/sendCertificate.ts         custom properties
 *   - app/layout.tsx  (themeColor)           Next.js viewport metadata is a
 *                                            plain string, not CSS
 *
 * These values are a hand-kept mirror of tokens/colors.css. If a colour
 * changes there, change it here too — nothing enforces it automatically.
 * Last reconciled against the vendored tokens: 2026-08-19.
 */

export const brandTokens = {
  /** Primary action / link. */
  blue: '#008BD1',
  /** Hover / pressed blue. */
  blue700: '#0069A0',
  blue300: '#66BEE6',
  blue100: '#D8EFF9',

  /** Ink, dark surfaces, headings. */
  navy: '#001C2A',
  /** Gradient pair / raised dark. */
  navy700: '#0A3242',
  slate: '#262832',

  /** Signature accent — the "intelligent layer". Use sparingly. */
  teal: '#1A7A8A',
  teal600: '#14606D',
  teal300: '#5FA9B4',
  teal100: '#DCEDEF',

  verified: '#55BB53',
  verifiedBg: '#E9F7E8',
  verifiedFg: '#2E7D2C',
  atRisk: '#F2A100',
  atRiskBg: '#FDF1DA',
  atRiskFg: '#9A6800',
  overdue: '#E0533D',
  overdueBg: '#FBE6E1',
  overdueFg: '#A8331F',

  /** Body text. */
  grey: '#5F5F5F',
  /** Muted / placeholder — never body text (2.56:1 on white). */
  grey300: '#9AA3AB',
  /** Body text on navy. */
  greyOnDark: '#9FB4BE',
  /** Hairlines / borders. */
  line: '#E2E8EC',
  /** Light app / section background. */
  cloud: '#F5F7FA',
  white: '#FFFFFF',
} as const

export type BrandToken = keyof typeof brandTokens

/** The font stacks, for the same non-CSS contexts. */
export const brandFonts = {
  display: "'Poppins', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
} as const
