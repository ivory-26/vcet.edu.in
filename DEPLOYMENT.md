# VCET Website — Bluehost Deployment Guide

## Stack
- **Frontend:** React + TypeScript, built with Vite
- **Backend:** PHP (shared hosting compatible) + MySQL
- **Hosting:** Bluehost Pro Shared (Apache)

---

## Step 1 — Build the React app

```bash
npm run build
```

This creates a `dist/` folder with static files.

---

## Step 2 — Create the MySQL database

1. Log in to **cPanel → MySQL Databases**
2. Create a new database, e.g. `username_vcet_db`
3. Create a database user with a strong password
4. Grant the user **All Privileges** on that database
5. Open **phpMyAdmin**, select your database, and run the contents of `db/schema.sql`

---

## Step 3 — Configure `api/config/config.php`

Edit this file with your real credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'username_vcet_db');   // your cPanel DB name
define('DB_USER', 'username_dbuser');    // your cPanel DB user
define('DB_PASS', 'YourStrongPassword');
define('SITE_URL', 'https://vcet.edu.in');
```

> ⚠ **Never commit real credentials to Git.**

---

## Step 4 — Upload files to `public_html`

Upload the following into `public_html/` via cPanel File Manager or FTP:

```
public_html/
├── (contents of dist/)     ← React build output
├── api/                    ← PHP API
├── admin/                  ← PHP Admin panel
├── uploads/                ← empty, writable
├── db/                     ← schema + seed (delete seed.php after use)
└── .htaccess               ← root rewrite rules
```

> Make sure `uploads/` is writable: right-click → Permissions → `755`

---

## Step 5 — Create the first admin user

Visit: `https://vcet.edu.in/db/seed.php`

This creates:
- **Username:** `admin`
- **Password:** `Admin@vcet2025`

**⚠ Delete `db/seed.php` immediately after running it.**

Then log in at: `https://vcet.edu.in/admin/`

---

## Step 6 — Change admin password

After first login, use cPanel → phpMyAdmin to update the password hash:

```sql
UPDATE admin_users
SET password = '$2y$12$...'   -- generate with password_hash() 
WHERE username = 'admin';
```

Or add a "Change Password" page later (see below).

---

## Folder Structure

```
public_html/
│
├── index.html              React SPA entry
├── assets/                 Vite-built JS/CSS
├── Images/                 Static images (existing)
│
├── .htaccess               SPA routing + security
│
├── api/
│   ├── .htaccess
│   ├── config/
│   │   ├── config.php      ← Edit this with DB credentials
│   │   ├── db.php          PDO singleton
│   │   └── helpers.php     JSON response helpers
│   ├── notices/index.php     GET /api/notices/
│   ├── events/index.php      GET /api/events/
│   ├── placements/index.php  GET /api/placements/
│   └── auth/
│       ├── login.php         POST /api/auth/login
│       └── logout.php        POST /api/auth/logout
│
├── admin/
│   ├── .htaccess
│   ├── index.php           Login page
│   ├── logout.php
│   ├── dashboard.php
│   ├── notices.php         List notices
│   ├── notices_form.php    Add / edit notice
│   ├── events.php          List events
│   ├── events_form.php     Add / edit event
│   ├── placements.php      List placements
│   ├── placements_form.php Add / edit placement
│   ├── includes/
│   │   ├── auth.php        Session guard + CSRF
│   │   ├── db.php
│   │   ├── upload.php      Secure file upload helper
│   │   ├── header.php      Sidebar + topbar HTML
│   │   └── footer.php
│   └── assets/
│       ├── style.css
│       └── admin.js
│
├── uploads/                Uploaded images/PDFs
│   └── .htaccess           Blocks PHP execution
│
└── db/
    ├── .htaccess           Blocks all web access
    ├── schema.sql          Run once in phpMyAdmin
    └── seed.php            Run once, then DELETE
```

---

## React → PHP API Integration

The React frontend calls the PHP API via standard fetch:

```ts
// Notices
const res = await fetch('/api/notices/');
const { data } = await res.json();

// Events
const res = await fetch('/api/events/?upcoming=1');

// Placements
const res = await fetch('/api/placements/?featured=1');
```

All endpoints return:
```json
{ "success": true, "data": [...] }
```

---

## Security Checklist

- [x] PDO prepared statements everywhere
- [x] `password_hash` / `password_verify` for admin passwords
- [x] CSRF token on every admin form (POST)
- [x] Session expiry after 1 hour of inactivity
- [x] File upload: MIME-type validated via `finfo` (not just extension)
- [x] PHP execution blocked in `uploads/`
- [x] Directory listing disabled (`Options -Indexes`)
- [x] `db/` fully blocked after setup
- [x] `api/config/` blocked from direct web access
- [x] `admin/includes/` blocked from direct web access
- [x] `sleep(1)` on failed login to slow brute force

---

## Troubleshooting

| Issue | Fix |
|---|---|
| 500 error on API | Check `error_log` in cPanel; usually wrong DB credentials |
| Blank admin page | PHP version < 8.0; check cPanel → MultiPHP Manager, set to 8.1+ |
| Uploads fail | Set `uploads/` permissions to `755` in File Manager |
| React routes return 404 | `.htaccess` not uploaded or `mod_rewrite` not enabled |
| Session not persisting | Ensure `session_name()` is called before `session_start()` consistently |
