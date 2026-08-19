# Maru Online Design System — vendored copy

**This is a vendored copy. Do not edit the values in these files.**

| | |
|---|---|
| Upstream path | `~/Documents/Claude/maruonline/01_BRAND/Design-System/` |
| Files vendored | `styles.css`, `tokens/{fonts,colors,typography,spacing}.css` |
| Copied | 2026-08-19 |
| Copied by | Design system reskin, `feat/design-system-reskin` |
| Upstream version | Unversioned. Token files last modified upstream 2026-06-22. |

## Why these live in the repo

The design system's home is a Google Drive folder on one machine. A build that
reads tokens across a Drive sync boundary breaks on any other developer's
machine and breaks in CI, where that path does not exist at all. Vendoring the
tokens makes the repo self-contained: the Academy builds from its own copy and
never reaches outside the working tree for a colour value.

The trade-off is that this copy goes stale silently. There is no automated sync.

## Re-syncing

When the upstream system changes, re-copy by hand and verify nothing drifted:

```bash
DS=~/Documents/Claude/maruonline/01_BRAND/Design-System
cp "$DS/styles.css" styles/maru-design-system/styles.css
cp "$DS/tokens/"{fonts,colors,typography,spacing}.css styles/maru-design-system/tokens/
for f in styles.css tokens/fonts.css tokens/colors.css tokens/typography.css tokens/spacing.css; do
  diff -q "$DS/$f" "styles/maru-design-system/$f" >/dev/null && echo "OK  $f" || echo "DIFF $f"
done
```

Then update the **Copied** date above, and re-check anything in
`tailwind.config.ts` that maps onto a token that changed.

## How it is wired in

`app/globals.css` imports `tokens/colors.css`, `tokens/typography.css` and
`tokens/spacing.css` directly, ahead of the Tailwind directives. Everything in
`tailwind.config.ts` resolves to a `var(--maru-*)` from those three files, so
the tokens are the single source of truth for colour, type, spacing, radius and
elevation across the app.

### `styles.css` and `fonts.css` are vendored but not imported

Both are kept verbatim so this directory is a faithful copy of the upstream
system, but neither is loaded by the app:

- **`fonts.css`** pulls Poppins, Inter and IBM Plex Mono from Google Fonts via
  `@import`, which is a render-blocking request. The app loads the same three
  families with the same weights through `next/font/google` in
  `app/layout.tsx`, which self-hosts them and eliminates the round trip.
  Importing `fonts.css` as well would download every font twice.
- **`styles.css`** is the upstream entry point and its only job is to `@import`
  the four token files — including `fonts.css`. Importing it would reintroduce
  the duplicate font load, so `app/globals.css` imports the three value-bearing
  token files individually instead.

If the font strategy ever changes, `fonts.css` is the reference for which
families and weights the system expects.

## Known upstream issue

`components/core/Button.jsx` upstream renders buttons at
`var(--maru-radius-sm)` (6px). That contradicts `readme.md`, the comment on
`--maru-radius-pill` in `tokens/spacing.css` (*"status pills, tags, buttons"*),
and the written spec, all three of which say buttons are pill. This repo
follows the written spec — **buttons are `999px`** — per a decision on
2026-08-19. Worth correcting upstream so the reference implementation and the
documentation agree.

## Literal hex outside these tokens

Three files cannot consume CSS custom properties and must use literal hex:

- `app/components/pdf/CertificatePDF.tsx` — `@react-pdf/renderer` has no
  CSS-variable support
- `app/lib/email.ts` and `app/actions/sendCertificate.ts` — email clients do
  not resolve custom properties

They import typed constants from `app/lib/brand-tokens.ts`, which mirrors the
values in `tokens/colors.css`. **If a colour changes here, change it there
too** — that file is the only place in the repo allowed to restate a token
value as a literal.
