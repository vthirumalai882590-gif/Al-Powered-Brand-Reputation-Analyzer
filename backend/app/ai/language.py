import re
from typing import Dict, Any
from app.ingestion.language_detector import LanguageDetector

def analyze_review_language(text: str) -> Dict[str, Any]:
    """
    Detects language, script, and code-mixed flags for the AI pipeline.
    """
    res = LanguageDetector.detect(text)
    return {
        "language": res["language"],
        "language_confidence": res["language_confidence"],
        "script": res["script"],
        "is_code_mixed": res["is_code_mixed"]
    }
