import re
import uuid
from typing import Optional, Dict, Any, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.product import Product
from app.models.brand import Brand
from app.ingestion.brand_resolver import BrandResolver

CATEGORY_RULES = [
    (r"\b(?:mixer|grinder|blender|juicer|food processor|truemixx|dynamix|blueleaf|zodiac|hl7756|poundingblade)\b", "Kitchen Appliances"),
    (r"\b(?:smartphone|phone|mobile|galaxy m|galaxy s|galaxy a|iphone|redmi|oneplus|pixel|iqoo|poco|realme)\b", "Smartphone"),
    (r"\b(?:laptop|notebook|thinkpad|zenbook|macbook|chromebook|intel core|ryzen 5|ryzen 7|workstation)\b", "Laptop"),
    (r"\b(?:smartwatch|watch|fitness band|tracker|amazfit balance|bip max)\b", "Smartwatch"),
    (r"\b(?:headphone|earphone|earbuds|tws|neckband|airpods|noise cancelling|soundpulse)\b", "Headphones"),
    (r"\b(?:smart tv|television|bravia|oled tv|qled tv|mini led tv|4k google tv)\b", "Smart TV"),
    (r"\b(?:hair oil|shampoo|serum|sunscreen|face wash|lotion|conditioner|redensyl)\b", "Beauty & Personal Care"),
    (r"\b(?:shoes|sneakers|running shoes|loafers|boots)\b", "Shoes")
]

class ProductResolver:
    """
    Resolves product records using ASIN, model, normalized name, or brand linkage.
    Infers real category and generates human-readable normalized names without fake Smartphone fallbacks.
    """

    @classmethod
    def infer_category(cls, text: str, default: Optional[str] = None) -> str:
        if default and default != "Generic" and default != "Consumer Products":
            return default
        text_lower = text.lower()
        for pattern, cat in CATEGORY_RULES:
            if re.search(pattern, text_lower):
                return cat
        return default or "Consumer Electronics"

    @classmethod
    def clean_product_name(cls, raw_name: str) -> str:
        s = raw_name.strip()
        # Clean leading dashes or garbage
        s = re.sub(r"^[-\s]+", "", s)
        # Remove trailing parentheses with ASIN or duplicate codes
        s = re.sub(r"\s*\([A-Z0-9]{10}\)$", "", s)
        return s

    @classmethod
    def resolve_or_create(
        cls,
        db: Session,
        raw_product_name: str,
        brand: Brand,
        model: Optional[str] = None,
        asin: Optional[str] = None,
        sku: Optional[str] = None,
        category_hint: Optional[str] = None,
        price: Optional[float] = None
    ) -> Product:
        clean_name = cls.clean_product_name(raw_product_name)
        normalized_name = clean_name.lower().strip()
        category = cls.infer_category(f"{clean_name} {model or ''}", category_hint or brand.category)

        # 1. Lookup by ASIN if present
        if asin and asin.strip():
            asin_clean = asin.strip()
            prod_asin = db.query(Product).filter(Product.asin == asin_clean).first()
            if prod_asin:
                return prod_asin

        # 2. Lookup by exact normalized name and brand_id
        prod = db.query(Product).filter(
            Product.brand_id == brand.id,
            Product.normalized_name == normalized_name
        ).first()
        if prod:
            return prod

        # 3. Lookup by model name and brand_id
        if model and len(model.strip()) > 2:
            model_norm = model.lower().strip()
            prod_model = db.query(Product).filter(
                Product.brand_id == brand.id,
                Product.normalized_model == model_norm
            ).first()
            if prod_model:
                return prod_model

        # 4. Lookup by fuzzy name match in same brand
        prod_fuzzy = db.query(Product).filter(
            Product.brand_id == brand.id,
            Product.name.ilike(f"%{clean_name[:24]}%")
        ).first()
        if prod_fuzzy:
            return prod_fuzzy

        # 5. Create new Product with realistic attributes
        # Deterministic product ID from name and brand
        safe_slug = re.sub(r"[^\w]+", "_", clean_name.lower())[:24].strip("_")
        prod_id = f"prd_{brand.id[4:8]}_{safe_slug}"

        # If ID collision, ensure uniqueness
        collision = db.query(Product).filter(Product.id == prod_id).first()
        if collision:
            prod_id = f"{prod_id}_{uuid.uuid4().hex[:4]}"

        new_product = Product(
            id=prod_id,
            brand_id=brand.id,
            name=clean_name,
            normalized_name=normalized_name,
            category=category,
            model=model,
            normalized_model=model.lower().strip() if model else None,
            asin=asin.strip() if asin else None,
            sku=sku.strip() if sku else None,
            price=price,
            currency="INR",
            country="IN",
            market="IN",
            description=f"{clean_name} by {brand.name} ({category})",
            status="active"
        )
        db.add(new_product)
        db.flush()
        return new_product
