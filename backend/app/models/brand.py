import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from app.database import Base

class Brand(Base):
    __tablename__ = "brands"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    normalized_name = Column(String, nullable=False, unique=True, index=True)
    description = Column(String, nullable=True)
    website = Column(String, nullable=True)
    category = Column(String, nullable=False, index=True)
    country = Column(String, default="IN")
    verification_status = Column(String, default="verified")  # pending, verified, claimed
    aliases = Column(JSON, nullable=True)  # e.g. ["Samsung India", "Samsung Electronics"]
    owner_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
