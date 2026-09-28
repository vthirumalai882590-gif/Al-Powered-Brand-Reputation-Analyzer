import datetime
from sqlalchemy import Column, String, Float, DateTime
from app.database import Base

class Source(Base):
    __tablename__ = "sources"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    source_type = Column(String, nullable=False, index=True)  # amazon_india, flipkart, kaggle, data_gov_in, user_submitted, brand_official, csv_upload, json_import, api, demo
    source_url = Column(String, nullable=True)
    dataset_name = Column(String, nullable=True)
    dataset_version = Column(String, nullable=True)
    license = Column(String, nullable=True)
    attribution = Column(String, nullable=True)
    reliability_level = Column(Float, default=0.95)
    country = Column(String, default="IN")
    market = Column(String, default="IN")
    last_synced_at = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
