# API Reference

All PHP endpoints under `api/`. The base URL is `https://vcet.edu.in`.

---

## Authentication

### POST `/api/auth/login.php`

Authenticates an admin user and creates a PHP session.

**Request body (JSON):**
```json
{
  "username": "admin",
  "password": "Admin@vcet2025"
}
```

**Response — success (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "full_name": "Administrator",
    "role": "super"
  }
}
```

**Response — failure (401):**
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

### POST `/api/auth/logout.php`

Destroys the admin session.

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out"
}
```

---

## Notices

### GET `/api/notices/`

Returns all active notices, ordered by `sort_order` ascending.

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `limit` | integer | Max number of results (optional) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Admission Notice 2025-26",
      "description": "Applications are now open...",
      "attachment": "uploads/notices/admission-2025.pdf",
      "link_url": null,
      "is_new": 1,
      "created_at": "2025-05-01 10:00:00"
    }
  ]
}
```

---

## Events

### GET `/api/events/`

Returns all active events, ordered by `event_date` descending.

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `limit` | integer | Max number of results (optional) |
| `featured` | `1` | Return only featured events |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "title": "Annual Tech Fest 2025",
      "description": "Join us for a day of innovation...",
      "event_date": "2025-12-15",
      "event_time": "09:00:00",
      "venue": "Main Auditorium",
      "image": "uploads/events/techfest2025.jpg",
      "category": "Cultural",
      "is_featured": 1,
      "created_at": "2025-11-01 08:30:00"
    }
  ]
}
```

---

## Placements

### GET `/api/placements/`

Returns all active placement records.

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `year` | integer | Filter by batch year (e.g. `2024`) |
| `featured` | `1` | Return only featured placements |
| `limit` | integer | Max number of results |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 12,
      "student_name": "Rahul Sharma",
      "department": "Computer Engineering",
      "company_name": "TCS",
      "package_lpa": "7.50",
      "role_title": "Software Engineer",
      "batch_year": 2024,
      "student_photo": "uploads/placements/rahul.jpg",
      "company_logo": "uploads/placements/tcs-logo.png",
      "is_featured": 1
    }
  ]
}
```

---

## Error Responses

All endpoints return a consistent error shape:

```json
{
  "success": false,
  "message": "Human-readable error description"
}
```

| HTTP Status | Meaning |
|-------------|---------|
| 200 | Success |
| 400 | Bad request (missing/invalid params) |
| 401 | Unauthenticated |
| 403 | Forbidden (not authorized) |
| 404 | Resource not found |
| 500 | Server error |

---

## CORS

The API accepts requests from any origin during development. In production, CORS headers are configured in `api/config/helpers.php`.

---

## Calling the API from React

```tsx
const [notices, setNotices] = useState([]);

useEffect(() => {
  fetch('/api/notices/?limit=10')
    .then(res => res.json())
    .then(data => {
      if (data.success) setNotices(data.data);
    });
}, []);
```
