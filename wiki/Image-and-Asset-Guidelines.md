# Image & Asset Guidelines

Standards for managing images and static assets in the project.

---

## Folder Structure

```
Images/
├── Banner/              ← Full-width hero/banner images for page headers
├── gallery/             ← Campus gallery photos
├── Home background/     ← Homepage background/hero images
├── LOGO/                ← VCET logo variants (primary, white, dark)
├── Packages/            ← Salary package graphics/icons
├── PLACEMENT/           ← Placement-related images
├── recriters/           ← Recruiter company logos
├── Remarkable Acheivements/  ← Achievement photos and graphics
└── testimonials/        ← Student testimonial photos

uploads/                 ← Runtime uploads from admin panel (NOT committed to Git)
├── notices/             ← PDFs uploaded via admin
├── events/              ← Event images uploaded via admin
└── placements/          ← Student photos and company logos uploaded via admin
```

> `uploads/` is in `.gitignore` — never commit user-uploaded content to the repo.

---

## File Naming Conventions

### Static assets (in `Images/`)

Use **PascalCase** or **kebab-case** consistently within each folder:

```
✅ vcet-logo-primary.png
✅ vcet-logo-white.svg
✅ banner-campus-main.jpg
✅ testimonial-rahul-sharma.jpg

❌ IMG_1234.jpg
❌ photo copy (2).png
❌ banner - final FINAL v2.jpg
```

Rules:
- No spaces in filenames — use `-` (hyphen)
- Lowercase letters only
- Descriptive names that explain what the image is
- Include size variant in name if multiple sizes exist: `logo-192.png`, `logo-512.png`

### Admin-uploaded files (in `uploads/`)

Handled automatically by the upload script — files are prefixed with a Unix timestamp:

```
1709123456_techfest-banner.jpg
1709234567_admission-notice.pdf
```

---

## Recommended Image Sizes

| Context | Size | Format |
|---------|------|--------|
| Page banner / hero | 1920 × 600 px or wider | JPG / WebP |
| Department HOD photo | 400 × 500 px (portrait) | JPG / WebP |
| Recruiter logo | 200 × 100 px | PNG (transparent) |
| Student testimonial photo | 200 × 200 px | JPG / WebP |
| Gallery photo | 800 × 600 px or 1200 × 800 px | JPG / WebP |
| Achievement photo | 600 × 400 px | JPG / WebP |
| VCET logo | Use SVG if available | SVG > PNG |

---

## Formats

| Format | Best for |
|--------|----------|
| **WebP** | Photos — best compression, modern browsers |
| **JPG** | Photos — fallback for older browsers |
| **PNG** | Logos and images with transparency |
| **SVG** | Icons, logos, diagrams — infinitely scalable |
| **GIF** | Only for simple animations (prefer video/CSS) |

**Avoid:** BMP, TIFF, HEIC — these are not web-friendly.

---

## File Size Limits

| Context | Max size |
|---------|----------|
| Static images in `Images/` | 500 KB per file recommended |
| Admin-uploaded images | 5 MB per file (enforced by upload script) |
| Admin-uploaded PDFs | 5 MB per file (enforced by upload script) |
| VCET logo | Should be under 100 KB (use SVG) |

---

## Referencing Images in React

### Static assets from `Images/` folder

For images in the `public/Images/` directory (served as static files):

```tsx
<img src="/Images/LOGO/vcet-logo-primary.png" alt="VCET Logo" />
```

For images imported via Vite (processed at build time):

```tsx
import vcetLogo from '../Images/LOGO/vcet-logo-primary.png';

<img src={vcetLogo} alt="VCET Logo" />
```

### Admin-uploaded images (from database)

```tsx
<img
  src={`https://vcet.edu.in/${placement.student_photo}`}
  alt={placement.student_name}
  onError={(e) => { e.currentTarget.src = '/Images/placeholder.jpg'; }}
/>
```

Always include an `onError` fallback for database-driven images.

---

## Optimization Before Committing

Before adding any image to the `Images/` folder:

1. **Resize** to the appropriate dimensions (don't upload a 5MB DSLR photo)
2. **Compress** using:
   - [Squoosh](https://squoosh.app/) — online, free
   - [TinyPNG](https://tinypng.com/) — good for PNG and JPG
3. **Convert to WebP** where possible for better performance
4. **Use descriptive alt text** on every `<img>` tag — important for accessibility and SEO

---

## The VCET Logo

The logo files are in `Images/LOGO/`. Rules:

- Do not alter the logo colors
- Do not crop, rotate, or distort the logo
- Do not add effects (shadows, gradients) to the logo
- Use the white version (`vcet-logo-white`) on dark/colored backgrounds
- Use the primary version on white/light backgrounds
- Maintain clear space around the logo — don't crowd it with other elements

---

## What NOT to Commit

```
❌ uploads/          (runtime content — in .gitignore)
❌ *.psd             (Photoshop source files)
❌ *.ai              (Illustrator source files)
❌ Thumbs.db         (Windows thumbnail cache)
❌ .DS_Store         (macOS folder metadata)
❌ IMG_XXXX.jpg      (unnamed camera photos)
```
