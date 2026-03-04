# Developer Setup

Get the project running locally from zero.

---

## Prerequisites

| Tool | Minimum Version | Install |
|------|----------------|---------|
| Node.js | 20.x LTS | https://nodejs.org |
| npm | 10.x | Comes with Node |
| Git | Any recent | https://git-scm.com |
| PHP (optional) | 8.0+ | For running the API locally |
| MySQL (optional) | 5.7+ | For running the DB locally |

> The frontend runs independently without PHP/MySQL. You only need PHP+MySQL if you want to test the admin panel or dynamic API data locally.

---

## Step 1 — Clone the repo

```bash
git clone https://github.com/CyberCodezilla/vcet.edu.in.git
cd vcet.edu.in
```

---

## Step 2 — Install dependencies

```bash
npm install
```

---

## Step 3 — Start the dev server

```bash
npm run dev
```

The app will be live at **http://localhost:5173**

Hot module replacement (HMR) is enabled via Vite — changes to `.tsx` and `.css` files reflect instantly without a full page reload.

---

## Step 4 — (Optional) Set up the PHP backend locally

If you want to test the dynamic API (`/api/`) or admin panel locally:

### Option A — XAMPP / Laragon (Windows)

1. Install [XAMPP](https://www.apachefriends.org/) or [Laragon](https://laragon.org/)
2. Place the entire project inside `htdocs/vcet.edu.in/`
3. Start Apache + MySQL
4. Create a database named `vcet_db`
5. Run `db/schema.sql` via phpMyAdmin
6. Edit `api/config/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'vcet_db');
define('DB_USER', 'root');
define('DB_PASS', '');      // XAMPP default is empty, change if needed
define('SITE_URL', 'http://localhost/vcet.edu.in');
```

7. Run the seeder to create the default admin:
   Visit: `http://localhost/vcet.edu.in/db/seed.php`
   - **Username:** `admin`
   - **Password:** `Admin@vcet2025`
   - **Delete `seed.php` immediately after.**

### Option B — PHP built-in server (Linux/Mac)

```bash
cd vcet.edu.in
php -S localhost:8000
```

---

## Step 5 — Configure Vite proxy (optional)

If the Vite frontend needs to call the PHP API locally, add a proxy to `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': 'http://localhost:8000',
    '/admin': 'http://localhost:8000',
  }
}
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Common Issues

| Problem | Fix |
|---------|-----|
| `Module not found` errors | Run `npm install` again |
| Port 5173 already in use | Kill the process or change port in `vite.config.ts` |
| Tailwind classes not applying | Ensure `tailwind.config.js` includes the correct `content` paths |
| PHP API returning 404 locally | Ensure Apache is running and `.htaccess` is in the project root |
| CORS errors on API calls | The PHP API includes CORS headers — check `api/config/helpers.php` |
