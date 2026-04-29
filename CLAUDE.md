# CLAUDE.md — Project Intelligence File
> Living document. Update after every correction. Ruthlessly iterate until mistake rate drops.
> Sources: Boris Cherny (Claude Code creator), Vercel react-best-practices, community-sourced X/GitHub tips, UI/UX 2025 standards.

---

## 🧠 About Me & This Project Context

- **Stack**: Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Role**: AI-powered marketing consultancy (Maru Online) + freelance Next.js development
- **Clients**: South African SMEs — law firms, agri-IoT, marketing tools
- **Pattern**: Build once, reuse across client projects. Prioritise speed + quality.
- **AI Tools**: Claude Code, Claude.ai, MCP integrations

---

## ⚙️ Workflow Orchestration

### Plan Mode First
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways mid-task: **STOP** — switch back to plan mode and re-plan
- Write detailed specs upfront to reduce ambiguity and improve autonomy
- One proven pattern: draft plan → review as "staff engineer" → execute

### Self-Improvement Loop
- After ANY correction from me: update this `CLAUDE.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate measurably drops
- Review lessons at session start for relevant projects

### Verification Before Done
- Never mark a task complete without proving it works
- Diff behaviour between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### Demand Elegance
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

---

## 🏗️ Architecture & Code Quality

### Project Structure (Next.js App Router)
```
src/
  app/              # App Router pages & layouts
  components/
    ui/             # Reusable base UI components (shadcn/ui primitives)
    layout/         # Layout components (Header, Sidebar, Footer)
    features/       # Feature-specific components (auth, dashboard, etc.)
  hooks/            # Custom React hooks
  lib/              # Utilities, configs, helpers
  services/         # API calls & external service integrations
  types/            # Shared TypeScript interfaces
  constants/        # App-wide constants
```

### Component Rules
- Break EVERYTHING into small, reusable components — avoid 2000-line monsters
- Request structure: `/components/ui/` → `/components/layout/` → `/components/features/`
- One component = one clear responsibility
- Compose organisms from atoms, not the reverse
- Export named components — avoid anonymous default exports

### TypeScript
- Type API responses and requests with strict schemas (Zod preferred)
- No `any` types without explicit justification
- Type all component props explicitly
- Use TypeScript interfaces over type aliases for objects

### State & Data
- Use React Query (TanStack Query) for server state
- useState/useReducer for local UI state only
- Avoid prop drilling beyond 2 levels — use context or state manager
- Co-locate state as close to where it's used as possible

---

## 🎨 UI & Frontend Design Standards

### Design System First
- Always use CSS variables / design tokens — never hardcode hex values
- Define and commit to a color palette before building components
- Typography hierarchy: display → heading → body → caption — use it consistently
- Spacing scale: use Tailwind's spacing system (no arbitrary values without reason)

### The "No AI Slop" Rule
Avoid at all costs:
- Generic font families: Inter, Roboto, Arial, system-ui as primary fonts
- Purple gradients on white backgrounds
- Cookie-cutter layouts with no visual hierarchy
- Components that look identical to every other SaaS product

Instead, commit to a clear aesthetic direction:
- Pick a tone (brutally minimal / editorial / luxury / industrial) and execute it fully
- Use distinctive font pairings (display + body)
- Add atmosphere: gradient meshes, subtle textures, shadows with intent

### Reusable Component Checklist
Every component should have:
- [ ] All interactive states: default, hover, focus, active, disabled
- [ ] Dark mode support (if applicable)
- [ ] Responsive behaviour documented
- [ ] Accessibility notes (keyboard nav, ARIA, focus rings)
- [ ] TypeScript props typed

### Style Guide Maintenance
- Define colour palette, typography scale, and spacing in `/styles/tokens.css` or Tailwind config
- Keep a `/docs/design-system.md` or Storybook updated
- When adding new components: reference existing patterns first

---

## ♿ Accessibility (WCAG 2.2 — 2025 Standard)

**MUST**:
- All interactive elements have descriptive `aria-label` or visible text
- Keyboard navigation works for all interactive elements (Tab, Enter, Escape, Arrow keys)
- Colour contrast ratio: minimum 4.5:1 for body text, 3:1 for large text
- Focus rings visible on all focusable elements — never `outline: none` without a replacement
- All images have meaningful `alt` attributes (empty `alt=""` for decorative images)
- Form inputs have associated `<label>` elements

**SHOULD**:
- Test with screen reader simulation before shipping
- Include skip-to-content links on page layouts
- Announce dynamic content changes with `aria-live`
- Support `prefers-reduced-motion` for all animations

---

## 📱 Responsive Design

- **Mobile-first**: start from smallest breakpoint, scale up
- Tailwind breakpoints: `sm` (640), `md` (768), `lg` (1024), `xl` (1280), `2xl` (1536)
- Test every layout at 375px (iPhone SE), 768px (tablet), 1440px (desktop)
- Use container queries for component-level responsiveness where appropriate
- Touch targets: minimum 44×44px on mobile

---

## ⚡ Performance

**MUST**:
- Implement code splitting and lazy loading for routes and heavy components
- Use `next/image` for all images — proper formats (WebP, AVIF) and responsive sizes
- Implement proper caching strategies (browser cache, CDN, service worker where applicable)
- Avoid blocking the main thread — offload heavy work

**SHOULD**:
- Monitor bundle size — audit dependencies regularly (`next build` output)
- Use virtual scrolling for lists with 1000+ items
- Prefer SSG/ISR for marketing pages; SSR only when content is truly dynamic
- Keep Core Web Vitals green: LCP < 2.5s, CLS < 0.1, INP < 200ms

---

## 🔌 API & Data Layer

- Type all API responses and requests (Zod or TypeScript interfaces)
- Handle network failures gracefully with retry logic
- Show user-friendly error messages — never expose raw error objects
- Implement optimistic UI updates where UX benefit justifies complexity
- Use environment variables for all API keys — never hardcode

---

## 🧪 Testing

- Write tests for business-critical flows first
- Test accessibility with keyboard navigation in every PR
- Include visual regression tests for critical UI components
- Test on multiple browsers: Chrome, Firefox, Safari

---

## 🚀 Deployment Checklist (Pre-PR)

1. Run full test suite — 100% pass rate
2. Check bundle size impact (`next build`)
3. Verify accessibility compliance (keyboard nav, contrast)
4. Test responsive layout at 375px, 768px, 1440px
5. Check dark mode (if applicable)
6. Verify no `console.error` or warnings in production build
7. Conventional commit format: `<type>[scope]: <description>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Scopes: `ui`, `api`, `auth`, `dashboard`, etc.

---

## 💡 Prompting Best Practices (For Me)

### Get Better Results from Claude
- Be specific with visual direction: "Ocean Depth palette with glassmorphism" beats "style this nicely"
- Specify the stack explicitly upfront: "Next.js 14, Tailwind 3.4, TypeScript, shadcn/ui"
- Ask for component structure before implementation: "Show me the architecture first"
- Reference quality benchmarks: "Stripe pricing page quality" / "Linear dashboard polish"
- Use subagents for complex tasks: "Use subagents to keep context clean"

### When Things Go Wrong
- Don't keep pushing — switch to plan mode and re-plan
- Ask for the elegant solution explicitly: "Scrap it and implement the elegant solution given what you learned"
- Request justification: "Prove this works" / "Compare main vs your branch"

---

## 🛠️ Skills & Slash Commands

Reusable workflows to create (if doing > once/day, make it a skill):

| Command | Purpose |
|---|---|
| `/frontend-design` | Generate design direction + production code |
| `/baseline-ui` | Remove AI slop — fix spacing, typography, states |
| `/fixing-accessibility` | Keyboard, labels, focus rings, semantics |
| `/fixing-motion-performance` | Performance-first motion + reduced-motion compliance |
| `/tech-debt` | End-of-session cleanup — find and remove duplication |
| `/code-review` | Act as staff engineer, review own changes |

---

## 🔁 CLAUDE.md Maintenance Rules

- This file is **checked into git** and shared across the project
- After any correction: end the request with "Update CLAUDE.md with what you learned"
- Remove outdated rules when they no longer apply
- Consolidate duplicate rules
- Keep total length under 200 lines of active rules (trim, don't hoard)
- Review this file at the **start of every session** for context

---

*Last updated: 2026-03-03 | Stack: Next.js · React · TypeScript · Tailwind · shadcn/ui*