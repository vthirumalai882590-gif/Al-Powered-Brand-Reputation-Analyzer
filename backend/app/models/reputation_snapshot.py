import datetime
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey
from app.database import Base

class ReputationSnapshot(Base):
    __tablename__ = "reputation_snapshots"

    id = Column(String, primary_key=True, index=True)
    product_id = Column(String, ForeignKey("products.id"), nullable=False, index=True)
    time_period = Column(String, nullable=False) # e.g. "2026-Q1", "2026-09"
    dimension = Column(String, nullable=False) # Product Quality, Reliability, Customer Support, etc.
    score = Column(Float, nullable=False) # 0 to 100
    evidence_count = Column(Integer, default=0)
    confidence = Column(Float, default=0.90)
    trend = Column(String, default="stable") # improving, declining, stable
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
