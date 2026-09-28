import time
import datetime
import uuid
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import select, and_, not_

from app.models.feedback import Feedback
from app.models.product import Product
from app.models.ai_analysis import AIAnalysis
from app.ai.pipeline import run_full_ai_pipeline

class AIBatchProcessor:
    """
    Batched, memory-safe processor that enriches raw feedback records with
    deep NLP insights: sentiment, aspects, emotion, complaints, and authenticity.
    """
    def __init__(self, db: Session, batch_size: int = 200):
        self.db = db
        self.batch_size = batch_size

    def process_pending_feedback(
        self,
        product_id: Optional[str] = None,
        limit: Optional[int] = None,
        force_reprocess: bool = False
    ) -> Dict[str, Any]:
        """
        Processes pending or all feedback records in batches.
        """
        start_time = time.time()
        
        # Build query for feedback records to process
        query = self.db.query(Feedback)
        
        if product_id:
            query = query.filter(Feedback.product_id == product_id)
            
        if not force_reprocess:
            # Only process feedback without existing completed AIAnalysis
            completed_select = select(AIAnalysis.feedback_id).where(
                AIAnalysis.processing_status == "completed"
            )
            query = query.filter(~Feedback.id.in_(completed_select))

        total_eligible = query.count()
        if limit:
            total_to_process = min(limit, total_eligible)
        else:
            total_to_process = total_eligible

        if total_to_process == 0:
            return {
                "total_eligible": 0,
                "processed_count": 0,
                "success_count": 0,
                "error_count": 0,
                "duration_seconds": 0.0,
                "throughput_per_sec": 0.0,
                "sentiment_counts": {},
                "top_aspects": {}
            }

        # Cache product categories for fast lookup
        product_categories: Dict[str, str] = {}
        for p in self.db.query(Product.id, Product.category).all():
            product_categories[p.id] = p.category or ""

        processed_count = 0
        success_count = 0
        error_count = 0
        sentiment_counts = {"positive": 0, "neutral": 0, "negative": 0}
        aspect_counts: Dict[str, int] = {}

        # Stream records in batches
        offset = 0
        while processed_count < total_to_process:
            current_batch_size = min(self.batch_size, total_to_process - processed_count)
            batch = query.order_by(Feedback.created_at.asc()).offset(offset if force_reprocess else 0).limit(current_batch_size).all()
            
            if not batch:
                break

            analyses_to_insert = []
            analyses_to_update = []
            batch_feedback_ids = [fb.id for fb in batch]

            # Fetch existing analyses in this batch
            existing_analyses = {
                a.feedback_id: a
                for a in self.db.query(AIAnalysis).filter(AIAnalysis.feedback_id.in_(batch_feedback_ids)).all()
            }

            for fb in batch:
                category = product_categories.get(fb.product_id, "")
                text = fb.review_text or fb.review_title or ""
                
                try:
                    res = run_full_ai_pipeline(
                        review_text=text,
                        rating=fb.rating or 3.0,
                        category=category,
                        is_verified_purchase=fb.verified_flag
                    )
                    
                    sent = res["sentiment"]
                    sentiment_counts[sent] = sentiment_counts.get(sent, 0) + 1
                    
                    for asp in res["aspects"]:
                        aspect_counts[asp] = aspect_counts.get(asp, 0) + 1

                    if fb.id in existing_analyses:
                        analysis = existing_analyses[fb.id]
                        analysis.sentiment = res["sentiment"]
                        analysis.sentiment_score = res["sentiment_score"]
                        analysis.emotion = res["emotion"]
                        analysis.aspects = res["aspects"]
                        analysis.topics = res["topics"]
                        analysis.complaint_type = res["complaint_type"]
                        analysis.urgency = res["urgency"]
                        analysis.authenticity_risk = res["authenticity_risk"]
                        analysis.authenticity_signals = res["authenticity_signals"]
                        analysis.language = res["language"]
                        analysis.language_confidence = res["language_confidence"]
                        analysis.script = res["script"]
                        analysis.is_code_mixed = res["is_code_mixed"]
                        analysis.confidence = res["confidence"]
                        analysis.processing_status = "completed"
                        analysis.processed_at = datetime.datetime.utcnow()
                        analyses_to_update.append(analysis)
                    else:
                        analysis_id = f"ai_{uuid.uuid4().hex[:14]}"
                        new_analysis = AIAnalysis(
                            id=analysis_id,
                            feedback_id=fb.id,
                            sentiment=res["sentiment"],
                            sentiment_score=res["sentiment_score"],
                            emotion=res["emotion"],
                            aspects=res["aspects"],
                            topics=res["topics"],
                            complaint_type=res["complaint_type"],
                            urgency=res["urgency"],
                            authenticity_risk=res["authenticity_risk"],
                            authenticity_signals=res["authenticity_signals"],
                            language=res["language"],
                            language_confidence=res["language_confidence"],
                            script=res["script"],
                            is_code_mixed=res["is_code_mixed"],
                            confidence=res["confidence"],
                            processing_status="completed",
                            attempt_count=1,
                            processed_at=datetime.datetime.utcnow(),
                            created_at=datetime.datetime.utcnow()
                        )
                        analyses_to_insert.append(new_analysis)

                    success_count += 1
                except Exception as e:
                    error_count += 1
                    safe_err = str(e).encode('ascii', errors='replace').decode('ascii')
                    if fb.id in existing_analyses:
                        analysis = existing_analyses[fb.id]
                        analysis.processing_status = "failed"
                        analysis.last_error = safe_err
                        analysis.attempt_count = (analysis.attempt_count or 1) + 1
                    else:
                        new_analysis = AIAnalysis(
                            id=f"ai_{uuid.uuid4().hex[:14]}",
                            feedback_id=fb.id,
                            sentiment="neutral",
                            processing_status="failed",
                            last_error=safe_err,
                            attempt_count=1,
                            processed_at=datetime.datetime.utcnow()
                        )
                        analyses_to_insert.append(new_analysis)

            # Bulk commit batch
            if analyses_to_insert:
                self.db.bulk_save_objects(analyses_to_insert)
            self.db.commit()

            processed_count += len(batch)
            if force_reprocess:
                offset += len(batch)

        elapsed = time.time() - start_time
        throughput = round(processed_count / elapsed, 1) if elapsed > 0 else 0.0

        return {
            "total_eligible": total_eligible,
            "processed_count": processed_count,
            "success_count": success_count,
            "error_count": error_count,
            "duration_seconds": round(elapsed, 2),
            "throughput_per_sec": throughput,
            "sentiment_counts": sentiment_counts,
            "top_aspects": dict(sorted(aspect_counts.items(), key=lambda x: x[1], reverse=True)[:10])
        }
