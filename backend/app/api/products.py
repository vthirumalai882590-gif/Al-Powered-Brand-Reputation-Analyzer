import uuid
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, func, desc
from app.database import get_db
from app.models.product import Product
from app.models.brand import Brand
from app.models.feedback import Feedback
from app.models.source import Source
from app.models.reputation_snapshot import ReputationSnapshot
from app.schemas.product import ProductCreate, ProductResponse, BrandResponse
from app.services.reputation import calculate_product_reputation
from app.config import settings

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("", response_model=List[ProductResponse])
def get_products(
    q: Optional[str] = None,
    category: Optional[str] = None,
    brand_id: Optional[str] = None,
    has_reviews_only: bool = False,
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    """
    Lists products with optional text search, category/brand filters, and pagination.
    In production mode, products with real reviews are prioritized.
    """
    query = db.query(Product)

    if q:
        query = query.filter(or_(
            Product.name.ilike(f"%{q}%"),
            Product.description.ilike(f"%{q}%"),
            Product.category.ilike(f"%{q}%"),
            Product.model.ilike(f"%{q}%")
        ))
    if category:
        query = query.filter(Product.category.ilike(f"%{category}%"))
    if brand_id:
        query = query.filter(Product.brand_id == brand_id)

    # In production mode or when has_reviews_only is true, filter/order by review count
    feedback_subquery = db.query(
        Feedback.product_id,
        func.count(Feedback.id).label("rev_count")
    )
    if settings.APP_DATA_MODE == "production":
        feedback_subquery = feedback_subquery.filter(Feedback.source_id != "src_demo_001")
    feedback_subquery = feedback_subquery.group_by(Feedback.product_id).subquery()

    query = query.outerjoin(feedback_subquery, Product.id == feedback_subquery.c.product_id)

    if has_reviews_only or settings.APP_DATA_MODE == "production":
        # Order by review count descending, then name
        query = query.order_by(desc(feedback_subquery.c.rev_count), Product.name.asc())
    else:
        query = query.order_by(Product.name.asc())

    offset = (page - 1) * page_size
    products = query.offset(offset).limit(page_size).all()
    return products

@router.post("", response_model=ProductResponse)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    product = Product(
        id=f"prd_{uuid.uuid4().hex[:10]}",
        brand_id=product_in.brand_id,
        name=product_in.name,
        normalized_name=product_in.name.lower().strip(),
        category=product_in.category,
        description=product_in.description,
        model=product_in.model,
        version=product_in.version,
        price=product_in.price,
        features=product_in.features
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.get("/{id}", response_model=ProductResponse)
def get_product(id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    return product

@router.get("/{id}/reputation")
def get_product_reputation(id: str, db: Session = Depends(get_db)):
    """
    Computes and returns transparent, evidence-based reputation scores.
    Strictly derived from real customer reviews and AI analysis.
    """
    rep = calculate_product_reputation(db, id)
    if rep.get("error"):
        raise HTTPException(status_code=404, detail=rep["error"])

    # Fetch latest review date for data freshness
    latest_review = db.query(func.max(Feedback.review_date)).filter(Feedback.product_id == id).scalar()
    freshness_str = f"Latest review from {latest_review.strftime('%Y-%m-%d')}" if latest_review else "No recent review data"

    # Map aspect breakdown to dimensions for backwards compatibility with frontend components
    dimensions = []
    positive_themes = []
    negative_themes = []

    for asp_name, asp_data in rep.get("aspects", {}).items():
        score = asp_data.get("score", 50.0)
        mentions = asp_data.get("mentions", 0)
        pos_ratio = int(asp_data.get("positive_ratio", 0.5) * 100)
        sentiment = asp_data.get("sentiment", "neutral")

        trend = "improving" if score >= 70.0 else ("declining" if score <= 45.0 else "stable")
        explanation = f"Grounded in {mentions} customer mentions ({pos_ratio}% positive)"

        dimensions.append({
            "dimension": asp_name,
            "score": score,
            "evidence_count": mentions,
            "trend": trend,
            "explanation": explanation
        })

        if sentiment == "positive":
            positive_themes.append(f"{asp_name} ({pos_ratio}% positive)")
        elif sentiment == "negative":
            negative_themes.append(f"{asp_name} Concerns")

    return {
        "product_id": rep["product_id"],
        "product_name": rep["product_name"],
        "brand_name": rep["brand_name"],
        "category": rep["category"],
        "has_sufficient_data": rep["has_sufficient_data"],
        "trust_score": rep["trust_score"],
        "confidence": rep["confidence_interval"]["confidence"],
        "confidence_interval": rep["confidence_interval"],
        "data_freshness": freshness_str,
        "review_count": rep["review_count"],
        "rating_metrics": rep["rating_metrics"],
        "sentiment_distribution": rep["sentiment_distribution"],
        "positive_themes": positive_themes[:5],
        "negative_themes": negative_themes[:5],
        "suspicious_patterns_count": rep["authenticity"]["suspicious_count"],
        "authenticity": rep["authenticity"],
        "dimensions": dimensions,
        "aspects": rep["aspects"],
        "complaints": rep["complaints"],
        "emotions": rep["emotions"],
        "timeline": rep["timeline"],
        "data_mode": rep["data_mode"]
    }

@router.get("/{id}/timeline")
def get_product_timeline(id: str, db: Session = Depends(get_db)):
    """
    Returns authentic chronological review timelines with sentiment and volume.
    Strictly derived from real feedback dates.
    """
    rep = calculate_product_reputation(db, id)
    if rep.get("error"):
        raise HTTPException(status_code=404, detail=rep["error"])

    # Format timeline for frontend chart consumption
    formatted_timeline = []
    for item in rep.get("timeline", []):
        formatted_timeline.append({
            "period": item["month"],
            "sentiment_score": int(item["sentiment_positive_pct"]),
            "volume": item["review_count"],
            "average_rating": item["average_rating"],
            "trust_score": item["trust_score"]
        })

    return {
        "product_id": id,
        "timeline": formatted_timeline,
        "has_sufficient_data": len(formatted_timeline) > 0
    }

@router.get("/{id}/aspects")
def get_product_aspects(id: str, db: Session = Depends(get_db)):
    """
    Returns granular category-specific aspect performance breakdown.
    """
    rep = calculate_product_reputation(db, id)
    if rep.get("error"):
        raise HTTPException(status_code=404, detail=rep["error"])

    return {
        "product_id": id,
        "aspects": rep.get("aspects", {}),
        "total_aspects": len(rep.get("aspects", {}))
    }

@router.get("/{id}/complaints")
def get_product_complaints(id: str, db: Session = Depends(get_db)):
    """
    Returns complaints, safety signals, and urgency triage.
    """
    rep = calculate_product_reputation(db, id)
    if rep.get("error"):
        raise HTTPException(status_code=404, detail=rep["error"])

    return {
        "product_id": id,
        "complaints": rep.get("complaints", {})
    }

@router.get("/compare/side-by-side")
def compare_products(ids: str = Query(..., description="Comma separated product IDs"), db: Session = Depends(get_db)):
    """
    Compares multiple products side-by-side using evidence-grounded reputation metrics.
    """
    product_ids = [p_id.strip() for p_id in ids.split(",") if p_id.strip()]
    products = db.query(Product).filter(Product.id.in_(product_ids)).all()

    comparisons = []
    for p in products:
        rep = get_product_reputation(p.id, db)
        comparisons.append({
            "product": ProductResponse.model_validate(p),
            "reputation": rep
        })

    return {
        "compared_count": len(comparisons),
        "products": comparisons,
        "evidence_summary": "Product comparisons are based on real aspect-level review evidence, confidence intervals, and verified customer feedback."
    }
