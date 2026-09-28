import os
import sys
import argparse

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.database import SessionLocal
from app.ai.batch_processor import AIBatchProcessor

def main():
    parser = argparse.ArgumentParser(description="Run BrandPulse AI Enrichment Pipeline on Ingested Feedback")
    parser.add_argument("--batch-size", type=int, default=250, help="Batch size for processing records")
    parser.add_argument("--limit", type=int, default=None, help="Maximum number of records to process")
    parser.add_argument("--product-id", type=str, default=None, help="Filter by specific product ID")
    parser.add_argument("--force-reprocess", action="store_true", help="Reprocess already enriched feedback records")
    args = parser.parse_args()

    db = SessionLocal()
    try:
        processor = AIBatchProcessor(db=db, batch_size=args.batch_size)
        print("=" * 60)
        print(" BRANDPULSE AI ENRICHMENT BATCH PIPELINE")
        print("=" * 60)
        print(f"Batch Size:       {args.batch_size}")
        print(f"Limit:            {args.limit if args.limit else 'ALL'}")
        print(f"Product Filter:   {args.product_id or 'None (All products)'}")
        print(f"Force Reprocess:  {args.force_reprocess}")
        print("-" * 60)
        print("Starting batch processing...")

        results = processor.process_pending_feedback(
            product_id=args.product_id,
            limit=args.limit,
            force_reprocess=args.force_reprocess
        )

        print("\n" + "=" * 60)
        print(" ENRICHMENT COMPLETED")
        print("=" * 60)
        print(f"Eligible Records:    {results['total_eligible']}")
        print(f"Processed Count:     {results['processed_count']}")
        print(f"Successful:          {results['success_count']}")
        print(f"Errors:              {results['error_count']}")
        print(f"Duration:            {results['duration_seconds']}s")
        print(f"Throughput:          {results['throughput_per_sec']} reviews/sec")
        print("\nSentiment Distribution:")
        for sent, count in results['sentiment_counts'].items():
            print(f"  - {sent.capitalize()}: {count}")
        print("\nTop Aspects Extracted:")
        for aspect, count in results['top_aspects'].items():
            print(f"  - {aspect}: {count} mentions")
        print("=" * 60)

    except Exception as e:
        safe_err = str(e).encode('ascii', errors='replace').decode('ascii')
        print(f"Error during enrichment: {safe_err}")
        db.rollback()
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    main()
