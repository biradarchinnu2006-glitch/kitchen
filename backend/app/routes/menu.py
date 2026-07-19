from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Category, Product
from app.schemas import FoodItemOut, ProductCreate, ProductOut, ProductUpdate

router = APIRouter(tags=["menu"])


@router.get("/menu", response_model=list[FoodItemOut])
def list_menu(
    category: Optional[Category] = None,
    veg: Optional[bool] = None,
    spicy: Optional[bool] = None,
    q: Optional[str] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Product).filter(Product.is_active == True)  # noqa: E712
    if category:
        query = query.filter(Product.category == category)
    if veg is not None:
        query = query.filter(Product.is_veg == veg)
    if spicy:
        query = query.filter(Product.spice_level == "hot")
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    if q:
        query = query.filter(Product.name.ilike(f"%{q}%"))

    products = query.order_by(Product.category, Product.name).all()
    return [FoodItemOut.from_product(p) for p in products]


@router.get("/menu/{product_id}", response_model=FoodItemOut)
def get_menu_item(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Item not found")
    return FoodItemOut.from_product(product)


# ---- Admin-only mutations ----

@router.get("/admin/products", response_model=list[ProductOut])
def list_all_products(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    """Full catalogue including inactive items, for the admin dashboard."""
    return db.query(Product).order_by(Product.category, Product.name).all()


@router.post("/admin/products", response_model=ProductOut)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.put("/admin/products/{product_id}", response_model=ProductOut)
def update_product(
    product_id: str,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Item not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product


@router.delete("/admin/products/{product_id}")
def delete_product(
    product_id: str,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(product)
    db.commit()
    return {"deleted": True}
