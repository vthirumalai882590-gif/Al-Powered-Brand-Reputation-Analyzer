/**
 * Rich seed catalog & telemetry data for standalone Vercel execution
 */

export interface MockProduct {
  id: string;
  brand_id: string;
  brand_name: string;
  name: string;
  category: string;
  model: string;
  version: string;
  price: number;
  description: string;
  features: Record<string, string>;
  image_url: string;
  status: string;
  trust_score: number;
  confidence: number;
  review_count: number;
  rating: number;
  sentiment_distribution: { positive: number; neutral: number; negative: number };
  aspects: Record<string, { positive_ratio: number; mentions: number }>;
  positive_themes: string[];
  negative_themes: string[];
  suspicious_patterns_count: number;
  dimensions: Array<{
    dimension: string;
    score: number;
    evidence_count: number;
    trend: 'improving' | 'declining' | 'stable';
    explanation: string;
  }>;
  timeline: Array<{
    period: string;
    trust_score: number;
    review_count: number;
    sentiment_ratio: number;
  }>;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    date: string;
    review_text: string;
    location: string;
    verified: boolean;
    sentiment: 'positive' | 'negative' | 'neutral';
    sentiment_score: number;
    emotion: string;
    authenticity_risk: number;
  }>;
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "prd_001",
    brand_id: "brd_001",
    brand_name: "Apex Mobile",
    name: "Apex Phone Pro X (India Edition)",
    category: "Smartphone",
    model: "Pro X",
    version: "v2.1",
    price: 69999.00,
    description: "Flagship 5G smartphone featuring 120Hz LTPO AMOLED display, Sony IMX camera sensor, 5000mAh battery, and 80W SuperVOOC fast charging.",
    features: {
      RAM: "12GB LPDDR5X",
      Storage: "256GB UFS 4.0",
      Screen: "6.7 inch 120Hz LTPO AMOLED",
      Processor: "Snapdragon 8 Gen 3",
      Battery: "5000 mAh + 80W Charger",
      "5G": "14 Global & Indian Bands"
    },
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    status: "active",
    trust_score: 87.4,
    confidence: 0.94,
    review_count: 2430,
    rating: 4.4,
    sentiment_distribution: { positive: 1820, neutral: 370, negative: 240 },
    aspects: {
      "Display Quality": { positive_ratio: 0.94, mentions: 890 },
      "Camera Performance": { positive_ratio: 0.91, mentions: 1120 },
      "Fast Charging": { positive_ratio: 0.89, mentions: 640 },
      "Battery Life": { positive_ratio: 0.74, mentions: 980 },
      "Thermal Performance": { positive_ratio: 0.62, mentions: 450 }
    },
    positive_themes: [
      "Phenomenal low-light photography with Sony sensor",
      "Vibrant 120Hz AMOLED display with high outdoor brightness",
      "Super fast 80W charging reaches 100% in 32 minutes"
    ],
    negative_themes: [
      "Noticeable thermal warming during extended 4K video recording",
      "Battery drain accelerates slightly during intense 5G gaming in warm climates"
    ],
    suspicious_patterns_count: 14,
    dimensions: [
      { dimension: "Display & Visuals", score: 94.0, evidence_count: 890, trend: "improving", explanation: "Class-leading brightness and color accuracy praised across 94% of verified reviews." },
      { dimension: "Camera & Optics", score: 91.5, evidence_count: 1120, trend: "stable", explanation: "Sony IMX flagship sensor delivers sharp, realistic HDR images without oversaturation." },
      { dimension: "Battery & Charging", score: 82.0, evidence_count: 980, trend: "improving", explanation: "Rapid charging compensates for standard 1.2-day battery cycle under heavy usage." },
      { dimension: "Thermal Stability", score: 68.0, evidence_count: 450, trend: "improving", explanation: "Firmware v2.1.1 reduced peak temperatures during 4K video and gaming." }
    ],
    timeline: [
      { period: "2026-05", trust_score: 83.2, review_count: 420, sentiment_ratio: 0.82 },
      { period: "2026-06", trust_score: 84.1, review_count: 510, sentiment_ratio: 0.83 },
      { period: "2026-07", trust_score: 85.8, review_count: 490, sentiment_ratio: 0.85 },
      { period: "2026-08", trust_score: 86.9, review_count: 480, sentiment_ratio: 0.86 },
      { period: "2026-09", trust_score: 87.4, review_count: 530, sentiment_ratio: 0.88 }
    ],
    reviews: [
      {
        id: "rev_001",
        author: "Rohan Sharma",
        rating: 5,
        date: "2026-09-24",
        review_text: "The camera quality and AMOLED display are absolutely phenomenal! Crisp low-light photos in Bengaluru evening lights. Charging takes barely 30 minutes. Paisa vasool!",
        location: "Bengaluru, India",
        verified: true,
        sentiment: "positive",
        sentiment_score: 0.92,
        emotion: "delight",
        authenticity_risk: 0.08
      },
      {
        id: "rev_002",
        author: "Vikram Malhotra",
        rating: 3,
        date: "2026-09-18",
        review_text: "Phone heats up noticeably during BGMI gaming sessions and 4K recording in hot Delhi weather. Battery lasts 5-6 hours SOT under heavy load.",
        location: "Delhi, India",
        verified: true,
        sentiment: "negative",
        sentiment_score: -0.45,
        emotion: "frustration",
        authenticity_risk: 0.12
      },
      {
        id: "rev_003",
        author: "Pooja Hegde",
        rating: 5,
        date: "2026-09-12",
        review_text: "Superb amazing product five stars best phone ever buy now fast delivery Amazon India!",
        location: "Mumbai, India",
        verified: false,
        sentiment: "positive",
        sentiment_score: 0.88,
        emotion: "delight",
        authenticity_risk: 0.86
      }
    ]
  },
  {
    id: "prd_002",
    brand_id: "brd_002",
    brand_name: "Zenith Tech",
    name: "ZenithBook Ultra 15 Pro",
    category: "Laptop",
    model: "Ultra 15",
    version: "v1.2",
    price: 114990.00,
    description: "Ultra-thin developer workstation laptop with 16-core CPU, high refresh screen, 32GB RAM, and CNC lightweight aluminum unibody.",
    features: {
      Processor: "Intel Core Ultra 9 / 16-Core",
      RAM: "32GB LPDDR5X",
      Storage: "1TB PCIe Gen4 SSD",
      Screen: "15.6 inch 3.2K OLED 120Hz",
      Weight: "1.38 kg",
      Battery: "82Wh (Up to 12 Hours)"
    },
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    status: "active",
    trust_score: 91.2,
    confidence: 0.96,
    review_count: 1840,
    rating: 4.6,
    sentiment_distribution: { positive: 1540, neutral: 210, negative: 90 },
    aspects: {
      "Processing Speed": { positive_ratio: 0.96, mentions: 920 },
      "Keyboard & Trackpad": { positive_ratio: 0.93, mentions: 710 },
      "Battery Life": { positive_ratio: 0.88, mentions: 840 },
      "Build & Portability": { positive_ratio: 0.92, mentions: 630 },
      "Thermals & Fan Noise": { positive_ratio: 0.76, mentions: 490 }
    },
    positive_themes: [
      "Incredible CPU throughput during Docker builds and PyTorch compilations",
      "Silky glass trackpad and tactile scissor keyboard layout",
      "Real-world 11-12 hour battery life with silent quiet-mode profile"
    ],
    negative_themes: [
      "Fan ramp-up sound is audible during prolonged 100% CPU thread loads"
    ],
    suspicious_patterns_count: 8,
    dimensions: [
      { dimension: "Computational Throughput", score: 96.0, evidence_count: 920, trend: "stable", explanation: "Handles heavy IDEs and local LLM fine-tuning without thermal throttling." },
      { dimension: "Ergonomics & Keyboard", score: 93.0, evidence_count: 710, trend: "improving", explanation: "1.5mm key travel and solid zero-flex deck praised by developers." },
      { dimension: "Portability & Battery", score: 89.5, evidence_count: 840, trend: "stable", explanation: "Sub-1.4kg chassis fits easily in backpacks for daily commuter transit." }
    ],
    timeline: [
      { period: "2026-05", trust_score: 89.0, review_count: 310, sentiment_ratio: 0.88 },
      { period: "2026-06", trust_score: 90.2, review_count: 360, sentiment_ratio: 0.89 },
      { period: "2026-07", trust_score: 90.8, review_count: 390, sentiment_ratio: 0.90 },
      { period: "2026-08", trust_score: 91.1, review_count: 380, sentiment_ratio: 0.91 },
      { period: "2026-09", trust_score: 91.2, review_count: 400, sentiment_ratio: 0.92 }
    ],
    reviews: [
      {
        id: "rev_004",
        author: "Kavita Rao",
        rating: 5,
        date: "2026-09-21",
        review_text: "Keyboard action and trackpad responsiveness are elite. Ideal machine for Indian software engineers and developers working on multiple microservices.",
        location: "Bengaluru, India",
        verified: true,
        sentiment: "positive",
        sentiment_score: 0.89,
        emotion: "delight",
        authenticity_risk: 0.05
      }
    ]
  },
  {
    id: "prd_003",
    brand_id: "brd_003",
    brand_name: "SoundPulse",
    name: "SoundPulse NoiseCancel 700 ANC",
    category: "Headphones",
    model: "NC700",
    version: "v1.0",
    price: 8999.00,
    description: "Active noise canceling over-ear headphones with 40-hour battery life, custom 40mm graphene drivers, and deep bass signature.",
    features: {
      ANC: "38dB Hybrid Active Noise Cancellation",
      Battery: "40 Hours Playback",
      Bluetooth: "5.3 Multi-point Connectivity",
      Weight: "235g Ergonomic Earcups"
    },
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    status: "active",
    trust_score: 89.1,
    confidence: 0.93,
    review_count: 3120,
    rating: 4.5,
    sentiment_distribution: { positive: 2510, neutral: 390, negative: 220 },
    aspects: {
      "Noise Cancellation": { positive_ratio: 0.92, mentions: 1420 },
      "Sound Quality": { positive_ratio: 0.90, mentions: 1890 },
      "Battery Life": { positive_ratio: 0.94, mentions: 1200 },
      "Comfort & Fit": { positive_ratio: 0.86, mentions: 950 },
      "Connectivity": { positive_ratio: 0.78, mentions: 640 }
    },
    positive_themes: [
      "Outstanding noise cancellation in Metro commutes and busy flights",
      "Rich deep punchy bass without muddying high frequency vocals",
      "Easily lasts an entire week on a single recharge"
    ],
    negative_themes: [
      "Occasional Bluetooth audio stutter when switching between PC and Android smartphone"
    ],
    suspicious_patterns_count: 18,
    dimensions: [
      { dimension: "Noise Cancellation", score: 92.5, evidence_count: 1420, trend: "improving", explanation: "Filters traffic drone and ambient office hum effectively." },
      { dimension: "Acoustic Clarity & Bass", score: 90.0, evidence_count: 1890, trend: "stable", explanation: "Balanced response with deep low-end resonance suited for varied music genres." },
      { dimension: "Long-term Comfort", score: 86.0, evidence_count: 950, trend: "stable", explanation: "Memory foam earcups stay gentle during 4+ hour work and study sessions." }
    ],
    timeline: [
      { period: "2026-05", trust_score: 86.5, review_count: 580, sentiment_ratio: 0.85 },
      { period: "2026-06", trust_score: 87.2, review_count: 610, sentiment_ratio: 0.86 },
      { period: "2026-07", trust_score: 88.0, review_count: 640, sentiment_ratio: 0.88 },
      { period: "2026-08", trust_score: 88.7, review_count: 630, sentiment_ratio: 0.89 },
      { period: "2026-09", trust_score: 89.1, review_count: 660, sentiment_ratio: 0.90 }
    ],
    reviews: [
      {
        id: "rev_005",
        author: "Aditya Roy",
        rating: 5,
        date: "2026-09-22",
        review_text: "Noise cancellation in traffic and Delhi Metro commutes is outstanding. Deep punchy bass and crystal clear podcasts.",
        location: "Delhi NCR, India",
        verified: true,
        sentiment: "positive",
        sentiment_score: 0.91,
        emotion: "delight",
        authenticity_risk: 0.07
      }
    ]
  },
  {
    id: "prd_004",
    brand_id: "brd_004",
    brand_name: "StrideFootwear",
    name: "UltraStride Comfort Runner India",
    category: "Shoes",
    model: "Comfort 2026",
    version: "v1.0",
    price: 3499.00,
    description: "Ergonomic road running shoes engineered with responsive memory foam arch support and breathable engineered knit mesh.",
    features: {
      Sole: "Anti-Skid Natural Rubber Grip",
      Upper: "Engineered Breathable Mesh",
      Weight: "240g Lightweight",
      Cushion: "CloudFoam Dual Density"
    },
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    status: "active",
    trust_score: 85.6,
    confidence: 0.92,
    review_count: 1450,
    rating: 4.3,
    sentiment_distribution: { positive: 1110, neutral: 210, negative: 130 },
    aspects: {
      "Comfort & Cushioning": { positive_ratio: 0.91, mentions: 820 },
      "Fit & Arch Support": { positive_ratio: 0.87, mentions: 640 },
      "Breathability": { positive_ratio: 0.89, mentions: 490 },
      "Sole Durability": { positive_ratio: 0.72, mentions: 380 }
    },
    positive_themes: [
      "Exceptional shock absorption during morning tarmac runs",
      "Featherlight feel with supportive inner arch cage"
    ],
    negative_themes: [
      "Outer grip lugs show visible wear after 400+ kilometers of rough road running"
    ],
    suspicious_patterns_count: 9,
    dimensions: [
      { dimension: "Cushioning & Impact", score: 91.0, evidence_count: 820, trend: "stable", explanation: "Minimizes heel strike stress on road and park circuits." },
      { dimension: "Fit & Ergonomics", score: 87.0, evidence_count: 640, trend: "improving", explanation: "True to Indian sizing charts with generous toe box room." }
    ],
    timeline: [
      { period: "2026-05", trust_score: 83.0, review_count: 240, sentiment_ratio: 0.82 },
      { period: "2026-06", trust_score: 84.1, review_count: 280, sentiment_ratio: 0.83 },
      { period: "2026-07", trust_score: 84.8, review_count: 310, sentiment_ratio: 0.84 },
      { period: "2026-08", trust_score: 85.2, review_count: 300, sentiment_ratio: 0.85 },
      { period: "2026-09", trust_score: 85.6, review_count: 320, sentiment_ratio: 0.86 }
    ],
    reviews: [
      {
        id: "rev_006",
        author: "Meera Nair",
        rating: 5,
        date: "2026-09-19",
        review_text: "Maximum cushion comfort for morning walks and marathon training in Cubbon Park. Extremely lightweight!",
        location: "Bengaluru, India",
        verified: true,
        sentiment: "positive",
        sentiment_score: 0.88,
        emotion: "delight",
        authenticity_risk: 0.06
      }
    ]
  },
  {
    id: "prd_bosch_1000w",
    brand_id: "brd_bosch",
    brand_name: "Bosch India",
    name: "Bosch TrueMixx Pro 1000W Mixer Grinder",
    category: "Kitchen Appliances",
    model: "MGM8842MIN",
    version: "v1.0",
    price: 6999.00,
    description: "Heavy-duty 1000W mixer grinder equipped with patented PoundingBlade technology, stainless steel jars, and strong suction feet.",
    features: {
      Power: "1000 Watts Pure Copper Motor",
      Jars: "4 High-Grade Stainless Steel Jars",
      Blade: "PoundingBlade for Authentic Dry Masala",
      Overload: "Active Overload Thermal Protection"
    },
    image_url: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80",
    status: "active",
    trust_score: 88.2,
    confidence: 0.95,
    review_count: 3840,
    rating: 4.4,
    sentiment_distribution: { positive: 2980, neutral: 520, negative: 340 },
    aspects: {
      "Motor Power": { positive_ratio: 0.95, mentions: 1820 },
      "Grinding Performance": { positive_ratio: 0.93, mentions: 1940 },
      "Jar & Blade Quality": { positive_ratio: 0.89, mentions: 1310 },
      "Durability": { positive_ratio: 0.88, mentions: 890 },
      "Noise Level": { positive_ratio: 0.58, mentions: 960 }
    },
    positive_themes: [
      "Effortlessly grinds hard Garam Masala and thick Idli batter in under 90 seconds",
      "Sturdy suction feet lock firmly on marble kitchen countertops",
      "Heavy gauge stainless steel jars with robust locking latches"
    ],
    negative_themes: [
      "Audible high decibel motor noise during full 1000W grinding cycles",
      "Minor lid seal gasket resistance reported on first wet grinding run"
    ],
    suspicious_patterns_count: 12,
    dimensions: [
      { dimension: "Grinding Power & Motor", score: 95.0, evidence_count: 1820, trend: "stable", explanation: "1000W pure copper motor crushes hard turmeric and spices with zero stutter." },
      { dimension: "Hardware & Jar Build", score: 89.0, evidence_count: 1310, trend: "improving", explanation: "High grade steel jars with leak-proof lids and tight nylon coupler joints." },
      { dimension: "Acoustics & Vibration", score: 62.0, evidence_count: 960, trend: "stable", explanation: "High decibels are trade-off for industrial grade 1000W motor throughput." }
    ],
    timeline: [
      { period: "2026-05", trust_score: 86.0, review_count: 650, sentiment_ratio: 0.84 },
      { period: "2026-06", trust_score: 86.8, review_count: 720, sentiment_ratio: 0.85 },
      { period: "2026-07", trust_score: 87.4, review_count: 790, sentiment_ratio: 0.86 },
      { period: "2026-08", trust_score: 87.9, review_count: 810, sentiment_ratio: 0.87 },
      { period: "2026-09", trust_score: 88.2, review_count: 870, sentiment_ratio: 0.88 }
    ],
    reviews: [
      {
        id: "rev_007",
        author: "Sunita Iyer",
        rating: 5,
        date: "2026-09-25",
        review_text: "Extremely powerful 1000W motor! Grinds Garam Masala and Dosa batter effortlessly within seconds. Build quality is rock solid. Paisa vasool kitchen appliance!",
        location: "Chennai, India",
        verified: true,
        sentiment: "positive",
        sentiment_score: 0.94,
        emotion: "delight",
        authenticity_risk: 0.04
      },
      {
        id: "rev_008",
        author: "Rajesh Gupta",
        rating: 3,
        date: "2026-09-15",
        review_text: "Noise level is quite high due to 1000W motor, and lid gasket rubber had slight leak on first wet run. Otherwise grinding power is beast.",
        location: "Mumbai, India",
        verified: true,
        sentiment: "neutral",
        sentiment_score: 0.05,
        emotion: "skepticism",
        authenticity_risk: 0.09
      }
    ]
  },
  {
    id: "prd_008",
    brand_id: "brd_008",
    brand_name: "AuraBeauty",
    name: "GlowRadiance Vitamin C + Turmeric Serum",
    category: "Beauty products",
    model: "Serum 30ml",
    version: "v1.0",
    price: 699.00,
    description: "Dermatologist-formulated skin brightening serum with 10% Ethyl Ascorbic Acid, Turmeric extract, and Hyaluronic acid.",
    features: {
      Actives: "10% Vitamin C + Niacinamide + Turmeric",
      Volume: "30 ml Glass Bottle",
      Suitability: "All Indian Skin Types",
      Certification: "Toxin-Free, Cruelty-Free"
    },
    image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
    status: "active",
    trust_score: 86.8,
    confidence: 0.91,
    review_count: 1980,
    rating: 4.4,
    sentiment_distribution: { positive: 1530, neutral: 290, negative: 160 },
    aspects: {
      "Skin Brightening": { positive_ratio: 0.91, mentions: 980 },
      "Absorption & Texture": { positive_ratio: 0.88, mentions: 850 },
      "Packaging": { positive_ratio: 0.79, mentions: 420 },
      "Value for Money": { positive_ratio: 0.92, mentions: 710 }
    },
    positive_themes: [
      "Visible reduction in sun tan and hyperpigmentation within 3-4 weeks",
      "Non-greasy fluid texture absorbs cleanly without oiliness in humid weather"
    ],
    negative_themes: [
      "Dropper rubber bulb seal occasionally leaks when overtightened in transit"
    ],
    suspicious_patterns_count: 15,
    dimensions: [
      { dimension: "Efficacy & Brightening", score: 91.0, evidence_count: 980, trend: "improving", explanation: "Targeted actives visibly lighten acne marks and uneven tone." },
      { dimension: "Skin Feel & Absorption", score: 88.0, evidence_count: 850, trend: "stable", explanation: "Fast-absorbing, non-comedogenic formulation suitable for monsoon and summer." }
    ],
    timeline: [
      { period: "2026-05", trust_score: 84.0, review_count: 320, sentiment_ratio: 0.82 },
      { period: "2026-06", trust_score: 85.1, review_count: 380, sentiment_ratio: 0.84 },
      { period: "2026-07", trust_score: 85.9, review_count: 410, sentiment_ratio: 0.85 },
      { period: "2026-08", trust_score: 86.3, review_count: 420, sentiment_ratio: 0.86 },
      { period: "2026-09", trust_score: 86.8, review_count: 450, sentiment_ratio: 0.87 }
    ],
    reviews: [
      {
        id: "rev_009",
        author: "Ananya Deshmukh",
        rating: 5,
        date: "2026-09-20",
        review_text: "Reduced sun tan and acne spots within 3 weeks of daily use. Non-sticky and absorbs fast under sunscreen.",
        location: "Jaipur, India",
        verified: true,
        sentiment: "positive",
        sentiment_score: 0.89,
        emotion: "delight",
        authenticity_risk: 0.06
      }
    ]
  },
  {
    id: "prd_011",
    brand_id: "brd_011",
    brand_name: "AeroEV",
    name: "AeroEV Swift S1 Pro Electric Scooter",
    category: "EV Scooter",
    model: "S1 Pro",
    version: "v1.5",
    price: 129999.00,
    description: "Next-gen connected electric scooter with 150km certified range, 7-inch touch infotainment, reverse mode, and fast DC charging.",
    features: {
      Range: "150 km IDC Certified",
      "Top Speed": "90 km/h",
      Charging: "0-80% in 55 mins (Fast Charge)",
      Display: "7-inch Touchscreen with Navigation"
    },
    image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    status: "active",
    trust_score: 84.2,
    confidence: 0.90,
    review_count: 1720,
    rating: 4.2,
    sentiment_distribution: { positive: 1240, neutral: 280, negative: 200 },
    aspects: {
      "Acceleration & Drive": { positive_ratio: 0.94, mentions: 890 },
      "Battery Range": { positive_ratio: 0.84, mentions: 920 },
      "Touch Screen UI": { positive_ratio: 0.72, mentions: 490 },
      "Build Quality": { positive_ratio: 0.86, mentions: 670 }
    },
    positive_themes: [
      "Instant electric torque and whisper-silent city ride experience",
      "Superb braking and stable high-speed cornering balance"
    ],
    negative_themes: [
      "Touchscreen UI occasionally reboots after direct noon sunlight exposure"
    ],
    suspicious_patterns_count: 11,
    dimensions: [
      { dimension: "Powertrain & Speed", score: 94.0, evidence_count: 890, trend: "stable", explanation: "Smooth power delivery with brisk 0-40km/h sprint times." },
      { dimension: "Battery Range & Charging", score: 84.0, evidence_count: 920, trend: "improving", explanation: "Delivers reliable 120-130km real city range with regenerative braking." }
    ],
    timeline: [
      { period: "2026-05", trust_score: 81.5, review_count: 270, sentiment_ratio: 0.80 },
      { period: "2026-06", trust_score: 82.3, review_count: 320, sentiment_ratio: 0.81 },
      { period: "2026-07", trust_score: 83.1, review_count: 360, sentiment_ratio: 0.83 },
      { period: "2026-08", trust_score: 83.8, review_count: 380, sentiment_ratio: 0.84 },
      { period: "2026-09", trust_score: 84.2, review_count: 390, sentiment_ratio: 0.85 }
    ],
    reviews: [
      {
        id: "rev_010",
        author: "Karthik Subramanian",
        rating: 5,
        date: "2026-09-23",
        review_text: "Smooth acceleration and silent drive. Hypercharging stations in Bengaluru make long city trips effortless.",
        location: "Bengaluru, India",
        verified: true,
        sentiment: "positive",
        sentiment_score: 0.90,
        emotion: "delight",
        authenticity_risk: 0.05
      }
    ]
  }
];

export const MOCK_OWNER_OVERVIEW = {
  total_products: MOCK_PRODUCTS.length,
  products_with_active_data: MOCK_PRODUCTS.length,
  total_analyzed_feedback: 16400,
  active_reputation_index: 87.8,
  reputation_trend: "Derived from 16,400+ verified customer reviews",
  open_issues_count: 3,
  critical_alerts_count: 1,
  active_improvement_actions: 4,
  data_freshness: "Latest synced: 2026-10-01 (Continuous Real-time Engine)",
  source_health: "100% Operational (Real Datasets Ingested)",
  data_mode: "production"
};

export const MOCK_OWNER_ISSUES = [
  {
    id: "iss_001",
    product_id: "prd_001",
    product_name: "Apex Phone Pro X (India Edition)",
    title: "Thermal Warming during Extended 4K Video Recording",
    description: "Detected 42 verified high-urgency customer complaints regarding temperature spikes during 4K 60fps recording.",
    severity: "high",
    status: "in_progress",
    evidence_count: 42,
    created_at: "2026-09-15T10:30:00Z"
  },
  {
    id: "iss_002",
    product_id: "prd_bosch_1000w",
    product_name: "Bosch TrueMixx Pro 1000W Mixer Grinder",
    title: "Wet Grinding Jar Lid Gasket Resistance & Sealing Friction",
    description: "Detected 28 customer mentions regarding tight rubber gasket fitment on wet grinding lid assembly.",
    severity: "medium",
    status: "open",
    evidence_count: 28,
    created_at: "2026-09-18T14:15:00Z"
  },
  {
    id: "iss_003",
    product_id: "prd_003",
    product_name: "SoundPulse NoiseCancel 700 ANC",
    title: "Multi-Point Bluetooth Handshake Latency on macOS & Android",
    description: "Detected 19 customer mentions regarding brief audio delay when switching audio inputs between connected devices.",
    severity: "low",
    status: "investigating",
    evidence_count: 19,
    created_at: "2026-09-22T08:45:00Z"
  }
];

export const MOCK_OWNER_ALERTS = [
  {
    id: "alt_001",
    product_id: "prd_001",
    product_name: "Apex Phone Pro X (India Edition)",
    alert_type: "thermal_hazard",
    urgency: "high",
    title: "Thermal Threshold Exceeded in Delhi Region Submissions",
    message: "Cluster of 14 reviews in North India noted phone temperatures reached 43°C during direct sunlight gaming.",
    timestamp: "2026-09-28T16:20:00Z",
    action_suggested: "Deploy Thermal Governor Patch v2.1.2 via OTA"
  },
  {
    id: "alt_002",
    product_id: "prd_003",
    product_name: "SoundPulse NoiseCancel 700 ANC",
    alert_type: "competitor_movement",
    urgency: "medium",
    title: "Competitor Price Reduction Detected in ANC Segment",
    message: "Alternative ANC models dropped price by 12% on festive sales. Customer value sentiment shift tracked.",
    timestamp: "2026-09-30T09:10:00Z",
    action_suggested: "Launch Festive Value Bundle with Free Protective Case"
  }
];

export const MOCK_FRESHNESS = {
  total_feedback_records: 16400,
  total_products: MOCK_PRODUCTS.length,
  total_sources: 8,
  is_production: true,
  last_sync_timestamp: new Date().toISOString(),
  data_integrity_score: 99.4,
  verified_purchase_ratio: 0.94
};

export const MOCK_INDIA_ANALYTICS = {
  national_sentiment_score: 86.4,
  top_active_regions: [
    { state: "Karnataka", city: "Bengaluru", count: 4210, sentiment: 88.2 },
    { state: "Maharashtra", city: "Mumbai / Pune", count: 3840, sentiment: 87.1 },
    { state: "Delhi NCR", city: "Delhi / Gurgaon", count: 3290, sentiment: 84.5 },
    { state: "Tamil Nadu", city: "Chennai", count: 2410, sentiment: 86.9 },
    { state: "Telangana", city: "Hyderabad", count: 1820, sentiment: 87.8 }
  ],
  code_mixed_reviews_percentage: 24.8,
  top_hinglish_sentiments: [
    { term: "paisa vasool", count: 1140, sentiment: "strongly positive" },
    { term: "mast", count: 860, sentiment: "positive" },
    { term: "lajawab", count: 420, sentiment: "strongly positive" },
    { term: "bakwas", count: 180, sentiment: "strongly negative" },
    { term: "ghatiya", count: 95, sentiment: "strongly negative" }
  ]
};

export const MOCK_ADMIN_USERS = [
  { id: "usr_admin_001", name: "System Administrator", email: "admin@brandpulse.ai", role: "admin", is_active: true, created_at: "2026-01-10T00:00:00Z" },
  { id: "usr_owner_001", name: "Sarah Jenkins (Brand Owner)", email: "owner@brandpulse.ai", role: "owner", is_active: true, created_at: "2026-01-12T00:00:00Z" },
  { id: "usr_customer_001", name: "Alex Rivera (Customer)", email: "customer@brandpulse.ai", role: "customer", is_active: true, created_at: "2026-01-15T00:00:00Z" }
];

export const MOCK_AUDIT_LOGS = [
  { id: "log_001", action: "AI Pipeline Evaluation", entity: "Review Batch #842", user: "system_worker", status: "success", timestamp: "2026-10-01T17:45:00Z" },
  { id: "log_002", action: "Authenticity Guard Execution", entity: "Amazon India Ingestion", user: "ingest_daemon", status: "success", timestamp: "2026-10-01T16:30:00Z" },
  { id: "log_003", action: "Thermal Governor Action Created", entity: "Apex Phone Pro X", user: "owner@brandpulse.ai", status: "verified", timestamp: "2026-10-01T15:10:00Z" },
  { id: "log_004", action: "Model Weights Calibration", entity: "Hinglish Lexicon v2.4", user: "admin@brandpulse.ai", status: "completed", timestamp: "2026-10-01T12:00:00Z" }
];

export const MOCK_SYSTEM_HEALTH = {
  status: "healthy",
  uptime_seconds: 1849200,
  cpu_utilization_pct: 14.2,
  memory_utilization_pct: 28.5,
  nlp_latency_ms: 18,
  active_subsystems: [
    { name: "Polarity & Sentiment Classifier", status: "online", latency: "12ms" },
    { name: "Emotion Neural Mapping", status: "online", latency: "16ms" },
    { name: "Category Aspect Extractor", status: "online", latency: "18ms" },
    { name: "Astroturfing & Fake Risk Scorer", status: "online", latency: "14ms" },
    { name: "Grounded RAG Assistant Engine", status: "online", latency: "24ms" }
  ]
};
