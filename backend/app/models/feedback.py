import datetime
from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, Text, Integer, Index
from app.database import Base

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(String, primary_key=True, index=True)
    product_id = Column(String, ForeignKey("products.id"), nullable=False, index=True)
    source_id = Column(String, ForeignKey("sources.id"), nullable=False, index=True)
    dataset_id = Column(String, ForeignKey("datasets.id"), nullable=True, index=True)
    external_review_id = Column(String, nullable=True, index=True)
    review_title = Column(String, nullable=True)
    review_text = Column(Text, nullable=False)
    rating = Column(Float, nullable=True, index=True)
    review_date = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    language = Column(String, default="en", index=True)
    language_confidence = Column(Float, default=1.0)
    location = Column(String, nullable=True)
    country = Column(String, default="IN")
    state = Column(String, nullable=True)
    city = Column(String, nullable=True)
    product_version = Column(String, default="1.0.0")
    verified_flag = Column(Boolean, default=True)
    helpful_votes = Column(Integer, default=0)
    review_url = Column(String, nullable=True)
    raw_hash = Column(String, nullable=True)
    normalized_hash = Column(String, nullable=True, index=True)
    quality_status = Column(String, default="processed")  # raw, processing, processed, flagged, duplicate
    duplicate_of = Column(String, ForeignKey("feedback.id"), nullable=True)
    duplicate_confidence = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    __table_args__ = (
        Index("idx_feedback_product_date", "product_id", "review_date"),
        Index("idx_feedback_hash_product", "normalized_hash", "product_id"),
    )
