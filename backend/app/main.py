from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.routes import admin, auth, chatbot, contact, menu, orders, reservations

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Surekha's Kitchen API",
    description="Backend for the Surekha's Kitchen restaurant website.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
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


@app.get("/")
def health_check():
    return {"status": "ok", "service": "surekhas-kitchen-api"}
