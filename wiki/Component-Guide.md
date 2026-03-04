# Component Guide

All reusable components in `components/`. Use these instead of building from scratch.

---

## Layout Components

### `PageLayout`
**File:** `components/PageLayout.tsx`

The standard wrapper for **every inner page** (non-homepage). Includes:
- `TopBanner` (logo, contact bar)
- `Header` (navigation)
- `<main>` with children
- `Footer`
- `IntersectionObserver` for `.reveal` scroll animations
- Scroll-to-top on mount

```tsx
import PageLayout from '../components/PageLayout';

const MyPage = () => (
  <PageLayout>
    <PageBanner title="My Page" breadcrumbs={[{ label: 'Section' }, { label: 'My Page' }]} />
    {/* page content */}
  </PageLayout>
);
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | ✅ | Page content |

---

### `PageBanner`
**File:** `components/PageBanner.tsx`

Full-width hero banner shown at the top of inner pages. Displays the page title and breadcrumb trail.

```tsx
<PageBanner
  title="About VCET"
  breadcrumbs={[
    { label: 'About Us' },
    { label: 'About VCET' },
  ]}
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Large heading text |
| `breadcrumbs` | `{ label: string; href?: string }[]` | ✅ | Breadcrumb items |

---

### `DepartmentPage`
**File:** `components/DepartmentPage.tsx`

Generic template for all 8 department pages. Handles tabs, HOD card, vision/mission, NBA badge, etc. **Do not duplicate this logic** — pass data via the `dept` prop.

```tsx
import DepartmentPage from '../../components/DepartmentPage';

const DeptIT = () => (
  <DepartmentPage
    dept={{
      name: 'Information Technology',
      slug: 'it',
      established: '2000',
      intake: '60',
      hodName: 'Dr. Jane Doe',
      hodTitle: 'Professor & HOD',
      hodImage: '/Images/faculty/hod-it.jpg',
      description: ['Department overview paragraph...'],
      vision: 'To be a center of excellence...',
      mission: ['Provide quality education...', 'Foster research...'],
      tabs: ['Overview', 'Faculty', 'Labs', 'Activities'],
      nbaAccredited: true,
      nbaYear: '2022',
    }}
  />
);
```

**`DepartmentInfo` shape:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | ✅ | Full department name |
| `slug` | `string` | ✅ | Short identifier (e.g. `'it'`) |
| `established` | `string` | ✅ | Year established |
| `intake` | `string` | ✅ | Annual student intake |
| `hodName` | `string` | ✅ | HOD full name |
| `hodTitle` | `string` | ✅ | HOD designation |
| `hodImage` | `string` | ✅ | Path to HOD photo |
| `description` | `string[]` | ✅ | Array of paragraphs |
| `vision` | `string` | ❌ | Vision statement |
| `mission` | `string[]` | ❌ | Mission points |
| `tabs` | `string[]` | ✅ | Tab names |
| `nbaAccredited` | `boolean` | ❌ | Show NBA badge |
| `nbaYear` | `string` | ❌ | NBA accreditation year |

---

## UI Components

### `SectionHeader`
**File:** `components/SectionHeader.tsx`

Reusable section heading with optional subtitle and decorative underline.

```tsx
<SectionHeader
  title="Our Departments"
  subtitle="Explore the academic departments at VCET"
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Main heading |
| `subtitle` | `string` | ❌ | Supporting text below heading |
| `center` | `boolean` | ❌ | Center-align (default: false) |

---

### `Button`
**File:** `components/Button.tsx`

Shared button with consistent variants.

```tsx
<Button variant="primary" href="/contact-us">Contact Us</Button>
<Button variant="outline" onClick={handleClick}>Learn More</Button>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `'primary' \| 'outline' \| 'ghost'` | ❌ | Visual style (default: `'primary'`) |
| `href` | `string` | ❌ | Renders as `<a>` when provided |
| `onClick` | `() => void` | ❌ | Click handler |
| `children` | `React.ReactNode` | ✅ | Button label |
| `className` | `string` | ❌ | Extra Tailwind classes |

---

### `ScrollToTop`
**File:** `components/ScrollToTop.tsx`

Restores scroll position to the top on every route change. Already included in `App.tsx` — **do not add it again**.

---

### `SplashScreen`
**File:** `components/SplashScreen.tsx`

Animated loading screen shown on first visit. Mounts once, then hides itself. Only used on the homepage.

---

## Homepage Section Components

These are **homepage-only** components. Do not use them inside page layouts.

| Component | Homepage Section |
|-----------|-----------------|
| `TopBanner` | Top bar with logos + phone/email |
| `Header` | Main sticky navigation |
| `Hero` | Full-screen hero/banner |
| `About` | Stats block (years, students, placements) |
| `Placements` | Placement highlights |
| `Recruiters` | Recruiter logo grid |
| `Departments` | Department cards overview |
| `Achievements` | Achievements / milestones |
| `ExploreUs` | Explore VCET call-to-action grid |
| `Gallery` | Photo grid |
| `Testimonials` | Student testimonials carousel |
| `Facilities` | Facilities showcase |
| `Naac` | NAAC score block |
| `Footer` | Site footer |
| `Admissions` | Admissions info block |

---

## Scroll Animation

Any element with the class `reveal` will fade in when scrolled into view:

```tsx
<div className="reveal opacity-0 translate-y-4 transition-all duration-700">
  Your content here
</div>
```

This is handled by the `IntersectionObserver` in both `PageLayout` and the homepage `useEffect`. The `visible` class triggers the transition.
