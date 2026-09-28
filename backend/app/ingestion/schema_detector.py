from typing import Dict, Any, Optional, List

# Standard candidate column names for each target field
REVIEW_TEXT_CANDIDATES = [
    "review_text", "reviewtext", "review text", "review", "customer_review",
    "customer_review_text", "view1", "body", "comment", "content", "text",
    "feedback", "opinion", "user_review"
]

REVIEW_TITLE_CANDIDATES = [
    "review_title", "title", "summary", "heading", "headline", "subject"
]

RATING_CANDIDATES = [
    "rating", "stars", "star", "score", "review_rating", "aiconalt", "overall",
    "user_rating", "stars_rating", "rating_score"
]

PRODUCT_NAME_CANDIDATES = [
    "product_name", "product_title", "product", "mobile_names",
    "item_name", "productname", "device_name"
]

BRAND_CANDIDATES = [
    "brand_name", "brand", "manufacturer", "make", "company"
]

MODEL_CANDIDATES = [
    "model", "model_name", "model_number", "device_model"
]

DATE_CANDIDATES = [
    "review_date", "reviewdate", "date", "timestamp", "view", "time",
    "created_at", "submission_date"
]

LOCATION_CANDIDATES = [
    "location", "city", "state", "country", "reviewer_location", "place"
]

ASIN_CANDIDATES = [
    "asin", "product_asin", "amazon_id", "product_id"
]

HELPFUL_CANDIDATES = [
    "helpful_votes", "helpful", "asizebase", "likes", "upvotes"
]

VERIFIED_CANDIDATES = [
    "verified_purchase", "verified", "state", "is_verified", "badge"
]

class SchemaDetector:
    """
    Intelligently inspects a set of column headers or a sample dictionary
    and infers canonical field mappings.
    """

    @classmethod
    def detect_mapping(cls, sample_row: Dict[str, Any], file_name: Optional[str] = None) -> Dict[str, str]:
        cols = list(sample_row.keys())
        col_lower_map = {c.strip().lower(): c for c in cols}

        mapping: Dict[str, str] = {}

        def find_best_match(candidates: List[str], exclude: List[str] = None) -> Optional[str]:
            exclude = exclude or []
            # 1. Exact match in lower-cased keys
            for cand in candidates:
                if cand in col_lower_map and col_lower_map[cand] not in exclude:
                    return col_lower_map[cand]
            # 2. Substring match
            for cand in candidates:
                for k_low, orig_col in col_lower_map.items():
                    if cand in k_low and orig_col not in exclude:
                        return orig_col
            return None

        # Text
        matched_text = find_best_match(REVIEW_TEXT_CANDIDATES)
        if matched_text:
            mapping["review_text"] = matched_text

        # Title
        matched_title = find_best_match(REVIEW_TITLE_CANDIDATES, exclude=[mapping.get("review_text")])
        if matched_title:
            mapping["review_title"] = matched_title

        # Rating
        matched_rating = find_best_match(RATING_CANDIDATES)
        if matched_rating:
            mapping["rating"] = matched_rating

        # Product name
        matched_product = find_best_match(PRODUCT_NAME_CANDIDATES, exclude=[mapping.get("review_text"), mapping.get("review_title")])
        if matched_product:
            mapping["product_name"] = matched_product

        # Brand
        matched_brand = find_best_match(BRAND_CANDIDATES)
        if matched_brand:
            mapping["brand"] = matched_brand

        # Model
        matched_model = find_best_match(MODEL_CANDIDATES, exclude=[mapping.get("product_name")])
        if matched_model:
            mapping["model"] = matched_model

        # Date
        matched_date = find_best_match(DATE_CANDIDATES, exclude=[mapping.get("review_text")])
        if matched_date:
            mapping["review_date"] = matched_date

        # Location
        matched_loc = find_best_match(LOCATION_CANDIDATES, exclude=[mapping.get("review_text")])
        if matched_loc:
            mapping["location"] = matched_loc

        # ASIN
        matched_asin = find_best_match(ASIN_CANDIDATES)
        if matched_asin:
            mapping["asin"] = matched_asin

        # Helpful
        matched_helpful = find_best_match(HELPFUL_CANDIDATES)
        if matched_helpful:
            mapping["helpful_votes"] = matched_helpful

        # Verified
        matched_verified = find_best_match(VERIFIED_CANDIDATES, exclude=[mapping.get("location")])
        if matched_verified:
            mapping["verified_flag"] = matched_verified

        # Special Amazon India mixer grinder files: ['Name', 'Title', 'aiconalt', 'View', 'State', 'View1', 'asizebase']
        # In this layout, 'Name' is customer reviewer name, NOT product name.
        if "view1" in col_lower_map and "aiconalt" in col_lower_map:
            mapping["review_text"] = col_lower_map["view1"]
            if "title" in col_lower_map:
                mapping["review_title"] = col_lower_map["title"]
            mapping["rating"] = col_lower_map["aiconalt"]
            if "view" in col_lower_map:
                mapping["review_date"] = col_lower_map["view"]
            if "state" in col_lower_map:
                mapping["verified_flag"] = col_lower_map["state"]
            if "asizebase" in col_lower_map:
                mapping["helpful_votes"] = col_lower_map["asizebase"]
            # Exclude 'Name' from product_name
            if mapping.get("product_name") == col_lower_map.get("name"):
                del mapping["product_name"]

        return mapping
