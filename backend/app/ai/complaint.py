import re
from typing import Dict, Any, Optional

CRITICAL_SAFETY_KEYWORDS = [
    "smoke", "fire", "spark", "sparks", "shock", "electric shock",
    "burned", "burnt", "burning smell", "blast", "exploded", "burst",
    "caught fire", "short circuit", "hazard", "dangerous", "injury",
    "cut hand", "bleeding", "chemical burn", "rash all over"
]

HIGH_URGENCY_KEYWORDS = [
    "dead on arrival", "stopped working within", "not working at all",
    "defective piece", "completely broken", "refused replacement",
    "refused return", "cheated", "fraud", "worst product ever",
    "motor dead", "spoiled on day 1", "damaged piece", "fake product"
]

COMPLAINT_CATEGORIES = {
    "Overheating & Fire Hazard": ["smoke", "spark", "burning", "burnt", "overheating", "overheat", "too hot to touch", "tripping"],
    "Motor & Operational Defect": ["motor stopped", "motor dead", "not turning on", "stopped working", "dead", "power button", "does not work"],
    "Excessive Noise & Vibration": ["ear piercing", "extremely loud", "horrible noise", "heavy vibration", "shaking", "deafening", "rattling"],
    "Leakage & Seal Failure": ["leak", "leaking", "leakage", "spilling", "gasket loose", "rubber ring", "lid loose", "spill"],
    "Jar & Blade Damage": ["blade broke", "blade broken", "jar cracked", "coupler broken", "plastic cracked", "chipped blade"],
    "Adverse Skin / Hair Reaction": ["severe hair fall", "hair falling out", "scalp itching", "headache from smell", "skin irritation", "burning sensation"],
    "Delivery & Packaging Defect": ["damaged packaging", "box crushed", "missing jar", "seal opened", "used product sent", "wrong item"],
    "Misleading Claims / Specs": ["not genuine", "fake", "duplicate", "wattage is less", "misleading", "false specs", "counterfeit"],
    "Customer Support & Warranty": ["customer care rude", "no response", "warranty rejected", "service center", "no technician"]
}

def analyze_complaint(text: str, rating: float = 3.0, sentiment: str = "neutral") -> Dict[str, Any]:
    """
    Analyzes review text for complaints, complaint categorization, and urgency level.
    """
    if not text or not text.strip():
        return {
            "is_complaint": False,
            "complaint_type": None,
            "urgency": "low",
            "is_safety_hazard": False
        }

    text_lower = text.lower()
    
    # 1. Critical safety hazard check
    is_safety_hazard = any(
        re.search(r'\b' + re.escape(w) + r'\b', text_lower)
        for w in CRITICAL_SAFETY_KEYWORDS
    )
    
    # 2. Determine urgency
    if is_safety_hazard:
        urgency = "critical"
    elif any(kw in text_lower for kw in HIGH_URGENCY_KEYWORDS) or (rating == 1.0 and sentiment == "negative"):
        urgency = "high"
    elif sentiment == "negative" or rating <= 2.0:
        urgency = "medium"
    else:
        urgency = "low"

    # 3. Identify complaint category
    matched_category = None
    for category, keywords in COMPLAINT_CATEGORIES.items():
        if any(kw in text_lower for kw in keywords):
            matched_category = category
            break

    # 4. Determine overall complaint boolean
    is_complaint = (urgency in ["critical", "high", "medium"]) or (matched_category is not None) or (rating <= 2.0 and sentiment == "negative")

    if not is_complaint:
        matched_category = None
        urgency = "low"
    elif is_complaint and not matched_category:
        matched_category = "General Performance / Quality Issue"

    return {
        "is_complaint": is_complaint,
        "complaint_type": matched_category,
        "urgency": urgency,
        "is_safety_hazard": is_safety_hazard
    }
