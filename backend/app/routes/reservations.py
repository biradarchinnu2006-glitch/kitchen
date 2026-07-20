from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Reservation
from app.schemas import ReservationCreate, ReservationOut

router = APIRouter(tags=["reservations"])


@router.post("/reservations", response_model=ReservationOut)
@router.post("/reservations/", response_model=ReservationOut)
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


@router.get("/admin/reservations", response_model=list[ReservationOut])
@router.get("/reservations/admin", response_model=list[ReservationOut])
def list_reservations(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return db.query(Reservation).order_by(Reservation.created_at.desc()).all()


@router.post("/admin/reservations/{reservation_id}/confirm", response_model=ReservationOut)
@router.post("/reservations/admin/{reservation_id}/confirm", response_model=ReservationOut)
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