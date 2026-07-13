import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from app.database import Base


def gen_id() -> str:
    return uuid.uuid4().hex


class SpiceLevel(str, enum.Enum):
    mild = "mild"
    medium = "medium"
    hot = "hot"


class Category(str, enum.Enum):
    starters = "starters"
    biryani = "biryani"
    curries = "curries"
    breads = "breads"
    rice = "rice"
    desserts = "desserts"
    cold_drinks = "cold-drinks"
    hot_drinks = "hot-drinks"


class OrderStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    preparing = "preparing"
    out_for_delivery = "out_for_delivery"
    delivered = "delivered"
    cancelled = "cancelled"


class Admin(Base):
    __tablename__ = "admins"

    id = Column(String, primary_key=True, default=gen_id)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    is_superadmin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=gen_id)
    name = Column(String, nullable=False)
    category = Column(Enum(Category), nullable=False, index=True)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    calories = Column(Integer, nullable=False)
    spice_level = Column(Enum(SpiceLevel), default=SpiceLevel.mild)
    is_veg = Column(Boolean, default=True)
    is_signature = Column(Boolean, default=False)
    image_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    order_items = relationship("OrderItem", back_populates="product")


class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=gen_id)
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    address = Column(Text, nullable=True)
    subtotal = Column(Float, nullable=False)
    gst = Column(Float, nullable=False, default=0)
    delivery_charge = Column(Float, nullable=False, default=0)
    total = Column(Float, nullable=False)
    coupon_code = Column(String, nullable=True)
    payment_method = Column(String, default="cod")  # cod | upi
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    created_at = Column(DateTime, default=datetime.utcnow)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String, primary_key=True, default=gen_id)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(String, primary_key=True, default=gen_id)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    guests = Column(Integer, nullable=False)
    date = Column(String, nullable=False)  # ISO date, kept as string for simplicity
    time = Column(String, nullable=False)
    special_request = Column(Text, nullable=True)
    confirmed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class ContactMessage(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True, default=gen_id)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class ChatLog(Base):
    __tablename__ = "chat_history"

    id = Column(String, primary_key=True, default=gen_id)
    session_id = Column(String, nullable=False, index=True)
    role = Column(String, nullable=False)  # user | bot
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
