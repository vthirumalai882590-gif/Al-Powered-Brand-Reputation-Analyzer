# BrandPulse REST API Data Contract & Specifications

## 1. Protocol & Conventions
- **Base URL:** `/api`
- **Content-Type:** `application/json; charset=utf-8`
- **Authentication:** Bearer JWT in `Authorization: Bearer <token>`
- **Pagination Strategy:** Zero-based or 1-based page index with `page` and `page_size`. Responses return `{ items: [...], total_count: int, page: int, page_size: int, total_pages: int }`.
- **Modes:** Production (`APP_DATA_MODE=production`) filters out demo corpora (`src_demo_001`).

---

## 2. Catalog & Products Endpoints

### `GET /api/products`
Lists products with optional text search, category/brand filters, and pagination.
- **Query Parameters:**
  - `q` (string, optional): Search query (matches name, description, model).
  - `category` (string, optional): Category filter.
  - `brand_id` (string, optional): Brand ID filter.
  - `has_reviews_only` (bool, default `false`): Restrict to items with verified reviews.
  - `page` (int, default `1`): 1-indexed page number.
  - `page_size` (int, default `50`): Results per page (max `200`).
- **Response (200 OK):**
  ```json
  [
    {
      "id": "prd_bosc_bosch_truemixx_pro_1000w",
      "name": "Bosch TrueMixx Pro 1000W",
      "category": "Kitchen Appliances",
      "brand_id": "brd_bosch",
      "price": 6999.0,
      "currency": "INR",
      "status": "active",
      "created_at": "2026-09-23T14:15:00Z"
    }
  ]
  ```

---

### `GET /api/products/{id}/reputation`
Computes and returns the complete transparent Trust Profile and aspect breakdown for a single product.
- **Path Parameters:**
  - `id` (string, required): Product ID.
- **Response (200 OK):**
  ```json
  {
    "product_id": "prd_bosc_bosch_truemixx_pro_1000w",
    "product_name": "Bosch TrueMixx Pro 1000W",
    "brand_name": "Bosch",
    "category": "Kitchen Appliances",
    "has_sufficient_data": true,
    "review_count": 1158,
    "trust_score": 70.0,
    "confidence": 0.97,
    "confidence_interval": {
      "lower": 67.4,
      "upper": 72.6,
      "confidence": 0.97
    },
    "data_freshness": "Latest review from 2024-03-12",
    "rating_metrics": {
      "average_rating": 4.12,
      "total_ratings": 1158,
      "distribution": { "1": 150, "2": 80, "3": 120, "4": 250, "5": 558 }
    },
    "sentiment_distribution": {
      "positive": 720,
      "neutral": 110,
      "negative": 328
    },
    "aspects": {
      "Motor Power": {
        "name": "Motor Power",
        "score": 70.3,
        "sentiment": "positive",
        "mentions": 320,
        "positive_ratio": 0.72,
        "snippets": ["1000W motor is very powerful"]
      },
      "Noise Level": {
        "name": "Noise Level",
        "score": 46.6,
        "sentiment": "neutral",
        "mentions": 392,
        "positive_ratio": 0.45,
        "snippets": ["sound is quite loud during grinding"]
      }
    },
    "authenticity": {
      "suspicious_count": 0,
      "suspicious_percentage": 0.0,
      "verified_buyer_percentage": 98.4,
      "avg_authenticity_risk": 0.02
    },
    "complaints": {
      "total_complaints": 240,
      "critical_count": 0,
      "high_count": 25,
      "top_complaint_types": [
        { "type": "Excessive Noise & Vibration", "count": 120 },
        { "type": "Jar & Blade Damage", "count": 45 }
      ]
    },
    "data_mode": "production"
  }
  ```

---

### `GET /api/products/{id}/timeline`
Returns real chronological monthly review progression.
- **Response (200 OK):**
  ```json
  {
    "product_id": "prd_bosc_bosch_truemixx_pro_1000w",
    "timeline": [
      {
        "period": "2023-08",
        "volume": 85,
        "sentiment_score": 74,
        "average_rating": 4.15,
        "trust_score": 71.2
      }
    ],
    "has_sufficient_data": true
  }
  ```

---

### `GET /api/products/compare/side-by-side`
Compares multiple products side-by-side.
- **Query Parameters:**
  - `ids` (string, required): Comma-separated product IDs.

---

## 3. Search Engine Endpoints

### `GET /api/search`
Unified multi-facet catalog search.
- **Query Parameters:**
  - `q` (string, optional): Keyword query.
  - `category` (string, optional): Category filter.
  - `brand` (string, optional): Brand filter.
  - `min_rating` (float, optional): Minimum average rating (1.0 - 5.0).
  - `min_trust_score` (float, optional): Minimum evidence trust score (0 - 100).
  - `page` (int, default `1`)
  - `page_size` (int, default `20`)
- **Response (200 OK):**
  ```json
  {
    "query": "bosch",
    "total_results": 3,
    "page": 1,
    "page_size": 20,
    "results": [
      {
        "id": "prd_bosc_bosch_truemixx_pro_1000w",
        "name": "Bosch TrueMixx Pro 1000W",
        "brand_name": "Bosch",
        "category": "Kitchen Appliances",
        "review_count": 1158,
        "average_rating": 4.12,
        "trust_score": 70.0,
        "has_sufficient_data": true,
        "top_aspects": [
          { "name": "Motor Power", "score": 70.3, "sentiment": "positive", "mentions": 320 }
        ]
      }
    ],
    "facets": {
      "categories": [{ "category": "Kitchen Appliances", "count": 3 }],
      "brands": [{ "brand": "Bosch", "count": 3 }]
    }
  }
  ```

---

## 4. Ingestion, Freshness & Telemetry Endpoints

### `GET /api/data/freshness`
Platform-wide corpus sync status.
- **Response (200 OK):**
  ```json
  {
    "app_data_mode": "production",
    "is_production": true,
    "total_feedback_records": 14914,
    "total_products": 73,
    "total_brands": 25,
    "total_datasets_registered": 10,
    "earliest_review_date": "2015-05-12T00:00:00",
    "latest_review_date": "2026-09-23T14:44:50",
    "sources_breakdown": [
      { "source_id": "amazon_india", "source_name": "Amazon India", "count": 13414 },
      { "source_id": "kaggle_mobile", "source_name": "Kaggle Mobile", "count": 1500 }
    ],
    "sync_status": "synced"
  }
  ```

### `GET /api/imports`
List deduplication & import jobs.

### `GET /api/analytics/india`
Regional consumer language and code-mixed telemetry.
- **Response (200 OK):**
  ```json
  {
    "market": "India (IN)",
    "total_analyzed_reviews": 14914,
    "languages": [
      { "language": "en", "count": 14057, "percentage": 94.3 },
      { "language": "hi", "count": 650, "percentage": 4.4 }
    ],
    "code_mixed": {
      "count": 857,
      "percentage": 5.7,
      "description": "Reviews containing Hindi/Regional terms written in Roman/Latin script"
    }
  }
  ```

---

## 5. Owner Operations Endpoints

### `GET /api/owner/overview`
Executive command center KPI summary.

### `GET /api/owner/alerts`
Dynamic early-warning alerts generated from customer friction spikes.

### `GET /api/owner/reputation-dna/{product_id}`
Returns dynamic graph topology linking Product -> Aspects -> Friction Issues -> Actions.
