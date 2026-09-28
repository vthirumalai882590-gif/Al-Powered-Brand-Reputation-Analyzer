import json
import os
from typing import Generator, Optional
from app.ingestion.base import BaseLoader, RawRecordData

class JSONLLoader(BaseLoader):
    """
    Streams large JSON Lines (JSONL) files line-by-line without loading into memory.
    Handles nested payload formats (such as brandpulse_full_corpus fields wrapper).
    """

    def stream_records(self, file_path: str, limit: Optional[int] = None, offset: int = 0) -> Generator[RawRecordData, None, None]:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"JSONL file not found: {file_path}")

        count = 0
        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            for idx, line in enumerate(f, start=1):
                if idx <= offset:
                    continue
                if limit and count >= limit:
                    break

                line_str = line.strip()
                if not line_str:
                    continue

                try:
                    data = json.loads(line_str)
                except Exception:
                    continue

                # If wrapped inside corpus schema e.g. {"fields": {...}, "source_file": "..."}
                payload = data
                if isinstance(data, dict):
                    if "fields" in data and isinstance(data["fields"], dict):
                        payload = dict(data["fields"])
                        # carry over top-level metadata if present
                        if "source_file" in data:
                            payload["_source_file"] = data["source_file"]
                        if "record_type" in data:
                            payload["_record_type"] = data["record_type"]

                yield RawRecordData.create(
                    source_file=file_path,
                    line_number=idx,
                    payload=payload
                )
                count += 1

    def count_records(self, file_path: str) -> int:
        count = 0
        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            for line in f:
                if line.strip():
                    count += 1
        return count
