from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import datetime

class FeedbackCreate(BaseModel):
    product_id: str
    review_text: str
    rating: Optional[float] = 4.0
    location: Optional[str] = "Global"
    product_version: Optional[str] = "1.0.0"

class FeedbackResponse(BaseModel):
    id: str
    product_id: str
    source_id: str
    review_text: str
    rating: Optional[float] = None
    review_date: datetime.datetime
    language: str
    location: Optional[str] = None
    product_version: str
    verified_flag: bool
    quality_status: str

    class Config:
        from_attributes = True

class FeedbackImportRequest(BaseModel):
    product_id: str
    reviews: List[Dict[str, Any]]
