# Design System

Visual language standards for the VCET website. All contributors must follow these to ensure consistency across all 81 pages.

---

## Colors

### Brand Colors (Tailwind custom classes)

| Class | Usage |
|-------|-------|
| `bg-brand-blue` / `text-brand-blue` | Primary brand blue — buttons, headings, active states |
| `bg-brand-light` | Light blue tint — section backgrounds, tab bars |
| `text-brand-dark` | Dark navy — primary body text |
| `border-brand-blue` | Focused inputs, dividers, underlines |

### Neutral Palette (Tailwind defaults)

| Class | Usage |
|-------|-------|
| `bg-white` | Page backgrounds |
| `bg-slate-50` | Alternating section backgrounds |
| `text-slate-800` | Primary body text |
| `text-slate-600` | Secondary text, descriptions |
| `text-slate-400` | Muted text, placeholders, captions |
| `bg-slate-100` | Card backgrounds, hover states |

### Semantic Colors

| Class | Usage |
|-------|-------|
| `text-green-600` / `bg-green-50` | Success states, positive stats |
| `text-amber-500` | Warnings, badges |
| `text-red-500` | Error states |

---

## Typography

The site uses a system sans-serif font stack via Tailwind's `font-sans`.

### Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-4xl` / `text-5xl` | 36–48px | Page banner titles, hero headings |
| `text-3xl` | 30px | Section main headings |
| `text-2xl` | 24px | Sub-section headings, card titles |
| `text-xl` | 20px | Large labels, emphasis |
| `text-lg` | 18px | Lead paragraph text |
| `text-base` | 16px | Body text (default) |
| `text-sm` | 14px | Captions, meta, labels |
| `text-xs` | 12px | Badges, footnotes, tab labels |

### Font Weights

| Class | Usage |
|-------|-------|
| `font-bold` | Headings, CTA buttons |
| `font-semibold` | Sub-headings, card titles, nav items |
| `font-medium` | Labels, secondary headings |
| `font-normal` | Body copy (default) |

---

## Spacing

All spacing uses Tailwind's 4px grid. Prefer these standard values:

| Token | px | Tailwind | Usage |
|-------|----|----------|-------|
| 4 | 16px | `p-4` / `gap-4` | Internal card padding |
| 6 | 24px | `p-6` | Card padding at larger sizes |
| 8 | 32px | `mb-8` | Between section elements |
| 12 | 48px | `py-12` | Section vertical padding (compact) |
| 16 | 64px | `py-16` | Section vertical padding (standard) |
| 24 | 96px | `py-24` | Section vertical padding (large screens) |

---

## Layout

### Container

Always use:

```tsx
<div className="container mx-auto px-4 sm:px-6">
  <div className="max-w-6xl mx-auto">
    {/* content */}
  </div>
</div>
```

- `container mx-auto` — centers and constrains width
- `px-4 sm:px-6` — horizontal padding (tight on mobile, wider on desktop)
- `max-w-6xl mx-auto` — max content width (~1152px)

### Grid

| Pattern | Tailwind | Usage |
|---------|----------|-------|
| 2 columns | `grid grid-cols-1 md:grid-cols-2 gap-6` | Two-column layouts |
| 3 columns | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` | Card grids |
| 4 columns | `grid grid-cols-2 md:grid-cols-4 gap-4` | Stat/icon grids |

Always start with `grid-cols-1` — mobile first.

---

## Cards

### Standard card

```tsx
<div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
  {/* content */}
</div>
```

### Bordered card

```tsx
<div className="border border-slate-200 rounded-xl p-5">
  {/* content */}
</div>
```

---

## Buttons

Use the `Button` component. If custom styling is needed:

```tsx
// Primary
<button className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors">
  Action
</button>

// Outline
<button className="border-2 border-brand-blue text-brand-blue px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue hover:text-white transition-all">
  Action
</button>
```

---

## Animations

The project uses **Framer Motion** for page-level animations and Tailwind transitions for hover/focus states.

### Scroll reveal (CSS only)

Add `reveal` class to any element that should animate in on scroll:

```tsx
<div className="reveal opacity-0 translate-y-4 transition-all duration-700 ease-out">
  Content
</div>
```

When the `IntersectionObserver` in `PageLayout` fires, it adds the `visible` class, which should define the final state in your CSS/Tailwind.

### Framer Motion — fade in up

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Framer Motion — stagger children

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {items.map(i => (
    <motion.li key={i} variants={item}>{i}</motion.li>
  ))}
</motion.ul>
```

---

## Responsive Breakpoints

| Prefix | Width | Target device |
|--------|-------|--------------|
| (none) | 0px+ | Mobile (default) |
| `sm:` | 640px+ | Large phones, small tablets |
| `md:` | 768px+ | Tablets |
| `lg:` | 1024px+ | Laptops |
| `xl:` | 1280px+ | Desktops |
| `2xl:` | 1536px+ | Large screens |

Always design mobile first — add larger breakpoints as enhancements.

---

## Iconography

Icons use **Lucide React** (`lucide-react` package).

```tsx
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';

<GraduationCap className="w-6 h-6 text-brand-blue" />
```

Standard icon sizes:
- `w-4 h-4` — inline, small
- `w-5 h-5` — default label icon
- `w-6 h-6` — card/section icon
- `w-8 h-8` — feature icon
- `w-10 h-10` / `w-12 h-12` — large feature section
