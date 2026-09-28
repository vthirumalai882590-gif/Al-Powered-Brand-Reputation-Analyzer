import re
from typing import Dict, Any, Tuple

EMOTION_PATTERNS = {
    "anger": [
        "scam", "fraud", "cheated", "loot", "cheating", "horrible", "furious",
        "worst experience", "never buy", "waste of money", "disaster", "pathetic",
        "ridiculous", "robbery", "bakwas", "dhoka", "chutiya", "ghatiya", "lootere"
    ],
    "frustration": [
        "annoying", "irritated", "frustrated", "headache", "stuck", "trouble",
        "struggling", "issue again", "tired of", "useless support", "not working",
        "stopping", "frequently", "painful", "fed up", "pareshan", "musibat"
    ],
    "disappointment": [
        "disappointed", "regret", "expected better", "let down", "not as advertised",
        "not worth", "average at best", "poor quality", "misleading", "waste",
        "below average", "subpar", "unhappy", "afsos", "umeed nahi thi"
    ],
    "delight": [
        "exceeded expectations", "blown away", "superb", "thrilled", "absolutely loved",
        "fantastic", "outstanding", "gem of a product", "masterpiece", "flawless",
        "mindblowing", "wonderful", "delighted", "kya baat hai", "zabardast", "lajawab"
    ],
    "satisfaction": [
        "satisfied", "good product", "works well", "decent", "happy with", "value for money",
        "worth the price", "does the job", "reliable", "as expected", "nice", "paisa vasool",
        "sahi hai", "accha hai", "theek hai"
    ],
    "skepticism": [
        "doubtful", "not sure yet", "time will tell", "seems okay for now", "mixed feeling",
        "too early to say", "questionable", "hope it lasts", "suspect", "dekhte hain"
    ]
}

def detect_emotion(text: str, rating: float = 3.0, sentiment: str = "neutral") -> Tuple[str, float]:
    """
    Classifies review emotion and returns (emotion_label, confidence).
    """
    if not text or not text.strip():
        return "neutral", 0.5

    text_lower = text.lower()
    scores: Dict[str, float] = {e: 0.0 for e in EMOTION_PATTERNS}
    
    for emotion, phrases in EMOTION_PATTERNS.items():
        for phrase in phrases:
            if " " in phrase:
                if phrase in text_lower:
                    scores[emotion] += 2.0
            else:
                if re.search(r'\b' + re.escape(phrase) + r'\b', text_lower):
                    scores[emotion] += 1.0

    # Rating cues
    if rating == 1.0:
        scores["anger"] += 0.8
        scores["frustration"] += 0.6
    elif rating == 2.0:
        scores["disappointment"] += 0.8
        scores["frustration"] += 0.5
    elif rating == 4.0:
        scores["satisfaction"] += 0.8
    elif rating == 5.0:
        scores["delight"] += 0.7
        scores["satisfaction"] += 0.5

    top_emotion, top_score = max(scores.items(), key=lambda x: x[1])
    
    if top_score == 0.0:
        if sentiment == "positive":
            return "satisfaction", 0.70
        elif sentiment == "negative":
            return "disappointment", 0.70
        return "neutral", 0.60
        
    confidence = min(0.95, 0.65 + (top_score * 0.08))
    return top_emotion, round(confidence, 2)
