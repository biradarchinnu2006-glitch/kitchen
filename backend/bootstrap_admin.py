from app.database import Base, SessionLocal, engine
from app.models import Admin
from app.auth import hash_password

def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        existing = db.query(Admin).filter(Admin.email == "owner@surekhaskitchen.com").first()
        if existing:
            print("Admin owner@surekhaskitchen.com already exists!")
            return
        admin = Admin(
            email="owner@surekhaskitchen.com",
            hashed_password=hash_password("admin123"),
            full_name="Chef Surekha (Owner)",
            is_superadmin=True,
        )
        db.add(admin)
        db.commit()
        print("Successfully bootstrapped superadmin: owner@surekhaskitchen.com / admin123")
    finally:
        db.close()

if __name__ == "__main__":
    run()
