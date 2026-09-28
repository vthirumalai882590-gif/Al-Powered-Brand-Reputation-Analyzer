# BrandPulse Universal Data Ingestion & AI Pipeline

## 1. End-to-End Pipeline Architecture

```
RAW DATA ASSETS (CSV / JSON / JSONL)
  │
  ▼
[BaseLoader Streaming (Chunked Memory-Safe)]
  │
  ▼
[SchemaDetector (Fuzzy & Candidate Header Matching)]
  │
  ▼
[RecordNormalizer (Unicode NFKC, Indian Dates & Cities, 1.0-5.0 Ratings)]
  │
  ▼
[RecordValidator (Text Length, Rating Bounds, Required Identifiers)]
  │
  ▼
[ReviewDeduplicator (Deterministic SHA-256 Collision Resistant Hashes)]
  │
  ├── Duplicate Detected ──► Flagged as 'duplicate' in DB (Lineage Preserved)
  │
  └── Clean Record ──► [Entity Resolution (BrandResolver & ProductResolver)]
                         │
                         ▼
                   [Raw Storage & Feedback Table Insertion]
                         │
                         ▼
             [AI Batch Processor (Streamed Batches)]
               ├── 1. Language & Code-Mix Detector
               ├── 2. Authenticity & Fake Review Risk Scorer
               ├── 3. Blended Sentiment & Polarity Analysis
               ├── 4. Fine-Grained Emotion Classification
               ├── 5. Category-Specific Aspect Sentiment Scorer
               ├── 6. Thematic Topic Tagger
               └── 7. Complaint Detector & Safety Urgency Triage
                         │
                         ▼
                 [ai_analyses Table Storage]
                         │
                         ▼
             [Reputation Engine & API Endpoints]
```

---

## 2. Ingestion Framework Components

### 2.1 Schema Detection (`SchemaDetector`)
Detects heterogeneous column naming conventions across CSV, JSON, and JSONL assets:
- **Review Text:** `review_text`, `reviewtext`, `customer_review`, `view1`, `comment`, `text`, `body`, `content`
- **Rating:** `rating`, `stars`, `star`, `review_rating`, `aiconalt`, `overall`, `score`
- **Date:** `review_date`, `date`, `view`, `timestamp`, `created_at`
- **Product Name:** `product_name`, `product_title`, `product`, `mobile_names`, `item_name`
- **Brand:** `brand_name`, `brand`, `manufacturer`, `make`, `company`
- **Location:** `location`, `city`, `state`, `country`, `reviewer_location`

### 2.2 Record Normalization (`RecordNormalizer`)
- **Text:** Unicode NFKC normalization, whitespace collapsing, strip non-printable characters.
- **Ratings:** Extracts numeric values from strings like `"5.0 out of 5 stars"`, `"4/5"`, `"4.5"` and bounds to $[1.0, 5.0]$.
- **Dates:** Parses Indian English review dates (e.g., `"Reviewed in India on 15 August 2023"`), ISO formats, and relative timestamps.
- **Geographies:** Normalizes Indian cities and states (e.g., `"Bangalore"` $\to$ `("Bengaluru", "Karnataka")`).

### 2.3 Collision-Resistant Deduplication (`Deduplicator`)
Deterministic SHA-256 hashing ensures identical reviews within the same product and source are never double-counted:
$$\text{Hash} = \text{SHA256}(\text{norm\_text} \parallel \text{product\_identity} \parallel \text{source\_id})$$
When a collision is detected:
- The record is recorded in `Feedback` with `quality_status = 'duplicate'` and `duplicate_of = <original_feedback_id>`.
- Duplicate records are excluded from reputation scoring calculations, preserving statistical purity.

### 2.4 Entity Resolution (`BrandResolver` & `ProductResolver`)
- **Brand Normalization:** Employs alias taxonomies (e.g., `"bosch home appliances"` $\to$ `"Bosch"`, `"samsung india"` $\to$ `"Samsung"`, `"boat lifestyle"` $\to$ `"boAt"`).
- **Product Normalization:** Cleans product titles, strips boilerplate retailer strings (such as `"(Black, 64 GB) With No Cost EMI"`), and resolves or assigns canonical product records.

---

## 3. Modular AI Batch Enrichment Pipeline

### 3.1 Aspect Sentiment Extraction (`app/ai/aspect.py`)
Extracts category-specific features and calculates aspect sentiment polarity $[-1.0, 1.0]$:
- **Kitchen Appliances:** Motor Power, Noise Level, Jar Quality, Grinding Speed, Overheating & Thermals, Build & Durability, Ease of Cleaning, Value for Money.
- **Beauty & Personal Care:** Hair Fall Reduction, Hair Growth & Softness, Fragrance & Smell, Texture & Stickiness, Scalp Health & Dandruff, Packaging & Leakage, Ingredients & Natural, Value for Money.
- **Smartphones:** Battery Life, Camera Quality, Performance & Speed, Display & Screen, Heating & Thermals, Charging Speed, Build & Design, Software & UI, Value for Money.

### 3.2 Emotion Classification (`app/ai/emotion.py`)
Classifies customer emotion into:
- `delight`: Exceeded expectations, mindblowing, fantastic
- `satisfaction`: Value for money, works well, good product
- `neutral`: Balanced factual observations
- `disappointment`: Expected better, let down, average
- `frustration`: Headaches, annoyances, motor tripping, lag
- `anger`: Cheated, fraud, worst product ever, scam

### 3.3 Complaint & Safety Triage (`app/ai/complaint.py`)
- **Critical (Safety Hazard):** Fire, smoke, spark, electric shock, burst, exploding, chemical burn.
- **High (Major Defect):** Dead on arrival, motor burned on day 1, refused refund/replacement.
- **Medium (Operational Gripes):** Excessive noise, minor lid leakage, missing secondary spatula.
- **Low:** Aesthetic preference, non-complaint.

### 3.4 Authenticity & Fake Review Risk Scorer (`app/ai/authenticity.py`)
Computes risk score $[0.0, 1.0]$ by evaluating:
- Repetitive generic promotional copy
- Extreme superlatives without specific feature citations
- Unverified short 5-star / 1-star ratings
- Excessive capitalization or exclamation point spam
- Verified purchase weighting discount
