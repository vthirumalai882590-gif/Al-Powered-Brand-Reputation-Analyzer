import re
import unicodedata
from datetime import datetime
from typing import Dict, Any, Optional, Tuple
from app.ingestion.base import NormalizedRecord
from app.ingestion.language_detector import LanguageDetector

# Common Indian Cities & States for normalization
INDIAN_CITIES = {
    "bengaluru": ("Bengaluru", "Karnataka"),
    "bangalore": ("Bengaluru", "Karnataka"),
    "mumbai": ("Mumbai", "Maharashtra"),
    "delhi": ("Delhi", "Delhi"),
    "new delhi": ("New Delhi", "Delhi"),
    "hyderabad": ("Hyderabad", "Telangana"),
    "pune": ("Pune", "Maharashtra"),
    "chennai": ("Chennai", "Tamil Nadu"),
    "kolkata": ("Kolkata", "West Bengal"),
    "ahmedabad": ("Ahmedabad", "Gujarat"),
    "jaipur": ("Jaipur", "Rajasthan"),
    "lucknow": ("Lucknow", "Uttar Pradesh"),
    "kochi": ("Kochi", "Kerala"),
    "chandigarh": ("Chandigarh", "Punjab"),
    "indore": ("Indore", "Madhya Pradesh"),
    "coimbatore": ("Coimbatore", "Tamil Nadu"),
}

MONTH_MAP = {
    "january": 1, "jan": 1,
    "february": 2, "feb": 2,
    "march": 3, "mar": 3,
    "april": 4, "apr": 4,
    "may": 5,
    "june": 6, "jun": 6,
    "july": 7, "jul": 7,
    "august": 8, "aug": 8,
    "september": 9, "sep": 9, "sept": 9,
    "october": 10, "oct": 10,
    "november": 11, "nov": 11,
    "december": 12, "dec": 12
}

class RecordNormalizer:
    """
    Normalizes messy raw extracted fields into clean, strongly-typed domain values.
    """

    @classmethod
    def clean_text(cls, text: Any) -> str:
        if not text:
            return ""
        s = str(text)
        # Unicode normalization (NFKC)
        s = unicodedata.normalize("NFKC", s)
        # Replace multiple spaces, carriage returns
        s = re.sub(r"[\r\n\t]+", " ", s)
        s = re.sub(r"\s{2,}", " ", s)
        return s.strip()

    @classmethod
    def parse_rating(cls, raw_val: Any) -> Optional[float]:
        if raw_val is None:
            return None
        val_str = str(raw_val).strip()
        if not val_str or val_str.lower() in ("nan", "none", "null"):
            return None

        # Handle '4.0 out of 5 stars' or '5.0 out of 5'
        match = re.search(r"(\d+(?:\.\d+)?)\s*(?:out of|\/)\s*5", val_str, re.IGNORECASE)
        if match:
            try:
                r = float(match.group(1))
                return min(max(r, 1.0), 5.0)
            except ValueError:
                pass

        # Handle direct number '4.5' or '4,5'
        num_match = re.search(r"\b(\d(?:[.,]\d)?)\b", val_str)
        if num_match:
            try:
                num = float(num_match.group(1).replace(",", "."))
                return min(max(num, 1.0), 5.0)
            except ValueError:
                pass

        return None

    @classmethod
    def parse_date(cls, raw_val: Any) -> Optional[datetime]:
        if not raw_val:
            return None
        val_str = str(raw_val).strip()
        if not val_str or val_str.lower() in ("nan", "none", "null"):
            return None

        # 1. ISO format '2019-09-06' or '2020-08-15T12:00:00'
        for fmt in ("%Y-%m-%d", "%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%d/%m/%Y", "%m/%d/%Y"):
            try:
                return datetime.strptime(val_str[:19], fmt)
            except ValueError:
                continue

        # 2. Amazon style 'Reviewed in India on 11 May 2019' or '11 May 2019'
        date_pattern = re.search(r"(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})", val_str)
        if date_pattern:
            day = int(date_pattern.group(1))
            month_str = date_pattern.group(2).lower()
            year = int(date_pattern.group(3))
            month = MONTH_MAP.get(month_str)
            if month and 1 <= day <= 31 and 2000 <= year <= 2030:
                try:
                    return datetime(year, month, day)
                except ValueError:
                    pass

        return None

    @classmethod
    def parse_location(cls, raw_val: Any) -> Tuple[Optional[str], str, Optional[str], Optional[str]]:
        """Returns: (location_string, country, state, city)"""
        if not raw_val:
            return (None, "IN", None, None)

        val_str = str(raw_val).strip()
        if not val_str or val_str.lower() in ("nan", "none", "null", "global", "verified purchase"):
            return (None, "IN", None, None)

        country = "IN"
        city = None
        state = None

        val_lower = val_str.lower()

        # Check known Indian cities
        for c_key, (c_name, s_name) in INDIAN_CITIES.items():
            if c_key in val_lower:
                city = c_name
                state = s_name
                country = "IN"
                break

        # Check country mention
        if "india" in val_lower:
            country = "IN"
        elif "usa" in val_lower or "united states" in val_lower:
            country = "US"
        elif "uk" in val_lower or "united kingdom" in val_lower:
            country = "GB"

        return (val_str, country, state, city)

    @classmethod
    def normalize_record(
        cls,
        raw_payload: Dict[str, Any],
        column_mapping: Dict[str, str],
        default_category: Optional[str] = None,
        default_brand: Optional[str] = None,
        default_product: Optional[str] = None,
        default_source: Optional[str] = None
    ) -> NormalizedRecord:
        # Extract mapped values
        text_col = column_mapping.get("review_text")
        title_col = column_mapping.get("review_title")
        rating_col = column_mapping.get("rating")
        date_col = column_mapping.get("review_date")
        prod_col = column_mapping.get("product_name")
        brand_col = column_mapping.get("brand")
        model_col = column_mapping.get("model")
        asin_col = column_mapping.get("asin")
        loc_col = column_mapping.get("location")
        helpful_col = column_mapping.get("helpful_votes")
        verified_col = column_mapping.get("verified_flag")

        review_text = cls.clean_text(raw_payload.get(text_col, "")) if text_col else ""
        review_title = cls.clean_text(raw_payload.get(title_col, "")) if title_col else None
        
        rating = cls.parse_rating(raw_payload.get(rating_col)) if rating_col else None
        review_date = cls.parse_date(raw_payload.get(date_col)) if date_col else None
        
        loc_str, country, state, city = cls.parse_location(raw_payload.get(loc_col)) if loc_col else (None, "IN", None, None)

        # Product / Brand
        product_name = cls.clean_text(raw_payload.get(prod_col)) if prod_col else default_product
        brand_name = cls.clean_text(raw_payload.get(brand_col)) if brand_col else default_brand
        model = cls.clean_text(raw_payload.get(model_col)) if model_col else None
        asin = cls.clean_text(raw_payload.get(asin_col)) if asin_col else None

        if not product_name and model:
            product_name = f"{brand_name} {model}".strip() if brand_name else model
        elif not product_name and brand_name:
            product_name = f"{brand_name} Product"

        # Price & Currency
        price = None
        for p_key in ("price_local", "price_usd", "price", "Price"):
            if p_key in raw_payload and raw_payload[p_key]:
                try:
                    p_str = re.sub(r"[^\d.]", "", str(raw_payload[p_key]))
                    if p_str:
                        price = float(p_str)
                        break
                except ValueError:
                    pass

        currency = "INR"
        for c_key in ("currency", "Currency"):
            if c_key in raw_payload and raw_payload[c_key]:
                currency = str(raw_payload[c_key]).strip().upper()
                break

        # Helpful votes
        helpful = 0
        if helpful_col and raw_payload.get(helpful_col):
            h_match = re.search(r"(\d[\d,]*)", str(raw_payload[helpful_col]))
            if h_match:
                try:
                    helpful = int(h_match.group(1).replace(",", ""))
                except ValueError:
                    helpful = 0

        # Verified flag
        verified = True
        if verified_col and raw_payload.get(verified_col):
            v_str = str(raw_payload[verified_col]).lower()
            if "verified" in v_str or v_str in ("1", "true", "yes"):
                verified = True
            elif v_str in ("0", "false", "no"):
                verified = False

        # Language Detection
        combined_text = f"{review_title}. {review_text}" if review_title else review_text
        lang_meta = LanguageDetector.detect(combined_text)

        # External review id
        ext_id = None
        for id_key in ("review_id", "external_review_id", "id", "Id"):
            if id_key in raw_payload and raw_payload[id_key]:
                ext_id = str(raw_payload[id_key]).strip()
                break

        return NormalizedRecord(
            review_text=review_text,
            review_title=review_title if review_title else None,
            rating=rating,
            review_date=review_date,
            external_review_id=ext_id,
            helpful_votes=helpful,
            verified_flag=verified,
            product_name=product_name if product_name else default_product,
            brand_name=brand_name if brand_name else default_brand,
            category=default_category,
            model=model,
            asin=asin,
            price=price,
            currency=currency,
            location=loc_str,
            country=country,
            state=state,
            city=city,
            language=lang_meta["language"],
            language_confidence=lang_meta["language_confidence"],
            script=lang_meta["script"],
            is_code_mixed=lang_meta["is_code_mixed"],
            quality_status="processed"
        )
