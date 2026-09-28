import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from app.database import Base

class Issue(Base):
    __tablename__ = "issues"

    id = Column(String, primary_key=True, index=True)
    product_id = Column(String, ForeignKey("products.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    category = Column(String, nullable=False) # Aspect or feature group
    severity = Column(String, default="medium") # low, medium, high, critical
    frequency = Column(Integer, default=1)
    trend = Column(String, default="increasing") # increasing, decreasing, stable
    confidence = Column(Float, default=0.88)
    status = Column(String, default="open") # open, investigating, in_progress, resolved
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
