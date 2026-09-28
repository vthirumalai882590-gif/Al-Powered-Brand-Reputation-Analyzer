from typing import Dict, List, Any

# Category Aspect Taxonomy and Synonyms
# Supports multi-domain products with specific focus on Indian consumer markets, appliances, beauty, electronics, and apparel.

CATEGORY_ASPECT_MAP: Dict[str, Dict[str, List[str]]] = {
    "Kitchen Appliances": {
        "Motor Power": ["motor", "1000w", "750w", "500w", "power", "watt", "wattage", "horsepower", "powerful", "heavy duty", "torque", "speed", "rpm"],
        "Noise Level": ["noise", "loud", "sound", "noisy", "silent", "quiet", "decibel", "sound level", "buzzing", "vibration", "awaz", "shor"],
        "Jar Quality": ["jar", "jars", "stainless steel", "blade", "blades", "lid", "lids", "coupler", "gasket", "handle", "dome", "locking", "locking mechanism", "leakage", "spill"],
        "Grinding Speed": ["grinding", "grind", "chutney", "masala", "paste", "puree", "dry grinding", "wet grinding", "batter", "smooth", "fine", "crush", "crushing", "blend", "blending"],
        "Overheating & Thermals": ["heating", "heat", "hot", "overheating", "warm", "burning smell", "trip", "overload", "overload protector", "tripping", "reset", "smell"],
        "Build & Durability": ["build", "body", "plastic", "sturdy", "durable", "durability", "sturdiness", "material", "tough", "heavy", "life", "long lasting"],
        "Ease of Cleaning": ["cleaning", "wash", "washing", "easy to clean", "dishwasher", "maintenance", "clean", "hygiene"],
        "Value for Money": ["price", "value", "worth", "cost", "money", "affordable", "expensive", "overpriced", "paisa vasool", "economical", "budget"]
    },
    "Beauty & Personal Care": {
        "Hair Fall Reduction": ["hair fall", "hairfall", "hair loss", "breakage", "fall", "shedding", "thinning", "roots", "follicle"],
        "Hair Growth & Softness": ["hair growth", "growth", "soft", "softness", "silky", "shiny", "shine", "smooth", "volume", "thick", "thickness", "regrowth"],
        "Fragrance & Smell": ["fragrance", "smell", "scent", "odor", "perfume", "aroma", "onion smell", "mild", "strong smell", "khushbu"],
        "Texture & Stickiness": ["sticky", "non-sticky", "greasy", "non-greasy", "lightweight", "heavy", "oiliness", "absorption", "absorbing", "chipchipa"],
        "Scalp Health & Dandruff": ["scalp", "dandruff", "itching", "itchy", "flaking", "irritation", "soothing", "nourishing", "nourishment"],
        "Packaging & Leakage": ["bottle", "pump", "cap", "packaging", "leaking", "leakage", "spill", "broken bottle", "seal", "dispenser"],
        "Ingredients & Natural": ["natural", "organic", "chemical free", "sulfate free", "paraben free", "pure", "onion oil", "redensyl", "bhringraj"],
        "Value for Money": ["price", "value", "worth", "cost", "expensive", "affordable", "paisa vasool", "quantity", "ml"]
    },
    "Beauty products": {
        "Skin & Hair Results": ["glow", "result", "effective", "skin", "hair", "complexion", "radiance", "improvement", "change", "visible"],
        "Fragrance & Scent": ["fragrance", "smell", "scent", "odor", "aroma", "perfume", "khushbu"],
        "Texture & Application": ["texture", "smooth", "sticky", "greasy", "light", "application", "absorption", "absorbing"],
        "Packaging & Design": ["bottle", "tube", "jar", "packaging", "dispenser", "seal", "cap", "box"],
        "Gentleness & Safety": ["gentle", "irritation", "rash", "allergy", "safe", "burning", "redness", "breakout", "pimples"],
        "Value for Money": ["price", "worth", "cost", "expensive", "cheap", "value", "quantity", "paisa vasool"]
    },
    "Smartphone": {
        "Battery Life": ["battery", "backup", "screen on time", "drain", "mah", "endurance", "discharge", "idle drain"],
        "Camera Quality": ["camera", "photo", "photos", "picture", "pictures", "video", "sensor", "lens", "night mode", "portrait", "selfie", "megapixel", "mp"],
        "Performance & Speed": ["performance", "speed", "processor", "chipset", "ram", "lag", "hang", "smooth", "gaming", "fast", "multitasking", "fps"],
        "Display & Screen": ["display", "screen", "amoled", "oled", "120hz", "refresh rate", "brightness", "nits", "resolution", "colors", "viewing angle"],
        "Heating & Thermals": ["heating", "hot", "overheating", "warm", "cooling", "thermal", "temperature", "throttling"],
        "Charging Speed": ["charging", "charger", "fast charging", "watt", "type c", "minutes", "adapter"],
        "Build & Design": ["build", "design", "look", "in hand feel", "glass", "plastic", "frame", "weight", "slim", "premium"],
        "Software & UI": ["software", "ui", "os", "android", "ios", "update", "bloatware", "ads", "bugs", "glitches"],
        "Value for Money": ["price", "value", "cost", "budget", "worth", "expensive", "affordable", "paisa vasool"]
    },
    "Headphones": {
        "Sound Quality & Bass": ["sound", "audio", "bass", "clarity", "treble", "vocals", "loudness", "crisp", "eq", "music"],
        "Noise Cancellation (ANC)": ["anc", "noise cancellation", "noise cancelling", "ambient", "transparency", "isolation"],
        "Battery Life": ["battery", "playtime", "charging", "backup", "case battery", "hours"],
        "Comfort & Fit": ["comfort", "fit", "ear tips", "cushion", "lightweight", "ear pain", "comfortable", "wearing"],
        "Build & Durability": ["build", "durability", "hinge", "case", "material", "water resistant", "ipx"],
        "Microphone & Call Quality": ["mic", "microphone", "call", "calls", "voice", "call quality"],
        "Connectivity & Latency": ["bluetooth", "pairing", "range", "connection", "latency", "drop", "codec", "lag"],
        "Value for Money": ["price", "worth", "value", "cost", "affordable", "budget", "paisa vasool"]
    },
    "Laptop": {
        "Performance & Speed": ["performance", "cpu", "processor", "ram", "ssd", "speed", "gaming", "rendering", "fast", "lag"],
        "Battery Life": ["battery", "backup", "charging", "hours", "drain", "power brick"],
        "Display Quality": ["display", "screen", "colors", "brightness", "panel", "resolution", "ips", "oled", "matte"],
        "Thermals & Fan Noise": ["heating", "fan", "fan noise", "cooling", "thermal", "hot", "throttling", "loud fan"],
        "Keyboard & Trackpad": ["keyboard", "keys", "typing", "trackpad", "touchpad", "backlit", "travel"],
        "Build & Portability": ["build", "chassis", "weight", "portable", "lightweight", "metal", "hinge", "durability"],
        "Value for Money": ["price", "worth", "cost", "expensive", "affordable", "value"]
    },
    "Shoes": {
        "Comfort & Cushioning": ["comfort", "cushion", "cushioning", "soft", "comfortable", "sole", "insole", "pain", "walking", "running"],
        "Size & Fit": ["fit", "size", "sizing", "tight", "loose", "wide", "narrow", "true to size"],
        "Durability & Build": ["durability", "material", "stitching", "quality", "torn", "damage", "wear and tear", "long lasting"],
        "Sole Grip & Traction": ["grip", "traction", "slipping", "skid", "non-slip", "rubber sole", "tread"],
        "Design & Appearance": ["look", "looks", "design", "style", "color", "appearance", "stylish"],
        "Value for Money": ["price", "worth", "cost", "value", "affordable", "cheap", "expensive", "paisa vasool"]
    },
    "Restaurant": {
        "Food Quality & Taste": ["food", "taste", "delicious", "flavor", "fresh", "spicy", "quality", "dish", "yummy"],
        "Service & Staff": ["service", "staff", "waiter", "courteous", "polite", "rude", "attentive", "hospitality"],
        "Hygiene & Cleanliness": ["hygiene", "clean", "cleanliness", "sanitary", "dirty", "pest"],
        "Ambience & Atmosphere": ["ambience", "atmosphere", "vibe", "seating", "music", "lighting", "interior"],
        "Value for Money": ["price", "bill", "expensive", "overpriced", "worth", "portion", "quantity"]
    },
    "Online Course": {
        "Content & Curriculum": ["content", "syllabus", "curriculum", "topics", "depth", "materials", "structure"],
        "Teaching & Instructor": ["instructor", "teacher", "teaching", "explanation", "clarity", "lecture", "faculty"],
        "Practical Projects": ["projects", "hands on", "practical", "assignments", "exercises", "real world"],
        "Support & Mentorship": ["support", "doubt", "mentor", "mentorship", "community", "q&a", "help"],
        "Value for Money": ["price", "fee", "cost", "worth", "investment", "certificate", "placement"]
    },
    "SaaS Product": {
        "Features & Usability": ["features", "ui", "ux", "intuitive", "easy to use", "dashboard", "functionality"],
        "Performance & Reliability": ["performance", "speed", "uptime", "downtime", "crash", "bugs", "glitches", "sync"],
        "Integrations": ["integration", "api", "webhooks", "connectors", "slack", "zapier", "export"],
        "Customer Support": ["support", "ticket", "response time", "help desk", "docs", "documentation"],
        "Pricing & ROI": ["price", "pricing", "subscription", "cost", "tier", "plan", "roi", "value"]
    },
    "EV Scooter": {
        "Range & Mileage": ["range", "mileage", "km", "distance", "battery range", "eco mode"],
        "Battery & Charging": ["battery", "charging", "charging time", "charger", "swappable", "drain"],
        "Build & Suspension": ["build", "suspension", "brakes", "chassis", "potholes", "vibration", "durability"],
        "Speed & Acceleration": ["speed", "acceleration", "pickup", "top speed", "motor", "climbing", "slope"],
        "Service & Network": ["service", "service center", "maintenance", "spare parts", "roadside assistance"],
        "Value for Money": ["price", "on road price", "subsidy", "worth", "running cost"]
    },
    "Food Delivery": {
        "Delivery Speed": ["delivery", "delivery time", "fast delivery", "delayed", "late", "eta"],
        "Packaging & Spillage": ["packaging", "packing", "spill", "leak", "intact", "sealed", "spillage"],
        "Food Freshness & Temp": ["hot", "cold", "fresh", "stale", "temperature", "freshness"],
        "Delivery Partner": ["delivery guy", "driver", "rider", "behavior", "polite", "rude", "contactless"],
        "Pricing & Fees": ["delivery fee", "charges", "price", "discounts", "surge", "coupon"]
    },
    "Hotels": {
        "Room Cleanliness": ["room", "clean", "bed", "bathroom", "linen", "sheets", "smell", "hygiene"],
        "Staff & Hospitality": ["staff", "reception", "service", "hospitality", "check in", "check out", "behavior"],
        "Location & Accessibility": ["location", "view", "accessible", "near", "beach", "city center"],
        "Amenities & Facilities": ["wifi", "pool", "breakfast", "gym", "air conditioning", "ac", "geyser"],
        "Value for Money": ["tariff", "price", "worth", "cost", "expensive", "affordable"]
    },
    "Financial services": {
        "Customer Support": ["support", "customer care", "helpline", "query", "resolution", "staff"],
        "App Experience & UI": ["app", "ui", "login", "otp", "statement", "crash", "smooth"],
        "Transaction Speed": ["transfer", "speed", "instant", "processing", "delayed", "failed"],
        "Transparency & Charges": ["charges", "fees", "hidden fees", "interest", "penalty", "transparent"],
        "Reliability & Security": ["security", "safety", "trust", "scam", "fraud", "reliable"]
    }
}

DEFAULT_ASPECTS: Dict[str, List[str]] = {
    "Product Quality": ["quality", "build", "material", "finish", "reliable", "sturdy", "durable"],
    "Value for Money": ["price", "worth", "cost", "value", "money", "affordable", "expensive", "paisa vasool"],
    "Customer Support": ["support", "service", "customer care", "help", "warranty", "replacement"],
    "Delivery & Packaging": ["delivery", "shipping", "packaging", "packed", "box", "damaged", "fast delivery"],
    "Ease of Use": ["easy", "simple", "convenient", "usable", "setup", "instructions", "user friendly"]
}

def get_aspect_taxonomy(category: str) -> Dict[str, List[str]]:
    """
    Returns the dictionary of aspects and their keyword triggers for a given category.
    """
    if not category:
        return DEFAULT_ASPECTS
    
    # Check exact match
    if category in CATEGORY_ASPECT_MAP:
        return CATEGORY_ASPECT_MAP[category]
    
    # Check case-insensitive match
    for cat_name, aspects in CATEGORY_ASPECT_MAP.items():
        if cat_name.lower() == category.lower():
            return aspects
        
    # Check partial match (e.g. "Mixer Grinder" -> "Kitchen Appliances", "Phone" -> "Smartphone")
    cat_lower = category.lower()
    if any(k in cat_lower for k in ["kitchen", "appliance", "mixer", "grinder", "juicer", "blender", "cookware"]):
        return CATEGORY_ASPECT_MAP["Kitchen Appliances"]
    if any(k in cat_lower for k in ["beauty", "personal care", "hair", "skin", "oil", "shampoo", "cosmetic"]):
        return CATEGORY_ASPECT_MAP["Beauty & Personal Care"]
    if any(k in cat_lower for k in ["phone", "mobile", "smartphone", "cellular"]):
        return CATEGORY_ASPECT_MAP["Smartphone"]
    if any(k in cat_lower for k in ["audio", "headphone", "earphone", "earbuds", "tws", "speaker"]):
        return CATEGORY_ASPECT_MAP["Headphones"]
    if any(k in cat_lower for k in ["laptop", "computer", "pc", "notebook"]):
        return CATEGORY_ASPECT_MAP["Laptop"]
    if any(k in cat_lower for k in ["shoe", "footwear", "sneaker", "boot", "sandal"]):
        return CATEGORY_ASPECT_MAP["Shoes"]
    if any(k in cat_lower for k in ["restaurant", "cafe", "dining", "eatery"]):
        return CATEGORY_ASPECT_MAP["Restaurant"]
    if any(k in cat_lower for k in ["hotel", "resort", "stay", "lodge"]):
        return CATEGORY_ASPECT_MAP["Hotels"]
    
    return DEFAULT_ASPECTS

def get_aspect_names_for_category(category: str) -> List[str]:
    """
    Returns list of aspect names for a given category.
    """
    return list(get_aspect_taxonomy(category).keys())
