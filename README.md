# Scan & Dine v2 — Monorepo

A SaaS QR-based table ordering platform built with the MERN stack.

## Workspace overview

| Package | Port | Role |
|---|---|---|
| `backend` | 5000 | Express API — serves all three frontends |
| `client` | 5173 | Customer-facing app (mobile-first) |
| `restaurant-admin` | 5174 | Restaurant owner dashboard (tablet/desktop) |
| `super-admin` | 5175 | Platform admin dashboard (desktop) |

---

## Quick start

### 1. Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)

### 2. Install all dependencies

```bash
npm install
```

### 3. Configure the backend

```bash
cd backend
cp .env.example .env
# Edit .env — set MONGO_URI, JWT_SECRET, etc.
```

### 4. Run everything in parallel

```bash
# From the root
npm run dev
```

Or run individual workspaces:

```bash
npm run dev:backend      # API on :5000
npm run dev:client       # Customer app on :5173
npm run dev:restaurant   # Restaurant admin on :5174
npm run dev:super        # Super admin on :5175
```

---

## Architecture decisions

### Dining Session (core concept)

Every table scan creates a `DiningSession`. All orders placed at that table during the visit belong to the session. One session = one bill = one payment. The table is freed only when the session closes.

```
Scan QR → DiningSession created
              ├── Order #1
              ├── Order #2  (reorder)
              └── Order #3  (reorder)
                       ↓
                  Single Bill
                       ↓
                   Payment
                       ↓
               Session closed → Table available
```

### Role-based access

| Role | Portal | Access |
|---|---|---|
| `customer` | `client` | Browse restaurants, scan QR, order, pay, review |
| `restaurant` | `restaurant-admin` | Manage their own restaurant data only |
| `super_admin` | `super-admin` | Full platform access |

### CORS

Backend allows exactly three origins: the three frontends.  
Each frontend proxies `/api` calls to the backend via Vite's dev proxy.

---

## Database collections

| Collection | Purpose |
|---|---|
| `users` | Customers, restaurant owners, platform admins |
| `restaurants` | Restaurant profiles + SaaS subscription info |
| `tables` | Tables with QR tokens and live status |
| `categories` | Menu categories per restaurant |
| `menuitems` | Menu items with variants |
| `diningsessions` | One per table visit — the billing container |
| `orders` | Individual order rounds within a session |
| `payments` | One payment record per dining session |
| `reservations` | Table bookings (pre-visit) |
| `offers` | Discount rules per restaurant |
| `reviews` | One review per dining session, post-payment |

---

## Folder structure

```
scan-and-dine-v2/
├── package.json              ← root workspace (npm workspaces)
├── .gitignore
│
├── backend/
│   └── src/
│       ├── server.js         ← Express entry point
│       ├── config/db.js      ← MongoDB connection
│       ├── middleware/
│       │   ├── authMiddleware.js   ← JWT protect + role guards
│       │   └── errorMiddleware.js  ← global error handler
│       ├── models/           ← all Mongoose schemas
│       ├── controllers/      ← business logic
│       └── routes/           ← Express routers
│
├── client/                   ← Customer PWA (mobile-first)
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── pages/            ← Discovery, Menu, Checkout, ...
│       ├── store/authStore.js← Zustand + localStorage persist
│       └── utils/api.js      ← Axios + auto JWT refresh
│
├── restaurant-admin/         ← Restaurant owner dashboard
│   └── src/
│       ├── App.jsx
│       ├── components/DashboardLayout.jsx
│       └── pages/            ← Dashboard, ActiveSessions, MenuBuilder, ...
│
└── super-admin/              ← Platform admin dashboard
    └── src/
        ├── App.jsx
        ├── components/AdminLayout.jsx
        └── pages/            ← TenantManagement, Billing, Revenue, ...
```

---

## Building for production

```bash
# Build all frontends
npm run build

# Each outputs to its own dist/ folder
# Deploy backend to any Node host (Railway, Render, EC2, etc.)
# Deploy client, restaurant-admin, super-admin as static sites
```

---

## Next steps (suggested build order)

1. **Auth** — register/login flows for all three portals
2. **QR scan + session** — `ScanRedirect` → `DiningSession` → `Menu`
3. **Menu** — categories + items listing with add-to-cart
4. **Ordering** — place order, restaurant accepts, kitchen status
5. **Payment** — online (Razorpay) + cash confirm flow
6. **Restaurant admin** — ActiveSessions live view (polling or WebSocket)
7. **Reservations**
8. **Reviews**
9. **Analytics**
10. **Super admin** — tenant management, subscription billing

---

POST   /api/v1/auth/register

POST   /api/v1/auth/login

POST   /api/v1/auth/logout

POST   /api/v1/auth/refresh-token

GET    /api/v1/auth/profile

PATCH  /api/v1/auth/profile

PATCH  /api/v1/auth/change-password

POST   /api/v1/auth/forgot-password

POST   /api/v1/auth/reset-password

---

```bash
git add .
git commit -m "feat: finalize backend foundation architecture"
```

If you want more granular commits (my preferred approach), use these in order:

```bash
git add .
git commit -m "feat: finalize SaaS database schema and model relationships"
```

```bash
git add .
git commit -m "feat: add backend project foundation and folder structure"
```

```bash
git add .
git commit -m "feat: implement shared utilities and helper modules"
```

```bash
git add .
git commit -m "feat: add global middleware, security, and error handling"
```

```bash
git add .
git commit -m "feat: integrate cloudinary, mail service, and JWT utilities"
```

```bash
git add .
git commit -m "feat: add application constants, enums, and response helpers"
```

```bash
git add .
git commit -m "docs: add backend architecture and project documentation"
```

```bash
git add .
git commit -m "feat(auth): initialize authentication module with Zod validation design"
```

---

## If you're making **one commit for today**, I'd use this:

```bash
git add .
git commit -m "feat: complete backend foundation and initialize authentication architecture"
```

This accurately reflects what you've accomplished:

* Backend infrastructure completed.
* Models finalized.
* Shared utilities and helpers added.
* Middleware and security configured.
* Cloudinary and mail integration prepared.
* Authentication architecture planned.
* Zod chosen and validation design started.

---

## Tomorrow's first commit

Once we complete the authentication validator and middleware:

```bash
git commit -m "feat(auth): implement request validation with Zod"
```

Then:

```bash
git commit -m "feat(auth): implement authentication repository"
```

```bash
git commit -m "feat(auth): implement authentication service"
```

```bash
git commit -m "feat(auth): implement authentication controller"
```

```bash
git commit -m "feat(auth): add authentication routes and middleware"
```

---

### One Git convention I'd like us to follow throughout this project

We'll use the **Conventional Commits** specification consistently:

* `feat:` → New feature
* `fix:` → Bug fix
* `refactor:` → Code improvements without changing behavior
* `docs:` → Documentation
* `style:` → Formatting only
* `test:` → Tests
* `chore:` → Tooling, dependencies, configuration

By the time Scan & Dine is finished, your Git history itself will look professional, which is a nice touch if you ever showcase the project on GitHub or discuss your development process in interviews.
