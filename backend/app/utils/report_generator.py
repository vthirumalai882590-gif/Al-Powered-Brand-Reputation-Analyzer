import os
import json
import csv
from typing import Dict, Any

def generate_json_report(data: Dict[str, Any], output_path: str):
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    return output_path

def generate_csv_report(rows: list, output_path: str):
    if not rows:
        return output_path
    keys = rows[0].keys()
    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(rows)
    return output_path
