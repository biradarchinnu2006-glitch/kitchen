# Surekha's Kitchen — Frontend

Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Runs on http://localhost:3000. Expects the FastAPI backend at
`NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8000`); if the backend
isn't running yet, the menu falls back to local seed data in `data/menu.ts`
so the UI still works standalone.

## What's implemented

- Hero, sticky glass navbar, featured dishes, signature dish showcase
- Full menu page: category filters, veg/spicy filters, price slider, live search, pagination
- Gallery (masonry grid + lightbox, placeholder tiles — swap in real photography)
- About page with a cooking-process timeline
- Reservation form (client + server validation) wired to `POST /reservations`
- Contact form wired to `POST /contact`
- Reviews section with an honest empty state (no fake testimonials)
- Sticky WhatsApp button + a lightweight chat assistant widget (calls `POST /chatbot`, falls back to canned answers if the backend is offline)

## Signature visual

The hero/signature "3D biryani bowl" is a hand-built CSS/SVG orbit
animation (`components/SpiceOrbit.tsx`), not a literal Three.js photoreal
render — that needs real modelled/textured 3D assets we don't have. If you
get proper GLTF food models later, that's the component to swap for a
React Three Fiber `<Canvas>`.

## Not included yet (flagged in the plan, not built)

Payment gateway, wishlist/favourites, PWA manifest, dark/light theme
toggle, full admin analytics charts. The backend has CRUD hooks these can
build on — ask if you want any of these added.
