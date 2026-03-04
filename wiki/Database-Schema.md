# Database Schema

MySQL 5.7+ / MariaDB 10.3+. Run `db/schema.sql` via phpMyAdmin to initialize.

---

## Tables Overview

| Table | Description |
|-------|-------------|
| `admin_users` | Admin CMS login accounts |
| `notices` | Notice board entries |
| `events` | Events and announcements |
| `placements` | Student placement records |

---

## `admin_users`

Stores admin login credentials. Passwords are stored as **bcrypt hashes** — never plain text.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `INT UNSIGNED AUTO_INCREMENT` | Primary key |
| `username` | `VARCHAR(80) UNIQUE` | Login username |
| `password` | `VARCHAR(255)` | bcrypt hash |
| `full_name` | `VARCHAR(150)` | Display name |
| `email` | `VARCHAR(150)` | Admin email |
| `role` | `ENUM('super','editor')` | `super` = full access, `editor` = limited |
| `is_active` | `TINYINT(1)` | `1` = active, `0` = disabled |
| `last_login` | `DATETIME NULL` | Last login timestamp |
| `created_at` | `TIMESTAMP` | Auto-set on insert |

---

## `notices`

Notice board entries displayed on the homepage/notices page.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `INT UNSIGNED AUTO_INCREMENT` | Primary key |
| `title` | `VARCHAR(300)` | Notice heading |
| `description` | `TEXT NULL` | Optional detail text |
| `attachment` | `VARCHAR(255) NULL` | Relative path to PDF under `/uploads/` |
| `link_url` | `VARCHAR(500) NULL` | External or internal link |
| `is_active` | `TINYINT(1)` | `1` = visible on site |
| `is_new` | `TINYINT(1)` | `1` = shows "NEW" badge |
| `sort_order` | `SMALLINT` | Lower = higher on list |
| `created_by` | `INT UNSIGNED NULL` | FK → `admin_users.id` |
| `created_at` | `TIMESTAMP` | Auto-set |
| `updated_at` | `TIMESTAMP` | Auto-updated on change |

**Index:** `idx_notices_active (is_active, sort_order)`

---

## `events`

Events and announcements shown in the events feed.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `INT UNSIGNED AUTO_INCREMENT` | Primary key |
| `title` | `VARCHAR(300)` | Event name |
| `description` | `TEXT NULL` | Event details |
| `event_date` | `DATE` | When it happens |
| `event_time` | `TIME NULL` | Start time (optional) |
| `venue` | `VARCHAR(255) NULL` | Location |
| `image` | `VARCHAR(255) NULL` | Relative path under `/uploads/` |
| `category` | `VARCHAR(100)` | e.g. "Cultural", "Technical", "Sports" |
| `is_active` | `TINYINT(1)` | `1` = visible |
| `is_featured` | `TINYINT(1)` | `1` = shown on homepage |
| `sort_order` | `SMALLINT` | Display order |
| `created_by` | `INT UNSIGNED NULL` | FK → `admin_users.id` |
| `created_at` | `TIMESTAMP` | Auto-set |
| `updated_at` | `TIMESTAMP` | Auto-updated |

**Index:** `idx_events_date (event_date, is_active)`

---

## `placements`

Student placement records shown on the Placements section.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `INT UNSIGNED AUTO_INCREMENT` | Primary key |
| `student_name` | `VARCHAR(150)` | Student full name |
| `department` | `VARCHAR(100)` | Department name |
| `company_name` | `VARCHAR(150)` | Company placed at |
| `package_lpa` | `DECIMAL(6,2) NULL` | Package in LPA (e.g. `12.50`) |
| `role_title` | `VARCHAR(150) NULL` | Job title |
| `batch_year` | `YEAR` | Graduation year (e.g. `2024`) |
| `student_photo` | `VARCHAR(255) NULL` | Relative path under `/uploads/` |
| `company_logo` | `VARCHAR(255) NULL` | Company logo path |
| `is_featured` | `TINYINT(1)` | `1` = shown on homepage |
| `is_active` | `TINYINT(1)` | `1` = visible |
| `sort_order` | `SMALLINT` | Display order |
| `created_by` | `INT UNSIGNED NULL` | FK → `admin_users.id` |
| `created_at` | `TIMESTAMP` | Auto-set |
| `updated_at` | `TIMESTAMP` | Auto-updated |

**Index:** `idx_placements_batch (batch_year, is_active)`

---

## Entity Relationship

```
admin_users (1) ──── (0..*) notices
admin_users (1) ──── (0..*) events
admin_users (1) ──── (0..*) placements
```

`created_by` in all three tables is a nullable FK to `admin_users.id` with `ON DELETE SET NULL` — so deleting an admin account does not delete their content.

---

## File Path Convention

File paths stored in the database are **relative to the site root**, e.g.:

```
uploads/notices/1709123456_admission.pdf
uploads/events/1709234567_techfest.jpg
uploads/placements/1709345678_rahul.jpg
```

To get the full public URL:
```php
SITE_URL . '/' . $row['attachment']
// → https://vcet.edu.in/uploads/notices/1709123456_admission.pdf
```

In React:
```tsx
<img src={`https://vcet.edu.in/${placement.student_photo}`} />
```
