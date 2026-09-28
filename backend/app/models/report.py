import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from app.database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, index=True)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    created_by = Column(String, ForeignKey("users.id"), nullable=False)
    report_type = Column(String, default="pdf") # pdf, csv, json
    file_path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
