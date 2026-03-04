# Admin Panel Guide

The admin panel at `/admin/` lets authorized users manage dynamic content — notices, events, and placements — without touching code.

---

## Accessing the Admin Panel

After deployment, visit:

```
https://vcet.edu.in/admin/
```

You will be redirected to the login page if not authenticated.

**Default credentials (change immediately after first login):**

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `Admin@vcet2025` |

---

## Dashboard

After logging in, the dashboard shows:

- Total count of active notices
- Total count of upcoming events
- Total count of placement records
- Quick links to manage each section

---

## Managing Notices

### View all notices
Go to **Notices** in the nav. All notices are listed with their title, status, and sort order.

### Add a new notice

1. Click **Add Notice**
2. Fill in the form:

| Field | Required | Notes |
|-------|----------|-------|
| Title | ✅ | The notice heading shown publicly |
| Description | ❌ | Optional supporting text |
| Attachment (PDF) | ❌ | Upload a PDF — max 5 MB |
| External Link | ❌ | Alternative to a PDF attachment |
| Mark as NEW | ❌ | Shows a "NEW" badge beside the notice |
| Sort Order | ❌ | Lower numbers appear first (default: 0) |
| Active | ✅ | Uncheck to hide from public |

3. Click **Save**

### Edit / Delete
Click **Edit** or **Delete** next to any notice in the list.

---

## Managing Events

### Add a new event

1. Go to **Events → Add Event**
2. Fill in the form:

| Field | Required | Notes |
|-------|----------|-------|
| Title | ✅ | Event name |
| Description | ❌ | Event details |
| Date | ✅ | `YYYY-MM-DD` format |
| Time | ❌ | Start time |
| Venue | ❌ | Location string |
| Image | ❌ | Upload an image — max 5 MB |
| Category | ❌ | e.g. Cultural, Technical, Sports |
| Featured | ❌ | Shows on homepage events section |
| Sort Order | ❌ | Lower = higher in list |
| Active | ✅ | Uncheck to hide |

---

## Managing Placements

### Add a placement record

1. Go to **Placements → Add Placement**
2. Fill in the form:

| Field | Required | Notes |
|-------|----------|-------|
| Student Name | ✅ | Full name |
| Department | ✅ | Department name |
| Company | ✅ | Company placed at |
| Package (LPA) | ❌ | Decimal, e.g. `12.50` |
| Role / Designation | ❌ | Job title |
| Batch Year | ✅ | e.g. `2024` |
| Student Photo | ❌ | Upload student photo |
| Company Logo | ❌ | Upload company logo |
| Featured | ❌ | Show on homepage placements section |
| Active | ✅ | Uncheck to hide |

---

## File Uploads

- Accepted image formats: JPG, JPEG, PNG, WebP, GIF
- Accepted document format: PDF only
- Maximum file size: **5 MB** per file
- Files are saved in `/uploads/` with a timestamp prefix

---

## User Roles

| Role | Access |
|------|--------|
| `super` | Full access — can manage all content and users |
| `editor` | Can manage content but cannot manage admin accounts |

---

## Sessions

Admin sessions expire after **1 hour of inactivity**. You will be redirected to the login page automatically.

---

## Security Notes

- Always log out when done — use the **Logout** button in the nav
- Do not share admin credentials
- Use a strong password with uppercase, lowercase, numbers, and symbols
- Changing the password requires direct database access via phpMyAdmin (generate a bcrypt hash at https://bcrypt-generator.com, cost 12)

---

## Changing the Admin Password

```sql
-- Run in phpMyAdmin
UPDATE admin_users
SET password = '$2y$12$YourNewBcryptHashHere'
WHERE username = 'admin';
```

Then verify the login at `https://vcet.edu.in/admin/`.
