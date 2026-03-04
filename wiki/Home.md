# VCET Website — Project Wiki

Welcome to the developer wiki for the **VCET (Vidyavardhini's College of Engineering and Technology)** website redevelopment project.

This is the official source of truth for all development standards, architecture decisions, and contribution guidelines.

---

## What is this project?

A full ground-up redevelopment of the official college website at [vcet.edu.in](https://vcet.edu.in).

The old website remains the **single source of truth for all content** — names, numbers, dates, faculty details, department information. You may redesign layouts and improve UX freely, but all factual data must match the old website exactly.

---

## Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Frontend   | React 19, TypeScript, Vite 6         |
| Styling    | Tailwind CSS                         |
| Routing    | React Router v7                      |
| Animation  | Framer Motion                        |
| Backend    | PHP 8+ (Apache, shared hosting)      |
| Database   | MySQL 5.7+ / MariaDB 10.3+           |
| Hosting    | Bluehost Pro Shared (Apache + cPanel)|

---

## Wiki Pages

| Page | Description |
|------|-------------|
| [Developer Setup](Developer-Setup) | Local environment setup from scratch |
| [Project Architecture](Project-Architecture) | How frontend + backend fit together |
| [Site Map](Site-Map) | All 81 pages, routes, files, and statuses |
| [Component Guide](Component-Guide) | All reusable components with props and usage |
| [Design System](Design-System) | Colors, typography, spacing, animations |
| [API Reference](API-Reference) | All PHP API endpoints |
| [Database Schema](Database-Schema) | Tables, columns, relationships |
| [Deployment Guide](Deployment-Guide) | How to deploy to Bluehost |
| [Git & Contributing](Git-and-Contributing) | Branching, commits, PR checklist |
| [Issue Groups & Tracker](Issue-Groups-and-Tracker) | 12 redesign groups, assignments, status |
| [Content Rules](Content-Rules) | What you can and cannot change |
| [Admin Panel Guide](Admin-Panel-Guide) | How to use the CMS at /admin/ |
| [Image & Asset Guidelines](Image-and-Asset-Guidelines) | File naming, sizes, folder structure |

---

## Quick Links

- **Repo:** [CyberCodezilla/vcet.edu.in](https://github.com/CyberCodezilla/vcet.edu.in)
- **Old Website (content reference):** https://vcet.edu.in
- **Local dev:** `http://localhost:5173`
- **Admin panel:** `/admin/` (after deployment)

---

## Team

| Role | Responsibility |
|------|---------------|
| Lead | Architecture, reviews, merges |
| Frontend Contributors | Page redesigns per assigned issue group |
| Backend | PHP API + Admin panel |

---

> **Rule #1:** Never commit credentials (`api/config/config.php` must never contain real passwords in Git).
> **Rule #2:** All content must match [vcet.edu.in](https://vcet.edu.in).
> **Rule #3:** One branch per issue. No direct commits to `main`.
