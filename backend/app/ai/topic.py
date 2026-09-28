from typing import List, Dict, Any
from app.ai.category_aspects import get_aspect_taxonomy

GENERAL_TOPIC_KEYWORDS = {
    "Delivery & Logistics": ["delivery", "delivered", "shipping", "courier", "amazon", "flipkart", "fast delivery", "late delivery"],
    "Packaging Quality": ["packaging", "box", "bubble wrap", "packed", "seal", "package"],
    "Customer Support": ["customer service", "customer care", "warranty", "support", "service center", "technician", "replacement", "refund"],
    "Value for Money": ["value for money", "worth the money", "worth it", "cost", "price", "affordable", "overpriced", "paisa vasool"],
    "Product Build Quality": ["build quality", "sturdy", "durable", "material", "finish", "solid build"],
    "Ease of Use": ["easy to use", "simple", "convenient", "user friendly", "handle"]
}

def extract_topics(text: str, category: str = "", extracted_aspects: Dict[str, Any] = None) -> List[str]:
    """
    Extracts high-level topics discussed in the review, combining category aspects and general e-commerce themes.
    """
    if not text:
        return []

    text_lower = text.lower()
    topics: List[str] = []

    # Include topics derived from extracted aspects with strong presence
    if extracted_aspects:
        for aspect_name, data in extracted_aspects.items():
            sentiment = data.get("sentiment", "neutral")
            if sentiment == "positive":
                topics.append(f"{aspect_name} Satisfaction")
            elif sentiment == "negative":
                topics.append(f"{aspect_name} Concerns")
            else:
                topics.append(f"{aspect_name}")

    # General themes
    for topic_label, keywords in GENERAL_TOPIC_KEYWORDS.items():
        if any(kw in text_lower for kw in keywords):
            topics.append(topic_label)

    # De-duplicate while preserving order
    seen = set()
    unique_topics = []
    for t in topics:
        if t not in seen:
            seen.add(t)
            unique_topics.append(t)

    return unique_topics[:6]
