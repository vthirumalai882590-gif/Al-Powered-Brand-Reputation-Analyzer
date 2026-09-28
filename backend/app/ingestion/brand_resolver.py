import re
import uuid
from typing import Optional, Dict
from sqlalchemy.orm import Session
from app.models.brand import Brand

BRAND_ALIASES_MAP: Dict[str, str] = {
    # Brand aliases -> Canonical Brand Name
    "samsung india": "Samsung",
    "samsung electronics": "Samsung",
    "samsung": "Samsung",
    "bosch india": "Bosch",
    "bosch home appliances": "Bosch",
    "bosch": "Bosch",
    "philips india": "Philips",
    "philips domestic appliances": "Philips",
    "philips": "Philips",
    "sujata dynamix": "Sujata",
    "sujata appliances": "Sujata",
    "sujata": "Sujata",
    "bajaj electricals": "Bajaj",
    "bajaj": "Bajaj",
    "preeti": "Preethi",
    "preethi kitchen appliances": "Preethi",
    "preethi": "Preethi",
    "boat lifestyle": "boAt",
    "boat": "boAt",
    "apple india": "Apple",
    "apple": "Apple",
    "xiaomi india": "Xiaomi",
    "xiaomi": "Xiaomi",
    "redmi": "Redmi",
    "oneplus india": "OnePlus",
    "oneplus": "OnePlus",
    "sony india": "Sony",
    "sony": "Sony",
    "lenovo india": "Lenovo",
    "lenovo": "Lenovo",
    "amazfit": "Amazfit",
    "mamaearth": "Mamaearth",
    "realme": "Realme",
    "motorola": "Motorola",
    "vivo": "Vivo",
    "oppo": "Oppo",
    "iqoo": "iQOO",
    "poco": "POCO",
    "asus": "ASUS",
    "dell": "Dell",
    "hp": "HP",
    "acer": "Acer"
}

BRAND_CATEGORY_HINTS: Dict[str, str] = {
    "Bosch": "Kitchen Appliances",
    "Philips": "Kitchen Appliances",
    "Sujata": "Kitchen Appliances",
    "Bajaj": "Kitchen Appliances",
    "Preethi": "Kitchen Appliances",
    "boAt": "Headphones",
    "Amazfit": "Smartwatch",
    "Mamaearth": "Beauty & Personal Care",
    "Apple": "Smartphone",
    "Samsung": "Smartphone",
    "Xiaomi": "Smartphone",
    "Redmi": "Smartphone",
    "OnePlus": "Smartphone",
    "Realme": "Smartphone",
    "Motorola": "Smartphone",
    "Vivo": "Smartphone",
    "Oppo": "Smartphone",
    "iQOO": "Smartphone",
    "POCO": "Smartphone",
    "Sony": "Smart TV",
    "Lenovo": "Laptop",
    "Dell": "Laptop",
    "HP": "Laptop",
    "ASUS": "Laptop",
    "Acer": "Laptop"
}

class BrandResolver:
    """
    Normalizes brand names, resolves against existing database brands using aliases,
    or creates cleanly structured brand records.
    """

    @classmethod
    def normalize_brand_name(cls, raw_brand: str) -> str:
        if not raw_brand:
            return "Generic"
        cleaned = re.sub(r"[^\w\s-]", "", raw_brand).strip()
        cleaned_lower = cleaned.lower()
        return BRAND_ALIASES_MAP.get(cleaned_lower, cleaned.title())

    @classmethod
    def resolve_or_create(cls, db: Session, raw_brand: str, category_hint: Optional[str] = None) -> Brand:
        canonical_name = cls.normalize_brand_name(raw_brand)
        normalized_key = canonical_name.lower().strip()

        # 1. Check existing brand by normalized_name
        brand = db.query(Brand).filter(Brand.normalized_name == normalized_key).first()
        if brand:
            return brand

        # 2. Check existing brand by exact name
        brand = db.query(Brand).filter(Brand.name.ilike(canonical_name)).first()
        if brand:
            return brand

        # 3. Create new Brand
        category = category_hint or BRAND_CATEGORY_HINTS.get(canonical_name, "Consumer Products")
        brand_id = f"brd_{normalized_key.replace(' ', '_')[:16]}"

        brand = Brand(
            id=brand_id,
            name=canonical_name,
            normalized_name=normalized_key,
            category=category,
            country="IN",
            verification_status="verified",
            description=f"Official {canonical_name} Brand Registry"
        )
        db.add(brand)
        db.flush()
        return brand
