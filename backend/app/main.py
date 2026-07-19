from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.routes import admin, auth, chatbot, contact, menu, orders, reservations, staff

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Surekha's Kitchen API",
    description="Backend for the Surekha's Kitchen restaurant website.",
    version="1.0.0",
)

# Allow all origins for cloud deployment (Surge, GitHub Pages, localhost, custom domains)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(menu.router)
app.include_router(reservations.router)
app.include_router(contact.router)
app.include_router(orders.router)
app.include_router(chatbot.router)
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(staff.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "surekhas-kitchen-api"}