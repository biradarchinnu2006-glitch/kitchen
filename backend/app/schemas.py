from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, computed_field, field_validator

from app.models import Category, OrderStatus, SpiceLevel


# ---------- Products / Menu ----------

class ProductBase(BaseModel):
    name: str
    category: Category
    description: str
    price: float = Field(gt=0)
    calories: int = Field(ge=0)
    spice_level: SpiceLevel = SpiceLevel.mild
    is_veg: bool = True
    is_signature: bool = False
    image_url: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[Category] = None
    description: Optional[str] = None
    price: Optional[float] = None
    calories: Optional[int] = None
    spice_level: Optional[SpiceLevel] = None
    is_veg: Optional[bool] = None
    is_signature: Optional[bool] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None


class ProductOut(ProductBase):
    id: str
    model_config = {"from_attributes": True}


# frontend FoodItem shape uses camelCase-ish keys; alias to keep the
# frontend contract untouched regardless of backend field naming
class FoodItemOut(BaseModel):
    id: str
    name: str
    category: Category
    description: str
    price: float
    calories: int
    spiceLevel: SpiceLevel
    isVeg: bool
    isSignature: bool
    image: Optional[str] = None

    @classmethod
    def from_product(cls, p) -> "FoodItemOut":
        return cls(
            id=p.id,
            name=p.name,
            category=p.category,
            description=p.description,
            price=p.price,
            calories=p.calories,
            spiceLevel=p.spice_level,
            isVeg=p.is_veg,
            isSignature=p.is_signature,
            image=p.image_url,
        )


# ---------- Reservations ----------

class ReservationCreate(BaseModel):
    name: str = Field(min_length=2)
    phone: str = Field(min_length=10, max_length=13)
    guests: int = Field(ge=1, le=20)
    date: str
    time: str
    specialRequest: Optional[str] = None

    @field_validator("phone")
    @classmethod
    def strip_phone(cls, v: str) -> str:
        return v.replace(" ", "")


class ReservationOut(BaseModel):
    id: str
    name: str
    phone: str
    guests: int
    date: str
    time: str
    special_request: Optional[str] = None
    confirmed: bool
    created_at: datetime
    model_config = {"from_attributes": True}


# ---------- Contact ----------

class ContactCreate(BaseModel):
    name: str = Field(min_length=2)
    email: EmailStr
    message: str = Field(min_length=5)


class ContactOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    message: str
    created_at: datetime
    model_config = {"from_attributes": True}


# ---------- Orders ----------

class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int = Field(ge=1)


class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    address: Optional[str] = None
    items: list[OrderItemCreate]
    coupon_code: Optional[str] = None
    payment_method: str = "cod"


class OrderOut(BaseModel):
    id: str
    customer_name: str
    customer_phone: str
    subtotal: float
    gst: float
    delivery_charge: float
    total: float
    status: OrderStatus
    created_at: datetime
    model_config = {"from_attributes": True}


# ---------- Auth ----------

class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AdminOut(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    is_superadmin: bool
    created_at: datetime
    model_config = {"from_attributes": True}

    @computed_field
    @property
    def role(self) -> str:
        return "superadmin" if self.is_superadmin else "staff"


class StaffCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str = Field(min_length=2)
    is_superadmin: bool = False


# ---------- Chatbot ----------

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = "anonymous"


class ChatReply(BaseModel):
    reply: str
