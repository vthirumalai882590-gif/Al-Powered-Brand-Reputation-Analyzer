"""
BrandPulse AI — Database Migration & Schema Upgrade Tool
Safely checks database schema, creates missing tables, adds missing columns, and ensures indexes.
Usage: python scripts/migrate_database.py
"""

import sys
import os
import sqlite3

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.database import engine, Base
import app.models  # Ensure all models are registered

def run_migration():
    print("[BrandPulse Migration] Starting database schema synchronization...")
    
    # Step 1: Create all new tables registered in Base.metadata
    Base.metadata.create_all(bind=engine)
    print("[BrandPulse Migration] Verified all registered tables exist.")

    # Step 2: Add any missing columns to existing SQLite tables using PRAGMA
    db_path = str(engine.url).replace("sqlite:///", "")
    if os.path.exists(db_path):
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()

        column_migrations = {
            "brands": [
                ("normalized_name", "TEXT"),
                ("country", "TEXT DEFAULT 'IN'"),
                ("aliases", "TEXT")
            ],
            "products": [
                ("normalized_name", "TEXT"),
                ("subcategory", "TEXT"),
                ("normalized_model", "TEXT"),
                ("sku", "TEXT"),
                ("asin", "TEXT"),
                ("upc", "TEXT"),
                ("gtin", "TEXT"),
                ("currency", "TEXT DEFAULT 'INR'"),
                ("country", "TEXT DEFAULT 'IN'"),
                ("market", "TEXT DEFAULT 'IN'"),
                ("product_url", "TEXT")
            ],
            "sources": [
                ("dataset_name", "TEXT"),
                ("dataset_version", "TEXT"),
                ("license", "TEXT"),
                ("attribution", "TEXT"),
                ("country", "TEXT DEFAULT 'IN'"),
                ("market", "TEXT DEFAULT 'IN'"),
                ("created_at", "TIMESTAMP")
            ],
            "feedback": [
                ("dataset_id", "TEXT"),
                ("external_review_id", "TEXT"),
                ("review_title", "TEXT"),
                ("language_confidence", "REAL DEFAULT 1.0"),
                ("country", "TEXT DEFAULT 'IN'"),
                ("state", "TEXT"),
                ("city", "TEXT"),
                ("helpful_votes", "INTEGER DEFAULT 0"),
                ("review_url", "TEXT"),
                ("raw_hash", "TEXT"),
                ("normalized_hash", "TEXT"),
                ("duplicate_of", "TEXT"),
                ("duplicate_confidence", "REAL"),
                ("updated_at", "TIMESTAMP")
            ],
            "ai_analyses": [
                ("sentiment_score", "REAL DEFAULT 0.0"),
                ("authenticity_risk", "REAL DEFAULT 0.05"),
                ("language", "TEXT DEFAULT 'en'"),
                ("language_confidence", "REAL DEFAULT 1.0"),
                ("script", "TEXT DEFAULT 'Latin'"),
                ("is_code_mixed", "INTEGER DEFAULT 0"),
                ("model_version", "TEXT DEFAULT '2.0.0'"),
                ("prompt_version", "TEXT DEFAULT 'v2'"),
                ("processing_status", "TEXT DEFAULT 'completed'"),
                ("attempt_count", "INTEGER DEFAULT 1"),
                ("last_error", "TEXT"),
                ("processed_at", "TIMESTAMP")
            ]
        }

        for table, cols in column_migrations.items():
            cur.execute(f"PRAGMA table_info({table});")
            existing_cols = {row[1] for row in cur.fetchall()}
            for col_name, col_type in cols:
                if col_name not in existing_cols:
                    try:
                        cur.execute(f"ALTER TABLE {table} ADD COLUMN {col_name} {col_type};")
                        print(f"  [+] Added missing column '{col_name}' to '{table}'")
                    except Exception as e:
                        print(f"  [-] Failed to add column '{col_name}' to '{table}': {e}")

        # Step 3: Populate normalized_name where NULL for existing rows
        cur.execute("UPDATE brands SET normalized_name = LOWER(TRIM(name)) WHERE normalized_name IS NULL;")
        cur.execute("UPDATE products SET normalized_name = LOWER(TRIM(name)) WHERE normalized_name IS NULL;")
        conn.commit()

        # Step 4: Create performance indexes
        indexes = [
            ("idx_brand_normalized", "brands", "normalized_name"),
            ("idx_product_normalized", "products", "normalized_name"),
            ("idx_product_asin", "products", "asin"),
            ("idx_product_sku", "products", "sku"),
            ("idx_product_category", "products", "category"),
            ("idx_product_market", "products", "market"),
            ("idx_feedback_product_id", "feedback", "product_id"),
            ("idx_feedback_source_id", "feedback", "source_id"),
            ("idx_feedback_dataset_id", "feedback", "dataset_id"),
            ("idx_feedback_review_date", "feedback", "review_date"),
            ("idx_feedback_rating", "feedback", "rating"),
            ("idx_feedback_language", "feedback", "language"),
            ("idx_feedback_norm_hash", "feedback", "normalized_hash"),
            ("idx_feedback_ext_id", "feedback", "external_review_id"),
            ("idx_ai_sentiment", "ai_analyses", "sentiment"),
            ("idx_ai_complaint", "ai_analyses", "complaint_type"),
            ("idx_ai_urgency", "ai_analyses", "urgency"),
            ("idx_ai_processing_status", "ai_analyses", "processing_status"),
        ]

        for idx_name, tbl, col in indexes:
            try:
                cur.execute(f"CREATE INDEX IF NOT EXISTS {idx_name} ON {tbl} ({col});")
            except Exception as e:
                print(f"  [-] Index error {idx_name}: {e}")

        conn.commit()
        conn.close()
        print("[BrandPulse Migration] Schema upgrade & index verification complete.")

if __name__ == "__main__":
    run_migration()
