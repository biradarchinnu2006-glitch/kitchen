from app.database import SessionLocal
from app.models import Admin
from app.auth import hash_password

db = SessionLocal()

admin = db.query(Admin).first()

if admin:
    print("Existing admin found")
    print("Email:", admin.email)

    admin.hashed_password = hash_password("Admin@123")
    db.commit()

    print("Password reset successful!")
    print("Login Email:", admin.email)
    print("Login Password: Admin@123")
else:
    print("No admin found in database.")