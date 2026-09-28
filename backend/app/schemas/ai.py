from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class ReviewAnalysisRequest(BaseModel):
    review_text: str
    category: str = "Smartphone"
    product_version: Optional[str] = "1.0.0"

class ReviewAnalysisResponse(BaseModel):
    sentiment: str
    emotion: str
    aspects: Dict[str, Any]
    topics: List[str]
    complaint_type: Optional[str] = None
    urgency: str
    authenticity_signals: Dict[str, Any]
    confidence: float
    explanation: str

class PersonalFitRequest(BaseModel):
    product_id: str
    budget: Optional[float] = None
    primary_use_case: str
    non_negotiable_features: List[str] = []
    experience_level: str = "Intermediate"

class ChatAssistantRequest(BaseModel):
    product_id: str
    query: str
