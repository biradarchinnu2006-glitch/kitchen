from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.auth import (
    create_access_token,
    get_current_admin,
    hash_password,
    verify_password,
)
from app.database import get_db
from app.models import Admin
from app.schemas import AdminLogin, AdminOut, Token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == form_data.username).first()
    if not admin or not verify_password(form_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password"
        )
    token = create_access_token(subject=admin.id)
    return Token(access_token=token)


@router.post("/bootstrap", response_model=AdminOut)
def bootstrap_first_admin(payload: AdminLogin, db: Session = Depends(get_db)):
    """
    One-time setup route: creates the first superadmin if (and only if)
    no admin account exists yet. Disable or remove this route after the
    first admin has been created.
    """
    existing = db.query(Admin).first()
    if existing:
        raise HTTPException(status_code=403, detail="An admin already exists")
    admin = Admin(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        full_name="Owner",
        is_superadmin=True,
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


@router.get("/me", response_model=AdminOut)
def me(admin=Depends(get_current_admin)):
    return admin
