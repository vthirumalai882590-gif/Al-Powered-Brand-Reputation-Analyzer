import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON, Boolean, Integer, Index
from app.database import Base

class AIAnalysis(Base):
    __tablename__ = "ai_analyses"

    id = Column(String, primary_key=True, index=True)
    feedback_id = Column(String, ForeignKey("feedback.id"), nullable=False, unique=True, index=True)
    sentiment = Column(String, nullable=False, index=True)  # positive, neutral, negative
    sentiment_score = Column(Float, default=0.0)  # -1.0 to +1.0
    emotion = Column(String, nullable=True)  # joy, frustration, disappointment, trust, anger
    aspects = Column(JSON, nullable=True)  # {"motor": {"sentiment": "positive", "score": 0.85}}
    topics = Column(JSON, nullable=True)  # ["Overheating", "Fast Drain"]
    complaint_type = Column(String, nullable=True, index=True)
    urgency = Column(String, default="low", index=True)  # low, medium, high, critical
    authenticity_risk = Column(Float, default=0.05)  # 0.0 to 1.0
    authenticity_signals = Column(JSON, nullable=True)  # {"risk_score": 0.15, "signals": [...], "reasons": [...]}
    confidence = Column(Float, default=0.90)
    language = Column(String, default="en")
    language_confidence = Column(Float, default=1.0)
    script = Column(String, default="Latin")  # Latin, Devanagari, Tamil, etc.
    is_code_mixed = Column(Boolean, default=False)
    model_name = Column(String, default="BrandPulse-Aspect-v2")
    model_version = Column(String, default="2.0.0")
    prompt_version = Column(String, default="v2")
    processing_status = Column(String, default="completed", index=True)  # pending, processing, completed, failed, retry
    attempt_count = Column(Integer, default=1)
    last_error = Column(String, nullable=True)
    processed_at = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    __table_args__ = (
        Index("idx_ai_sentiment_urgency", "sentiment", "urgency"),
    )
