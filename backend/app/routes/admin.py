import csv
import io

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Order, OrderItem, Product

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/analytics/summary")
def analytics_summary(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    total_revenue = db.query(func.coalesce(func.sum(Order.total), 0)).scalar()
    total_orders = db.query(func.count(Order.id)).scalar()

    popular = (
        db.query(Product.name, func.sum(OrderItem.quantity).label("qty"))
        .join(OrderItem, OrderItem.product_id == Product.id)
        .group_by(Product.name)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(5)
        .all()
    )

    return {
        "total_revenue": float(total_revenue or 0),
        "total_orders": int(total_orders or 0),
        "popular_items": [{"name": name, "quantity": int(qty)} for name, qty in popular],
    }


@router.get("/orders/export")
def export_orders_csv(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    orders = db.query(Order).order_by(Order.created_at.desc()).all()

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["id", "customer_name", "customer_phone", "total", "status", "created_at"])
    for o in orders:
        writer.writerow([o.id, o.customer_name, o.customer_phone, o.total, o.status.value, o.created_at])
    buffer.seek(0)

    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=orders.csv"},
    )
# ---------------- ORDERS ----------------

@router.get("/orders")
def list_orders(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return db.query(Order).order_by(Order.created_at.desc()).all()