from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import hash_password, require_superadmin
from app.database import get_db
from app.models import Admin
from app.schemas import AdminOut, StaffCreate

router = APIRouter(prefix="/admin/staff", tags=["staff"])


@router.get("", response_model=list[AdminOut])
def list_staff(db: Session = Depends(get_db), _admin: Admin = Depends(require_superadmin)):
    return db.query(Admin).order_by(Admin.created_at.asc()).all()


@router.post("", response_model=AdminOut)
def create_staff(
    payload: StaffCreate,
    db: Session = Depends(get_db),
    _admin: Admin = Depends(require_superadmin),
):
    existing = db.query(Admin).filter(Admin.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    staff = Admin(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        is_superadmin=payload.is_superadmin,
    )
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff


@router.delete("/{staff_id}")
def remove_staff(
    staff_id: str,
    db: Session = Depends(get_db),
    admin: Admin = Depends(require_superadmin),
):
    if staff_id == admin.id:
        raise HTTPException(status_code=400, detail="You cannot remove your own account")

    target = db.query(Admin).filter(Admin.id == staff_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Account not found")

    if target.is_superadmin:
        remaining_superadmins = (
            db.query(Admin).filter(Admin.is_superadmin == True, Admin.id != staff_id).count()  # noqa: E712
        )
        if remaining_superadmins == 0:
            raise HTTPException(status_code=400, detail="At least one superadmin must remain")

    db.delete(target)
    db.commit()
    return {"deleted": True}
