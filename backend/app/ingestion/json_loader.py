import json
import os
from typing import Generator, Optional
from app.ingestion.base import BaseLoader, RawRecordData

class JSONLoader(BaseLoader):
    """
    Loads JSON records from array or dict format.
    """

    def stream_records(self, file_path: str, limit: Optional[int] = None, offset: int = 0) -> Generator[RawRecordData, None, None]:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"JSON file not found: {file_path}")

        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            data = json.load(f)

        records = data if isinstance(data, list) else [data]

        count = 0
        for idx, item in enumerate(records, start=1):
            if idx <= offset:
                continue
            if limit and count >= limit:
                break

            if isinstance(item, dict):
                yield RawRecordData.create(
                    source_file=file_path,
                    line_number=idx,
                    payload=item
                )
                count += 1

    def count_records(self, file_path: str) -> int:
        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            data = json.load(f)
        return len(data) if isinstance(data, list) else 1
