import datetime
import uuid
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.brand import Brand
from app.models.product import Product
from app.models.source import Source
from app.models.feedback import Feedback
from app.models.ai_analysis import AIAnalysis
from app.models.reputation_snapshot import ReputationSnapshot
from app.models.issue import Issue
from app.models.improvement_action import ImprovementAction
from app.security.auth import get_password_hash
from app.ai.pipeline import run_full_ai_pipeline

def seed_demo_data(db: Session):
    # Check if admin user already exists
    admin_user = db.query(User).filter(User.id == "usr_admin_001").first()
    if not admin_user:
        print("[BrandPulse Seed] Creating system default users...")
        admin_user = User(
            id="usr_admin_001",
            name="System Administrator",
            email="admin@brandpulse.ai",
            password_hash=get_password_hash("admin123"),
            role="admin"
        )
        owner_user = User(
            id="usr_owner_001",
            name="Sarah Jenkins (Brand Owner)",
            email="owner@brandpulse.ai",
            password_hash=get_password_hash("owner123"),
            role="owner"
        )
        customer_user = User(
            id="usr_customer_001",
            name="Alex Rivera (Customer)",
            email="customer@brandpulse.ai",
            password_hash=get_password_hash("customer123"),
            role="customer"
        )
        db.add_all([admin_user, owner_user, customer_user])
        db.commit()
    else:
        owner_user = db.query(User).filter(User.id == "usr_owner_001").first()

    # Source setup
    demo_source = db.query(Source).filter(Source.id == "src_demo_001").first()
    if not demo_source:
        demo_source = Source(
            id="src_demo_001",
            name="Verified Customer Reviews",
            source_type="demo",
            source_url="https://brandpulse.ai/demo",
            reliability_level=0.98
        )
        db.add(demo_source)
        db.commit()

    # Check if products already seeded
    if db.query(Product).count() >= 10:
        print("[BrandPulse Seed] Dataset already seeded with extensive catalog.")
        return

    print("[BrandPulse Seed] Initializing realistic multi-category dataset across 12 product verticals...")

    # Expanded Multi-Category Dataset with Indian Focus & INR Prices
    categories_data = [
        {
            "brand": {"id": "brd_001", "name": "Apex Mobile", "category": "Smartphone", "website": "https://apexmobile.in"},
            "product": {
                "id": "prd_001", "name": "Apex Phone Pro X (India Edition)", "category": "Smartphone", "model": "Pro X",
                "version": "v2.1", "price": 69999.00,
                "description": "Flagship smartphone featuring AMOLED 120Hz display, Sony IMX camera, 5000mAh battery, and 5G band support for India.",
                "features": {"RAM": "12GB", "Storage": "256GB", "Screen": "6.7 inch AMOLED", "5G": "13 Bands"}
            },
            "reviews": [
                {"text": "The camera quality and AMOLED display are absolutely phenomenal! Crisp low-light photos in Bengaluru evening lights.", "rating": 5.0, "v": "v2.1", "loc": "Bengaluru, India"},
                {"text": "Battery drain increased significantly during heavy 5G gaming in hot Delhi summer. Phone heats up during 4K video recording.", "rating": 2.0, "v": "v2.1", "loc": "Delhi, India"},
                {"text": "Extremely fast 80W charging. Full charge in under 30 minutes! Worth every rupee spent.", "rating": 5.0, "v": "v2.0", "loc": "Mumbai, India"},
                {"text": "Heating issue during heavy BGMI gaming sessions. Battery lasts only 4 hours under heavy load.", "rating": 3.0, "v": "v2.1", "loc": "Hyderabad, India"},
                {"text": "Superb amazing product five stars best phone ever buy now fast delivery Amazon India!", "rating": 5.0, "v": "v2.1", "loc": "Pune, India"} # Suspicious review pattern
            ]
        },
        {
            "brand": {"id": "brd_002", "name": "Zenith Tech", "category": "Laptop", "website": "https://zenithtech.in"},
            "product": {
                "id": "prd_002", "name": "ZenithBook Ultra 15 Pro", "category": "Laptop", "model": "Ultra 15",
                "version": "v1.2", "price": 114990.00,
                "description": "Ultra-thin workstation laptop with 16-core CPU, high refresh screen, and lightweight aluminum unibody.",
                "features": {"Processor": "Intel i9 / M3 equivalent", "RAM": "32GB", "Weight": "1.4kg"}
            },
            "reviews": [
                {"text": "Keyboard action and trackpad responsiveness are elite. Ideal machine for Indian software engineers and developers.", "rating": 5.0, "v": "v1.2", "loc": "Bengaluru, India"},
                {"text": "Fan noise becomes loud during heavy Docker and PyTorch compiles, but thermals remain manageable.", "rating": 4.0, "v": "v1.2", "loc": "Chennai, India"},
                {"text": "Battery life easily gives 11 hours of real coding work. Lightweight for daily commute in Mumbai local.", "rating": 5.0, "v": "v1.1", "loc": "Mumbai, India"}
            ]
        },
        {
            "brand": {"id": "brd_003", "name": "boAt / SoundPulse", "category": "Headphones", "website": "https://soundpulse.in"},
            "product": {
                "id": "prd_003", "name": "SoundPulse NoiseCancel 700 ANC", "category": "Headphones", "model": "NC700",
                "version": "v1.0", "price": 8999.00,
                "description": "Active noise canceling wireless over-ear headphones with 40-hour battery life and heavy bass tuning.",
                "features": {"ANC": "32dB Active Noise Cancellation", "Battery": "40h", "Bluetooth": "5.3"}
            },
            "reviews": [
                {"text": "Noise cancellation in traffic and Metro commutes is outstanding. Deep punchy bass.", "rating": 5.0, "v": "v1.0", "loc": "Delhi NCR, India"},
                {"text": "Bluetooth connectivity occasionally stutters when switching between laptop and Android phone.", "rating": 3.0, "v": "v1.0", "loc": "Bengaluru, India"}
            ]
        },
        {
            "brand": {"id": "brd_004", "name": "Campus / StrideFootwear", "category": "Shoes", "website": "https://stride.in"},
            "product": {
                "id": "prd_004", "name": "UltraStride Comfort Runner India", "category": "Shoes", "model": "Comfort 2026",
                "version": "v1.0", "price": 3499.00,
                "description": "Ergonomic running shoes with memory foam arch support and breathable mesh for Indian road conditions.",
                "features": {"Sole": "Anti-Skid Rubber Grip", "Upper": "Knit Mesh", "Weight": "240g"}
            },
            "reviews": [
                {"text": "Maximum cushion comfort for morning walks and marathon training in Cubbon Park.", "rating": 5.0, "v": "v1.0", "loc": "Bengaluru, India"},
                {"text": "Sole grip wore down slightly after 400 km of road running on monsoon asphalt.", "rating": 3.0, "v": "v1.0", "loc": "Kolkata, India"}
            ]
        },
        {
            "brand": {"id": "brd_005", "name": "LearnTech India", "category": "Online Course", "website": "https://learntech.in"},
            "product": {
                "id": "prd_005", "name": "Full-Stack AI & GenAI Masterclass", "category": "Online Course", "model": "2026 Batch",
                "version": "v3.0", "price": 14999.00,
                "description": "Comprehensive engineering program covering LLMs, LangChain, FastAPI, React, and Catalyst Cloud.",
                "features": {"Duration": "12 Weeks", "Projects": "5 Live Capstones", "Certificate": "Industry Verified"}
            },
            "reviews": [
                {"text": "Teaching quality in Hindi and English is top-notch. Placement support and mock interviews helped a lot!", "rating": 5.0, "v": "v3.0", "loc": "Hyderabad, India"},
                {"text": "Curriculum structure is clear, though module on Vector DBs required extra practice sessions.", "rating": 4.0, "v": "v3.0", "loc": "Pune, India"}
            ]
        },
        {
            "brand": {"id": "brd_006", "name": "MTR / Gourmet Hospitality", "category": "Restaurant", "website": "https://gourmetbistro.in"},
            "product": {
                "id": "prd_006", "name": "Gourmet Bistro Indiranagar", "category": "Restaurant", "model": "Fine Dining",
                "version": "v1.0", "price": 1800.00,
                "description": "Modern fusion restaurant offering authentic regional Indian appetizers and continental dining.",
                "features": {"Cuisine": "Indian Fusion & Continental", "Seating": "Rooftop & AC Dining"}
            },
            "reviews": [
                {"text": "Paneer tikka and mocktails were divine! Staff hospitality was exceptionally polite and fast.", "rating": 5.0, "v": "v1.0", "loc": "Bengaluru, India"},
                {"text": "Weekend waiting time for table exceeded 45 mins even with prior online reservation.", "rating": 3.0, "v": "v1.0", "loc": "Bengaluru, India"}
            ]
        },
        {
            "brand": {"id": "brd_007", "name": "CloudPulse Systems", "category": "SaaS Product", "website": "https://cloudpulse.in"},
            "product": {
                "id": "prd_007", "name": "CloudPulse Analytics India Enterprise", "category": "SaaS Product", "model": "Enterprise",
                "version": "v4.1", "price": 15999.00,
                "description": "Real-time GST compliance, cloud infrastructure monitoring, and automated alerting dashboard.",
                "features": {"Uptime SLA": "99.99%", "Integrations": "WhatsApp API, Slack, Tally"}
            },
            "reviews": [
                {"text": "Automated GST report generation and WhatsApp alert triggers saved our finance team endless hours.", "rating": 5.0, "v": "v4.1", "loc": "Ahmedabad, India"},
                {"text": "Dashboard setup for custom microservices metrics takes a few hours of configuration.", "rating": 3.0, "v": "v4.0", "loc": "Gurugram, India"}
            ]
        },
        {
            "brand": {"id": "brd_008", "name": "Mamaearth / AuraBeauty", "category": "Beauty products", "website": "https://aurabeauty.in"},
            "product": {
                "id": "prd_008", "name": "GlowRadiance Vitamin C + Turmeric Serum", "category": "Beauty products", "model": "Serum 30ml",
                "version": "v1.0", "price": 699.00,
                "description": "Dermatologist-tested natural skin brightening serum formulated with Vitamin C, Niacinamide, and Turmeric.",
                "features": {"Volume": "30ml", "Active": "10% Vitamin C + Niacinamide + Turmeric"}
            },
            "reviews": [
                {"text": "Reduced sun tan and acne spots within 3 weeks of daily use. Non-sticky and absorbs fast.", "rating": 5.0, "v": "v1.0", "loc": "Jaipur, India"},
                {"text": "Glass dropper bottle seal leaked slightly during transit through courier service.", "rating": 3.0, "v": "v1.0", "loc": "Lucknow, India"}
            ]
        },
        {
            "brand": {"id": "brd_009", "name": "Taj / Palace Hospitality", "category": "Hotels", "website": "https://palaceresorts.in"},
            "product": {
                "id": "prd_009", "name": "Grand Palace Heritage Resort Goa", "category": "Hotels", "model": "Beachfront",
                "version": "v1.0", "price": 12500.00,
                "description": "5-star luxury beachfront resort in South Goa with infinity pool, spa, and authentic Goan seafood.",
                "features": {"Location": "South Goa", "Amenities": "Private Beach Access, Infinity Pool, Ayurveda Spa"}
            },
            "reviews": [
                {"text": "Sea view villa was pristine and resort staff provided legendary Indian hospitality.", "rating": 5.0, "v": "v1.0", "loc": "Goa, India"},
                {"text": "Breakfast buffet counter got crowded around 9:30 AM during peak holiday weekend.", "rating": 3.0, "v": "v1.0", "loc": "Mumbai, India"}
            ]
        },
        {
            "brand": {"id": "brd_010", "name": "SmartVault Financial", "category": "Financial services", "website": "https://smartvault.in"},
            "product": {
                "id": "prd_010", "name": "SmartVault UPI & Digital Wealth App", "category": "Financial services", "model": "Mobile App",
                "version": "v2.4", "price": 0.00,
                "description": "Zero-brokerage mutual fund investments, instant UPI payment engine, and smart auto-saving.",
                "features": {"UPI Speed": "<1 second", "Security": "256-bit RBI Compliant Encryption"}
            },
            "reviews": [
                {"text": "Lightning-fast UPI transactions even during festival sale rush. SIP tracking UI is super clean.", "rating": 5.0, "v": "v2.4", "loc": "Bengaluru, India"},
                {"text": "Biometric fingerprint login fails occasionally right after major Android system update.", "rating": 2.0, "v": "v2.4", "loc": "Chandigarh, India"}
            ]
        },
        {
            "brand": {"id": "brd_011", "name": "Ather / Ola Electric", "category": "EV Scooter", "website": "https://aeroev.in"},
            "product": {
                "id": "prd_011", "name": "AeroEV Swift S1 Pro", "category": "EV Scooter", "model": "S1 Pro",
                "version": "v1.5", "price": 129999.00,
                "description": "High-speed electric scooter with 150km true range, fast charging, touch dashboard, and reverse mode.",
                "features": {"Range": "150 km", "Top Speed": "90 km/h", "Charging": "0-80% in 50 min"}
            },
            "reviews": [
                {"text": "Smooth acceleration and silent drive. Hypercharging stations in Bengaluru make long city trips effortless.", "rating": 5.0, "v": "v1.5", "loc": "Bengaluru, India"},
                {"text": "Touchscreen navigation hangs once in a while during hot afternoon sunlight exposure.", "rating": 3.0, "v": "v1.5", "loc": "Chennai, India"}
            ]
        },
        {
            "brand": {"id": "brd_012", "name": "Zomato / Swiggy Express", "category": "Food Delivery", "website": "https://quickbite.in"},
            "product": {
                "id": "prd_012", "name": "QuickBite Gold Pass 10-Min Delivery", "category": "Food Delivery", "model": "Membership",
                "version": "v2.0", "price": 499.00,
                "description": "Premium food delivery membership with zero delivery fee, priority dispatch, and extra restaurant discounts.",
                "features": {"Delivery Time": "Avg 15 mins", "Savings": "Up to ₹250 per order"}
            },
            "reviews": [
                {"text": "Orders arrive hot and super quick within 15 minutes! Gold discounts saved me over ₹3000 this month.", "rating": 5.0, "v": "v2.0", "loc": "Gurugram, India"},
                {"text": "Rainy day delivery surge fee applies even for Gold members.", "rating": 3.0, "v": "v2.0", "loc": "Mumbai, India"}
            ]
        },
        {
            "brand": {"id": "brd_bosch", "name": "Bosch India", "category": "Kitchen Appliances", "website": "https://bosch-home.in"},
            "product": {
                "id": "prd_bosch_1000w", "name": "Bosch TrueMixx Pro 1000W Mixer Grinder", "category": "Kitchen Appliances", "model": "MGM8842MIN",
                "version": "v1.0", "price": 6999.00,
                "description": "Heavy-duty 1000W mixer grinder featuring PoundingBlade technology, stainless steel jars, and active flow breakers.",
                "features": {"Power": "1000 Watts", "Jars": "4 Jars", "Blade": "PoundingBlade"}
            },
            "reviews": [
                {"text": "Extremely powerful 1000W motor! Grinds Garam Masala and Dosa batter effortlessly within seconds.", "rating": 5.0, "v": "v1.0", "loc": "Bengaluru, India"},
                {"text": "Noise level is quite high due to 1000W motor, and lid gasket rubber had slight leak on first wet run.", "rating": 2.0, "v": "v1.0", "loc": "Mumbai, India"}
            ]
        },
        {
            "brand": {"id": "brd_philips", "name": "Philips Domestic Appliances", "category": "Kitchen Appliances", "website": "https://philips.co.in"},
            "product": {
                "id": "prd_philips_viva", "name": "Philips Viva Collection 300W Hand Mixer", "category": "Kitchen Appliances", "model": "HR3705/10",
                "version": "v1.0", "price": 2450.00,
                "description": "Ergonomic 300W hand mixer with 5 speed settings, stainless steel beaters, and dough hooks for baking.",
                "features": {"Power": "300 Watts", "Speeds": "5 Speeds + Turbo", "Weight": "850g"}
            },
            "reviews": [
                {"text": "Must-buy for home bakers! Whips cream and cake batter in under 5 minutes without overheating.", "rating": 5.0, "v": "v1.0", "loc": "Delhi, India"},
                {"text": "Beater attachments feel slightly delicate and one joint snapped after 3 months of heavy dough kneading.", "rating": 2.0, "v": "v1.0", "loc": "Pune, India"}
            ]
        },
        {
            "brand": {"id": "brd_sujata", "name": "Sujata Appliances", "category": "Kitchen Appliances", "website": "https://sujataappliances.com"},
            "product": {
                "id": "prd_sujata_dynamix", "name": "Sujata Dynamix 900W Mixer Grinder", "category": "Kitchen Appliances", "model": "Dynamix DX",
                "version": "v1.0", "price": 5790.00,
                "description": "Heavy-duty commercial grade 900W motor with double ball bearings for 90-minute continuous running.",
                "features": {"Power": "900 Watts", "Bearings": "Double Ball Bearings", "RPM": "22000"}
            },
            "reviews": [
                {"text": "Absolute workhorse in the kitchen! Running smoothly for 3 years without single repair or heating issue.", "rating": 5.0, "v": "v1.0", "loc": "Chennai, India"},
                {"text": "Bulky design and heavy unit, but performance is unmatched for Indian cooking.", "rating": 4.0, "v": "v1.0", "loc": "Kolkata, India"}
            ]
        },
        {
            "brand": {"id": "brd_preethi", "name": "Preethi Kitchen Appliances", "category": "Kitchen Appliances", "website": "https://preethi.in"},
            "product": {
                "id": "prd_preethi_zodiac", "name": "Preethi Zodiac MG-218 750W Mixer Grinder", "category": "Kitchen Appliances", "model": "MG-218",
                "version": "v1.0", "price": 8990.00,
                "description": "750W 3-in-1 food processor mixer grinder with Master Chef Plus jar for knead, chop, slice & citrus press.",
                "features": {"Power": "750 Watts", "Processor": "MasterChef Jar", "Warranty": "2 Years"}
            },
            "reviews": [
                {"text": "Kneads atta dough in 1 minute and chops veggies precisely. True 3-in-1 kitchen appliance.", "rating": 5.0, "v": "v1.0", "loc": "Bengaluru, India"},
                {"text": "Plastic coupler broke after 6 months of daily use, but Preethi service replaced it free under warranty.", "rating": 3.0, "v": "v1.0", "loc": "Hyderabad, India"}
            ]
        },
        {
            "brand": {"id": "brd_amazfit", "name": "Amazfit Wearables", "category": "Smartwatch", "website": "https://amazfit.in"},
            "product": {
                "id": "prd_amazfit_balance", "name": "Amazfit Balance Smartwatch", "category": "Smartwatch", "model": "Balance",
                "version": "v1.0", "price": 14999.00,
                "description": "AI fitness smartwatch with Body Readiness Score, Dual-Band Circular GPS, AMOLED screen, and Zepp OS 3.5.",
                "features": {"Display": "1.5 inch HD AMOLED", "GPS": "Dual Band", "Battery": "14 Days"}
            },
            "reviews": [
                {"text": "Accurate heart rate tracking and phenomenal 12-day battery life. Bright screen in outdoor sunlight.", "rating": 5.0, "v": "v1.0", "loc": "Bengaluru, India"},
                {"text": "Sleep score calculation is occasionally inconsistent on nights with frequent awakenings.", "rating": 3.0, "v": "v1.0", "loc": "Delhi, India"}
            ]
        },
        {
            "brand": {"id": "brd_sony", "name": "Sony Electronics", "category": "Smart TV", "website": "https://sony.co.in"},
            "product": {
                "id": "prd_sony_bravia5", "name": "Sony BRAVIA 5 4K Mini LED Google TV", "category": "Smart TV", "model": "K-65XR70",
                "version": "v2026", "price": 134990.00,
                "description": "Mini LED 4K Google TV featuring Cognitive Processor XR, Acoustic Multi-Audio+, and 120Hz gaming support.",
                "features": {"Panel": "Mini LED 4K", "Processor": "Cognitive XR", "Refresh": "120Hz"}
            },
            "reviews": [
                {"text": "Picture clarity and black levels are stunning. HDR content on Netflix looks like a cinema theater!", "rating": 5.0, "v": "v2026", "loc": "Mumbai, India"},
                {"text": "Google TV interface occasionally lags when waking up from standby.", "rating": 4.0, "v": "v2026", "loc": "Gurugram, India"}
            ]
        },
        {
            "brand": {"id": "brd_sony_audio", "name": "Sony Audio", "category": "Headphones", "website": "https://sony.co.in"},
            "product": {
                "id": "prd_sony_xm5", "name": "Sony WF-1000XM5 Wireless Noise Canceling Earbuds", "category": "Headphones", "model": "WF-1000XM5",
                "version": "v1.0", "price": 16989.00,
                "description": "Premium noise canceling earbuds featuring dual processors, Dynamic Driver X, Hi-Res LDAC audio, and Multipoint.",
                "features": {"ANC": "HD Noise Canceling V2", "Battery": "8h + 16h Case", "Audio": "LDAC Hi-Res"}
            },
            "reviews": [
                {"text": "Industry best noise cancellation! Completely blocks engine roar on flights and Metro train noise.", "rating": 5.0, "v": "v1.0", "loc": "Delhi NCR, India"},
                {"text": "Ear tips take a few days to find the right foam seal fit, but comfort is great once selected.", "rating": 4.0, "v": "v1.0", "loc": "Bengaluru, India"}
            ]
        }
    ]

    for item in categories_data:
        b_data = item["brand"]
        p_data = item["product"]
        
        brand = db.query(Brand).filter(Brand.id == b_data["id"]).first()
        if not brand:
            brand = Brand(
                id=b_data["id"],
                name=b_data["name"],
                category=b_data["category"],
                website=b_data["website"],
                owner_id=owner_user.id,
                verification_status="verified"
            )
            db.add(brand)
            db.commit()

        product = db.query(Product).filter(Product.id == p_data["id"]).first()
        if not product:
            product = Product(
                id=p_data["id"],
                brand_id=brand.id,
                name=p_data["name"],
                category=p_data["category"],
                model=p_data["model"],
                version=p_data["version"],
                price=p_data["price"],
                description=p_data["description"],
                features=p_data["features"],
                status="active"
            )
            db.add(product)
            db.commit()

            # Add Reviews & AI Analysis
            for idx, rev in enumerate(item["reviews"]):
                fb_id = f"fb_{product.id}_{idx+1}"
                feedback = Feedback(
                    id=fb_id,
                    product_id=product.id,
                    source_id=demo_source.id,
                    review_text=rev["text"],
                    rating=rev["rating"],
                    location=rev.get("loc", "Global"),
                    product_version=rev["v"],
                    quality_status="processed"
                )
                db.add(feedback)
                db.commit()

                ai_res = run_full_ai_pipeline(rev["text"], rev["rating"], product.category, rev["v"])
                
                ai_analysis = AIAnalysis(
                    id=f"ai_{fb_id}",
                    feedback_id=feedback.id,
                    sentiment=ai_res["sentiment"],
                    emotion=ai_res["emotion"],
                    aspects=ai_res["aspects"],
                    topics=ai_res["topics"],
                    complaint_type=ai_res["complaint_type"],
                    urgency=ai_res["urgency"],
                    authenticity_signals=ai_res["authenticity_signals"],
                    confidence=ai_res["confidence"]
                )
                db.add(ai_analysis)
                db.commit()

            # Add Reputation Snapshots
            snapshots = [
                ReputationSnapshot(id=f"snap_{product.id}_1", product_id=product.id, time_period="2026-Q1", dimension="Product Quality", score=88.5, evidence_count=124, trend="improving"),
                ReputationSnapshot(id=f"snap_{product.id}_2", product_id=product.id, time_period="2026-Q1", dimension="Reliability", score=82.0, evidence_count=98, trend="stable"),
                ReputationSnapshot(id=f"snap_{product.id}_3", product_id=product.id, time_period="2026-Q1", dimension="Customer Support", score=76.0, evidence_count=45, trend="declining"),
                ReputationSnapshot(id=f"snap_{product.id}_4", product_id=product.id, time_period="2026-Q1", dimension="Value for Money", score=90.0, evidence_count=110, trend="improving")
            ]
            db.add_all(snapshots)
            db.commit()

    # Add Clustered Issues
    issue_01 = db.query(Issue).filter(Issue.id == "iss_001").first()
    if not issue_01:
        issue_01 = Issue(
            id="iss_001",
            product_id="prd_001",
            title="Battery Thermal Throttling on v2.1 Update",
            description="Increased complaint volume regarding phone warming and accelerated battery drain following software update v2.1.",
            category="Battery & Heating",
            severity="high",
            frequency=42,
            trend="increasing",
            status="in_progress"
        )
        db.add(issue_01)
        db.commit()

        action_01 = ImprovementAction(
            id="act_001",
            product_id="prd_001",
            issue_id=issue_01.id,
            owner_id=owner_user.id,
            title="Deploy Firmware Patch v2.1.1 for Thermal Optimization",
            description="Engineering team has identified background process indexing bug in v2.1. Hotfix patch v2.1.1 queued for release.",
            priority="high",
            status="in_progress",
            due_date=datetime.datetime.utcnow() + datetime.timedelta(days=5)
        )
        db.add(action_01)
        db.commit()

    print("[BrandPulse Seed] Realistic multi-category dataset successfully expanded across 10+ verticals!")
