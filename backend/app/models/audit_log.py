import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from app.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    action = Column(String, nullable=False) # e.g. "USER_LOGIN", "CLAIM_PRODUCT", "CREATE_ACTION"
    entity_type = Column(String, nullable=True)
    entity_id = Column(String, nullable=True)
    metadata_info = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
