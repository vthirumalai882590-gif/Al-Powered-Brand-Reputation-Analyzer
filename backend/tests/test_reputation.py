import pytest
from app.database import SessionLocal
from app.models.product import Product
from app.models.brand import Brand
from app.services.reputation import calculate_product_reputation, calculate_brand_reputation

def test_product_reputation_calculation():
    db = SessionLocal()
    try:
        # Fetch a real product with reviews
        prod = db.query(Product).filter(Product.id == "prd_bosc_bosch_truemixx_pro_1000w").first()
        if not prod:
            pytest.skip("Test product not available in database")

        rep = calculate_product_reputation(db, prod.id, data_mode="production")
        
        assert rep["product_id"] == prod.id
        assert rep["has_sufficient_data"] is True
        assert rep["review_count"] > 1000
        assert rep["trust_score"] is not None
        assert 50.0 <= rep["trust_score"] <= 100.0
        
        # Check aspect breakdown
        assert len(rep["aspects"]) >= 5
        assert "Motor Power" in rep["aspects"]
        assert "Noise Level" in rep["aspects"]
        
        # Check confidence interval
        assert rep["confidence_interval"]["lower"] <= rep["trust_score"] <= rep["confidence_interval"]["upper"]
        assert rep["confidence_interval"]["confidence"] >= 0.90

        # Check chronological timeline
        assert len(rep["timeline"]) > 0
        for item in rep["timeline"]:
            assert "month" in item
            assert item["review_count"] > 0
    finally:
        db.close()

def test_insufficient_data_product():
    db = SessionLocal()
    try:
        # Create or check a product with 0 reviews
        rep = calculate_product_reputation(db, "non_existent_id", data_mode="production")
        assert rep["has_sufficient_data"] is False
    finally:
        db.close()
