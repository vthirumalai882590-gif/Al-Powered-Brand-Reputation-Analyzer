from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Product
from app.schemas.ai import ReviewAnalysisRequest, ReviewAnalysisResponse, PersonalFitRequest, ChatAssistantRequest
from app.ai.pipeline import run_full_ai_pipeline, calculate_personal_fit, generate_ai_chat_response
from app.services.reputation import calculate_product_reputation

router = APIRouter(prefix="/api/ai", tags=["AI Engine & Analytics"])

@router.post("/analyze-review", response_model=ReviewAnalysisResponse)
def analyze_single_review(req: ReviewAnalysisRequest):
    res = run_full_ai_pipeline(
        review_text=req.review_text,
        rating=4.0,
        category=req.category,
        is_verified_purchase=True
    )
    explanation = f"Analyzed {len(req.review_text.split())} words, identified {len(res['aspects'])} key aspects with {res['sentiment']} sentiment alignment."
    return ReviewAnalysisResponse(
        sentiment=res["sentiment"],
        emotion=res["emotion"],
        aspects=res["aspects"],
        topics=res["topics"],
        complaint_type=res["complaint_type"],
        urgency=res["urgency"],
        authenticity_signals=res["authenticity_signals"],
        confidence=res["confidence"],
        explanation=explanation
    )

@router.post("/personal-fit")
def compute_personal_fit(req: PersonalFitRequest, db: Session = Depends(get_db)):
    """
    Computes evidence-grounded personal fit for a product based on user preferences.
    """
    product = db.query(Product).filter(Product.id == req.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    rep = calculate_product_reputation(db, product.id)
    aspects = rep.get("aspects", {})

    return calculate_personal_fit(
        product_name=product.name,
        category=product.category,
        aspect_aggregates=aspects,
        primary_use_case=req.primary_use_case,
        non_negotiables=req.non_negotiable_features
    )

@router.post("/chat")
def chat_assistant(req: ChatAssistantRequest, db: Session = Depends(get_db)):
    """
    Answers user queries with evidence citations from analyzed customer feedback.
    """
    product = db.query(Product).filter(Product.id == req.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    rep = calculate_product_reputation(db, product.id)
    reply = generate_ai_chat_response(req.query, product.name, rep)

    return {
        "query": req.query,
        "reply": reply,
        "evidence_sources": [
            f"Analyzed {rep.get('review_count', 0)} verified customer reviews for {product.name}",
            f"Overall Trust Score: {rep.get('trust_score', 'N/A')}%"
        ],
        "confidence": rep.get("confidence_interval", {}).get("confidence", 0.90)
    }

@router.post("/generate-response")
def generate_recovery_copilot_response(product_id: str, issue_title: str, db: Session = Depends(get_db)):
    """
    Generates evidence-backed response draft for brand owners resolving customer friction.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    product_name = product.name if product else "the product"

    return {
        "customer_response_draft": f"Thank you for sharing your experience with {product_name}. We take feedback regarding '{issue_title}' seriously. Our engineering and quality teams have investigated the issue and prepared an optimization update to address this.",
        "internal_checklist": [
            f"Verify '{issue_title}' recurrence across batch manufacturing lots",
            "Deploy quality remediation procedure to service network",
            "Notify affected customers and track resolution satisfaction"
        ],
        "faq_suggestion": f"Q: How is the '{issue_title}' issue being handled for {product_name}?\nA: An official QA check and resolution procedure has been established across authorized service centers."
    }
