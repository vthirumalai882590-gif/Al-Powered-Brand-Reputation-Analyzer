import pytest
from app.ai.language import analyze_review_language
from app.ai.authenticity import analyze_review_authenticity
from app.ai.sentiment import analyze_review_sentiment
from app.ai.emotion import detect_emotion
from app.ai.aspect import extract_aspect_sentiments
from app.ai.complaint import analyze_complaint
from app.ai.pipeline import run_full_ai_pipeline

def test_language_detection():
    # Test pure English
    res_en = analyze_review_language("This mixer grinder has exceptional grinding performance.")
    assert res_en["language"] == "en"
    assert res_en["script"] == "Latin"

    # Test Devanagari Hindi
    res_hi = analyze_review_language("यह बहुत अच्छा मिक्सर ग्राइंडर है")
    assert res_hi["language"] == "hi"
    assert res_hi["script"] == "Devanagari"

    # Test Code-mixed Hinglish
    res_mix = analyze_review_language("Yeh product bahut accha hai, paisa vasool grinding speed.")
    assert res_mix["is_code_mixed"] is True

def test_authenticity_detection():
    # Test suspicious boilerplate promotional phrasing
    spam_text = "superb amazing product five stars 100% genuine recommend to all must buy discount offer"
    res_spam = analyze_review_authenticity(spam_text, 5.0, is_verified_purchase=False)
    assert res_spam["risk_score"] >= 0.50
    assert "generic_promotional_phrasing" in res_spam["signals"]

    # Test genuine verified detailed review
    genuine_text = "Using this 1000W Bosch mixer for 6 months. Noise level is quite high, but grinding turmeric and chutney takes under 30 seconds."
    res_gen = analyze_review_authenticity(genuine_text, 4.0, is_verified_purchase=True)
    assert res_gen["risk_score"] <= 0.20
    assert res_gen["is_flagged_fake"] is False

def test_sentiment_and_negation():
    # Test positive
    res_pos = analyze_review_sentiment("Superb build quality, durable stainless steel jars, love it.", 5.0)
    assert res_pos["sentiment"] == "positive"
    assert res_pos["sentiment_score"] > 0.5

    # Test negative
    res_neg = analyze_review_sentiment("Worst purchase, motor stopped working and lid leaked everywhere.", 1.0)
    assert res_neg["sentiment"] == "negative"
    assert res_neg["sentiment_score"] < -0.5

    # Test negation: "not good" should be negative
    res_negated = analyze_review_sentiment("The jars are not good at all and blade is blunt.", 2.0)
    assert res_negated["sentiment"] == "negative"

def test_emotion_classification():
    # Test frustration
    emo_frust, _ = detect_emotion("Constant headache, the jar lid gets stuck and motor keeps tripping frequently.", 1.0, "negative")
    assert emo_frust == "frustration"

    # Test delight
    emo_delight, _ = detect_emotion("Blown away! Exceeded all expectations, fantastic grinding power!", 5.0, "positive")
    assert emo_delight == "delight"

def test_aspect_extraction_kitchen_appliances():
    text = "Motor power is extremely powerful with 1000W, but noise level is too loud and jar lid vibrates."
    aspects = extract_aspect_sentiments(text, category="Kitchen Appliances", overall_rating=3.0)
    
    assert "Motor Power" in aspects
    assert aspects["Motor Power"]["sentiment"] == "positive"
    assert "Noise Level" in aspects
    assert aspects["Noise Level"]["sentiment"] == "negative"
    assert "Jar Quality" in aspects

def test_aspect_extraction_beauty():
    text = "Great onion hair oil! Hair fall reduced noticeably after 3 weeks, pleasant fragrance, and non-sticky texture."
    aspects = extract_aspect_sentiments(text, category="Beauty & Personal Care", overall_rating=5.0)
    
    assert "Hair Fall Reduction" in aspects
    assert "Fragrance & Smell" in aspects
    assert "Texture & Stickiness" in aspects
    assert aspects["Fragrance & Smell"]["sentiment"] == "positive"

def test_complaint_and_safety_hazard():
    # Test critical safety hazard
    critical_text = "Warning! Spark came from bottom of mixer, smoke came out and burning smell filled kitchen!"
    c_crit = analyze_complaint(critical_text, 1.0, "negative")
    assert c_crit["is_complaint"] is True
    assert c_crit["urgency"] == "critical"
    assert c_crit["is_safety_hazard"] is True

    # Test normal positive review
    normal_text = "Good product, works well for daily kitchen cooking."
    c_norm = analyze_complaint(normal_text, 4.0, "positive")
    assert c_norm["is_complaint"] is False
    assert c_norm["urgency"] == "low"

def test_full_ai_pipeline():
    review = "Motor power is solid 750W. Grinds fine paste quickly. However, cleaning the jar coupler is slightly inconvenient."
    res = run_full_ai_pipeline(
        review_text=review,
        rating=4.0,
        category="Kitchen Appliances",
        is_verified_purchase=True
    )
    assert res["sentiment"] in ["positive", "neutral"]
    assert "Motor Power" in res["aspects"]
    assert "Ease of Cleaning" in res["aspects"]
    assert res["language"] == "en"
    assert res["confidence"] >= 0.70
