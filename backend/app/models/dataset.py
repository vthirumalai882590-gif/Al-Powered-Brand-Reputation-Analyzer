import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON
from app.database import Base

class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(String, primary_key=True, index=True)
    source_id = Column(String, ForeignKey("sources.id"), nullable=False, index=True)
    dataset_name = Column(String, nullable=False, index=True)
    file_name = Column(String, nullable=True)
    file_hash = Column(String, nullable=True, index=True)
    record_count = Column(Integer, default=0)
    valid_count = Column(Integer, default=0)
    invalid_count = Column(Integer, default=0)
    duplicate_count = Column(Integer, default=0)
    new_count = Column(Integer, default=0)
    updated_count = Column(Integer, default=0)
    failed_count = Column(Integer, default=0)
    quality_score = Column(Float, default=100.0)
    status = Column(String, default="completed", index=True)  # queued, running, completed, completed_with_errors, failed, paused, cancelled
    error_log = Column(JSON, nullable=True)
    schema_detected = Column(JSON, nullable=True)
    configuration = Column(JSON, nullable=True)
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
