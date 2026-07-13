from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Order, OrderItem, OrderStatus, Product
from app.schemas import OrderCreate, OrderOut

router = APIRouter(tags=["orders"])

GST_RATE = 0.05
FREE_DELIVERY_THRESHOLD = 500
DELIVERY_CHARGE = 40

COUPONS = {
    "WELCOME10": 0.10,
    "FIRSTORDER": 0.15,
}


@router.post("/orders", response_model=OrderOut)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    if not payload.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    subtotal = 0.0
    line_items: list[OrderItem] = []
    for item in payload.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product or not product.is_active:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        subtotal += product.price * item.quantity
        line_items.append(
            OrderItem(product_id=product.id, quantity=item.quantity, unit_price=product.price)
        )

    discount = 0.0
    if payload.coupon_code:
        rate = COUPONS.get(payload.coupon_code.upper())
        if not rate:
            raise HTTPException(status_code=400, detail="Invalid coupon code")
        discount = subtotal * rate

    taxable = subtotal - discount
    gst = round(taxable * GST_RATE, 2)
    delivery_charge = 0 if subtotal >= FREE_DELIVERY_THRESHOLD else DELIVERY_CHARGE
    total = round(taxable + gst + delivery_charge, 2)

    order = Order(
        customer_name=payload.customer_name,
        customer_phone=payload.customer_phone,
        address=payload.address,
        subtotal=subtotal,
        gst=gst,
        delivery_charge=delivery_charge,
        total=total,
        coupon_code=payload.coupon_code,
        payment_method=payload.payment_method,
        items=line_items,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.get("/orders/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.get("/admin/orders", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return db.query(Order).order_by(Order.created_at.desc()).all()


@router.post("/admin/orders/{order_id}/status", response_model=OrderOut)
def update_order_status(
    order_id: str,
    status: OrderStatus,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status
    db.commit()
    db.refresh(order)
    return order
