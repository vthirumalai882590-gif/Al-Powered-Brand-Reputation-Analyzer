import hashlib
import os
import uuid
import datetime
from typing import Optional, Dict, Any, Generator
from sqlalchemy.orm import Session

from app.ingestion.base import RawRecordData, NormalizedRecord, ImportStats
from app.ingestion.csv_loader import CSVLoader
from app.ingestion.jsonl_loader import JSONLLoader
from app.ingestion.json_loader import JSONLoader
from app.ingestion.schema_detector import SchemaDetector
from app.ingestion.normalizer import RecordNormalizer
from app.ingestion.validator import RecordValidator
from app.ingestion.deduplicator import Deduplicator
from app.ingestion.brand_resolver import BrandResolver
from app.ingestion.product_resolver import ProductResolver
from app.ingestion.provenance import ProvenanceManager

from app.models.source import Source
from app.models.dataset import Dataset
from app.models.raw_record import RawRecord
from app.models.import_job import ImportJob
from app.models.feedback import Feedback
from app.models.product import Product
from app.models.brand import Brand

class ImportManager:
    """
    Universal ingestion manager orchestrating raw streaming, schema detection,
    normalization, validation, deduplication, entity resolution, and bulk insertion.
    """

    @classmethod
    def compute_file_hash(cls, file_path: str) -> str:
        sha256 = hashlib.sha256()
        with open(file_path, "rb") as f:
            while chunk := f.read(65536):
                sha256.update(chunk)
        return sha256.hexdigest()

    @classmethod
    def get_loader(cls, file_path: str, format_hint: str = "auto"):
        ext = os.path.splitext(file_path)[1].lower()
        if format_hint == "csv" or ext == ".csv":
            return CSVLoader()
        elif format_hint == "jsonl" or ext in (".jsonl", ".ndjson"):
            return JSONLLoader()
        elif format_hint == "json" or ext == ".json":
            return JSONLoader()
        else:
            # Default to CSV or JSONL
            return CSVLoader()

    @classmethod
    def dry_run(
        cls,
        file_path: str,
        sample_size: int = 100,
        category_hint: Optional[str] = None,
        brand_hint: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Inspects file schema, samples rows, estimates duplicates and invalid records.
        """
        loader = cls.get_loader(file_path)
        total_records = loader.count_records(file_path)

        samples = list(loader.stream_records(file_path, limit=sample_size))
        if not samples:
            return {"error": "Empty dataset file"}

        first_payload = samples[0].raw_payload
        detected_mapping = SchemaDetector.detect_mapping(first_payload, os.path.basename(file_path))

        valid_sample_count = 0
        invalid_sample_count = 0

        for r in samples:
            norm = RecordNormalizer.normalize_record(
                raw_payload=r.raw_payload,
                column_mapping=detected_mapping,
                default_category=category_hint,
                default_brand=brand_hint
            )
            v_res = RecordValidator.validate(norm)
            if v_res.is_valid:
                valid_sample_count += 1
            else:
                invalid_sample_count += 1

        sample_valid_ratio = valid_sample_count / len(samples) if samples else 1.0

        return {
            "file": file_path,
            "total_estimated_records": total_records,
            "detected_columns": list(first_payload.keys()),
            "detected_mapping": detected_mapping,
            "sample_records_evaluated": len(samples),
            "estimated_valid_records": int(total_records * sample_valid_ratio),
            "estimated_invalid_records": int(total_records * (1 - sample_valid_ratio)),
            "first_sample": first_payload
        }

    @classmethod
    def import_dataset(
        cls,
        db: Session,
        file_path: str,
        source_id: str,
        source_name: str,
        dataset_name: str,
        source_type: str = "kaggle",
        batch_size: int = 500,
        limit: Optional[int] = None,
        resume: bool = True,
        category_hint: Optional[str] = None,
        brand_hint: Optional[str] = None,
        product_hint: Optional[str] = None,
        license: str = "Public / Research Dataset"
    ) -> ImportStats:
        file_hash = cls.compute_file_hash(file_path)
        file_name = os.path.basename(file_path)
        dataset_id = f"ds_{file_hash[:12]}"

        # Infer hints from filename if not explicitly provided
        stem = os.path.splitext(file_name)[0]
        if not product_hint and any(k in stem.lower() for k in ["bosch", "philips", "sujata", "bajaj", "preeti", "preethi"]):
            product_hint = stem
            if not category_hint:
                category_hint = "Kitchen Appliances"
            if not brand_hint:
                for b in ["Bosch", "Philips", "Sujata", "Bajaj", "Preethi"]:
                    if b.lower() in stem.lower():
                        brand_hint = b
                        break

        # 1. Register Source & Dataset
        source = ProvenanceManager.get_or_create_source(
            db=db,
            source_id=source_id,
            name=source_name,
            source_type=source_type,
            dataset_name=dataset_name,
            license=license
        )

        dataset = ProvenanceManager.register_dataset(
            db=db,
            dataset_id=dataset_id,
            source_id=source.id,
            dataset_name=dataset_name,
            file_name=file_name,
            file_hash=file_hash,
            configuration={"category_hint": category_hint, "brand_hint": brand_hint}
        )

        # 2. Check or Create Import Job
        job_id = f"job_{dataset_id}_{uuid.uuid4().hex[:6]}"
        offset = 0
        if resume:
            last_job = db.query(ImportJob).filter(
                ImportJob.dataset_id == dataset.id,
                ImportJob.status.in_(["running", "paused", "completed_with_errors"])
            ).order_by(ImportJob.started_at.desc()).first()
            if last_job:
                offset = last_job.offset_position
                job_id = last_job.id

        job = db.query(ImportJob).filter(ImportJob.id == job_id).first()
        if not job:
            job = ImportJob(
                id=job_id,
                dataset_id=dataset.id,
                status="running",
                offset_position=offset
            )
            db.add(job)
            db.commit()

        # 3. Stream Records with Loader
        loader = cls.get_loader(file_path)
        stats = ImportStats()

        raw_batch = []
        feedback_batch = []
        mapping_detected = None
        seen_hashes_in_run = set()

        print(f"[ImportManager] Starting ingestion for '{dataset_name}' from {file_name} (offset: {offset}, batch_size: {batch_size})...")

        for raw_item in loader.stream_records(file_path, limit=limit, offset=offset):
            stats.total += 1

            if mapping_detected is None:
                mapping_detected = SchemaDetector.detect_mapping(raw_item.raw_payload, file_name)
                dataset.schema_detected = mapping_detected

            # Normalize
            norm = RecordNormalizer.normalize_record(
                raw_payload=raw_item.raw_payload,
                column_mapping=mapping_detected,
                default_category=category_hint,
                default_brand=brand_hint,
                default_product=product_hint
            )

            # Validation
            v_res = RecordValidator.validate(norm)
            if not v_res.is_valid:
                stats.invalid += 1
                for err in v_res.errors:
                    stats.error_summary[err] = stats.error_summary.get(err, 0) + 1
                continue

            stats.valid += 1

            # If wrapped corpus line, derive specific sub-file product & brand if not set
            if not norm.product_name and "_source_file" in raw_item.raw_payload:
                sub_file = os.path.basename(raw_item.raw_payload["_source_file"])
                sub_stem = os.path.splitext(sub_file)[0]
                norm.product_name = sub_stem
                if not norm.category:
                    norm.category = ProductResolver.infer_category(sub_stem)
                if not norm.brand_name:
                    for b in ["Bosch", "Philips", "Sujata", "Bajaj", "Preethi", "Samsung"]:
                        if b.lower() in sub_stem.lower():
                            norm.brand_name = b
                            break

            # Resolve Entity
            brand_candidate = norm.brand_name or brand_hint or "Generic"
            brand = BrandResolver.resolve_or_create(db, brand_candidate, norm.category or category_hint)

            product_candidate = norm.product_name or product_hint or f"{brand.name} Product"
            product = ProductResolver.resolve_or_create(
                db=db,
                raw_product_name=product_candidate,
                brand=brand,
                model=norm.model,
                asin=norm.asin,
                sku=norm.sku,
                category_hint=norm.category or category_hint,
                price=norm.price
            )

            # Compute Deduplication Hash
            norm_hash = Deduplicator.compute_normalized_hash(
                review_text=norm.review_text,
                product_identity=product.id,
                source_id=source.id
            )
            norm.normalized_hash = norm_hash

            # Deduplication Check
            is_dup, dup_of, dup_conf = Deduplicator.check_duplicate(
                db=db,
                normalized_hash=norm_hash,
                external_review_id=norm.external_review_id,
                source_id=source.id
            )

            if is_dup or norm_hash in seen_hashes_in_run:
                stats.duplicates += 1
                norm.quality_status = "duplicate"
                norm.duplicate_of = dup_of
                norm.duplicate_confidence = dup_conf or 0.99
            else:
                stats.new_records += 1
                seen_hashes_in_run.add(norm_hash)

            # Track distributions
            lang = norm.language or "en"
            stats.language_distribution[lang] = stats.language_distribution.get(lang, 0) + 1
            if norm.rating is not None:
                r_key = str(round(norm.rating, 1))
                stats.rating_distribution[r_key] = stats.rating_distribution.get(r_key, 0) + 1

            # Raw record staging
            raw_rec = RawRecord(
                id=f"raw_{raw_item.raw_hash[:16]}_{raw_item.line_number}",
                dataset_id=dataset.id,
                source_file=raw_item.source_file,
                line_number=raw_item.line_number,
                raw_hash=raw_item.raw_hash,
                raw_payload=raw_item.raw_payload
            )
            raw_batch.append(raw_rec)

            # Feedback model with unique ID
            fb_id = f"fb_{uuid.uuid4().hex[:14]}"
            fb = Feedback(
                id=fb_id,
                product_id=product.id,
                source_id=source.id,
                dataset_id=dataset.id,
                external_review_id=norm.external_review_id,
                review_title=norm.review_title,
                review_text=norm.review_text,
                rating=norm.rating,
                review_date=norm.review_date or datetime.datetime.utcnow(),
                language=norm.language,
                language_confidence=norm.language_confidence,
                location=norm.location,
                country=norm.country,
                state=norm.state,
                city=norm.city,
                product_version=norm.product_version,
                verified_flag=norm.verified_flag,
                helpful_votes=norm.helpful_votes,
                review_url=norm.review_url,
                raw_hash=raw_item.raw_hash,
                normalized_hash=norm_hash,
                quality_status=norm.quality_status,
                duplicate_of=norm.duplicate_of,
                duplicate_confidence=norm.duplicate_confidence
            )
            feedback_batch.append(fb)

            # Bulk commit when batch_size reached
            if len(feedback_batch) >= batch_size:
                cls._flush_batch(db, raw_batch, feedback_batch, job, offset + stats.total)
                raw_batch.clear()
                feedback_batch.clear()
                print(f"  -> Ingested {stats.total} records ({stats.new_records} new, {stats.duplicates} dups, {stats.invalid} invalid)...")

        # Flush remaining
        if feedback_batch:
            cls._flush_batch(db, raw_batch, feedback_batch, job, offset + stats.total)
            raw_batch.clear()
            feedback_batch.clear()

        # Update dataset & job records
        stats.compute_quality_score()
        dataset.record_count = stats.total
        dataset.valid_count = stats.valid
        dataset.invalid_count = stats.invalid
        dataset.duplicate_count = stats.duplicates
        dataset.new_count = stats.new_records
        dataset.quality_score = stats.quality_score
        dataset.status = "completed" if stats.failed == 0 else "completed_with_errors"
        dataset.completed_at = datetime.datetime.utcnow()

        job.status = dataset.status
        job.total_records = stats.total
        job.processed_records = stats.valid
        job.offset_position = offset + stats.total
        job.completed_at = datetime.datetime.utcnow()
        job.error_summary = stats.error_summary

        db.commit()
        print(f"[ImportManager] Ingestion finished for '{dataset_name}': {stats.new_records} new verified records inserted. Quality score: {stats.quality_score}%")
        return stats

    @classmethod
    def _flush_batch(cls, db: Session, raw_batch, feedback_batch, job, current_offset: int):
        try:
            for r in raw_batch:
                db.merge(r)
            db.add_all(feedback_batch)
            job.processed_records = current_offset
            job.offset_position = current_offset
            db.commit()
        except Exception as e:
            db.rollback()
            safe_err = str(e).encode("ascii", errors="replace").decode("ascii")
            print(f"  [-] Batch commit failed: {safe_err}")
            raise e
