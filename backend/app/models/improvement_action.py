import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from app.database import Base

class ImprovementAction(Base):
    __tablename__ = "improvement_actions"

    id = Column(String, primary_key=True, index=True)
    product_id = Column(String, ForeignKey("products.id"), nullable=False, index=True)
    issue_id = Column(String, ForeignKey("issues.id"), nullable=True, index=True)
    owner_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    priority = Column(String, default="medium") # low, medium, high, urgent
    status = Column(String, default="planned") # planned, in_progress, completed, verified
    due_date = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
