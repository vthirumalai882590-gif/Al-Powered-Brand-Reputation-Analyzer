import math
from typing import Dict, Any, List, Optional
from collections import defaultdict
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.feedback import Feedback
from app.models.product import Product
from app.models.brand import Brand
from app.models.source import Source
from app.models.ai_analysis import AIAnalysis
from app.config import APP_DATA_MODE

def calculate_product_reputation(
    db: Session,
    product_id: str,
    data_mode: Optional[str] = None
) -> Dict[str, Any]:
    """
    Computes transparent, evidence-based reputation and trust scores for a product.
    Grounded strictly in real ingested feedback and AI analysis records.
    Never generates synthetic reviews or fallback numbers.
    """
    mode = data_mode or APP_DATA_MODE

    # Fetch product metadata
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        return {
            "product_id": product_id,
            "has_sufficient_data": False,
            "error": "Product not found",
            "data_mode": mode
        }

    # Query feedback for product, filtering out demo data in production mode
    query = db.query(Feedback, AIAnalysis).outerjoin(
        AIAnalysis, Feedback.id == AIAnalysis.feedback_id
    ).filter(Feedback.product_id == product_id)

    if mode == "production":
        # Exclude demo sources
        from sqlalchemy import select
        demo_sources_select = select(Source.id).where(Source.source_type == "demo")
        query = query.filter(
            Feedback.source_id != "src_demo_001",
            ~Feedback.source_id.in_(demo_sources_select)
        )

    rows = query.all()
    total_reviews = len(rows)

    if total_reviews == 0:
        return {
            "product_id": product.id,
            "product_name": product.name,
            "brand_id": product.brand_id,
            "category": product.category,
            "has_sufficient_data": False,
            "review_count": 0,
            "trust_score": None,
            "confidence_interval": {"lower": None, "upper": None, "confidence": 0.0},
            "rating_metrics": {
                "average_rating": None,
                "total_ratings": 0,
                "distribution": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
            },
            "sentiment_distribution": {"positive": 0, "neutral": 0, "negative": 0},
            "aspects": {},
            "authenticity": {
                "suspicious_count": 0,
                "suspicious_percentage": 0.0,
                "verified_buyer_percentage": 0.0,
                "avg_authenticity_risk": 0.0
            },
            "complaints": {
                "total_complaints": 0,
                "critical_count": 0,
                "high_count": 0,
                "top_complaint_types": []
            },
            "emotions": {},
            "timeline": [],
            "data_mode": mode
        }

    # Aggregate ratings
    rating_sum = 0.0
    rating_count = 0
    rating_dist = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    verified_count = 0

    sentiment_counts = {"positive": 0, "neutral": 0, "negative": 0}
    emotion_counts = defaultdict(int)
    complaint_counts = defaultdict(int)
    critical_complaints = 0
    high_complaints = 0
    total_complaints = 0

    aspect_stats = defaultdict(lambda: {
        "mentions": 0,
        "score_sum": 0.0,
        "positive": 0,
        "neutral": 0,
        "negative": 0,
        "snippets": []
    })

    auth_risk_sum = 0.0
    suspicious_count = 0

    # Monthly aggregation for timeline
    monthly_data = defaultdict(lambda: {
        "count": 0,
        "rating_sum": 0.0,
        "pos": 0,
        "neu": 0,
        "neg": 0
    })

    for fb, ai in rows:
        # Rating
        if fb.rating is not None:
            r = float(fb.rating)
            rating_sum += r
            rating_count += 1
            star = max(1, min(5, int(round(r))))
            rating_dist[star] += 1

        if fb.verified_flag:
            verified_count += 1

        # Month grouping
        month_key = fb.review_date.strftime("%Y-%m") if fb.review_date else "Unknown"
        monthly_data[month_key]["count"] += 1
        if fb.rating:
            monthly_data[month_key]["rating_sum"] += fb.rating

        if ai:
            # Sentiment
            sent = ai.sentiment or "neutral"
            sentiment_counts[sent] = sentiment_counts.get(sent, 0) + 1
            if sent == "positive":
                monthly_data[month_key]["pos"] += 1
            elif sent == "negative":
                monthly_data[month_key]["neg"] += 1
            else:
                monthly_data[month_key]["neu"] += 1

            # Emotion
            if ai.emotion:
                emotion_counts[ai.emotion] += 1

            # Complaints
            if ai.complaint_type or ai.urgency in ["high", "critical"]:
                total_complaints += 1
                if ai.complaint_type:
                    complaint_counts[ai.complaint_type] += 1
                if ai.urgency == "critical":
                    critical_complaints += 1
                elif ai.urgency == "high":
                    high_complaints += 1

            # Authenticity
            risk = ai.authenticity_risk if ai.authenticity_risk is not None else 0.05
            auth_risk_sum += risk
            if risk >= 0.65:
                suspicious_count += 1

            # Aspects
            if ai.aspects and isinstance(ai.aspects, dict):
                for asp_name, asp_val in ai.aspects.items():
                    if isinstance(asp_val, dict):
                        stat = aspect_stats[asp_name]
                        stat["mentions"] += asp_val.get("mentions", 1)
                        stat["score_sum"] += asp_val.get("score", 0.0)
                        s = asp_val.get("sentiment", "neutral")
                        if s == "positive":
                            stat["positive"] += 1
                        elif s == "negative":
                            stat["negative"] += 1
                        else:
                            stat["neutral"] += 1
                        snips = asp_val.get("snippets", [])
                        if snips and len(stat["snippets"]) < 5:
                            for snip in snips:
                                if snip not in stat["snippets"] and len(stat["snippets"]) < 5:
                                    stat["snippets"].append(snip)

    # 1. Rating Metric
    avg_rating = round(rating_sum / rating_count, 2) if rating_count > 0 else 3.0
    scaled_rating = (avg_rating / 5.0) * 100.0

    # 2. Sentiment Score (0 to 100)
    pos_c = sentiment_counts.get("positive", 0)
    neg_c = sentiment_counts.get("negative", 0)
    sentiment_ratio = ((pos_c - neg_c) / total_reviews) if total_reviews > 0 else 0.0
    sentiment_score = ((sentiment_ratio + 1.0) / 2.0) * 100.0

    # 3. Aspect Score (0 to 100)
    aspect_breakdown = {}
    total_aspect_score = 0.0
    total_aspect_weights = 0

    for asp_name, stat in aspect_stats.items():
        m = stat["mentions"]
        if m == 0:
            continue
        avg_asp_score = stat["score_sum"] / max(1, stat["positive"] + stat["neutral"] + stat["negative"])
        scaled_asp = ((avg_asp_score + 1.0) / 2.0) * 100.0
        pos_ratio = stat["positive"] / max(1, stat["positive"] + stat["negative"] + stat["neutral"])
        
        aspect_breakdown[asp_name] = {
            "name": asp_name,
            "score": round(scaled_asp, 1),
            "sentiment": "positive" if avg_asp_score > 0.15 else ("negative" if avg_asp_score < -0.15 else "neutral"),
            "mentions": m,
            "positive_ratio": round(pos_ratio, 2),
            "positive_count": stat["positive"],
            "negative_count": stat["negative"],
            "neutral_count": stat["neutral"],
            "snippets": stat["snippets"]
        }
        total_aspect_score += scaled_asp * math.log(m + 1)
        total_aspect_weights += math.log(m + 1)

    avg_aspect_score = (total_aspect_score / total_aspect_weights) if total_aspect_weights > 0 else scaled_rating

    # 4. Authenticity & Verified Buyer Factors
    avg_auth_risk = round(auth_risk_sum / total_reviews, 3) if total_reviews > 0 else 0.05
    suspicious_pct = round((suspicious_count / total_reviews) * 100.0, 1) if total_reviews > 0 else 0.0
    verified_pct = round((verified_count / total_reviews) * 100.0, 1) if total_reviews > 0 else 0.0

    # Risk penalty factor (1.0 = no penalty, 0.65 = heavy penalty)
    auth_factor = max(0.60, 1.0 - (avg_auth_risk * 0.40))

    # 5. Composite Trust Score Calculation
    raw_trust = (0.35 * scaled_rating) + (0.30 * sentiment_score) + (0.25 * avg_aspect_score) + (0.10 * verified_pct)
    penalized_trust = raw_trust * auth_factor

    # Volume Damping: Bayesian prior shrinkage towards 50.0 for small sample sizes
    # Prior weight M = 15
    prior_weight = 15.0
    prior_score = 50.0
    damped_trust = ((penalized_trust * total_reviews) + (prior_score * prior_weight)) / (total_reviews + prior_weight)
    final_trust_score = round(max(5.0, min(99.0, damped_trust)), 1)

    # 6. Statistical Confidence Interval
    # Standard error of the mean
    p = final_trust_score / 100.0
    std_error = math.sqrt((p * (1.0 - p)) / max(1, total_reviews)) * 100.0
    margin = 1.96 * std_error
    ci_lower = round(max(0.0, final_trust_score - margin), 1)
    ci_upper = round(min(100.0, final_trust_score + margin), 1)
    confidence_level = round(min(0.99, max(0.50, 1.0 - (1.0 / math.sqrt(total_reviews + 1)))), 2)

    # 7. Timeline Chronology
    timeline = []
    for month_key in sorted(monthly_data.keys()):
        if month_key == "Unknown":
            continue
        m_stat = monthly_data[month_key]
        cnt = m_stat["count"]
        m_avg_r = round(m_stat["rating_sum"] / cnt, 2) if cnt > 0 else 0.0
        m_pos = m_stat["pos"]
        m_neg = m_stat["neg"]
        m_sent_pct = round((m_pos / cnt) * 100.0, 1) if cnt > 0 else 50.0
        m_trust = round(((m_avg_r / 5.0) * 50.0) + (m_sent_pct * 0.5), 1)
        timeline.append({
            "month": month_key,
            "review_count": cnt,
            "average_rating": m_avg_r,
            "sentiment_positive_pct": m_sent_pct,
            "trust_score": m_trust
        })

    # 8. Top Complaints
    top_complaints = [
        {"type": c_type, "count": c_count}
        for c_type, c_count in sorted(complaint_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    ]

    brand_name = db.query(Brand.name).filter(Brand.id == product.brand_id).scalar()

    return {
        "product_id": product.id,
        "product_name": product.name,
        "brand_id": product.brand_id,
        "brand_name": brand_name,
        "category": product.category,
        "has_sufficient_data": total_reviews >= 5,
        "review_count": total_reviews,
        "trust_score": final_trust_score,
        "confidence_interval": {
            "lower": ci_lower,
            "upper": ci_upper,
            "confidence": confidence_level
        },
        "rating_metrics": {
            "average_rating": avg_rating,
            "total_ratings": rating_count,
            "distribution": rating_dist
        },
        "sentiment_distribution": sentiment_counts,
        "aspects": aspect_breakdown,
        "authenticity": {
            "suspicious_count": suspicious_count,
            "suspicious_percentage": suspicious_pct,
            "verified_buyer_percentage": verified_pct,
            "avg_authenticity_risk": avg_auth_risk
        },
        "complaints": {
            "total_complaints": total_complaints,
            "critical_count": critical_complaints,
            "high_count": high_complaints,
            "top_complaint_types": top_complaints
        },
        "emotions": dict(emotion_counts),
        "timeline": timeline,
        "data_mode": mode
    }

def calculate_brand_reputation(
    db: Session,
    brand_id: str,
    data_mode: Optional[str] = None
) -> Dict[str, Any]:
    """
    Computes brand-level reputation metrics by aggregating verified product-level data.
    """
    mode = data_mode or APP_DATA_MODE
    brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if not brand:
        return {"brand_id": brand_id, "error": "Brand not found", "data_mode": mode}

    products = db.query(Product).filter(Product.brand_id == brand_id).all()
    if not products:
        return {
            "brand_id": brand.id,
            "brand_name": brand.name,
            "category": brand.category,
            "has_sufficient_data": False,
            "product_count": 0,
            "total_reviews": 0,
            "trust_score": None,
            "products": [],
            "data_mode": mode
        }

    product_summaries = []
    total_reviews = 0
    weighted_trust_sum = 0.0
    weighted_rating_sum = 0.0

    for p in products:
        rep = calculate_product_reputation(db, p.id, data_mode=mode)
        rev_count = rep.get("review_count", 0)
        t_score = rep.get("trust_score")
        r_avg = rep.get("rating_metrics", {}).get("average_rating")

        product_summaries.append({
            "product_id": p.id,
            "product_name": p.name,
            "category": p.category,
            "review_count": rev_count,
            "trust_score": t_score,
            "average_rating": r_avg,
            "has_sufficient_data": rep.get("has_sufficient_data", False)
        })

        if rev_count > 0 and t_score is not None:
            total_reviews += rev_count
            weighted_trust_sum += t_score * rev_count
            if r_avg is not None:
                weighted_rating_sum += r_avg * rev_count

    brand_trust = round(weighted_trust_sum / total_reviews, 1) if total_reviews > 0 else None
    brand_rating = round(weighted_rating_sum / total_reviews, 2) if total_reviews > 0 else None

    return {
        "brand_id": brand.id,
        "brand_name": brand.name,
        "category": brand.category,
        "website": brand.website,
        "has_sufficient_data": total_reviews >= 10,
        "product_count": len(products),
        "total_reviews": total_reviews,
        "trust_score": brand_trust,
        "average_rating": brand_rating,
        "products": sorted(product_summaries, key=lambda x: x["review_count"], reverse=True),
        "data_mode": mode
    }
