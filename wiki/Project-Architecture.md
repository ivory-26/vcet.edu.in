# Project Architecture

---

## Overview

The project is a **decoupled architecture** — a React SPA for the frontend and a PHP REST API for dynamic content. They communicate over HTTP. The static React build and the PHP files are both deployed to the same Apache shared hosting server.

```
┌─────────────────────────────────────────────────────┐
│                   Browser (User)                    │
└────────────────────┬────────────────────────────────┘
                     │ HTTP
          ┌──────────┴──────────┐
          │   Apache (Bluehost) │
          └──────────┬──────────┘
         ┌───────────┴───────────┐
         │                       │
  ┌──────▼──────┐        ┌───────▼───────┐
  │  React SPA  │        │   PHP Backend  │
  │  (dist/)    │        │  /api/ /admin/ │
  │  Vite build │        │  MySQL + PDO   │
  └─────────────┘        └───────────────┘
                                 │
                         ┌───────▼───────┐
                         │   MySQL DB    │
                         │  (vcet_db)    │
                         └───────────────┘
```

---

## Frontend — React + Vite

### Entry Point
- `index.html` → loads `index.tsx` → mounts `<App />`

### Routing
- `App.tsx` is the root router using **React Router v7**
- All inner pages are **lazy-loaded** with `React.lazy()` + `<Suspense>`
- This ensures only the visited page's JavaScript is loaded — critical for performance with 81 pages

### Component Structure

```
components/          ← Reusable UI (used across multiple pages)
pages/               ← Route-level pages (one file = one URL)
ui/                  ← Low-level UI primitives (lamp, pixel-image, focus-cards)
```

### Page Loading Flow

```
User navigates to /about-us
       ↓
React Router matches <Route path="/about-us" element={<AboutVCET />} />
       ↓
Suspense triggers PageLoader spinner
       ↓
Dynamic import: pages/about/AboutVCET.tsx chunk loads
       ↓
Page renders inside PageLayout (TopBanner + Header + content + Footer)
```

---

## Backend — PHP API

### Structure

```
api/
├── config/
│   ├── config.php      ← DB credentials, paths, constants
│   ├── db.php          ← PDO connection singleton
│   └── helpers.php     ← CORS headers, JSON response helpers
├── auth/
│   ├── login.php       ← POST: validate credentials, set session
│   └── logout.php      ← POST: destroy session
├── events/
│   └── index.php       ← GET: all active events
├── notices/
│   └── index.php       ← GET: all active notices
└── placements/
    └── index.php       ← GET: all active placements (filterable by year)
```

### Admin Panel

```
admin/
├── index.php           ← Login page (redirects to dashboard if authed)
├── dashboard.php       ← Overview stats
├── events.php          ← List/delete events
├── events_form.php     ← Create/edit event
├── notices.php         ← List/delete notices
├── notices_form.php    ← Create/edit notice
├── placements.php      ← List/delete placements
├── placements_form.php ← Create/edit placement
├── logout.php
└── includes/
    ├── auth.php        ← Session guard (redirect if not logged in)
    ├── db.php          ← PDO connection (reused from api/config)
    ├── header.php      ← Admin HTML header + nav
    ├── footer.php      ← Admin HTML footer
    └── upload.php      ← File upload handler
```

---

## Database

Three main content tables + one admin_users table:

| Table | Purpose |
|-------|---------|
| `admin_users` | CMS login accounts |
| `notices` | Notice board entries |
| `events` | Events/announcements |
| `placements` | Student placement records |

See the full [Database Schema](Database-Schema) page for column details.

---

## File Upload Flow

```
Admin uploads image (via admin panel)
       ↓
admin/includes/upload.php validates type + size
       ↓
File saved to /uploads/{type}/{timestamp}_{filename}
       ↓
Relative path stored in DB (e.g. uploads/events/1709123456_banner.jpg)
       ↓
Frontend requests SITE_URL + stored path
```

---

## Build & Deploy Flow

```
Local: npm run build  →  dist/
                              ↓
Upload dist/ contents to public_html/  (via FTP or cPanel)
Upload api/ → public_html/api/
Upload admin/ → public_html/admin/
Upload uploads/ → public_html/uploads/
Configure api/config/config.php with real credentials
```

See the full [Deployment Guide](Deployment-Guide) for step-by-step instructions.

---

## Why This Stack?

| Decision | Reason |
|----------|--------|
| React + TypeScript | Type safety, component reuse, team scalability |
| Vite | Fastest dev server + build for React in 2025 |
| Tailwind CSS | Utility-first — consistent spacing without custom CSS sprawl |
| Framer Motion | Production-quality animations with minimal boilerplate |
| PHP shared hosting | Bluehost constraint — no Node.js server available |
| React Router lazy loading | 81 pages — lazy loading keeps initial bundle small |
| PDO (PHP) | Prepared statements prevent SQL injection |
