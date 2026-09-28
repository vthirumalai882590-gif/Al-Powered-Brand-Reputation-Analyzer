import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON, Index
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    brand_id = Column(String, ForeignKey("brands.id"), nullable=False, index=True)
    name = Column(String, nullable=False, index=True)
    normalized_name = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False, index=True)
    subcategory = Column(String, nullable=True, index=True)
    description = Column(String, nullable=True)
    model = Column(String, nullable=True)
    normalized_model = Column(String, nullable=True, index=True)
    version = Column(String, default="1.0.0")
    sku = Column(String, nullable=True, index=True)
    asin = Column(String, nullable=True, index=True)
    upc = Column(String, nullable=True)
    gtin = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    currency = Column(String, default="INR")
    country = Column(String, default="IN", index=True)
    market = Column(String, default="IN", index=True)
    image_url = Column(String, nullable=True)
    product_url = Column(String, nullable=True)
    features = Column(JSON, nullable=True)
    status = Column(String, default="active")  # active, archived, discontinued
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    __table_args__ = (
        Index("idx_product_brand_category", "brand_id", "category"),
        Index("idx_product_asin_market", "asin", "market"),
    )
