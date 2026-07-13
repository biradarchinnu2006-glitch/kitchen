# Surekha's Kitchen — Backend

FastAPI + SQLAlchemy + PostgreSQL.

## Local setup (without Docker)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# make sure Postgres is running and DATABASE_URL in .env points to it
python -m app.seed           # loads starter menu data
uvicorn app.main:app --reload
```

API docs (Swagger): http://localhost:8000/docs

## With Docker (recommended — spins up Postgres + Redis + API together)

From the project root:

```bash
cp backend/.env.example backend/.env
docker compose up --build
python -m app.seed   # run once, inside the backend container or locally against the mapped port
```

## Creating the first admin

There's no admin yet on a fresh database. Create one with:

```bash
curl -X POST http://localhost:8000/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"email": "you@surekhaskitchen.com", "password": "choose-a-strong-password"}'
```

This route only works once — it refuses if an admin already exists.
Then log in via `POST /auth/login` (OAuth2 form fields: `username`,
`password`) to get a bearer token for the `/admin/*` routes.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/menu` | — | List menu items, filterable by category/veg/spicy/price/search |
| GET | `/menu/{id}` | — | Single item |
| POST | `/reservations` | — | Create a table reservation |
| POST | `/contact` | — | Submit a contact message |
| POST | `/orders` | — | Place an order (GST + coupon + delivery-charge calculated server-side) |
| POST | `/chatbot` | — | Rule-based FAQ assistant, logs conversation |
| POST | `/auth/login` | — | Admin login → JWT |
| GET | `/auth/me` | admin | Current admin |
| POST/PUT/DELETE | `/admin/products*` | admin | Menu CRUD |
| GET | `/admin/reservations` | admin | List reservations |
| GET | `/admin/messages` | admin | List contact messages |
| GET | `/admin/orders` | admin | List orders |
| GET | `/admin/analytics/summary` | admin | Revenue + popular items |
| GET | `/admin/orders/export` | admin | CSV export |

## Not included yet

Payment-gateway webhook handling (Razorpay/Stripe), image upload to
Cloudinary (image_url is currently a plain string field — wire up a
signed-upload endpoint when you're ready), and a proper admin frontend UI
(the API is ready for one — Swagger at `/docs` works as a stand-in for now).
