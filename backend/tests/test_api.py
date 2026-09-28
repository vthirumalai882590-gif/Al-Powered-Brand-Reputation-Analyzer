import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture(scope="module")
def client():
    return TestClient(app)

def test_health(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "online"

def test_products_list(client):
    res = client.get("/api/products?page=1&page_size=10")
    assert res.status_code == 200
    prods = res.json()
    assert len(prods) > 0
    assert "name" in prods[0]
    assert "category" in prods[0]

def test_product_reputation(client):
    res = client.get("/api/products/prd_bosc_bosch_truemixx_pro_1000w/reputation")
    assert res.status_code == 200
    data = res.json()
    assert data["product_id"] == "prd_bosc_bosch_truemixx_pro_1000w"
    assert data["review_count"] > 1000
    assert data["trust_score"] is not None
    assert len(data["aspects"]) > 0

def test_search(client):
    res = client.get("/api/search?q=Bosch")
    assert res.status_code == 200
    search_data = res.json()
    assert search_data["total_results"] > 0
    assert "results" in search_data
    assert "facets" in search_data

def test_feedback_pagination(client):
    res = client.get("/api/feedback?page=1&page_size=5")
    assert res.status_code == 200
    fb_data = res.json()
    assert len(fb_data["items"]) == 5
    assert fb_data["total_count"] > 10000

def test_data_freshness(client):
    res = client.get("/api/data/freshness")
    assert res.status_code == 200
    fresh = res.json()
    assert fresh["total_feedback_records"] > 10000
    assert fresh["total_products"] > 50

def test_owner_overview(client):
    res = client.get("/api/owner/overview")
    assert res.status_code == 200
    overview = res.json()
    assert overview["total_analyzed_feedback"] > 10000
    assert overview["active_reputation_index"] is not None

def test_india_analytics(client):
    res = client.get("/api/analytics/india")
    assert res.status_code == 200
    ind = res.json()
    assert ind["market"] == "India (IN)"
    assert len(ind["languages"]) > 0
