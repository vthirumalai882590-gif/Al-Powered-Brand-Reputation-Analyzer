"""
BrandPulse AI — Complete Multi-Dataset Real Data Importer
Imports all verified local Kaggle and market datasets into the database
with proper entity resolution, source provenance, and deduplication.
Usage: python scripts/import_all_real_data.py [--limit-per-file N]
"""

import sys
import os
import argparse
import time

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.database import SessionLocal, engine, Base
import app.models
from app.ingestion.import_manager import ImportManager

DATASETS_TO_IMPORT = [
    # Indian Mixer Grinders & Kitchen Appliances
    {
        "file": "data/kaggle_data/Bosch Pro 1000W.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "bosch_truemixx_1000w",
        "category": "Kitchen Appliances",
        "brand": "Bosch",
        "product": "Bosch TrueMixx Pro 1000W"
    },
    {
        "file": "data/kaggle_data/Philips Viva.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "philips_viva_mixer",
        "category": "Kitchen Appliances",
        "brand": "Philips",
        "product": "Philips Viva Collection Hand Mixer"
    },
    {
        "file": "data/kaggle_data/Sujata Dynamix.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "sujata_dynamix_900w",
        "category": "Kitchen Appliances",
        "brand": "Sujata",
        "product": "Sujata Dynamix 900W"
    },
    {
        "file": "data/kaggle_data/bajaj rex 500w.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "bajaj_rex_500w",
        "category": "Kitchen Appliances",
        "brand": "Bajaj",
        "product": "Bajaj Rex 500W Mixer Grinder"
    },
    {
        "file": "data/kaggle_data/preeti zodiac.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "preethi_zodiac_750w",
        "category": "Kitchen Appliances",
        "brand": "Preethi",
        "product": "Preethi Zodiac MG-218 750W"
    },
    {
        "file": "data/kaggle_data/philips_hl7756.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "philips_hl7756_750w",
        "category": "Kitchen Appliances",
        "brand": "Philips",
        "product": "Philips HL7756/00 750W Mixer Grinder"
    },
    {
        "file": "data/kaggle_data/preeti blueleaf.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "preethi_blueleaf_expert",
        "category": "Kitchen Appliances",
        "brand": "Preethi",
        "product": "Preethi Blue Leaf Expert 750W"
    },
    # Indian Consumer Products (Mamaearth, etc.)
    {
        "file": "data/kaggle_data/amazon_vfl_reviews.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "amazon_in_consumer_vfl",
        "category": "Beauty & Personal Care",
        "brand": "Mamaearth",
        "product": "Mamaearth Onion Hair Oil"
    },
    # Indian Mobile & Smartphone Reviews
    {
        "file": "data/kaggle_data/msiddhu_phone-reviews/phone_reviews.csv",
        "source": "amazon_india",
        "source_name": "Amazon India",
        "dataset": "amazon_in_phone_reviews",
        "category": "Smartphone",
        "brand": "Samsung",
        "product": None  # Auto-resolve from 'mobile_names' column in CSV
    },
    # Large Mobile Sentiment Dataset
    {
        "file": "data/kaggle_data/Mobile Reviews Sentiment.csv",
        "source": "kaggle_mobile_reviews",
        "source_name": "Kaggle Mobile Reviews",
        "dataset": "mobile_reviews_sentiment_global_india",
        "category": "Smartphone",
        "brand": None,  # Auto-resolve from 'brand' column in CSV
        "product": None  # Auto-resolve from 'model' column in CSV
    }
]

def main():
    parser = argparse.ArgumentParser(description="BrandPulse AI Multi-Dataset Batch Importer")
    parser.add_argument("--limit-per-file", type=int, default=None, help="Optional record limit per file")
    parser.add_argument("--batch-size", type=int, default=1000, help="DB commit batch size")
    args = parser.parse_args()

    print("\n" + "="*70)
    print("  BRANDPULSE AI — COMPREHENSIVE MULTI-DATASET IMPORT")
    print("="*70)

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    total_start = time.time()
    grand_total = 0
    grand_new = 0
    grand_dups = 0

    try:
        for idx, ds_conf in enumerate(DATASETS_TO_IMPORT, start=1):
            fpath = ds_conf["file"]
            if not os.path.exists(fpath):
                print(f"[{idx}/{len(DATASETS_TO_IMPORT)}] Skipping (not found): {fpath}")
                continue

            print(f"\n[{idx}/{len(DATASETS_TO_IMPORT)}] Ingesting {ds_conf['dataset']} from {fpath}...")
            start_t = time.time()

            stats = ImportManager.import_dataset(
                db=db,
                file_path=fpath,
                source_id=ds_conf["source"],
                source_name=ds_conf["source_name"],
                dataset_name=ds_conf["dataset"],
                batch_size=args.batch_size,
                limit=args.limit_per_file,
                resume=True,
                category_hint=ds_conf["category"],
                brand_hint=ds_conf["brand"],
                product_hint=ds_conf["product"]
            )

            dur = max(0.001, time.time() - start_t)
            rate = round(stats.total / dur, 1)

            grand_total += stats.total
            grand_new += stats.new_records
            grand_dups += stats.duplicates

            print(f"    Processed: {stats.total:,} | New: {stats.new_records:,} | Dups: {stats.duplicates:,} | Invalid: {stats.invalid:,} | Quality: {stats.quality_score}% | Speed: {rate} rec/s")

        total_dur = max(0.001, time.time() - total_start)
        print("\n" + "="*70)
        print("  ALL DATASETS INGESTION COMPLETE")
        print("="*70)
        print(f"Total Records Evaluated: {grand_total:,}")
        print(f"Total New Real Reviews:  {grand_new:,}")
        print(f"Total Duplicates Caught: {grand_dups:,}")
        print(f"Total Time Elapsed:      {round(total_dur, 2)}s ({round(grand_total / total_dur, 1)} rec/s)")
        print("="*70)

    finally:
        db.close()

if __name__ == "__main__":
    main()
