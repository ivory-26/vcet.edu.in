# Deployment Guide

Step-by-step instructions for deploying the VCET website to Bluehost Pro Shared Hosting.

---

## Prerequisites

- Bluehost Pro Shared Hosting account
- cPanel access
- FTP client (FileZilla) or cPanel File Manager
- Domain pointed to Bluehost nameservers

---

## Step 1 — Build the React App

On your local machine:

```bash
npm run build
```

This creates a `dist/` folder containing the compiled static frontend.

---

## Step 2 — Create the MySQL Database

1. Log in to **cPanel**
2. Go to **MySQL Databases**
3. Create a new database — e.g. `username_vcet_db`
4. Create a new database user with a strong password
5. Add the user to the database with **All Privileges**
6. Open **phpMyAdmin**, select your database
7. Click **Import** and upload `db/schema.sql`

---

## Step 3 — Configure `api/config/config.php`

Edit with your actual Bluehost credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'username_vcet_db');   // your actual cPanel DB name
define('DB_USER', 'username_dbuser');    // your actual cPanel DB username
define('DB_PASS', 'YourStrongPassword');
define('SITE_URL', 'https://vcet.edu.in');
```

> ⚠️ **Never commit this file with real credentials.** The file is listed in `.gitignore`.

---

## Step 4 — Upload Files to `public_html`

Upload the following to `public_html/` via FTP or cPanel File Manager:

```
public_html/
├── index.html            ← from dist/
├── assets/               ← from dist/assets/
├── Images/               ← from dist/Images/ (or public/Images/)
├── api/                  ← PHP API folder
├── admin/                ← PHP Admin panel
├── uploads/              ← empty folder, must be writable
├── db/                   ← schema.sql + seed.php (delete seed.php after use!)
└── .htaccess             ← Apache rewrite rules for React Router
```

### `.htaccess` for React Router

Create a `.htaccess` file in `public_html/` with:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Don't rewrite api/ or admin/ requests
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteCond %{REQUEST_URI} !^/admin/

  # Send everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>
```

This is required for React Router — without it, refreshing any inner page (e.g. `/about-us`) returns a 404.

---

## Step 5 — Set Folder Permissions

| Path | Permission |
|------|------------|
| `uploads/` | `755` |
| `uploads/` subfolders | `755` |
| `api/config/config.php` | `644` |

Right-click each in cPanel File Manager → **Change Permissions**.

---

## Step 6 — Create the First Admin Account

Visit: `https://vcet.edu.in/db/seed.php`

This creates:
- **Username:** `admin`
- **Password:** `Admin@vcet2025`

> ⚠️ **Delete `db/seed.php` immediately after running it.** Anyone who visits this URL will reset the admin password.

---

## Step 7 — Log In and Change Password

1. Visit `https://vcet.edu.in/admin/`
2. Log in with `admin` / `Admin@vcet2025`
3. Update the password via **cPanel → phpMyAdmin**:

```sql
UPDATE admin_users
SET password = '$2y$12$YourNewBcryptHashhere'
WHERE username = 'admin';
```

Generate a bcrypt hash at https://bcrypt-generator.com (cost factor 12).

---

## Step 8 — Verify the Deployment

| Check | How |
|-------|-----|
| Homepage loads | Visit `https://vcet.edu.in` |
| Inner page loads on refresh | Visit `https://vcet.edu.in/about-us` and press F5 |
| Admin panel accessible | Visit `https://vcet.edu.in/admin/` |
| API returns data | Visit `https://vcet.edu.in/api/notices/` |
| Images load | Check browser DevTools → Network |
| HTTPS working | Green padlock in browser |

---

## Updating the Site

For frontend changes only (no PHP changes):

```bash
npm run build
```

Upload only the new `dist/` contents to `public_html/`, overwriting the old files.

For PHP/backend changes:
Upload only the changed files from `api/` or `admin/` via FTP.

---

## Common Deployment Issues

| Problem | Fix |
|---------|-----|
| Inner pages 404 on refresh | `.htaccess` is missing or rewrite rules are wrong |
| API returns blank page | Check PHP error logs in cPanel |
| Images not loading | Check paths — they should be relative to site root |
| Admin login fails | Run `seed.php` again or check DB credentials in `config.php` |
| `uploads/` permission denied | Set `uploads/` to `755` in cPanel |
