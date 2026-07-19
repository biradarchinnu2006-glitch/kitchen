from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Reservation
from app.schemas import ReservationCreate, ReservationOut

# UPDATED: Added prefix here so it routes perfectly
router = APIRouter(prefix="/reservations", tags=["reservations"])


# UPDATED: Changed path from "/reservations" to "/" to fix the 404 double-URL loop
@router.post("/", response_model=ReservationOut)
def create_reservation(payload: ReservationCreate, db: Session = Depends(get_db)):
    reservation = Reservation(
        name=payload.name,
        phone=payload.phone,
        guests=payload.guests,
        date=payload.date,
        time=payload.time,
        special_request=payload.specialRequest,
    )
    db.add(reservation)
    db.commit()
    db.refresh(reservation)
    return reservation


# UPDATED: Shortened standard admin paths
@router.get("/admin", response_model=list[ReservationOut])
def list_reservations(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return db.query(Reservation).order_by(Reservation.created_at.desc()).all()


# UPDATED: Shortened confirmation path
@router.post("/admin/{reservation_id}/confirm", response_model=ReservationOut)
def confirm_reservation(
    reservation_id: str,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    reservation.confirmed = True
    db.commit()
    db.refresh(reservation)
    return reservation