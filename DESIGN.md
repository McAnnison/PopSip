# PopSip Design System

## Glassmorphism

PopSip uses a consistent glassmorphism design language across all pages. The system is defined
via CSS custom properties in `frontend/app/globals.css` and applied through utility classes.

### Design Tokens (CSS Variables)

| Token | Value | Usage |
|-------|-------|-------|
| `--glass-bg` | `rgba(255,255,255,0.72)` | Default translucent surface |
| `--glass-bg-light` | `rgba(255,255,255,0.88)` | Card/focal panel |
| `--glass-bg-dark` | `rgba(15,23,42,0.55)` | Dark-tinted overlay (hero) |
| `--glass-border` | `rgba(255,255,255,0.45)` | Standard glass border |
| `--glass-border-subtle` | `rgba(255,255,255,0.22)` | Subtle border on dark surfaces |
| `--glass-blur` | `16px` | Standard backdrop blur |
| `--glass-blur-heavy` | `24px` | Heavy blur for modals/focal cards |
| `--glass-shadow` | `0 8px 32px rgba(31,38,135,0.10)` | Standard glass drop shadow |
| `--glass-shadow-lg` | `0 16px 48px rgba(31,38,135,0.16)` | Elevated shadow |
| `--glass-inset` | `inset 0 1px 0 rgba(255,255,255,0.55)` | Inner top-edge highlight |

### Utility Classes

| Class | Description |
|-------|-------------|
| `.glass` | Translucent white panel – use on cards on gradient/image backgrounds |
| `.glass-card` | Heavier-blur, mostly-opaque panel – modals, featured cards |
| `.glass-dark` | Dark-tinted glass – overlays inside hero/dark sections |
| `.glass-nav` | Sticky navigation bar with refined blur and bottom shadow |
| `.glass-input` | Form inputs/selects with glass texture and focus ring |

### Colour Palette

Colours are extended from the existing party palette:

| Variable | Hex | Use |
|----------|-----|-----|
| `--party-orange` | `#ea580c` | Primary accent, CTAs |
| `--party-red` | `#dc2626` | Secondary accent, gradient end |
| `--party-purple` | `#9333ea` | Bartender pages accent |
| `--party-pink` | `#ec4899` | Bartender pages gradient |

### Extending Glassmorphism

1. Use an existing class whenever possible. 
2. If you need a custom tint, compose Tailwind `bg-*/XX` opacity utilities on top of `backdrop-blur-*`.
3. Always pair a `border` with `rgba()` alpha for the hallmark glass edge.

---

## Animations

### Entrance / Stagger

Apply `animate-fade-in-up` to the first visible element of a section. Use the numbered
variants for staggered children:

```html
<div class="animate-fade-in-up">First</div>
<div class="animate-fade-in-up-1">Second (80 ms delay)</div>
<div class="animate-fade-in-up-2">Third (160 ms delay)</div>
<div class="animate-fade-in-up-3">…</div>
<div class="animate-fade-in-up-4">…</div>
```

### Scale-in

`animate-scale-in` — scale from 92 % to 100 % with a fade; used for modals and dialogs.

### Micro-interactions

- `.btn-lift` — apply to buttons/links for a subtle `translateY(-2px)` hover lift with an
  orange glow shadow and a press-down active state.
- `.card-hover` — `translateY(-5px)` lift on hover for feature cards.
- `.hover-bounce` — triggers `bounce-gentle` on hover; use sparingly for stat counters.

### Page Transitions

Page transitions are handled by `components/PageTransition.tsx`, a client component that:

1. Reads `usePathname()` from Next.js.
2. On every route change, removes the `page-enter` CSS class, forces a reflow, then re-adds it
   to replay a 350 ms `translateY(10px) → 0 + fade` animation.
3. Is mounted in `app/layout.tsx` and wraps all route content.

No third-party animation library is required.

### `prefers-reduced-motion`

All animations are suppressed for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Onboarding Flow

### How It Works

`components/OnboardingModal.tsx` is a 3-step modal that introduces first-time visitors to
PopSip's core actions:

| Step | Title | Action |
|------|-------|--------|
| 1 | Browse Bartenders | Link → `/bartenders` |
| 2 | Book Your Bartender | Link → `/bartenders` |
| 3 | Party Time! | Close modal |

### Persistence

- Completion/dismissal is stored in **`localStorage`** under the key `popsip-onboarding-done`.
- The modal is only shown automatically when the key is absent (first visit).
- The `<OnboardingModal />` component is mounted once in `app/layout.tsx`; it is therefore
  visible on all pages on first visit.

### Re-opening the Tour

A **"?"** help button is available in the Header (both desktop and mobile). Clicking it:

1. Calls `resetOnboarding()` which removes `popsip-onboarding-done` from localStorage.
2. Renders `<OnboardingModal open={true} />` with controlled state so the modal re-appears
   from step 1.

### Programmatic Reset (Dev / Testing)

```ts
import { resetOnboarding } from "@/components/OnboardingModal";
resetOnboarding(); // clears localStorage key
```

Or in the browser console:
```js
localStorage.removeItem("popsip-onboarding-done");
```

---

## Screens Updated

| Page | Changes |
|------|---------|
| All | `glass-nav` sticky header, page-enter transitions, reduced-motion support |
| Home (`/`) | Glass hero badge, `glass-card` feature cards, stagger entrance animations, glass CTA panel |
| Bartenders (`/bartenders`) | `glass-card` filter panel, glass bartender cards, staggered card grid |
| Bartender Detail (`/bartenders/[id]`) | `glass-card` profile/services/reviews/booking panels, `glass-input` form fields |
| Join (`/join`) | `glass-nav`, `glass-card` form container, `glass-input` all form fields, `glass` service blocks |

---

## Known Limitations / TODOs

- `backdrop-filter` is not supported in older Firefox (< 103) or older Android WebView. A
  solid white fallback is automatically applied by CSS cascade.
- The bartender listing page contains inline `<header>` markup duplicating the shared
  `<Header>` component pattern. A future refactor should extract a shared header.
- Page transitions in Next.js App Router fire on every server-component re-render, not just
  user navigation events. This is a known limitation of the CSS-only approach; Framer Motion's
  `AnimatePresence` (if added in a future iteration) would give finer control.
- Onboarding step 2 ("Book Your Bartender") links to the bartenders listing rather than a
  live booking flow, because booking requires a profile selection. When a booking flow is
  introduced, update `STEPS[1].href` in `OnboardingModal.tsx`.
