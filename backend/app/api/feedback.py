import uuid
import math
import datetime
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, select
from app.database import get_db
from app.models.feedback import Feedback
from app.models.product import Product
from app.models.source import Source
from app.models.ai_analysis import AIAnalysis
from app.schemas.feedback import FeedbackCreate, FeedbackResponse, FeedbackImportRequest
from app.ai.pipeline import run_full_ai_pipeline
from app.config import settings

router = APIRouter(prefix="/api/feedback", tags=["Feedback Ingestion"])

@router.get("")
def get_feedback(
    product_id: Optional[str] = None,
    sentiment: Optional[str] = None,
    rating: Optional[float] = None,
    language: Optional[str] = None,
    urgency: Optional[str] = None,
    source_id: Optional[str] = None,
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Paginated feedback list with multi-facet filters: product, sentiment, rating, language, urgency, and keyword search.
    Enriched with full AI analysis metadata.
    """
    query = db.query(Feedback, AIAnalysis).outerjoin(
        AIAnalysis, Feedback.id == AIAnalysis.feedback_id
    )

    # Filter out demo reviews in production mode
    if settings.APP_DATA_MODE == "production":
        demo_sources = select(Source.id).where(Source.source_type == "demo")
        query = query.filter(
            Feedback.source_id != "src_demo_001",
            ~Feedback.source_id.in_(demo_sources)
        )

    if product_id:
        query = query.filter(Feedback.product_id == product_id)
    if sentiment:
        query = query.filter(AIAnalysis.sentiment == sentiment.lower())
    if rating:
        query = query.filter(Feedback.rating == rating)
    if language:
        query = query.filter(Feedback.language == language)
    if urgency:
        query = query.filter(AIAnalysis.urgency == urgency.lower())
    if source_id:
        query = query.filter(Feedback.source_id == source_id)
    if search:
        query = query.filter(or_(
            Feedback.review_text.ilike(f"%{search}%"),
            Feedback.review_title.ilike(f"%{search}%")
        ))

    total_count = query.count()
    total_pages = math.ceil(total_count / page_size) if total_count > 0 else 1
    offset = (page - 1) * page_size

    rows = query.order_by(desc(Feedback.review_date)).offset(offset).limit(page_size).all()

    items = []
    for fb, ai in rows:
        item = {
            "id": fb.id,
            "product_id": fb.product_id,
            "source_id": fb.source_id,
            "review_title": fb.review_title,
            "review_text": fb.review_text,
            "rating": fb.rating,
            "review_date": fb.review_date.isoformat() if fb.review_date else None,
            "language": fb.language,
            "location": fb.location,
            "state": fb.state,
            "city": fb.city,
            "product_version": fb.product_version,
            "verified_flag": fb.verified_flag,
            "helpful_votes": fb.helpful_votes,
            "quality_status": fb.quality_status,
            "ai_analysis": {
                "sentiment": ai.sentiment if ai else "neutral",
                "sentiment_score": ai.sentiment_score if ai else 0.0,
                "emotion": ai.emotion if ai else "neutral",
                "aspects": ai.aspects if ai else {},
                "topics": ai.topics if ai else [],
                "complaint_type": ai.complaint_type if ai else None,
                "urgency": ai.urgency if ai else "low",
                "authenticity_risk": ai.authenticity_risk if ai else 0.05,
                "authenticity_signals": ai.authenticity_signals if ai else None,
                "confidence": ai.confidence if ai else 0.90,
                "is_code_mixed": ai.is_code_mixed if ai else False
            } if ai else None
        }
        items.append(item)

    return {
        "items": items,
        "total_count": total_count,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages
    }

@router.post("", response_model=FeedbackResponse)
def submit_feedback(feedback_in: FeedbackCreate, db: Session = Depends(get_db)):
    """
    Submits a real customer review, triggers AI enrichment, and stores results.
    """
    product = db.query(Product).filter(Product.id == feedback_in.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Target product not found.")

    # In production, assign to direct user review source
    source = db.query(Source).filter(Source.source_type == "direct_submission").first()
    if not source:
        source = Source(
            id="src_direct_user",
            name="Direct BrandPulse User Submission",
            source_type="direct_submission",
            reliability_level=0.95
        )
        db.add(source)
        db.commit()

    feedback = Feedback(
        id=f"fb_{uuid.uuid4().hex[:14]}",
        product_id=product.id,
        source_id=source.id,
        review_text=feedback_in.review_text,
        rating=feedback_in.rating,
        location=feedback_in.location or "India",
        country="IN",
        product_version=feedback_in.product_version or "1.0.0",
        verified_flag=True,
        quality_status="processed",
        review_date=datetime.datetime.utcnow()
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    # Run AI Analysis Pipeline
    ai_res = run_full_ai_pipeline(
        review_text=feedback.review_text,
        rating=feedback.rating or 4.0,
        category=product.category,
        is_verified_purchase=feedback.verified_flag
    )

    ai_analysis = AIAnalysis(
        id=f"ai_{feedback.id}",
        feedback_id=feedback.id,
        sentiment=ai_res["sentiment"],
        sentiment_score=ai_res["sentiment_score"],
        emotion=ai_res["emotion"],
        aspects=ai_res["aspects"],
        topics=ai_res["topics"],
        complaint_type=ai_res["complaint_type"],
        urgency=ai_res["urgency"],
        authenticity_risk=ai_res["authenticity_risk"],
        authenticity_signals=ai_res["authenticity_signals"],
        language=ai_res["language"],
        language_confidence=ai_res["language_confidence"],
        script=ai_res["script"],
        is_code_mixed=ai_res["is_code_mixed"],
        confidence=ai_res["confidence"],
        processing_status="completed",
        processed_at=datetime.datetime.utcnow()
    )
    db.add(ai_analysis)
    db.commit()

    return feedback
