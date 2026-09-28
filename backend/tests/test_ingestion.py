import pytest
from app.ingestion.schema_detector import SchemaDetector
from app.ingestion.normalizer import RecordNormalizer
from app.ingestion.validator import RecordValidator
from app.ingestion.deduplicator import Deduplicator
from app.ingestion.brand_resolver import BrandResolver
from app.ingestion.base import NormalizedRecord

def test_schema_detector_amazon():
    row = {
        "Review Title": "Great Mixer Grinder",
        "Review Text": "Smooth grinding performance and durable blades.",
        "Rating": "4.5",
        "Date": "2023-08-15"
    }
    mapping = SchemaDetector.detect_mapping(row)
    assert mapping["review_text"] == "Review Text"
    assert mapping["rating"] == "Rating"
    assert mapping["review_title"] == "Review Title"
    assert mapping["review_date"] == "Date"

def test_record_normalizer():
    row = {
        "Review Text": "  Exceptional quality and fast delivery!   ",
        "Rating": "5 out of 5 stars",
        "Date": "Reviewed in India on 15 August 2023",
        "Verified Purchase": "Yes"
    }
    mapping = {
        "review_text": "Review Text",
        "rating": "Rating",
        "review_date": "Date",
        "verified_purchase": "Verified Purchase"
    }
    normalized = RecordNormalizer.normalize_record(row, mapping)
    assert normalized.review_text == "Exceptional quality and fast delivery!"
    assert normalized.rating == 5.0
    assert normalized.verified_flag is True
    assert normalized.review_date.year == 2023

def test_record_validator():
    # Valid record
    valid = NormalizedRecord(
        review_text="Good durable stainless steel jar with sharp blades.",
        rating=4.0,
        product_name="Bosch TrueMixx Pro 1000W"
    )
    val_res = RecordValidator.validate(valid)
    assert val_res.is_valid is True

    # Invalid empty text
    empty = NormalizedRecord(
        review_text="",
        rating=3.0
    )
    val_empty = RecordValidator.validate(empty)
    assert val_empty.is_valid is False

    # Out of range rating
    invalid_rating = NormalizedRecord(
        review_text="Valid review text here.",
        rating=12.0
    )
    val_r = RecordValidator.validate(invalid_rating)
    assert val_r.is_valid is False

def test_deduplicator_hash():
    text1 = "Extremely noisy mixer grinder, ear deafening sound."
    text2 = "extremely noisy mixer grinder,  ear deafening sound."
    
    hash1 = Deduplicator.compute_normalized_hash(text1, product_identity="prd_001", source_id="amazon_in")
    hash2 = Deduplicator.compute_normalized_hash(text2, product_identity="prd_001", source_id="amazon_in")
    
    # Hashes should match despite casing and collapsed whitespace
    assert hash1 == hash2

    # Different product should produce different hash
    hash3 = Deduplicator.compute_normalized_hash(text1, product_identity="prd_002", source_id="amazon_in")
    assert hash1 != hash3

def test_brand_resolver():
    # Known alias
    assert BrandResolver.normalize_brand_name("samsung india") == "Samsung"
    assert BrandResolver.normalize_brand_name("bosch home appliances") == "Bosch"
    assert BrandResolver.normalize_brand_name("mamaearth") == "Mamaearth"
    assert BrandResolver.normalize_brand_name("oneplus india") == "OnePlus"
