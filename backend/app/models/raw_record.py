import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, JSON, Text
from app.database import Base

class RawRecord(Base):
    __tablename__ = "raw_records"

    id = Column(String, primary_key=True, index=True)
    dataset_id = Column(String, ForeignKey("datasets.id"), nullable=False, index=True)
    source_file = Column(String, nullable=True)
    line_number = Column(Integer, nullable=True)
    raw_hash = Column(String, nullable=False, index=True)
    raw_payload = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
