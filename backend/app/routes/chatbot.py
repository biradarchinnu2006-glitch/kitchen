from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ChatLog, Product
from app.schemas import ChatMessage, ChatReply

router = APIRouter(tags=["chatbot"])

FAQ = {
    ("timing", "open", "close", "hour"): "We're open daily, 12:00 PM – 11:00 PM.",
    ("location", "address", "where"): "We're happy to share the exact address once you're ready to visit — tap the WhatsApp button and we'll send a map pin.",
    ("delivery",): "We deliver within 6 km. Orders above ₹500 get free delivery.",
    ("reservation", "book", "table"): "Head to the Reservations page, or tell me your date, time and party size here.",
    ("price", "cost", "how much"): "Prices are listed on the Menu page — they range from ₹50 for a chai to ₹420 for our Mutton Biryani.",
}


def _rule_based_reply(message: str, db: Session) -> str:
    text = message.lower()

    if "special" in text or "today" in text:
        signature = db.query(Product).filter(Product.is_signature.is_(True)).first()
        if signature:
            return f"Today's chef pick is the {signature.name}, ₹{signature.price:.0f}."
        return "Today's chef pick is the Special Chicken Biryani, dum-cooked to order."

    for keywords, answer in FAQ.items():
        if any(k in text for k in keywords):
            return answer

    return (
        "I'll pass that along — for anything urgent, tap the WhatsApp button "
        "and the team will reply directly."
    )


@router.post("/chatbot", response_model=ChatReply)
def chat(payload: ChatMessage, db: Session = Depends(get_db)):
    reply = _rule_based_reply(payload.message, db)

    db.add(ChatLog(session_id=payload.session_id or "anonymous", role="user", text=payload.message))
    db.add(ChatLog(session_id=payload.session_id or "anonymous", role="bot", text=reply))
    db.commit()

    return ChatReply(reply=reply)
