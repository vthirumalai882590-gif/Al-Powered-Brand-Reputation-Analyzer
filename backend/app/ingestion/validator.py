from typing import List
from app.ingestion.base import NormalizedRecord, ValidationResult

class RecordValidator:
    """
    Validates normalized record integrity before DB persistence.
    """

    MIN_TEXT_LENGTH = 5

    @classmethod
    def validate(cls, record: NormalizedRecord) -> ValidationResult:
        errors: List[str] = []

        # 1. Review text validation
        if not record.review_text or len(record.review_text.strip()) < cls.MIN_TEXT_LENGTH:
            errors.append("MISSING_OR_SHORT_REVIEW_TEXT")

        # 2. Rating validation
        if record.rating is None:
            errors.append("MISSING_RATING")
        elif not (1.0 <= record.rating <= 5.0):
            errors.append(f"INVALID_RATING_RANGE_{record.rating}")

        # 3. Product information validation
        if not record.product_name and not record.asin:
            errors.append("MISSING_PRODUCT_IDENTITY")

        # 4. Review date validation (flag if present but anomalous e.g. future date)
        if record.review_date:
            from datetime import datetime
            if record.review_date > datetime(2030, 1, 1):
                errors.append("INVALID_FUTURE_DATE")

        is_valid = len(errors) == 0
        return ValidationResult(is_valid=is_valid, errors=errors)
