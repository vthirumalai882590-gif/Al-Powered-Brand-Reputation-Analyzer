import datetime
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.source import Source
from app.models.dataset import Dataset

class ProvenanceManager:
    """
    Manages source and dataset provenance records and attaches lineage metadata.
    """

    @classmethod
    def get_or_create_source(
        cls,
        db: Session,
        source_id: str,
        name: str,
        source_type: str = "kaggle",
        source_url: Optional[str] = None,
        dataset_name: Optional[str] = None,
        reliability_level: float = 0.95,
        license: Optional[str] = "Open Dataset / Research",
        country: str = "IN"
    ) -> Source:
        source = db.query(Source).filter(Source.id == source_id).first()
        if not source:
            source = Source(
                id=source_id,
                name=name,
                source_type=source_type,
                source_url=source_url,
                dataset_name=dataset_name,
                license=license,
                attribution=f"Ingested from {name}",
                reliability_level=reliability_level,
                country=country,
                market="IN",
                last_synced_at=datetime.datetime.utcnow()
            )
            db.add(source)
            db.flush()
        return source

    @classmethod
    def register_dataset(
        cls,
        db: Session,
        dataset_id: str,
        source_id: str,
        dataset_name: str,
        file_name: str,
        file_hash: str,
        configuration: Optional[Dict[str, Any]] = None
    ) -> Dataset:
        dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
        if not dataset:
            dataset = Dataset(
                id=dataset_id,
                source_id=source_id,
                dataset_name=dataset_name,
                file_name=file_name,
                file_hash=file_hash,
                status="running",
                started_at=datetime.datetime.utcnow(),
                configuration=configuration or {}
            )
            db.add(dataset)
            db.flush()
        return dataset
