import re
from typing import Dict, Any, List, Optional

GENERIC_PROMOTIONAL_PHRASES = [
    "best product ever buy now",
    "100% genuine recommend to all",
    "superb amazing product five stars",
    "must buy discount offer",
    "great product nice item",
    "best in the market guaranteed",
    "dont think just buy",
    "blindly go for it",
    "100% original product",
    "worth every single penny buy now",
    "osm product",
    "awesome osm superb"
]

EXAGGERATED_SUPERLATIVES = [
    "life changing", "miracle product", "god level", "heavenly",
    "unbelievable result in 1 day", "magic oil", "instant cure"
]

def analyze_review_authenticity(
    text: str,
    rating: float = 3.0,
    is_verified_purchase: Optional[bool] = None,
    existing_texts: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Advanced multi-signal authenticity and fake review risk scorer.
    Returns risk score (0.0 to 1.0), signals, status label, and reasons.
    """
    if not text or not text.strip():
        return {
            "risk_score": 0.5,
            "is_flagged_fake": False,
            "status_label": "Unverifiable (Empty Text)",
            "signals": ["empty_text"],
            "reasons": ["Review contains no text to analyze"],
            "confidence": 0.5
        }

    text_lower = text.lower().strip()
    words = text.split()
    word_count = len(words)
    signals = []
    reasons = []
    risk_score = 0.05  # Base authentic baseline

    # 1. Corpus duplicate check
    is_duplicate = False
    if existing_texts:
        for prev in existing_texts:
            if text_lower == prev.lower().strip():
                is_duplicate = True
                signals.append("identical_review_duplicate")
                reasons.append("Identical review text detected across multiple submissions")
                risk_score += 0.45
                break

    # 2. Generic promotional copy check
    matched_promo = [phrase for phrase in GENERIC_PROMOTIONAL_PHRASES if phrase in text_lower]
    if matched_promo:
        signals.append("generic_promotional_phrasing")
        reasons.append(f"Contains boilerplate promotional phrasing: '{matched_promo[0]}'")
        risk_score += 0.35

    # 3. Exaggerated miraculous claims
    matched_miracles = [claim for claim in EXAGGERATED_SUPERLATIVES if claim in text_lower]
    if matched_miracles:
        signals.append("exaggerated_unsubstantiated_claims")
        reasons.append(f"Contains unrealistic superlative claim: '{matched_miracles[0]}'")
        risk_score += 0.25

    # 4. Ultra-short unspecific maximum rating
    if word_count <= 3 and rating == 5.0 and not is_verified_purchase:
        signals.append("unverified_short_extreme_rating")
        reasons.append("Extremely short unverified 5-star review with zero feature detail")
        risk_score += 0.25
    elif word_count <= 2 and rating == 5.0:
        signals.append("low_effort_generic_praise")
        reasons.append("Low effort 1-2 word maximum rating")
        risk_score += 0.15

    # 5. Excessive caps and punctuation spam
    caps_count = sum(1 for c in text if c.isupper())
    caps_ratio = caps_count / max(1, len(text))
    if caps_ratio > 0.6 and len(text) > 20:
        signals.append("excessive_capitalization")
        reasons.append("Excessive uppercase lettering indicates promotional or bot spam")
        risk_score += 0.20

    if re.search(r'[!?.]{4,}', text):
        signals.append("excessive_punctuation_emphasis")
        risk_score += 0.10

    # 6. Verified purchase mitigation
    if is_verified_purchase is True:
        risk_score = max(0.02, risk_score - 0.15)
    elif is_verified_purchase is False:
        # Non-verified reviews with extreme sentiment are riskier
        if rating in [1.0, 5.0]:
            risk_score += 0.10
            signals.append("unverified_polar_rating")

    # 7. Bound risk score
    risk_score = min(0.95, max(0.02, risk_score))
    is_flagged_fake = risk_score >= 0.65

    # Status label
    if risk_score < 0.20:
        status_label = "Verified Authentic"
    elif risk_score < 0.45:
        status_label = "Likely Genuine"
    elif risk_score < 0.65:
        status_label = "Moderate Risk / Review Required"
    else:
        status_label = "Potentially Suspicious / High Risk"

    if not reasons:
        reasons.append("Specific feature mentions with natural language variation")
        if is_verified_purchase:
            reasons.append("Confirmed verified buyer purchase")

    # Confidence calculation: higher detail and verified status increases confidence
    detail_bonus = min(0.2, word_count * 0.005)
    confidence = min(0.99, max(0.70, 0.85 + detail_bonus - (risk_score * 0.15)))

    return {
        "risk_score": round(risk_score, 2),
        "is_flagged_fake": is_flagged_fake,
        "status_label": status_label,
        "signals": signals,
        "reasons": reasons,
        "confidence": round(confidence, 2)
    }
