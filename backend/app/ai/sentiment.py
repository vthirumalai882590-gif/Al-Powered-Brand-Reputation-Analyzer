import re
from typing import Dict, Any, Tuple

# Polarity words with weights
POSITIVE_TERMS = {
    "great": 0.8, "excellent": 0.9, "amazing": 0.9, "love": 0.85, "good": 0.6,
    "best": 0.95, "fast": 0.7, "durable": 0.8, "sturdy": 0.8, "comfortable": 0.8,
    "smooth": 0.75, "high quality": 0.85, "superb": 0.9, "phenomenal": 0.95,
    "perfect": 0.95, "awesome": 0.9, "worth": 0.75, "satisfied": 0.7, "reliable": 0.8,
    "paisa vasool": 0.9, "mast": 0.85, "badiya": 0.85, "accha": 0.7, "shandar": 0.9,
    "lajawab": 0.95, "fabulous": 0.85, "top notch": 0.9
}

NEGATIVE_TERMS = {
    "bad": -0.7, "terrible": -0.9, "horrible": -0.95, "worst": -1.0, "poor": -0.8,
    "slow": -0.6, "broken": -0.9, "useless": -0.9, "waste": -0.95, "overheating": -0.85,
    "heating": -0.7, "drain": -0.7, "lag": -0.7, "leak": -0.85, "leaking": -0.85,
    "leakage": -0.85, "crash": -0.85, "uncomfortable": -0.75, "overpriced": -0.7,
    "defective": -0.9, "cheap quality": -0.8, "flimsy": -0.8, "kharab": -0.85,
    "bakwas": -0.95, "bekar": -0.85, "ghatiya": -0.95, "dhoka": -0.95, "loot": -0.9,
    "disappointed": -0.8, "regret": -0.85, "dead": -0.95, "fraud": -1.0
}

INTENSIFIERS = {
    "very": 1.3, "extremely": 1.5, "super": 1.4, "highly": 1.3, "totally": 1.3,
    "really": 1.25, "bahut": 1.4, "absolutely": 1.4, "too": 1.2
}

NEGATIONS = {"not", "never", "no", "hardly", "barely", "scarcely", "without", "nahi", "mat"}

def analyze_review_sentiment(text: str, rating: float = 3.0) -> Dict[str, Any]:
    """
    Computes overall sentiment, continuous sentiment score (-1.0 to +1.0), and confidence.
    Combines text polarity analysis with rating prior.
    """
    if not text or not text.strip():
        # Fall back directly to star rating
        if rating >= 4.0:
            score = 0.6 if rating == 4.0 else 0.9
            sentiment = "positive"
        elif rating <= 2.0:
            score = -0.6 if rating == 2.0 else -0.9
            sentiment = "negative"
        else:
            score = 0.0
            sentiment = "neutral"
        return {"sentiment": sentiment, "sentiment_score": score, "confidence": 0.60}

    text_lower = text.lower()
    words = re.findall(r'\b[a-zA-Z0-9_\'-]+\b', text_lower)
    
    text_score = 0.0
    matches = 0
    i = 0
    n = len(words)

    while i < n:
        w = words[i]
        multiplier = 1.0

        # Check intensifier before word
        if i > 0 and words[i - 1] in INTENSIFIERS:
            multiplier = INTENSIFIERS[words[i - 1]]

        # Check negation in preceding 3 words
        window_start = max(0, i - 3)
        has_negation = any(words[j] in NEGATIONS for j in range(window_start, i))

        # Check multi-word phrases first
        phrase_found = False
        for phrase, p_score in {**POSITIVE_TERMS, **NEGATIVE_TERMS}.items():
            if " " in phrase:
                phrase_words = phrase.split()
                if words[i:i + len(phrase_words)] == phrase_words:
                    score = p_score * multiplier
                    if has_negation:
                        score = -score * 0.8
                    text_score += score
                    matches += 1
                    i += len(phrase_words)
                    phrase_found = True
                    break
        if phrase_found:
            continue

        if w in POSITIVE_TERMS:
            score = POSITIVE_TERMS[w] * multiplier
            if has_negation:
                score = -score * 0.8
            text_score += score
            matches += 1
        elif w in NEGATIVE_TERMS:
            score = NEGATIVE_TERMS[w] * multiplier
            if has_negation:
                score = abs(score) * 0.7
            text_score += score
            matches += 1

        i += 1

    # Normalize text score
    if matches > 0:
        avg_text_score = text_score / matches
    else:
        avg_text_score = 0.0

    # Rating score mapping (-1.0 to +1.0)
    rating_score_map = {
        1.0: -0.9, 1.5: -0.7, 2.0: -0.5, 2.5: -0.2,
        3.0: 0.0, 3.5: 0.25, 4.0: 0.6, 4.5: 0.8, 5.0: 0.95
    }
    rating_score = rating_score_map.get(rating, (rating - 3.0) / 2.0)

    # Blend text score and rating score
    if matches >= 3:
        # Strong text signal: 70% text, 30% rating
        final_score = (0.7 * avg_text_score) + (0.3 * rating_score)
    elif matches >= 1:
        # Moderate text signal: 55% text, 45% rating
        final_score = (0.55 * avg_text_score) + (0.45 * rating_score)
    else:
        # Low/no text signal: 85% rating, 15% text
        final_score = (0.15 * avg_text_score) + (0.85 * rating_score)

    final_score = max(-1.0, min(1.0, final_score))

    # Categorize
    if final_score > 0.15:
        sentiment = "positive"
    elif final_score < -0.15:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    # Confidence calculation
    agreement = 1.0 - (abs(avg_text_score - rating_score) / 2.0) if matches > 0 else 0.75
    confidence = min(0.98, max(0.65, 0.75 + (matches * 0.04) + (agreement * 0.15)))

    return {
        "sentiment": sentiment,
        "sentiment_score": round(final_score, 2),
        "confidence": round(confidence, 2)
    }
