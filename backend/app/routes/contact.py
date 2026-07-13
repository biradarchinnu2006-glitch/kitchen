from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import ContactMessage
from app.schemas import ContactCreate, ContactOut

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactOut)
def create_message(payload: ContactCreate, db: Session = Depends(get_db)):
    message = ContactMessage(**payload.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/admin/messages", response_model=list[ContactOut])
def list_messages(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
