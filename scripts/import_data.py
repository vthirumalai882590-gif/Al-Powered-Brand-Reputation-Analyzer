r"""
BrandPulse AI — Universal Data Ingestion CLI
Usage:
  python scripts/import_data.py --file <path> --source <source_id> --dataset <dataset_name>
  python scripts/import_data.py --file "data/kaggle_data/Bosch Pro 1000W.csv" --source amazon_in --dataset bosch_1000w --dry-run
"""

import sys
import os
import argparse
import json

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.database import SessionLocal, engine, Base
import app.models  # ensure models are loaded
from app.ingestion.import_manager import ImportManager

def main():
    parser = argparse.ArgumentParser(description="BrandPulse AI Universal Data Ingestion CLI")
    parser.add_argument("--file", required=True, help="Path to input data file (CSV, JSON, JSONL)")
    parser.add_argument("--source", default="kaggle_amazon_in", help="Source ID (e.g. amazon_india, flipkart, kaggle)")
    parser.add_argument("--source-name", default=None, help="Human-readable source name (e.g. Amazon India Reviews)")
    parser.add_argument("--dataset", default=None, help="Dataset name identifier")
    parser.add_argument("--format", choices=["auto", "csv", "json", "jsonl"], default="auto", help="File format parser")
    parser.add_argument("--batch-size", type=int, default=500, help="Batch commit size for DB persistence")
    parser.add_argument("--limit", type=int, default=None, help="Maximum number of records to ingest")
    parser.add_argument("--resume", action="store_true", default=True, help="Resume import from last saved offset")
    parser.add_argument("--no-resume", action="store_false", dest="resume", help="Start import from zero")
    parser.add_argument("--dry-run", action="store_true", help="Inspect schema and estimate valid/invalid counts without DB writes")
    parser.add_argument("--category", default=None, help="Category hint (e.g. Kitchen Appliances, Smartphone, Laptop)")
    parser.add_argument("--brand", default=None, help="Brand hint (e.g. Bosch, Philips, Sujata, Samsung)")
    parser.add_argument("--product", default=None, help="Product name hint")
    parser.add_argument("--skip-ai", action="store_true", help="Skip queueing AI enrichment during ingestion")

    args = parser.parse_args()

    if not os.path.exists(args.file):
        print(f"Error: Target file not found: {args.file}")
        sys.exit(1)

    file_name = os.path.basename(args.file)
    dataset_name = args.dataset or os.path.splitext(file_name)[0]
    source_name = args.source_name or args.source.replace("_", " ").title()

    # DRY RUN
    if args.dry_run:
        print("\n" + "="*70)
        print(f"  BRANDPULSE AI — INGESTION DRY-RUN: {dataset_name}")
        print("="*70)
        dry_results = ImportManager.dry_run(
            file_path=args.file,
            sample_size=100,
            category_hint=args.category,
            brand_hint=args.brand
        )
        print(f"File Path:                {dry_results.get('file')}")
        print(f"Estimated Total Records:  {dry_results.get('total_estimated_records'):,}")
        print(f"Detected Columns:         {', '.join(dry_results.get('detected_columns', []))}")
        print(f"Detected Field Mappings:")
        for target_field, orig_col in dry_results.get('detected_mapping', {}).items():
            print(f"   • {target_field:<20} -> '{orig_col}'")
        print(f"Sample Records Tested:    {dry_results.get('sample_records_evaluated')}")
        print(f"Estimated Valid Records:  {dry_results.get('estimated_valid_records'):,}")
        print(f"Estimated Invalid Records:{dry_results.get('estimated_invalid_records'):,}")
        print("="*70)
        print("Dry-run complete. No database records were written.")
        return

    # PRODUCTION IMPORT
    print("\n" + "="*70)
    print(f"  BRANDPULSE AI — REAL DATA INGESTION: {dataset_name}")
    print("="*70)

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        stats = ImportManager.import_dataset(
            db=db,
            file_path=args.file,
            source_id=args.source,
            source_name=source_name,
            dataset_name=dataset_name,
            source_type=args.source,
            batch_size=args.batch_size,
            limit=args.limit,
            resume=args.resume,
            category_hint=args.category,
            brand_hint=args.brand,
            product_hint=args.product
        )

        print("\n" + "="*70)
        print("  INGESTION SUMMARY REPORT")
        print("="*70)
        print(f"Total Records Processed: {stats.total:,}")
        print(f"Valid Records:           {stats.valid:,}")
        print(f"Invalid Records:         {stats.invalid:,}")
        print(f"Duplicate Records:       {stats.duplicates:,}")
        print(f"New Records Inserted:    {stats.new_records:,}")
        print(f"Data Quality Score:      {stats.quality_score}%")
        print(f"Languages Detected:      {dict(stats.language_distribution)}")
        print(f"Rating Distribution:     {dict(stats.rating_distribution)}")
        if stats.error_summary:
            print(f"Errors Encountered:      {dict(stats.error_summary)}")
        print("="*70)

    finally:
        db.close()

if __name__ == "__main__":
    main()
