import re
from typing import Dict, Any, Tuple

# Unicode range checks for Indian scripts
SCRIPT_RANGES = [
    (r"[\u0900-\u097F]", "Devanagari", "hi"),
    (r"[\u0B80-\u0BFF]", "Tamil", "ta"),
    (r"[\u0C00-\u0C7F]", "Telugu", "te"),
    (r"[\u0C80-\u0CFF]", "Kannada", "kn"),
    (r"[\u0D00-\u0D7F]", "Malayalam", "ml"),
    (r"[\u0980-\u09FF]", "Bengali", "bn"),
    (r"[\u0A80-\u0AFF]", "Gujarati", "gu"),
    (r"[\u0A00-\u0A7F]", "Gurmukhi", "pa"),
]

# Common Romanized Indian Language Tokens (Transliteration / Code-mixing)
HINGLISH_TOKENS = {
    "acha", "accha", "bahut", "bura", "bakwas", "hai", "nahi", "kya", "karo",
    "paisa", "vasool", "faayda", "kharaab", "chal", "raha", "hota", "sahi",
    "mast", "ghatiya", "dhokha", "bekar", "kharab", "lelo", "mat", "bhai", "yaar"
}

TANGLISH_TOKENS = {
    "semma", "romba", "illai", "nalla", "mosam", "ippadi", "supera", "irukku",
    "kuduka", "panrom", "vera", "level", "paravala", "thaan"
}

TELUGU_MIXED_TOKENS = {
    "bavundi", "bagundi", "chala", "ledu", "manchi", "cheppali", "enti", "leka"
}

KANNADA_MIXED_TOKENS = {
    "tumba", "chennagi", "illa", "beku", "swalpa", "channagide"
}

class LanguageDetector:
    """
    Detects native Indian scripts and Latin-script code-mixed reviews
    (e.g., Hinglish, Tanglish).
    """

    @classmethod
    def detect(cls, text: str) -> Dict[str, Any]:
        if not text or not text.strip():
            return {
                "language": "en",
                "language_confidence": 1.0,
                "script": "Latin",
                "is_code_mixed": False
            }

        total_chars = len(text)

        # 1. Check for native Indic scripts
        for pattern, script_name, lang_code in SCRIPT_RANGES:
            matches = len(re.findall(pattern, text))
            if matches > 0 and (matches / total_chars) > 0.15:
                # Disambiguate Devanagari between Hindi and Marathi if needed
                lang = lang_code
                if script_name == "Devanagari" and any(w in text for w in ["आहे", "नाही", "खूप", "चांगला"]):
                    lang = "mr"

                confidence = min(0.98, round(matches / max(1, total_chars) * 1.5, 2))
                return {
                    "language": lang,
                    "language_confidence": max(0.85, confidence),
                    "script": script_name,
                    "is_code_mixed": False
                }

        # 2. Check for code-mixed Romanized Indic reviews
        words = set(re.findall(r"\b[a-zA-Z]+\b", text.lower()))
        
        hinglish_count = len(words.intersection(HINGLISH_TOKENS))
        tanglish_count = len(words.intersection(TANGLISH_TOKENS))
        telugu_count = len(words.intersection(TELUGU_MIXED_TOKENS))
        kannada_count = len(words.intersection(KANNADA_MIXED_TOKENS))

        if hinglish_count >= 1:
            return {
                "language": "hi-Latn",
                "language_confidence": 0.88,
                "script": "Latin",
                "is_code_mixed": True
            }
        elif tanglish_count >= 1:
            return {
                "language": "ta-Latn",
                "language_confidence": 0.88,
                "script": "Latin",
                "is_code_mixed": True
            }
        elif telugu_count >= 1:
            return {
                "language": "te-Latn",
                "language_confidence": 0.85,
                "script": "Latin",
                "is_code_mixed": True
            }
        elif kannada_count >= 1:
            return {
                "language": "kn-Latn",
                "language_confidence": 0.85,
                "script": "Latin",
                "is_code_mixed": True
            }

        # 3. Standard English default
        return {
            "language": "en",
            "language_confidence": 0.95,
            "script": "Latin",
            "is_code_mixed": False
        }
