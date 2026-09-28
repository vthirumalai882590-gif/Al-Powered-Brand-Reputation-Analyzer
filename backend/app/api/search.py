from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, func, desc

from app.database import get_db
from app.models.product import Product
from app.models.brand import Brand
from app.models.feedback import Feedback
from app.services.reputation import calculate_product_reputation
from app.config import settings

router = APIRouter(prefix="/api/search", tags=["Search Intelligence"])

@router.get("")
def search_catalog(
    q: Optional[str] = None,
    category: Optional[str] = None,
    brand: Optional[str] = None,
    min_rating: Optional[float] = None,
    min_trust_score: Optional[float] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Unified multi-facet search engine across products, brands, categories, and aspect performance.
    """
    query = db.query(Product).outerjoin(Brand, Product.brand_id == Brand.id)

    if q:
        search_term = f"%{q}%"
        query = query.filter(or_(
            Product.name.ilike(search_term),
            Product.description.ilike(search_term),
            Product.category.ilike(search_term),
            Product.model.ilike(search_term),
            Brand.name.ilike(search_term)
        ))

    if category:
        query = query.filter(Product.category.ilike(f"%{category}%"))

    if brand:
        query = query.filter(Brand.name.ilike(f"%{brand}%"))

    # Prioritize products with reviews
    feedback_counts = db.query(
        Feedback.product_id,
        func.count(Feedback.id).label("cnt")
    )
    if settings.APP_DATA_MODE == "production":
        feedback_counts = feedback_counts.filter(Feedback.source_id != "src_demo_001")
    feedback_subquery = feedback_counts.group_by(Feedback.product_id).subquery()

    query = query.outerjoin(feedback_subquery, Product.id == feedback_subquery.c.product_id)
    query = query.order_by(desc(feedback_subquery.c.cnt), Product.name.asc())

    all_matches = query.all()

    # Score and filter matching products
    results = []
    category_facets = {}
    brand_facets = {}

    for prod in all_matches:
        rep = calculate_product_reputation(db, prod.id)
        r_avg = rep.get("rating_metrics", {}).get("average_rating")
        t_score = rep.get("trust_score")
        rev_count = rep.get("review_count", 0)

        # Filters
        if min_rating and (r_avg is None or r_avg < min_rating):
            continue
        if min_trust_score and (t_score is None or t_score < min_trust_score):
            continue

        cat = prod.category or "Other"
        category_facets[cat] = category_facets.get(cat, 0) + 1
        b_name = rep.get("brand_name") or "Unknown"
        brand_facets[b_name] = brand_facets.get(b_name, 0) + 1

        top_aspects = []
        for a_name, a_data in list(rep.get("aspects", {}).items())[:3]:
            top_aspects.append({
                "name": a_name,
                "score": a_data.get("score"),
                "sentiment": a_data.get("sentiment"),
                "mentions": a_data.get("mentions")
            })

        results.append({
            "id": prod.id,
            "name": prod.name,
            "brand_name": b_name,
            "category": prod.category,
            "price": prod.price,
            "currency": prod.currency or "INR",
            "image_url": prod.image_url,
            "review_count": rev_count,
            "average_rating": r_avg,
            "trust_score": t_score,
            "has_sufficient_data": rep.get("has_sufficient_data", False),
            "top_aspects": top_aspects
        })

    total_count = len(results)
    offset = (page - 1) * page_size
    paged_results = results[offset:offset + page_size]

    return {
        "query": q,
        "total_results": total_count,
        "page": page,
        "page_size": page_size,
        "results": paged_results,
        "facets": {
            "categories": [{"category": k, "count": v} for k, v in category_facets.items()],
            "brands": [{"brand": k, "count": v} for k, v in brand_facets.items()]
        }
    }
