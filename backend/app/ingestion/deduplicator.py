import hashlib
import unicodedata
import re
from typing import Optional, Tuple
from sqlalchemy.orm import Session
from app.models.feedback import Feedback

class Deduplicator:
    """
    Computes deterministic deduplication hashes and checks against existing database records.
    """

    @classmethod
    def compute_normalized_hash(cls, review_text: str, product_identity: str, source_id: str) -> str:
        # Lowercase, trim, unicode normalize
        norm_text = unicodedata.normalize("NFKC", review_text).lower()
        # Collapse multiple whitespace
        norm_text = re.sub(r"\s+", " ", norm_text).strip()
        norm_product = str(product_identity).lower().strip()
        norm_source = str(source_id).lower().strip()

        raw_str = f"{norm_text}|{norm_product}|{norm_source}"
        return hashlib.sha256(raw_str.encode("utf-8")).hexdigest()

    @classmethod
    def check_duplicate(
        cls,
        db: Session,
        normalized_hash: str,
        external_review_id: Optional[str] = None,
        source_id: Optional[str] = None
    ) -> Tuple[bool, Optional[str], Optional[float]]:
        """
        Returns: (is_duplicate, duplicate_of_feedback_id, confidence)
        """
        # 1. Check by external_review_id if available
        if external_review_id and source_id:
            existing = db.query(Feedback.id).filter(
                Feedback.source_id == source_id,
                Feedback.external_review_id == external_review_id
            ).first()
            if existing:
                return (True, existing[0], 1.0)

        # 2. Check by normalized hash
        existing_hash = db.query(Feedback.id).filter(
            Feedback.normalized_hash == normalized_hash
        ).first()
        if existing_hash:
            return (True, existing_hash[0], 0.99)

        return (False, None, None)
