# Git & Contributing

Standards for all contributors on the VCET website repo.

---

## Branch Strategy

### Branch Types

| Prefix | Use case | Example |
|--------|----------|---------|
| `feat/` | New page redesign or feature | `feat/about-vcet-redesign` |
| `fix/` | Bug fix | `fix/header-mobile-overflow` |
| `chore/` | Non-code changes (config, docs) | `chore/update-readme` |
| `refactor/` | Code refactor without behavior change | `refactor/department-page-template` |

### Rules

- **Never commit directly to `main`**
- One branch per GitHub issue
- Branch names should be lowercase, kebab-case
- Delete your branch after it is merged

---

## Creating a Branch

```bash
# Always start from a fresh main
git checkout main
git pull origin main

# Create your branch
git checkout -b feat/about-vcet-redesign
```

---

## Commit Message Format

```
type: short description in present tense

Optional longer explanation if needed.
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | Adding a new designed section or feature |
| `fix` | Fixing a bug or broken layout |
| `refactor` | Restructuring code without changing output |
| `style` | Tailwind/CSS only changes |
| `content` | Updating text/data content |
| `chore` | Config, dependency updates, cleanup |

### Examples

```
feat: redesign About VCET page with mission/vision cards
fix: correct mobile nav overflow on small screens
content: update placement stats to match 2024-25 data
style: adjust section padding for better vertical rhythm
```

---

## Pull Request Checklist

Before opening a PR, verify all of these:

### Content
- [ ] All text matches the old website at https://vcet.edu.in exactly
- [ ] Names, titles, designations are accurate
- [ ] Numbers (stats, intake, years) match the source
- [ ] No placeholder or dummy content remains (`Lorem ipsum`, `TODO`, hardcoded test values)

### Code
- [ ] No TypeScript errors (`npm run build` passes cleanly)
- [ ] No console errors in the browser
- [ ] All images load correctly
- [ ] `PageLayout` wraps the page (not raw HTML)
- [ ] `PageBanner` is included with correct title and breadcrumbs
- [ ] Page is lazy-loaded in `App.tsx` with a `<Route>` defined

### Responsive
- [ ] Tested on mobile (375px)
- [ ] Tested on tablet (768px)
- [ ] Tested on desktop (1280px)

### Security
- [ ] No credentials hardcoded anywhere
- [ ] `api/config/config.php` changes are NOT committed
- [ ] No `.env` files with secrets committed

---

## Opening a Pull Request

1. Push your branch:
   ```bash
   git push origin feat/about-vcet-redesign
   ```

2. Open a PR on GitHub against `main`

3. PR title format:
   ```
   [Group 1] Redesign - About VCET pages
   ```

4. Link the relevant issue in the PR description:
   ```
   Closes #1
   ```

5. Request a review from the lead

---

## Code Review Standards

Reviewers look for:

| Area | Standard |
|------|----------|
| Content accuracy | Matches old website |
| Component reuse | Uses `PageLayout`, `PageBanner`, `DepartmentPage` where applicable |
| Responsiveness | Works on all screen sizes |
| Performance | No unnecessary re-renders, images are optimized |
| TypeScript | No `any` types without justification |
| No hardcoded data | Dynamic data comes from props or API, not inline hacks |

---

## Syncing with Main

If `main` has been updated while you're working on your branch:

```bash
git fetch origin
git rebase origin/main
```

Resolve any conflicts, then continue your work.
