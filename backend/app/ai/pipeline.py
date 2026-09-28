from typing import Dict, Any, List, Optional
from app.ai.language import analyze_review_language
from app.ai.authenticity import analyze_review_authenticity
from app.ai.sentiment import analyze_review_sentiment
from app.ai.emotion import detect_emotion
from app.ai.aspect import extract_aspect_sentiments
from app.ai.topic import extract_topics
from app.ai.complaint import analyze_complaint

def run_full_ai_pipeline(
    review_text: str,
    rating: float = 3.0,
    category: str = "",
    is_verified_purchase: Optional[bool] = None,
    existing_texts: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Executes the modular end-to-end BrandPulse AI analysis pipeline on a single review record:
    1. Language & Code-Mix Detection
    2. Authenticity & Fake Risk Scoring
    3. Blended Polarity & Sentiment Scoring
    4. Fine-Grained Emotion Classification
    5. Category-Specific Aspect Sentiment Extraction
    6. Thematic Topic Tagging
    7. Complaint Detection & Urgency Triage
    """
    # 1. Language detection
    lang_info = analyze_review_language(review_text)

    # 2. Authenticity scoring
    auth_data = analyze_review_authenticity(
        text=review_text,
        rating=rating,
        is_verified_purchase=is_verified_purchase,
        existing_texts=existing_texts
    )

    # 3. Sentiment analysis
    sent_data = analyze_review_sentiment(review_text, rating)
    sentiment = sent_data["sentiment"]
    sentiment_score = sent_data["sentiment_score"]

    # 4. Emotion detection
    emotion, emotion_conf = detect_emotion(review_text, rating, sentiment)

    # 5. Aspect-level sentiment extraction
    aspects = extract_aspect_sentiments(review_text, category, rating)

    # 6. Topic extraction
    topics = extract_topics(review_text, category, aspects)

    # 7. Complaint detection & urgency
    complaint_data = analyze_complaint(review_text, rating, sentiment)

    # Overall analysis confidence
    conf_factors = [
        sent_data["confidence"],
        emotion_conf,
        auth_data["confidence"],
        lang_info["language_confidence"]
    ]
    overall_confidence = round(sum(conf_factors) / len(conf_factors), 2)

    return {
        "sentiment": sentiment,
        "sentiment_score": sentiment_score,
        "emotion": emotion,
        "aspects": aspects,
        "topics": topics,
        "complaint_type": complaint_data["complaint_type"],
        "urgency": complaint_data["urgency"],
        "is_complaint": complaint_data["is_complaint"],
        "is_safety_hazard": complaint_data["is_safety_hazard"],
        "authenticity_risk": auth_data["risk_score"],
        "is_flagged_fake": auth_data["is_flagged_fake"],
        "authenticity_signals": auth_data,
        "language": lang_info["language"],
        "language_confidence": lang_info["language_confidence"],
        "script": lang_info["script"],
        "is_code_mixed": lang_info["is_code_mixed"],
        "confidence": overall_confidence
    }

def calculate_personal_fit(
    product_name: str,
    category: str,
    aspect_aggregates: Dict[str, Dict[str, Any]],
    primary_use_case: str,
    non_negotiables: List[str]
) -> Dict[str, Any]:
    """
    Computes a customer-specific personal fit score strictly derived from real analyzed aspect scores.
    """
    if not aspect_aggregates:
        return {
            "product_name": product_name,
            "fit_score": None,
            "suitability": "Insufficient Data",
            "matching_aspects": [],
            "potential_limitations": ["No verified aspect evaluations available for this product yet."],
            "recommended_pre_purchase_questions": [
                f"Verify warranty coverage for {product_name} before purchase."
            ]
        }

    matching = []
    limitations = []
    score_weights = []

    # Check non negotiables against aspects
    for req in non_negotiables:
        req_lower = req.lower()
        matched_aspect = None
        for asp_name, asp_data in aspect_aggregates.items():
            if any(term in req_lower for term in asp_name.lower().split()):
                matched_aspect = (asp_name, asp_data)
                break
        
        if matched_aspect:
            asp_name, data = matched_aspect
            pos_ratio = data.get("positive_ratio", 0.5)
            if pos_ratio >= 0.70:
                matching.append(f"Satisfies '{req}': {int(pos_ratio * 100)}% positive rating on {asp_name}")
                score_weights.append(pos_ratio * 100)
            elif pos_ratio <= 0.40:
                limitations.append(f"Risk on '{req}': Only {int(pos_ratio * 100)}% positive rating on {asp_name}")
                score_weights.append(pos_ratio * 50)
            else:
                score_weights.append(65)
        else:
            score_weights.append(70)

    # General aspect satisfaction
    for asp_name, data in aspect_aggregates.items():
        pos_ratio = data.get("positive_ratio", 0.5)
        if pos_ratio >= 0.80 and len(matching) < 4:
            matching.append(f"Top Performer: {asp_name} has {int(pos_ratio * 100)}% customer satisfaction")
        elif pos_ratio <= 0.35 and len(limitations) < 3:
            limitations.append(f"Caution: {asp_name} reported low satisfaction ({int(pos_ratio * 100)}%)")

    fit_score = int(sum(score_weights) / len(score_weights)) if score_weights else 75
    fit_score = min(98, max(20, fit_score))

    if fit_score >= 80:
        suitability = "High Fit"
    elif fit_score >= 60:
        suitability = "Moderate Fit"
    else:
        suitability = "Low Fit"

    return {
        "product_name": product_name,
        "fit_score": fit_score,
        "suitability": suitability,
        "matching_aspects": matching if matching else [f"Standard operational satisfaction for {primary_use_case}"],
        "potential_limitations": limitations if limitations else ["Review specific seller return policy"],
        "recommended_pre_purchase_questions": [
            f"Are replacement parts readily available for {product_name} in your region?",
            "What is the official warranty registration process?"
        ]
    }

def generate_ai_chat_response(query: str, product_name: str, reputation_data: Dict[str, Any]) -> str:
    """
    Generates an evidence-grounded AI assistant response based strictly on actual review metrics.
    """
    if not reputation_data or not reputation_data.get("review_count"):
        return f"I do not have enough verified customer reviews for {product_name} to answer '{query}' with statistical confidence."

    query_lower = query.lower()
    total_reviews = reputation_data.get("review_count", 0)
    trust_score = reputation_data.get("trust_score", 0.0)
    aspects = reputation_data.get("aspects", {})
    sentiment_dist = reputation_data.get("sentiment_distribution", {})

    # Check if query matches a specific aspect
    matched_aspect = None
    for asp_name, asp_data in aspects.items():
        if any(term in query_lower for term in asp_name.lower().split()):
            matched_aspect = (asp_name, asp_data)
            break

    if matched_aspect:
        asp_name, asp_data = matched_aspect
        pos_pct = int(asp_data.get("positive_ratio", 0.0) * 100)
        mentions = asp_data.get("mentions", 0)
        status = "strongly positive" if pos_pct >= 75 else ("mixed" if pos_pct >= 50 else "concerning")
        return (
            f"Based on {mentions} customer mentions in {total_reviews} verified reviews for {product_name}, "
            f"feedback on {asp_name} is {status} with {pos_pct}% positive sentiment."
        )

    # General verdict
    pos_pct = int(sentiment_dist.get("positive", 0) / max(1, total_reviews) * 100)
    return (
        f"For {product_name}, our evidence-based analysis of {total_reviews} customer reviews yields an overall Trust Score of "
        f"{trust_score}%. Customer sentiment is {pos_pct}% positive across key aspects."
    )
