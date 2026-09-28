from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, desc, select

from app.database import get_db
from app.models.source import Source
from app.models.feedback import Feedback
from app.models.product import Product
from app.models.brand import Brand
from app.models.dataset import Dataset
from app.models.import_job import ImportJob
from app.models.ai_analysis import AIAnalysis
from app.config import settings

router = APIRouter(prefix="/api", tags=["Data Management & Intelligence"])

@router.get("/sources")
def get_sources(db: Session = Depends(get_db)):
    """
    Returns list of all integrated data sources with live review counts, reliability, and latest update timestamps.
    """
    sources = db.query(Source).all()
    results = []

    for s in sources:
        # In production mode, flag demo sources
        fb_query = db.query(Feedback).filter(Feedback.source_id == s.id)
        count = fb_query.count()
        latest = fb_query.with_entities(func.max(Feedback.review_date)).scalar()

        results.append({
            "id": s.id,
            "name": s.name,
            "source_type": s.source_type,
            "source_url": s.source_url,
            "reliability_level": s.reliability_level,
            "review_count": count,
            "latest_review_date": latest.isoformat() if latest else None,
            "status": "active" if count > 0 else "configured"
        })

    return results

@router.get("/data/freshness")
def get_data_freshness(db: Session = Depends(get_db)):
    """
    Returns platform-wide data freshness, sync health, and corpus metrics.
    """
    fb_query = db.query(Feedback)
    if settings.APP_DATA_MODE == "production":
        fb_query = fb_query.filter(Feedback.source_id != "src_demo_001")

    total_records = fb_query.count()
    earliest = fb_query.with_entities(func.min(Feedback.review_date)).scalar()
    latest = fb_query.with_entities(func.max(Feedback.review_date)).scalar()

    total_products = db.query(Product).count()
    total_brands = db.query(Brand).count()
    total_datasets = db.query(Dataset).count()

    # Source breakdown
    source_stats = db.query(
        Feedback.source_id,
        Source.name.label("source_name"),
        func.count(Feedback.id).label("count")
    ).outerjoin(Source, Feedback.source_id == Source.id)

    if settings.APP_DATA_MODE == "production":
        source_stats = source_stats.filter(Feedback.source_id != "src_demo_001")

    sources_breakdown = [
        {"source_id": r.source_id, "source_name": r.source_name or r.source_id, "count": r.count}
        for r in source_stats.group_by(Feedback.source_id, Source.name).all()
    ]

    return {
        "app_data_mode": settings.APP_DATA_MODE,
        "is_production": settings.APP_DATA_MODE == "production",
        "total_feedback_records": total_records,
        "total_products": total_products,
        "total_brands": total_brands,
        "total_datasets_registered": total_datasets,
        "earliest_review_date": earliest.isoformat() if earliest else None,
        "latest_review_date": latest.isoformat() if latest else None,
        "sources_breakdown": sources_breakdown,
        "sync_status": "synced" if total_records > 0 else "awaiting_ingestion"
    }

@router.get("/imports")
def list_import_jobs(limit: int = 50, db: Session = Depends(get_db)):
    """
    Lists recent data import and deduplication jobs from the ingestion framework.
    """
    jobs = db.query(ImportJob).order_by(desc(ImportJob.started_at)).limit(limit).all()
    results = []
    for j in jobs:
        results.append({
            "id": j.id,
            "dataset_id": j.dataset_id,
            "status": j.status,
            "total_records": j.total_records,
            "processed_records": j.processed_records,
            "failed_records": j.failed_records,
            "offset_position": j.offset_position,
            "error_summary": j.error_summary,
            "started_at": j.started_at.isoformat() if j.started_at else None,
            "completed_at": j.completed_at.isoformat() if j.completed_at else None
        })
    return results

@router.get("/imports/{id}/quality")
def get_import_quality(id: str, db: Session = Depends(get_db)):
    """
    Returns data quality metrics, deduplication audit, and error logs for a specific import job.
    """
    job = db.query(ImportJob).filter(ImportJob.id == id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Import job not found.")

    failed_pct = round((job.failed_records / max(1, job.total_records)) * 100.0, 1)
    success_pct = round((job.processed_records / max(1, job.total_records)) * 100.0, 1)

    return {
        "job_id": job.id,
        "dataset_id": job.dataset_id,
        "status": job.status,
        "total_records": job.total_records,
        "processed_records": job.processed_records,
        "failed_records": job.failed_records,
        "failed_percentage": failed_pct,
        "success_rate_percentage": success_pct,
        "error_summary": job.error_summary,
        "started_at": job.started_at.isoformat() if job.started_at else None,
        "completed_at": job.completed_at.isoformat() if job.completed_at else None
    }

@router.get("/analytics/india")
def get_india_market_analytics(db: Session = Depends(get_db)):
    """
    Returns regional India consumer intelligence: language distribution,
    code-mixed (Hinglish/Tanglish) review share, and state distribution.
    """
    fb_query = db.query(Feedback)
    if settings.APP_DATA_MODE == "production":
        fb_query = fb_query.filter(Feedback.source_id != "src_demo_001")

    total = fb_query.count()

    # Language breakdown from AI analyses
    lang_query = db.query(
        AIAnalysis.language,
        func.count(AIAnalysis.id).label("count")
    ).group_by(AIAnalysis.language).order_by(desc("count"))

    if settings.APP_DATA_MODE == "production":
        lang_query = lang_query.join(Feedback, AIAnalysis.feedback_id == Feedback.id).filter(Feedback.source_id != "src_demo_001")

    lang_counts = lang_query.all()
    languages = [
        {"language": l.language or "en", "count": l.count, "percentage": round((l.count / max(1, total)) * 100.0, 1)}
        for l in lang_counts
    ]

    # Code-mixed percentage
    code_mixed_count = db.query(AIAnalysis).filter(AIAnalysis.is_code_mixed == True)
    if settings.APP_DATA_MODE == "production":
        code_mixed_count = code_mixed_count.join(Feedback, AIAnalysis.feedback_id == Feedback.id).filter(Feedback.source_id != "src_demo_001")
    code_mixed_total = code_mixed_count.count()
    code_mixed_pct = round((code_mixed_total / max(1, total)) * 100.0, 1)

    # Top categories
    top_categories = db.query(
        Product.category,
        func.count(Feedback.id).label("count")
    ).join(Product, Feedback.product_id == Product.id)

    if settings.APP_DATA_MODE == "production":
        top_categories = top_categories.filter(Feedback.source_id != "src_demo_001")

    categories_dist = [
        {"category": c.category, "count": c.count}
        for c in top_categories.group_by(Product.category).order_by(desc("count")).limit(8).all()
    ]

    return {
        "market": "India (IN)",
        "total_analyzed_reviews": total,
        "languages": languages,
        "code_mixed": {
            "count": code_mixed_total,
            "percentage": code_mixed_pct,
            "description": "Reviews containing Hindi/Regional terms written in Roman/Latin script"
        },
        "top_categories": categories_dist
    }
