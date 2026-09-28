import hashlib
import json
from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, Any, Optional, List, Generator
from abc import ABC, abstractmethod

@dataclass
class RawRecordData:
    source_file: str
    line_number: int
    raw_payload: Dict[str, Any]
    raw_hash: str

    @classmethod
    def create(cls, source_file: str, line_number: int, payload: Dict[str, Any]) -> "RawRecordData":
        payload_str = json.dumps(payload, sort_keys=True, default=str)
        raw_hash = hashlib.sha256(payload_str.encode("utf-8")).hexdigest()
        return cls(
            source_file=source_file,
            line_number=line_number,
            raw_payload=payload,
            raw_hash=raw_hash
        )

@dataclass
class NormalizedRecord:
    # Review fields
    review_text: str
    review_title: Optional[str] = None
    rating: Optional[float] = None
    review_date: Optional[datetime] = None
    external_review_id: Optional[str] = None
    helpful_votes: int = 0
    verified_flag: bool = True
    review_url: Optional[str] = None

    # Product / Entity fields
    product_name: Optional[str] = None
    brand_name: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    model: Optional[str] = None
    asin: Optional[str] = None
    sku: Optional[str] = None
    price: Optional[float] = None
    currency: str = "INR"
    product_version: str = "1.0.0"

    # Location / Demographics
    location: Optional[str] = None
    country: str = "IN"
    state: Optional[str] = None
    city: Optional[str] = None

    # Language
    language: str = "en"
    language_confidence: float = 1.0
    script: str = "Latin"
    is_code_mixed: bool = False

    # Deduplication & Lineage
    raw_hash: Optional[str] = None
    normalized_hash: Optional[str] = None
    duplicate_of: Optional[str] = None
    duplicate_confidence: Optional[float] = None
    quality_status: str = "processed"

@dataclass
class ValidationResult:
    is_valid: bool
    errors: List[str] = field(default_factory=list)

@dataclass
class ImportStats:
    total: int = 0
    valid: int = 0
    invalid: int = 0
    duplicates: int = 0
    new_records: int = 0
    updated: int = 0
    failed: int = 0
    quality_score: float = 100.0
    error_summary: Dict[str, int] = field(default_factory=dict)
    language_distribution: Dict[str, int] = field(default_factory=dict)
    rating_distribution: Dict[str, int] = field(default_factory=dict)

    def compute_quality_score(self):
        if self.total == 0:
            self.quality_score = 100.0
            return
        # Quality score = valid non-duplicate proportion
        usable = self.valid - self.duplicates
        self.quality_score = round(max(0.0, min(100.0, (usable / self.total) * 100)), 2)

    def to_dict(self) -> Dict[str, Any]:
        self.compute_quality_score()
        return {
            "total": self.total,
            "valid": self.valid,
            "invalid": self.invalid,
            "duplicates": self.duplicates,
            "new": self.new_records,
            "updated": self.updated,
            "failed": self.failed,
            "quality_score": self.quality_score,
            "error_summary": self.error_summary,
            "language_distribution": self.language_distribution,
            "rating_distribution": self.rating_distribution
        }

class BaseLoader(ABC):
    @abstractmethod
    def stream_records(self, file_path: str, limit: Optional[int] = None, offset: int = 0) -> Generator[RawRecordData, None, None]:
        pass

    @abstractmethod
    def count_records(self, file_path: str) -> int:
        pass
