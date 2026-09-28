from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import datetime

class BrandBase(BaseModel):
    name: str
    description: Optional[str] = None
    website: Optional[str] = None
    category: str

class BrandCreate(BrandBase):
    pass

class BrandResponse(BrandBase):
    id: str
    owner_id: Optional[str] = None
    verification_status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    category: str
    brand_id: str
    description: Optional[str] = None
    model: Optional[str] = None
    version: str = "1.0.0"
    price: Optional[float] = None
    features: Optional[Dict[str, Any]] = None
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: str
    status: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True
