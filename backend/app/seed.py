"""
Run with: python -m app.seed
Populates the products table with starter menu data. Safe to re-run —
skips items that already exist by name.
"""

from app.database import Base, SessionLocal, engine
from app.models import Product

MENU = [
    dict(name="Chicken Biryani", category="biryani", description="Long-grain basmati layered with slow-cooked chicken, saffron and fried onions, dum-sealed for two hours.", price=320, calories=780, spice_level="medium", is_veg=False, is_signature=True),
    dict(name="Mutton Biryani", category="biryani", description="Tender mutton on the bone, dum-cooked with whole spices and mint.", price=420, calories=860, spice_level="hot", is_veg=False),
    dict(name="Paneer Biryani", category="biryani", description="Home-set paneer, cashew and saffron rice, mild enough for the whole table.", price=280, calories=640, spice_level="mild", is_veg=True),
    dict(name="Chicken 65", category="starters", description="Curry-leaf and red-chilli fried chicken, crisp outside, juicy inside.", price=240, calories=410, spice_level="hot", is_veg=False),
    dict(name="Tandoori Chicken", category="starters", description="Yoghurt and kashmiri-chilli marinated chicken, charred over coals.", price=300, calories=460, spice_level="medium", is_veg=False),
    dict(name="Butter Chicken", category="curries", description="Tomato-cashew gravy finished with cream and a spoon of butter.", price=340, calories=620, spice_level="mild", is_veg=False, is_signature=True),
    dict(name="Mutton Curry", category="curries", description="Slow-braised mutton in a coconut-and-spice gravy, a family recipe.", price=380, calories=590, spice_level="hot", is_veg=False),
    dict(name="Butter Naan", category="breads", description="Tandoor-baked leavened bread brushed with ghee.", price=60, calories=260, spice_level="mild", is_veg=True),
    dict(name="Jeera Rice", category="rice", description="Basmati tempered with cumin and whole spices.", price=160, calories=320, spice_level="mild", is_veg=True),
    dict(name="Gulab Jamun", category="desserts", description="Milk-solid dumplings soaked in cardamom-rose syrup, served warm.", price=120, calories=380, spice_level="mild", is_veg=True),
    dict(name="Sweet Lassi", category="cold-drinks", description="Churned yoghurt, a little sugar, a lot of nostalgia.", price=90, calories=210, spice_level="mild", is_veg=True),
    dict(name="Masala Chai", category="hot-drinks", description="Hand-ground spice blend simmered with milk, the way Surekha makes it at home.", price=50, calories=90, spice_level="mild", is_veg=True),
]


def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        existing_names = {p.name for p in db.query(Product.name).all()}
        added = 0
        for item in MENU:
            if item["name"] in existing_names:
                continue
            db.add(Product(**item))
            added += 1
        db.commit()
        print(f"Seeded {added} new menu items ({len(MENU) - added} already existed).")
    finally:
        db.close()


if __name__ == "__main__":
    run()
