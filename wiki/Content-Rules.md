# Content Rules

The most important guidelines for every contributor. Read before you write a single line of content.

---

## The Golden Rule

> **The old website at https://vcet.edu.in is the single source of truth for all factual content.**

You are building a redesigned version of this site. You are free to redesign layouts, improve the visual design, and enhance UX. **You are not allowed to invent, change, omit, or guess any factual information.**

---

## What You CAN Change

| Area | Allowed |
|------|---------|
| Layout | Yes — restructure sections however you like |
| Typography | Yes — different font sizes, weights, hierarchy |
| Colors | Yes — within the design system palette |
| Spacing | Yes — better padding, margins, rhythm |
| Animations | Yes — add tasteful scroll/fade animations |
| UI patterns | Yes — cards, tabs, accordions, grids |
| Image arrangement | Yes — how images are displayed |
| Navigation order | Only with lead approval |

---

## What You CANNOT Change

| Area | Not Allowed | Why |
|------|-------------|-----|
| Faculty names | ❌ | Real people |
| HOD names and titles | ❌ | Real people |
| Governing council members | ❌ | Real people |
| Student intake numbers | ❌ | Official data |
| Placement statistics | ❌ | Official data |
| Package figures (LPA) | ❌ | Official data |
| Cut-off ranks / percentiles | ❌ | Regulatory data |
| Fees structure amounts | ❌ | Official fee schedule |
| NAAC grade and score | ❌ | Accreditation record |
| NBA accreditation status | ❌ | Accreditation record |
| Year of establishment | ❌ | Historical fact |
| Scholarship details | ❌ | Government schemes |
| Course names and codes | ❌ | University curriculum |
| Club/committee names | ❌ | Official bodies |
| Contact addresses & phones | ❌ | Official contact info |

---

## Placeholder Prohibition

**Never commit placeholder content.** These are forbidden:

```
❌ Lorem ipsum dolor sit amet...
❌ TODO: add content here
❌ [Insert faculty photo]
❌ Coming soon...
❌ Department description goes here
❌ Hardcoded fake names like "John Doe"
```

If you don't have the real content yet, leave the existing component structure in place and open a comment in the code:

```tsx
{/* CONTENT NEEDED: Faculty table from vcet.edu.in/departments/it */}
```

---

## Where to Find Content

Every page has a direct equivalent on the old site. Use these:

| Section | Old site URL |
|---------|-------------|
| About VCET | https://vcet.edu.in/about |
| President's Desk | https://vcet.edu.in/presidents-message |
| Principal's Desk | https://vcet.edu.in/principals-message |
| Departments | https://vcet.edu.in/departments |
| Placements | https://vcet.edu.in/placements |
| NAAC | https://vcet.edu.in/naac |
| Admissions | https://vcet.edu.in/admissions |
| Facilities | https://vcet.edu.in/facilities |

For any page not listed above — search the old site directly.

---

## Images

- Only use images from the `Images/` folder in this repository or images already on the old website
- Do not use stock photos that are not from VCET
- Do not use images you found via Google Search
- VCET's logo must always be used as-is — do not crop, recolor, or alter it

---

## Tone and Language

- Keep the formal, institutional tone of the original
- Do not add casual language, emojis, or marketing-speak not present on the old site
- Keep all names exactly as spelled on the old site (e.g. "Vidyavardhini's", not "Vidyavardhinis")
- Indian English spelling conventions are acceptable (e.g. "programme" not "program" if that's what the old site uses)

---

## When You're Unsure

**If you're unsure whether something is correct — check the old site first. If it's still unclear, ask the lead before committing.**

Do not guess. Do not approximate. Do not use ChatGPT to generate VCET-specific facts.
