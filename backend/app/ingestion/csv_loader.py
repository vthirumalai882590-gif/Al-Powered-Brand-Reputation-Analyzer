import csv
import os
from typing import Generator, Optional
from app.ingestion.base import BaseLoader, RawRecordData

class CSVLoader(BaseLoader):
    """
    Streams CSV records safely row-by-row with robust encoding fallback
    (handles UTF-8, UTF-8-BOM, CP1252/Latin-1 containing Rupee symbol ₹).
    """

    ENCODINGS = ["utf-8-sig", "utf-8", "latin-1", "cp1252"]

    def _open_file(self, file_path: str):
        for enc in self.ENCODINGS:
            try:
                # Test opening and reading first chunk
                with open(file_path, "r", encoding=enc, errors="strict") as test_f:
                    test_f.read(4096)
                # If succeeded, return opened file with replace errors for safety
                return open(file_path, "r", encoding=enc, errors="replace")
            except (UnicodeDecodeError, LookupError):
                continue
        # Fallback to UTF-8 with replace
        return open(file_path, "r", encoding="utf-8", errors="replace")

    def stream_records(self, file_path: str, limit: Optional[int] = None, offset: int = 0) -> Generator[RawRecordData, None, None]:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"CSV file not found: {file_path}")

        f = self._open_file(file_path)
        try:
            reader = csv.DictReader(f)
            count = 0
            for idx, row in enumerate(reader, start=1):
                if idx <= offset:
                    continue
                if limit and count >= limit:
                    break

                # Strip whitespace and null strings from keys & values
                cleaned_row = {
                    (k.strip() if isinstance(k, str) else k): (v.strip() if isinstance(v, str) else v)
                    for k, v in row.items() if k is not None
                }

                yield RawRecordData.create(
                    source_file=file_path,
                    line_number=idx,
                    payload=cleaned_row
                )
                count += 1
        finally:
            f.close()

    def count_records(self, file_path: str) -> int:
        f = self._open_file(file_path)
        try:
            # Count lines minus header
            cnt = sum(1 for _ in f) - 1
            return max(0, cnt)
        finally:
            f.close()
