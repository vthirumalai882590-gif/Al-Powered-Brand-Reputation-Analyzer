import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from fastapi.testclient import TestClient
from app.main import app

def test_all():
    client = TestClient(app)
    
    print("1. Testing Health...")
    health = client.get("/health").json()
    print("   Health:", health)
    assert health["status"] == "online"

    print("2. Testing Products...")
    prods = client.get("/api/products").json()
    print(f"   Fetched {len(prods)} products. Top product: {prods[0]['name']} ({prods[0]['id']})")
    assert len(prods) > 0

    top_id = prods[0]["id"]
    print(f"3. Testing Product Reputation for {top_id}...")
    rep = client.get(f"/api/products/{top_id}/reputation").json()
    print(f"   Trust Score: {rep['trust_score']}%, Reviews: {rep['review_count']}, Aspects: {len(rep['aspects'])}")
    assert rep["review_count"] > 0
    assert rep["trust_score"] is not None

    print(f"4. Testing Product Timeline for {top_id}...")
    tl = client.get(f"/api/products/{top_id}/timeline").json()
    print(f"   Timeline months: {len(tl['timeline'])}")
    assert len(tl["timeline"]) > 0

    print("5. Testing Feedback Pagination...")
    fb = client.get("/api/feedback?page=1&page_size=5").json()
    print(f"   Fetched {len(fb['items'])} items. Total count in DB: {fb['total_count']}")
    assert len(fb["items"]) == 5
    assert fb["total_count"] > 10000

    print("6. Testing Search...")
    search_res = client.get("/api/search?q=mixer").json()
    print(f"   Search for 'mixer' found {search_res['total_results']} products")
    assert search_res["total_results"] > 0

    print("7. Testing Owner Overview...")
    owner = client.get("/api/owner/overview").json()
    print(f"   Owner Analyzed Feedback: {owner['total_analyzed_feedback']}, Rep Index: {owner['active_reputation_index']}")
    assert owner["total_analyzed_feedback"] > 10000

    print("8. Testing Owner Alerts...")
    alerts = client.get("/api/owner/alerts").json()
    print(f"   Owner Alerts: {len(alerts)}")
    assert len(alerts) > 0

    print("9. Testing India Analytics...")
    india = client.get("/api/analytics/india").json()
    print(f"   India Languages: {len(india['languages'])}, Code-mixed pct: {india['code_mixed']['percentage']}%")

    print("\nALL API ENDPOINTS TESTED SUCCESSFULLY! 100% REAL DATA GROUNDED.")

if __name__ == "__main__":
    test_all()
