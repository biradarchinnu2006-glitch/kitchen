from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Menu

REAL_RECIPES = [
    {
        "name": "Paneer Tikka Shashlik",
        "description": "Cubes of fresh malai cottage cheese marinated in spiced hung yogurt, skewered with bell peppers, and charred.",
        "price": 280.0,
        "category": "starters",  # Changed to lowercase
        "image_url": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop",
        "is_veg": True,
        "is_spicy": False,
        "calories": 340
    },
    {
        "name": "Crispy Chilli Chicken",
        "description": "Batter-fried chicken strips tossed with crunchy bell peppers, spring onions, garlic, and a spicy dark soy glaze.",
        "price": 320.0,
        "category": "starters",  # Changed to lowercase
        "image_url": "https://images.unsplash.com/photo-1690497592769-cf368d904705?q=80&w=600&auto=format&fit=crop",
        "is_veg": False,
        "is_spicy": True,
        "calories": 420
    },
    {
        "name": "Hyderabadi Mutton Biryani",
        "description": "Fragrant long-grain basmati rice cooked in slow layers with tender, overnight-marinated mutton, saffron, and fresh mint.",
        "price": 450.0,
        "category": "biryani",  # Changed to lowercase
        "image_url": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop",
        "is_veg": False,
        "is_spicy": True,
        "calories": 750
    },
    {
        "name": "Special Chicken Dum Biryani",
        "description": "Succulent chicken pieces marinated in yogurt and a heritage spice blend, slow-cooked under a sealed dough lid.",
        "price": 380.0,
        "category": "biryani",  # Changed to lowercase
        "image_url": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
        "is_veg": False,
        "is_spicy": True,
        "calories": 680
    },
    {
        "name": "Butter Chicken Deluxe",
        "description": "Tandoori grilled chicken pieces simmered in a velvety, rich tomato and cashew nut gravy.",
        "price": 390.0,
        "category": "curries",  # Changed to lowercase
        "image_url": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600&auto=format&fit=crop",
        "is_veg": False,
        "is_spicy": False,
        "calories": 590
    },
    {
        "name": "Shahi Gulab Jamun",
        "description": "Deep-fried golden milk-solid dumplings soaked in a warm, sweet sugar syrup infused with green cardamom.",
        "price": 120.0,
        "category": "desserts",  # Changed to lowercase
        "image_url": "https://images.unsplash.com/photo-1627916607164-7b20241db935?q=80&w=600&auto=format&fit=crop",
        "is_veg": True,
        "is_spicy": False,
        "calories": 290
    },
    {
        "name": "Kesari Rasmalai",
        "description": "Soft, spongy cottage cheese patties flattened and soaked in chilled, thick sweet saffron milk.",
        "price": 150.0,
        "category": "desserts",  # Changed to lowercase
        "image_url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop",
        "is_veg": True,
        "is_spicy": False,
        "calories": 260
    }
]

def seed():
    db = SessionLocal()
    try:
        db.query(Menu).delete()
        for dish in REAL_RECIPES:
            item = Menu(
                name=dish["name"],
                description=dish["description"],
                price=dish["price"],
                category=dish["category"],
                image_url=dish["image_url"],
                is_veg=dish["is_veg"],
                is_spicy=dish["is_spicy"],
                calories=dish["calories"]
            )
            db.add(item)
        db.commit()
        print("SUCCESS: Recalibrated categories written successfully!")
    finally:
        db.close()

if __name__ == "__main__":
    seed()