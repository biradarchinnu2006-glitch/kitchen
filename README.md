# Surekha's Kitchen

A full-stack restaurant website: Next.js frontend + FastAPI backend.

```
surekhas-kitchen/
  frontend/     Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion
  backend/      FastAPI + SQLAlchemy + PostgreSQL
  docker-compose.yml   Postgres + Redis + backend, all in one command
```

## Quickest path to running it locally

```bash
# 1. Backend + database
cp backend/.env.example backend/.env
docker compose up --build -d
docker compose exec backend python -m app.seed

# 2. Frontend
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000. The API docs are at http://localhost:8000/docs.

See `frontend/README.md` and `backend/README.md` for details, including how
to create your first admin login.

## What's built vs. what's scoped for later

This covers the core of the original brief end-to-end and working:
hero, navigation, full menu with live filtering, gallery, about, honest
"no fake reviews" section, reservations, contact, WhatsApp ordering, a
rule-based chat assistant, and a real FastAPI backend (menu, reservations,
contact, orders with GST/coupon math, JWT-protected admin CRUD, basic
analytics + CSV export).

Deliberately **not** built, to keep this a working codebase rather than a
pile of stubs — flag any of these and I'll build them next:
- Photoreal 3D food renders (Three.js hero uses a hand-built CSS/SVG
  "spice orbit" animation instead — see the note in `frontend/README.md`)
- Payment gateway integration (UPI/COD are wired, card payments are not)
- Cloudinary image upload flow (image URLs are plain strings for now)
- Full admin dashboard UI (the API is ready; only Swagger exists as a UI today)
- PWA manifest, dark/light theme toggle, wishlist/favourites
