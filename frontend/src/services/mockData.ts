/**
 * Rich seed catalog & telemetry data for standalone Vercel execution
 * Generated from authentic BrandPulse 19,053 feedback corpus & Indian market datasets.
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
    "id": "prd_bosc_bosch_truemixx_pro_1000w",
    "brand_id": "brd_bosch",
    "brand_name": "Bosch India",
    "name": "Bosch TrueMixx Pro 1000W Mixer Grinder",
    "category": "Kitchen Appliances",
    "model": "MGM8842MIN",
    "version": "v1.0",
    "price": 6999.0,
    "description": "Heavy-duty 1000W mixer grinder equipped with patented PoundingBlade technology, stainless steel jars, and active flow breaker ribs.",
    "features": {
      "Power": "1000 Watts Pure Copper Motor",
      "Jars": "4 High-Grade Stainless Steel Jars",
      "Blade": "PoundingBlade for Authentic Dry Masala",
      "Overload": "Active Thermal Overload Protector",
      "Warranty": "2 Years Product, 5 Years Motor"
    },
    "image_url": "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 88.2,
    "confidence": 0.95,
    "review_count": 2316,
    "rating": 4.4,
    "sentiment_distribution": {
      "positive": 1760,
      "neutral": 347,
      "negative": 209
    },
    "aspects": {
      "Motor Power": {
        "positive_ratio": 0.95,
        "mentions": 1820
      },
      "Grinding Performance": {
        "positive_ratio": 0.93,
        "mentions": 1940
      },
      "Jar & Blade Quality": {
        "positive_ratio": 0.89,
        "mentions": 1310
      },
      "Durability": {
        "positive_ratio": 0.88,
        "mentions": 890
      },
      "Noise Level": {
        "positive_ratio": 0.58,
        "mentions": 960
      }
    },
    "positive_themes": [
      "Effortlessly grinds hard Garam Masala and thick Idli batter in under 90 seconds",
      "Sturdy suction feet lock firmly on marble kitchen countertops",
      "Heavy gauge stainless steel jars with robust locking latches"
    ],
    "negative_themes": [
      "Audible high decibel motor noise during full 1000W grinding cycles",
      "Minor lid seal gasket resistance reported on first wet grinding run"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Grinding Power & Motor",
        "score": 95.0,
        "evidence_count": 1820,
        "trend": "stable",
        "explanation": "1000W pure copper motor crushes hard turmeric and spices with zero stutter."
      },
      {
        "dimension": "Hardware & Jar Build",
        "score": 89.0,
        "evidence_count": 1310,
        "trend": "improving",
        "explanation": "High grade steel jars with leak-proof lids and tight nylon coupler joints."
      },
      {
        "dimension": "Acoustics & Vibration",
        "score": 62.0,
        "evidence_count": 960,
        "trend": "stable",
        "explanation": "High decibels are trade-off for industrial grade 1000W motor throughput."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 85.7,
        "review_count": 347,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 86.4,
        "review_count": 416,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 87.2,
        "review_count": 509,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 87.8,
        "review_count": 486,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 88.2,
        "review_count": 555,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_bosc_bosch_truemixx_pro_1000w_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2020-07-20",
        "review_text": "Bosch TrueMixx Pro Mixer Grinder 1000 Watt-MGM8842MIN, Black Review: I usually do not write reviews, but I felt I had to write this one, because when I was researching which mixer to buy I found really bad reviews that do not do justice to the product. I went with the trust on Bo",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_bosc_bosch_truemixx_pro_1000w_2",
        "author": "Verified Customer 2",
        "rating": 4.0,
        "date": "2021-05-25",
        "review_text": "I am reviewing this product after thoroughly using it for 9 months. My review will be short, precise and divided into 3 sections, namely : pros, cons & satisfaction levels. My mother and wife take care of the kitchen at our home. They were in dire need of a heavy-duty mixer grind",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_bosc_bosch_truemixx_pro_1000w_3",
        "author": "Verified Customer 3",
        "rating": 5.0,
        "date": "2026-09-23",
        "review_text": "We have been using this mixer / grinder since last 10 days and below are our observations so far - Pros: 1. The main unit / motor unit build quality is excellent and look wise awesome, its an enhancement to our kitchen 2. The vacuum lock features ensures the main unit does not mo",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_suja_sujata_dynamix_900w",
    "brand_id": "brd_sujata",
    "brand_name": "Sujata Appliances",
    "name": "Sujata Dynamix 900W Mixer Grinder",
    "category": "Kitchen Appliances",
    "model": "Dynamix DX",
    "version": "v1.0",
    "price": 5790.0,
    "description": "Heavy-duty commercial grade 900W motor with double ball bearings for 90-minute continuous running.",
    "features": {
      "Power": "900 Watts Heavy Duty Motor",
      "Bearings": "Double Ball Bearings for 90-min Run",
      "Jars": "3 Heavy Gauge Stainless Steel Jars",
      "Speed": "22,000 RPM Max Speed"
    },
    "image_url": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 91.5,
    "confidence": 0.96,
    "review_count": 1408,
    "rating": 4.5,
    "sentiment_distribution": {
      "positive": 1070,
      "neutral": 211,
      "negative": 127
    },
    "aspects": {
      "Motor Reliability": {
        "positive_ratio": 0.96,
        "mentions": 1120
      },
      "Continuous Running": {
        "positive_ratio": 0.94,
        "mentions": 940
      },
      "Grinding Speed": {
        "positive_ratio": 0.93,
        "mentions": 880
      },
      "Coupler Life": {
        "positive_ratio": 0.89,
        "mentions": 610
      }
    },
    "positive_themes": [
      "Runs continuously without thermal cutoff even during bulk festive cooking",
      "Exceptional motor longevity praised by commercial and home users alike",
      "22,000 RPM blade velocity yields ultra-fine spice powders"
    ],
    "negative_themes": [
      "Traditional industrial aesthetic looks utilitarian compared to modern sleek competitors"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Motor Endurance & Reliability",
        "score": 96.0,
        "evidence_count": 1120,
        "trend": "improving",
        "explanation": "Double ball bearing motor withstands 90-min heavy duty continuous load."
      },
      {
        "dimension": "Grinding Fineness",
        "score": 93.0,
        "evidence_count": 880,
        "trend": "stable",
        "explanation": "High velocity blade action produces consistent fine powders."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 89.0,
        "review_count": 211,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 89.7,
        "review_count": 253,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 90.5,
        "review_count": 309,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 91.1,
        "review_count": 295,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 91.5,
        "review_count": 337,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_suja_sujata_dynamix_900w_1",
        "author": "Verified Customer 1",
        "rating": 4.0,
        "date": "2019-10-21",
        "review_text": "Purchased this recently for a deal during a sale, after getting good feedback about this Mixer Grinder. Have used the dome Jar for wet grinding for Iddli,Dosha etc., and it was so quick compared to my 750 watts old mixie, and the grinding was also good and smooth. Noise was also ",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_suja_sujata_dynamix_900w_2",
        "author": "Verified Customer 2",
        "rating": 3.0,
        "date": "2026-09-23",
        "review_text": "Decided to buy Sujata mixie after looking at reviews of many users of different brands of mixer grinders and also after physically looking and feeling three of three brands namely Sujata, Preeti and Ultra , short listed by me, at stores. It was difficult to choose between Ultra a",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_suja_sujata_dynamix_900w_3",
        "author": "Verified Customer 3",
        "rating": 5.0,
        "date": "2026-09-23",
        "review_text": "POINTERS for those who are in search of a new very good mixer cum grinder: 1. Sujata BRAND MACHINE - DYNAMIX DX 900W, is an UNKNOWN IN MARKET, BUT A SILENT HIGH PERFORMER 2. this machine easily beats hollow all the those well known brands and in market in this category like Preet",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_pree_preethi_zodiac_mg_218_75",
    "brand_id": "brd_preethi",
    "brand_name": "Preethi Kitchen Appliances",
    "name": "Preethi Zodiac MG-218 750W Mixer Grinder & Food Processor",
    "category": "Kitchen Appliances",
    "model": "MG-218",
    "version": "v2.0",
    "price": 8499.0,
    "description": "All-in-one 750W mixer grinder with Master Chef+ food processor jar for atta kneading, chopping, slicing, and citrus juicing.",
    "features": {
      "Power": "750 Watts Vega W5 Motor",
      "Jars": "5 Jars including Master Chef+ Food Processor",
      "Kneading": "Atta Kneading in 1 Minute",
      "Cooling": "3D Airflow Cooling Technology"
    },
    "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 87.0,
    "confidence": 0.94,
    "review_count": 1301,
    "rating": 4.3,
    "sentiment_distribution": {
      "positive": 988,
      "neutral": 195,
      "negative": 118
    },
    "aspects": {
      "Food Processor Jar": {
        "positive_ratio": 0.92,
        "mentions": 840
      },
      "Atta Kneading": {
        "positive_ratio": 0.94,
        "mentions": 920
      },
      "Grinding Speed": {
        "positive_ratio": 0.88,
        "mentions": 780
      },
      "Cleaning & Maintenance": {
        "positive_ratio": 0.74,
        "mentions": 520
      }
    },
    "positive_themes": [
      "Master Chef jar kneads soft roti dough in just 60 seconds",
      "Replaces multiple standalone kitchen gadgets effectively"
    ],
    "negative_themes": [
      "Multiple jar attachments require generous kitchen cabinet storage"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Versatility & Attachments",
        "score": 93.0,
        "evidence_count": 920,
        "trend": "stable",
        "explanation": "Master Chef jar performs 7 distinct culinary prep tasks flawlessly."
      },
      {
        "dimension": "Motor Efficiency",
        "score": 87.0,
        "evidence_count": 780,
        "trend": "improving",
        "explanation": "750W Vega W5 motor delivers consistent torque."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 84.5,
        "review_count": 195,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 85.2,
        "review_count": 234,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 86.0,
        "review_count": 286,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 86.6,
        "review_count": 273,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 87.0,
        "review_count": 312,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_pree_preethi_zodiac_mg_218_75_1",
        "author": "Verified Customer 1",
        "rating": 1.0,
        "date": "2026-09-23",
        "review_text": "Built Quality :- Let's start from the built quality, Although the product looks premium in the advertisements, in reality, the plastic used is of VERY AVERAGE quality. JARS ARE ALL PLASTIC which was not expected at this price point...Average build was not expected from such a rep",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_pree_preethi_zodiac_mg_218_75_2",
        "author": "Verified Customer 2",
        "rating": 2.0,
        "date": "2026-09-23",
        "review_text": "I am using this product from May 17. I was expecting a super performance quality for the price I have paid. But it's turns out to be normal. There is no doubt that product looks great, quality of plastic and steel used are great. But when it comes to performance I would give it 2",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_pree_preethi_zodiac_mg_218_75_3",
        "author": "Verified Customer 3",
        "rating": 1.0,
        "date": "2019-10-31",
        "review_text": "As of OCT-31-2019, there are over 250 people who has given bad reviews on this mixer. And I do agree with them because the quality of this 750W mixer grinder compared to the better Brand competitors like Bosch and Ultra, who offers you 1000W for lesser price than Preeti. I'm writ",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_baja_bajaj_rex_500w_mixer_gri",
    "brand_id": "brd_bajaj",
    "brand_name": "Bajaj Electricals",
    "name": "Bajaj Rex 500W Mixer Grinder with 3 Jars",
    "category": "Kitchen Appliances",
    "model": "Rex 500W",
    "version": "v1.0",
    "price": 2199.0,
    "description": "Compact and budget-friendly 500W mixer grinder with 3 stainless steel jars, multi-functional blade systems, and easy-grip handles.",
    "features": {
      "Power": "500 Watts Motor",
      "Jars": "3 Stainless Steel Jars",
      "Overload": "Vacuum Feet & Overload Protection",
      "Value": "Top Budget Kitchen Appliance in India"
    },
    "image_url": "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 83.4,
    "confidence": 0.93,
    "review_count": 1410,
    "rating": 4.1,
    "sentiment_distribution": {
      "positive": 1071,
      "neutral": 211,
      "negative": 128
    },
    "aspects": {
      "Value for Money": {
        "positive_ratio": 0.94,
        "mentions": 1120
      },
      "Compact Size": {
        "positive_ratio": 0.9,
        "mentions": 780
      },
      "Daily Chutney Grinding": {
        "positive_ratio": 0.86,
        "mentions": 840
      },
      "Heavy Masala Handling": {
        "positive_ratio": 0.62,
        "mentions": 480
      }
    },
    "positive_themes": [
      "Unbeatable price-to-performance for small Indian families and bachelors",
      "Quick chutney and purees prepared in under 30 seconds"
    ],
    "negative_themes": [
      "Motor warms up when grinding extremely dry whole turmeric roots"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Value & Economy",
        "score": 94.0,
        "evidence_count": 1120,
        "trend": "stable",
        "explanation": "Paisa vasool budget option for everyday essential kitchen tasks."
      },
      {
        "dimension": "Compact Usability",
        "score": 88.0,
        "evidence_count": 780,
        "trend": "stable",
        "explanation": "Fits on small counter spaces with secure vacuum feet."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 80.9,
        "review_count": 211,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 81.6,
        "review_count": 253,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 82.4,
        "review_count": 310,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 83.0,
        "review_count": 296,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 83.4,
        "review_count": 338,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_baja_bajaj_rex_500w_mixer_gri_1",
        "author": "Verified Customer 1",
        "rating": 1.0,
        "date": "2026-09-23",
        "review_text": "I couldn't find any better option to update my concern on the delivery of the product - hence posting at this place {if this is not the right place - kindly update at the concerned location) #1: Though I ordered this as a gift to my cousin and at a remote place - Amazon made exce",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_baja_bajaj_rex_500w_mixer_gri_2",
        "author": "Verified Customer 2",
        "rating": 3.0,
        "date": "2026-09-23",
        "review_text": "Bought in April 2018, so reviewing it after nearly 1.5 years of use. What I liked: - Blades are sharp and very effective. Nothing to complain about even after 1.5 years of regular use - Compact and occupies less space on the kitchen counter - Elegant looks and aesthetics at a rea",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_baja_bajaj_rex_500w_mixer_gri_3",
        "author": "Verified Customer 3",
        "rating": 5.0,
        "date": "2026-09-23",
        "review_text": "It's a good machine. It was received in good condition without any breakages or flaws as I saw in numerous reviews hence was a little skeptical, but nothing of the sought happened. However it falls behind on the following pointers: 1. You cannot make the batter for idlis and dosa",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_phil_philips_viva_collection",
    "brand_id": "brd_philips",
    "brand_name": "Philips Domestic Appliances",
    "name": "Philips Viva Collection 300W Hand Mixer",
    "category": "Kitchen Appliances",
    "model": "HR3705/10",
    "version": "v1.0",
    "price": 2450.0,
    "description": "Ergonomic 300W hand mixer with 5 speed settings, stainless steel strip beaters, and dough hooks for baking.",
    "features": {
      "Power": "300 Watts Motor",
      "Speeds": "5 Speeds + Turbo Pulse",
      "Beaters": "Cone-Shaped Beaters for Maximum Air Incorporation",
      "Weight": "850g Ergonomic Lightweight"
    },
    "image_url": "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 89.2,
    "confidence": 0.95,
    "review_count": 1222,
    "rating": 4.4,
    "sentiment_distribution": {
      "positive": 928,
      "neutral": 183,
      "negative": 111
    },
    "aspects": {
      "Whipping & Aeration": {
        "positive_ratio": 0.95,
        "mentions": 910
      },
      "Cake Batter": {
        "positive_ratio": 0.93,
        "mentions": 850
      },
      "Weight & Grip": {
        "positive_ratio": 0.92,
        "mentions": 680
      },
      "Dough Kneading": {
        "positive_ratio": 0.72,
        "mentions": 380
      }
    },
    "positive_themes": [
      "Whips heavy whipping cream into stiff peaks in under 4 minutes",
      "Whisper quiet operation compared to bulky stand mixers"
    ],
    "negative_themes": [
      "Dough hooks are suitable for soft cookies, not stiff sourdough"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Baking & Aeration Quality",
        "score": 95.0,
        "evidence_count": 910,
        "trend": "improving",
        "explanation": "Cone beaters whip 20% faster air volume for fluffy sponges."
      },
      {
        "dimension": "Ergonomics",
        "score": 91.0,
        "evidence_count": 680,
        "trend": "stable",
        "explanation": "Lightweight body prevents wrist fatigue during extended baking."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 86.7,
        "review_count": 183,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 87.4,
        "review_count": 219,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 88.2,
        "review_count": 268,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 88.8,
        "review_count": 256,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 89.2,
        "review_count": 293,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_phil_philips_viva_collection_1",
        "author": "Verified Customer 1",
        "rating": 4.0,
        "date": "2026-09-23",
        "review_text": "So first let me talk about my delivery experience. I ordered it for the first time and got the package in a very bad condition. The package didnt have the amazon packaging and the whole product box was torn, looking at this I immediately returned it and got a replacement. Upon re",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_phil_philips_viva_collection_2",
        "author": "Verified Customer 2",
        "rating": 1.0,
        "date": "2026-09-23",
        "review_text": "not . . I could purchase local brand but I thought I should go for reliable and famous brand Philips but I am very disappointed with steel quality of attachment. Moter quality is good. You given turbo speed, it is also good but your steel quality poor than local brand. My friend ",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_phil_philips_viva_collection_3",
        "author": "Verified Customer 3",
        "rating": 1.0,
        "date": "2026-09-23",
        "review_text": "the attachment snapped after using the machine only a couple times, there is no replacement for the whisk blades , neither can I return the product. It's basically useless now. I tried using it with the broken attachment and now all the joints have come apart. Such a faulty desig",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_phil_philips_hl7756_00_750w_m",
    "brand_id": "brd_philips",
    "brand_name": "Philips Domestic Appliances",
    "name": "Philips HL7756/00 750W Mixer Grinder with 3 Jars",
    "category": "Kitchen Appliances",
    "model": "HL7756/00",
    "version": "v1.0",
    "price": 3899.0,
    "description": "750W Turbo motor mixer grinder with advanced air ventilation system and specialized blades for tough ingredients.",
    "features": {
      "Power": "750 Watts Turbo Motor",
      "Jars": "3 Stainless Steel Jars with Triangular Body",
      "Ventilation": "Advanced Air Ventilation System",
      "Blades": "Specialized Stainless Steel Blades"
    },
    "image_url": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 85.0,
    "confidence": 0.93,
    "review_count": 856,
    "rating": 4.2,
    "sentiment_distribution": {
      "positive": 650,
      "neutral": 128,
      "negative": 78
    },
    "aspects": {
      "Grinding Speed": {
        "positive_ratio": 0.9,
        "mentions": 620
      },
      "Jar Quality": {
        "positive_ratio": 0.88,
        "mentions": 580
      },
      "Lid Gaskets": {
        "positive_ratio": 0.78,
        "mentions": 410
      },
      "Noise Level": {
        "positive_ratio": 0.65,
        "mentions": 390
      }
    },
    "positive_themes": [
      "Triangular jar shape circulates batter smoothly towards the blades",
      "Tough motor tackles soaked lentils and raw masalas cleanly"
    ],
    "negative_themes": [
      "Transparent lid clamps require careful alignment when latching"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Air Ventilation & Cooling",
        "score": 89.0,
        "evidence_count": 580,
        "trend": "stable",
        "explanation": "Prevents motor overheating during consecutive grinding cycles."
      },
      {
        "dimension": "Blade Throughput",
        "score": 87.0,
        "evidence_count": 620,
        "trend": "improving",
        "explanation": "Precision blades grind uniform textured gravies."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 82.5,
        "review_count": 128,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 83.2,
        "review_count": 154,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 84.0,
        "review_count": 188,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 84.6,
        "review_count": 179,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 85.0,
        "review_count": 205,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_phil_philips_hl7756_00_750w_m_1",
        "author": "Verified Customer 1",
        "rating": 1.0,
        "date": "2026-09-23",
        "review_text": "THIS IS THE WORST PRODUCT I GOT ON AMAZON AND WORST SERVICE. HANDLE IS BROKEN. ON THE JARS INSIDE YOU WILL SEE BIG SCREWS. WHEN YOU WILL USE IT SLOWLY AND STREADLY THE FOOD MATERIAL STARTS TO DEPOSITE IN THE SCREWS AND YOUR JARS STARTS TO SMELL BED. NO GASKET ON THE SMALL GRINDER",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_phil_philips_hl7756_00_750w_m_2",
        "author": "Verified Customer 2",
        "rating": 1.0,
        "date": "2020-11-26",
        "review_text": "To everyone who's thinking to go for grinder please save yourself from the trouble. We have used it for many purpose but it's of no use . First of all, this product is only for dry grinding both small and medium with opaque lid and for wet grinding the biggest jar with transparen",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_phil_philips_hl7756_00_750w_m_3",
        "author": "Verified Customer 3",
        "rating": 2.0,
        "date": "2026-09-23",
        "review_text": "A very smart looking product by Philips. I am a long-standing customer of Philips. Whether its the electric razors that the men in the family use or its the juicer or the toaster or the mixer grinder that i use. Before I ordered this mixer in October 2019 I had been using a Phili",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_pree_preethi_blue_leaf_expert",
    "brand_id": "brd_preethi",
    "brand_name": "Preethi Kitchen Appliances",
    "name": "Preethi Blue Leaf Expert 750W Mixer Grinder",
    "category": "Kitchen Appliances",
    "model": "Blue Leaf Expert",
    "version": "v1.0",
    "price": 4299.0,
    "description": "Iconic South Indian household 750W mixer grinder engineered for authentic sambar masala, chutney, and dosa batter.",
    "features": {
      "Power": "750 Watts Motor",
      "Jars": "4 Stainless Steel Jars including Flexi Lid",
      "Blades": "Machine Ground & Polished Blades",
      "Heritage": "Over 3 Decades of South Indian Kitchen Trust"
    },
    "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 88.0,
    "confidence": 0.94,
    "review_count": 798,
    "rating": 4.4,
    "sentiment_distribution": {
      "positive": 606,
      "neutral": 119,
      "negative": 73
    },
    "aspects": {
      "Dosa & Idli Batter": {
        "positive_ratio": 0.95,
        "mentions": 640
      },
      "Chutney Texture": {
        "positive_ratio": 0.94,
        "mentions": 580
      },
      "Motor Longevity": {
        "positive_ratio": 0.91,
        "mentions": 490
      },
      "Coupler Durability": {
        "positive_ratio": 0.86,
        "mentions": 340
      }
    },
    "positive_themes": [
      "Fluffy, aerated idli batter consistency identical to traditional stone wet grinders",
      "Rugged build quality lasts for years of daily breakfast preparation"
    ],
    "negative_themes": [
      "Slight burning rubber smell on first 2 uses as factory motor brushes bed in"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Culinary Texture Authenticity",
        "score": 95.0,
        "evidence_count": 640,
        "trend": "stable",
        "explanation": "Perfected for South Indian grinding physics and batter aeration."
      },
      {
        "dimension": "Hardware Longevity",
        "score": 90.0,
        "evidence_count": 490,
        "trend": "improving",
        "explanation": "Sturdy nylon couplers and heat-resistant ABS outer housing."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 85.5,
        "review_count": 119,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 86.2,
        "review_count": 143,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 87.0,
        "review_count": 175,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 87.6,
        "review_count": 167,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 88.0,
        "review_count": 191,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_pree_preethi_blue_leaf_expert_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-23",
        "review_text": "It was time to replace my Preethi Nitro Plus (110Volts) which I purchased in the US about 6 years ago. It served me well in Bangalore too. But slowly, the blades, jars tops and motor started to give way. For 6 years I never once had to service it. I ordered the Preethi Zion but i",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_pree_preethi_blue_leaf_expert_2",
        "author": "Verified Customer 2",
        "rating": 1.0,
        "date": "2026-09-23",
        "review_text": "I purchased this Preethi Diamond Mixer Grinder after recommendations from My friends but lookslike Preethi manufacturing substandard products and cheats customers with fake promises. I will highlight a few points which clarifies your doubt and reconsiderations: 1: Motor heats up ",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_pree_preethi_blue_leaf_expert_3",
        "author": "Verified Customer 3",
        "rating": 5.0,
        "date": "2026-09-23",
        "review_text": "It was my first ever purchase of mixer exceeding 550W. So I was a bit curious to what power it can deliver. I just put the chutney grinder with nothing inside it and turned to whip mode. To my astonishment, the whole body of mixer grinder turned at once (not exaggerating). Ooofff",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_mama_mamaearth_onion_hair_oil",
    "brand_id": "brd_mamaearth",
    "brand_name": "Mamaearth India",
    "name": "Mamaearth Onion Hair Oil with Redensyl for Hair Fall Control",
    "category": "Beauty & Personal Care",
    "model": "Onion Oil 250ml",
    "version": "v2.0",
    "price": 539.0,
    "description": "Dermatologist-tested toxin-free onion hair oil powered by Redensyl, Onion Seed Oil, and Almond Oil to reduce hair fall and boost hair growth.",
    "features": {
      "Actives": "Redensyl + Onion Seed Oil + Plant Keratin",
      "Volume": "250 ml with Comb Applicator",
      "Safety": "No Mineral Oil, Silicones, or Parabens",
      "Suitability": "All Hair Types & Color Treated Hair"
    },
    "image_url": "https://images.unsplash.com/photo-1608248597359-54030623f993?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 86.4,
    "confidence": 0.94,
    "review_count": 1450,
    "rating": 4.3,
    "sentiment_distribution": {
      "positive": 1102,
      "neutral": 217,
      "negative": 131
    },
    "aspects": {
      "Hair Fall Reduction": {
        "positive_ratio": 0.89,
        "mentions": 1120
      },
      "Comb Applicator": {
        "positive_ratio": 0.94,
        "mentions": 780
      },
      "Non-Sticky Feel": {
        "positive_ratio": 0.85,
        "mentions": 940
      },
      "Fragrance": {
        "positive_ratio": 0.82,
        "mentions": 610
      }
    },
    "positive_themes": [
      "Noticeable decrease in hair strands on brush after 4-6 weeks of consistent massage",
      "Built-in comb applicator distributes oil directly onto roots without messy hands",
      "Pleasant floral scent masks traditional pungent onion smell completely"
    ],
    "negative_themes": [
      "Comb applicator cap threads can loosen if dropped from shower ledge"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Hair Fall Control Efficacy",
        "score": 89.0,
        "evidence_count": 1120,
        "trend": "improving",
        "explanation": "Redensyl peptide active invigorates dormant follicles."
      },
      {
        "dimension": "Application Ergonomics",
        "score": 93.0,
        "evidence_count": 780,
        "trend": "stable",
        "explanation": "Deep root comb applicator simplifies targeted scalp application."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 83.9,
        "review_count": 217,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 84.6,
        "review_count": 261,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 85.4,
        "review_count": 319,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 86.0,
        "review_count": 304,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 86.4,
        "review_count": 348,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_mama_mamaearth_onion_hair_oil_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2020-01-23",
        "review_text": " It has a pleasant smell. You don't need to apply in large quantity. Even though it has walnut beads, but it's not like an intense scrubber, you can use daily. Apply some face moisturizer after this. Consistency is not liquidy. (see the image). KEY INGREDIENTS: Stearic Acid:It ha",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_mama_mamaearth_onion_hair_oil_2",
        "author": "Verified Customer 2",
        "rating": 5.0,
        "date": "2020-01-23",
        "review_text": " It has a pleasant smell. You don't need to apply in large quantity. Even though it has walnut beads, but it's not like an intense scrubber, you can use daily. Apply some face moisturizer after this. Consistency is not liquidy. (see the image). KEY INGREDIENTS: Stearic Acid:It ha",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_mama_mamaearth_onion_hair_oil_3",
        "author": "Verified Customer 3",
        "rating": 5.0,
        "date": "2020-01-23",
        "review_text": " It has a pleasant smell. You don't need to apply in large quantity. Even though it has walnut beads, but it's not like an intense scrubber, you can use daily. Apply some face moisturizer after this. Consistency is not liquidy. (see the image). KEY INGREDIENTS: Stearic Acid:It ha",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_001",
    "brand_id": "brd_001",
    "brand_name": "Apex Mobile",
    "name": "Apex Phone Pro X (India Edition)",
    "category": "Smartphone",
    "model": "Pro X",
    "version": "v2.1",
    "price": 69999.0,
    "description": "Flagship 5G smartphone featuring 120Hz LTPO AMOLED display, Sony IMX camera sensor, 5000mAh battery, and 80W fast charging.",
    "features": {
      "RAM": "12GB LPDDR5X",
      "Storage": "256GB UFS 4.0",
      "Screen": "6.7 inch 120Hz LTPO AMOLED",
      "Processor": "Snapdragon 8 Gen 3",
      "Battery": "5000 mAh + 80W SuperVOOC",
      "5G": "14 Global & Indian Bands"
    },
    "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 87.4,
    "confidence": 0.94,
    "review_count": 2430,
    "rating": 4.4,
    "sentiment_distribution": {
      "positive": 1846,
      "neutral": 364,
      "negative": 220
    },
    "aspects": {
      "Display Quality": {
        "positive_ratio": 0.94,
        "mentions": 890
      },
      "Camera Performance": {
        "positive_ratio": 0.91,
        "mentions": 1120
      },
      "Fast Charging": {
        "positive_ratio": 0.89,
        "mentions": 640
      },
      "Battery Life": {
        "positive_ratio": 0.74,
        "mentions": 980
      },
      "Thermal Performance": {
        "positive_ratio": 0.62,
        "mentions": 450
      }
    },
    "positive_themes": [
      "Phenomenal low-light photography with Sony sensor in night mode",
      "Vibrant 120Hz AMOLED display with high outdoor sunlight visibility",
      "Super fast 80W charging reaches 100% in 32 minutes"
    ],
    "negative_themes": [
      "Noticeable thermal warming during extended 4K 60fps video recording",
      "Battery drain accelerates slightly during intense 5G gaming in warm climates"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Display & Visuals",
        "score": 94.0,
        "evidence_count": 890,
        "trend": "improving",
        "explanation": "Class-leading brightness and color accuracy praised across 94% of verified reviews."
      },
      {
        "dimension": "Camera & Optics",
        "score": 91.5,
        "evidence_count": 1120,
        "trend": "stable",
        "explanation": "Sony IMX flagship sensor delivers sharp, realistic HDR images without oversaturation."
      },
      {
        "dimension": "Thermal & Efficiency",
        "score": 68.0,
        "evidence_count": 450,
        "trend": "stable",
        "explanation": "Minor warming tracked during prolonged compute loads."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 84.9,
        "review_count": 364,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 85.6,
        "review_count": 437,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 86.4,
        "review_count": 534,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 87.0,
        "review_count": 510,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 87.4,
        "review_count": 583,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_001_1",
        "author": "Verified Customer 1",
        "rating": 4.0,
        "date": "2026-09-22",
        "review_text": "update 15082020never give chance regret go aheadthe icons looks great set spherlue icons theam looks better dark mode even though 6000 mah always leaves phone charging go bed like see phone 100 every morning turned fast charging option affect batterymonster 1 battery 55two day ba",
        "location": "Pune, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_001_2",
        "author": "Verified Customer 2",
        "rating": 4.0,
        "date": "2026-09-22",
        "review_text": "update 15082020never give chance regret go aheadthe icons looks great set spherlue icons theam looks better dark mode even though 6000 mah always leaves phone charging go bed like see phone 100 every morning turned fast charging option affect batterymonster 1 battery 55two day ba",
        "location": "Hyderabad, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_001_3",
        "author": "Verified Customer 3",
        "rating": 2.0,
        "date": "2026-09-22",
        "review_text": "even realme performs betterfew issues concerned use were1 recording slow motion videosthere always flicker screen2 fingerprint sensor needs attempts work3 camera better realme good redmi4 battery survives one half daywhich bad till using whatsapp calli wonder happen use gaming5 h",
        "location": "Pune, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_sams_redmi_8a_dual_sea_blue_2",
    "brand_id": "brd_redmi",
    "brand_name": "Redmi Xiaomi",
    "name": "Redmi 8A Dual (Sea Blue, 5000mAh Battery)",
    "category": "Smartphone",
    "model": "8A Dual",
    "version": "v1.0",
    "price": 8499.0,
    "description": "Reliable budget smartphone featuring 5000mAh high-capacity battery, dual AI cameras, USB Type-C 18W fast charging, and Aura XGrip design.",
    "features": {
      "Battery": "5000 mAh High Capacity",
      "Screen": "6.22 inch HD+ Dot Notch Display",
      "Charging": "18W Fast Charge Type-C",
      "Camera": "13MP + 2MP Dual AI Camera"
    },
    "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 85.2,
    "confidence": 0.92,
    "review_count": 1280,
    "rating": 4.3,
    "sentiment_distribution": {
      "positive": 972,
      "neutral": 192,
      "negative": 116
    },
    "aspects": {
      "Battery Life": {
        "positive_ratio": 0.95,
        "mentions": 980
      },
      "Value for Money": {
        "positive_ratio": 0.94,
        "mentions": 920
      },
      "Build & Grip": {
        "positive_ratio": 0.88,
        "mentions": 610
      },
      "Gaming Performance": {
        "positive_ratio": 0.65,
        "mentions": 440
      }
    },
    "positive_themes": [
      "2-day real world battery endurance on a single charge",
      "Type-C port at this budget price point is a huge plus"
    ],
    "negative_themes": [
      "Entry level processor experiences frame drops on heavy games like BGMI"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Battery Endurance",
        "score": 95.0,
        "evidence_count": 980,
        "trend": "stable",
        "explanation": "5000mAh cell easily powers 48 hours of normal usage."
      },
      {
        "dimension": "Budget Value",
        "score": 93.0,
        "evidence_count": 920,
        "trend": "stable",
        "explanation": "Solid entry phone for students and parents."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 82.7,
        "review_count": 192,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 83.4,
        "review_count": 230,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 84.2,
        "review_count": 281,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 84.8,
        "review_count": 268,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 85.2,
        "review_count": 307,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_sams_redmi_8a_dual_sea_blue_2_1",
        "author": "Verified Customer 1",
        "rating": 3.0,
        "date": "2026-09-23",
        "review_text": "redmi 8a dual review01 screen recorder pixelated distortions 1502 camera quality 8 mp front 25 rear 132 mp 35 camera pro advantage 4503 sound reasonably good loud 4504 picture video display qualityresolution good one 5505 audio recording decent quality 5506 image editing filters ",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_sams_redmi_8a_dual_sea_blue_2_2",
        "author": "Verified Customer 2",
        "rating": 3.0,
        "date": "2026-09-23",
        "review_text": "redmi 8a dual review01 screen recorder pixelated distortions 1502 camera quality 8 mp front 25 rear 132 mp 35 camera pro advantage 4503 sound reasonably good loud 4504 picture video display qualityresolution good one 5505 audio recording decent quality 5506 image editing filters ",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_sams_redmi_8a_dual_sea_blue_2_3",
        "author": "Verified Customer 3",
        "rating": 3.0,
        "date": "2026-09-23",
        "review_text": "redmi 8a dual review01 screen recorder pixelated distortions 1502 camera quality 8 mp front 25 rear 132 mp 35 camera pro advantage 4503 sound reasonably good loud 4504 picture video display qualityresolution good one 5505 audio recording decent quality 5506 image editing filters ",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_sams_samsung_galaxy_m31_ocean",
    "brand_id": "brd_samsung",
    "brand_name": "Samsung India",
    "name": "Samsung Galaxy M31 (Ocean Blue, 6000mAh Battery, Super AMOLED)",
    "category": "Smartphone",
    "model": "Galaxy M31",
    "version": "v1.0",
    "price": 16499.0,
    "description": "Mega-battery powerhouse with 6000mAh cell, 64MP Quad Camera, FHD+ sAMOLED Infinity-U display, and Dolby Atmos audio.",
    "features": {
      "Battery": "6000 mAh Monster Battery",
      "Screen": "6.4 inch FHD+ Super AMOLED",
      "Camera": "64MP Quad Camera Array",
      "Storage": "6GB RAM / 128GB Storage"
    },
    "image_url": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 88.6,
    "confidence": 0.95,
    "review_count": 1820,
    "rating": 4.4,
    "sentiment_distribution": {
      "positive": 1383,
      "neutral": 273,
      "negative": 164
    },
    "aspects": {
      "Display Vibrancy": {
        "positive_ratio": 0.96,
        "mentions": 1140
      },
      "Monster Battery": {
        "positive_ratio": 0.95,
        "mentions": 1280
      },
      "Camera Clarity": {
        "positive_ratio": 0.88,
        "mentions": 940
      },
      "Charging Speed": {
        "positive_ratio": 0.72,
        "mentions": 580
      }
    },
    "positive_themes": [
      "Super AMOLED screen makes streaming Netflix and Hotstar a joy",
      "Massive 6000mAh battery refuses to die even after a full day of hotspot usage"
    ],
    "negative_themes": [
      "15W bundled charger takes about 2 hours to fully fill the huge 6000mAh battery"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Super AMOLED Display",
        "score": 96.0,
        "evidence_count": 1140,
        "trend": "stable",
        "explanation": "Deep blacks and vivid contrast elevate all multimedia."
      },
      {
        "dimension": "Battery Capacity",
        "score": 95.0,
        "evidence_count": 1280,
        "trend": "stable",
        "explanation": "6000mAh cell is a market benchmark in stamina."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 86.1,
        "review_count": 273,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 86.8,
        "review_count": 327,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 87.6,
        "review_count": 400,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 88.2,
        "review_count": 382,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 88.6,
        "review_count": 436,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_sams_samsung_galaxy_m31_ocean_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-23",
        "review_text": "lets get straight ponit main motive play graphic intensive games pubgcodasphaltetc back button top left though samsung m31 good phone phones price range better gamingbutalso read rest performancethe combination m31 processor exynos9611 operating system one ui 20 give level perfor",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_sams_samsung_galaxy_m31_ocean_2",
        "author": "Verified Customer 2",
        "rating": 5.0,
        "date": "2026-09-23",
        "review_text": "lets get straight ponit main motive play graphic intensive games pubgcodasphaltetc back button top left though samsung m31 good phone phones price range better gamingbutalso read rest performancethe combination m31 processor exynos9611 operating system one ui 20 give level perfor",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_sams_samsung_galaxy_m31_ocean_3",
        "author": "Verified Customer 3",
        "rating": 5.0,
        "date": "2026-09-23",
        "review_text": "best thing get price reputed brand made india tag first time ordered first day online launch happy im writing days usage different experience samsung consistent compared mobile brands ive used earliergood android 10 beautiful looks finally delete sms notification display excellen",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_002",
    "brand_id": "brd_002",
    "brand_name": "Zenith Tech",
    "name": "ZenithBook Ultra 15 Pro",
    "category": "Laptop",
    "model": "Ultra 15",
    "version": "v1.2",
    "price": 114990.0,
    "description": "Ultra-thin developer workstation laptop with 16-core CPU, high refresh screen, 32GB RAM, and CNC lightweight aluminum unibody.",
    "features": {
      "Processor": "Intel Core Ultra 9 / 16-Core",
      "RAM": "32GB LPDDR5X",
      "Storage": "1TB PCIe Gen4 SSD",
      "Screen": "15.6 inch 3.2K OLED 120Hz",
      "Weight": "1.38 kg",
      "Battery": "82Wh (Up to 12 Hours)"
    },
    "image_url": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 91.2,
    "confidence": 0.96,
    "review_count": 1840,
    "rating": 4.6,
    "sentiment_distribution": {
      "positive": 1398,
      "neutral": 276,
      "negative": 166
    },
    "aspects": {
      "Processing Speed": {
        "positive_ratio": 0.96,
        "mentions": 920
      },
      "Keyboard & Trackpad": {
        "positive_ratio": 0.93,
        "mentions": 710
      },
      "Battery Life": {
        "positive_ratio": 0.88,
        "mentions": 840
      },
      "Build & Portability": {
        "positive_ratio": 0.92,
        "mentions": 630
      },
      "Thermals & Fan Noise": {
        "positive_ratio": 0.76,
        "mentions": 490
      }
    },
    "positive_themes": [
      "Incredible CPU throughput during Docker builds and PyTorch compilations",
      "Silky glass trackpad and tactile scissor keyboard layout",
      "Real-world 11-12 hour battery life with silent quiet-mode profile"
    ],
    "negative_themes": [
      "Fan ramp-up sound is audible during prolonged 100% CPU thread loads"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Computational Throughput",
        "score": 96.0,
        "evidence_count": 920,
        "trend": "stable",
        "explanation": "Handles heavy IDEs and local LLM fine-tuning without thermal throttling."
      },
      {
        "dimension": "Ergonomics & Keyboard",
        "score": 93.0,
        "evidence_count": 710,
        "trend": "improving",
        "explanation": "1.5mm key travel and solid zero-flex deck praised by developers."
      },
      {
        "dimension": "Portability & Battery",
        "score": 89.5,
        "evidence_count": 840,
        "trend": "stable",
        "explanation": "Sub-1.4kg chassis fits easily in backpacks for daily commuter transit."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 88.7,
        "review_count": 276,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 89.4,
        "review_count": 331,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 90.2,
        "review_count": 404,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 90.8,
        "review_count": 386,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 91.2,
        "review_count": 441,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_002_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Keyboard action and trackpad responsiveness are elite. Ideal machine for Indian software engineers and developers.",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_002_2",
        "author": "Verified Customer 2",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Screen refresh rate makes scrolling incredibly smooth. Gaming performance is top-notch for the price range.",
        "location": "California",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_002_3",
        "author": "Verified Customer 3",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Processor handles everything I throw at it  video editing, gaming, multitasking. Zero throttling noticed.",
        "location": "Texas",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_003",
    "brand_id": "brd_003",
    "brand_name": "SoundPulse",
    "name": "SoundPulse NoiseCancel 700 ANC",
    "category": "Headphones",
    "model": "NC700",
    "version": "v1.0",
    "price": 8999.0,
    "description": "Active noise canceling over-ear headphones with 40-hour battery life, custom 40mm graphene drivers, and deep bass signature.",
    "features": {
      "ANC": "38dB Hybrid Active Noise Cancellation",
      "Battery": "40 Hours Playback",
      "Bluetooth": "5.3 Multi-point Connectivity",
      "Weight": "235g Ergonomic Earcups"
    },
    "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 89.1,
    "confidence": 0.93,
    "review_count": 3120,
    "rating": 4.5,
    "sentiment_distribution": {
      "positive": 2371,
      "neutral": 468,
      "negative": 281
    },
    "aspects": {
      "Noise Cancellation": {
        "positive_ratio": 0.92,
        "mentions": 1420
      },
      "Sound Quality": {
        "positive_ratio": 0.9,
        "mentions": 1890
      },
      "Battery Life": {
        "positive_ratio": 0.94,
        "mentions": 1200
      },
      "Comfort & Fit": {
        "positive_ratio": 0.86,
        "mentions": 950
      },
      "Connectivity": {
        "positive_ratio": 0.78,
        "mentions": 640
      }
    },
    "positive_themes": [
      "Outstanding noise cancellation in Metro commutes and busy flights",
      "Rich deep punchy bass without muddying high frequency vocals",
      "Easily lasts an entire week on a single recharge"
    ],
    "negative_themes": [
      "Occasional Bluetooth audio stutter when switching between PC and Android smartphone"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Noise Cancellation",
        "score": 92.5,
        "evidence_count": 1420,
        "trend": "improving",
        "explanation": "Filters traffic drone and ambient office hum effectively."
      },
      {
        "dimension": "Acoustic Clarity & Bass",
        "score": 90.0,
        "evidence_count": 1890,
        "trend": "stable",
        "explanation": "Balanced response with deep low-end resonance suited for varied music genres."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 86.6,
        "review_count": 468,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 87.3,
        "review_count": 561,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 88.1,
        "review_count": 686,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 88.7,
        "review_count": 655,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 89.1,
        "review_count": 748,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_003_1",
        "author": "Verified Customer 1",
        "rating": 1.0,
        "date": "2026-09-22",
        "review_text": "Product just smells similar to navarathna hair oil .. but not strong as that and oil is not sticky after applying three drops of oil !! More review after usage of 2 months1) worst product2) hair fall increased a lot3) brought this product after watching YouTube influencer Mumbaik",
        "location": "Kolkata, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_003_2",
        "author": "Verified Customer 2",
        "rating": 4.0,
        "date": "2026-09-22",
        "review_text": "I have been using this product for some time now. My Roommate had this and I had been planning to order for a while now. I just used to forget all the time, finally I have it now.Well from the last 2 months of use, here's my experience with the product:I use it every night and ge",
        "location": "Chennai, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_003_3",
        "author": "Verified Customer 3",
        "rating": 1.0,
        "date": "2026-09-22",
        "review_text": "Product just smells similar to navarathna hair oil .. but not strong as that and oil is not sticky after applying three drops of oil !! More review after usage of 2 months1) worst product2) hair fall increased a lot3) brought this product after watching YouTube influencer Mumbaik",
        "location": "Pune, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_004",
    "brand_id": "brd_004",
    "brand_name": "StrideFootwear",
    "name": "UltraStride Comfort Runner India",
    "category": "Shoes",
    "model": "Comfort 2026",
    "version": "v1.0",
    "price": 3499.0,
    "description": "Ergonomic road running shoes engineered with responsive memory foam arch support and breathable engineered knit mesh.",
    "features": {
      "Sole": "Anti-Skid Natural Rubber Grip",
      "Upper": "Engineered Breathable Mesh",
      "Weight": "240g Lightweight",
      "Cushion": "CloudFoam Dual Density"
    },
    "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 85.6,
    "confidence": 0.92,
    "review_count": 1450,
    "rating": 4.3,
    "sentiment_distribution": {
      "positive": 1102,
      "neutral": 217,
      "negative": 131
    },
    "aspects": {
      "Comfort & Cushioning": {
        "positive_ratio": 0.91,
        "mentions": 820
      },
      "Fit & Arch Support": {
        "positive_ratio": 0.87,
        "mentions": 640
      },
      "Breathability": {
        "positive_ratio": 0.89,
        "mentions": 490
      },
      "Sole Durability": {
        "positive_ratio": 0.72,
        "mentions": 380
      }
    },
    "positive_themes": [
      "Exceptional shock absorption during morning tarmac runs",
      "Featherlight feel with supportive inner arch cage"
    ],
    "negative_themes": [
      "Outer grip lugs show visible wear after 400+ kilometers of rough road running"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Cushioning & Impact",
        "score": 91.0,
        "evidence_count": 820,
        "trend": "stable",
        "explanation": "Minimizes heel strike stress on road and park circuits."
      },
      {
        "dimension": "Fit & Ergonomics",
        "score": 87.0,
        "evidence_count": 640,
        "trend": "improving",
        "explanation": "True to Indian sizing charts with generous toe box room."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 83.1,
        "review_count": 217,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 83.8,
        "review_count": 261,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 84.6,
        "review_count": 319,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 85.2,
        "review_count": 304,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 85.6,
        "review_count": 348,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_004_1",
        "author": "Verified Customer 1",
        "rating": 4.0,
        "date": "2026-09-22",
        "review_text": "Having serious concern with 'Sold by: Cloudtail India' for - Bajaj Rex Mixer Grinder, 500W, 3 Jars",
        "location": "Chennai, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_004_2",
        "author": "Verified Customer 2",
        "rating": 4.0,
        "date": "2026-09-22",
        "review_text": "Don't buy bajaj mixers online. It is not serviceable as per service centre rejected the log.",
        "location": "Kolkata, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_004_3",
        "author": "Verified Customer 3",
        "rating": 4.0,
        "date": "2026-09-22",
        "review_text": "the mixi stopped in between when I was using it, bajaj is a cheater brand, poor exprience",
        "location": "Chennai, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_005",
    "brand_id": "brd_005",
    "brand_name": "LearnTech India",
    "name": "Full-Stack AI & GenAI Masterclass",
    "category": "Online Course",
    "model": "2026 Batch",
    "version": "v3.0",
    "price": 14999.0,
    "description": "Comprehensive engineering program covering LLMs, LangChain, FastAPI, React, and Catalyst Cloud deployment.",
    "features": {
      "Duration": "12 Weeks Guided Cohort",
      "Projects": "5 Production Capstones",
      "Mentorship": "1-on-1 Code Reviews",
      "Certificate": "Industry Recognized Credential"
    },
    "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 92.0,
    "confidence": 0.94,
    "review_count": 1150,
    "rating": 4.7,
    "sentiment_distribution": {
      "positive": 874,
      "neutral": 172,
      "negative": 104
    },
    "aspects": {
      "Curriculum Depth": {
        "positive_ratio": 0.96,
        "mentions": 820
      },
      "Instructor Clarity": {
        "positive_ratio": 0.94,
        "mentions": 890
      },
      "Practical Labs": {
        "positive_ratio": 0.92,
        "mentions": 710
      },
      "Career Support": {
        "positive_ratio": 0.88,
        "mentions": 540
      }
    },
    "positive_themes": [
      "Bilingual explanations in Hindi and English make complex AI concepts intuitive",
      "End-to-end deployment capstones helped students crack senior engineering roles"
    ],
    "negative_themes": [
      "Pacing is fast during vector database indexing module"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Technical Rigor",
        "score": 95.0,
        "evidence_count": 820,
        "trend": "improving",
        "explanation": "Real world code repositories reviewed by industry architects."
      },
      {
        "dimension": "Instructor Mentorship",
        "score": 94.0,
        "evidence_count": 890,
        "trend": "stable",
        "explanation": "Live doubts resolved weekly with high dedication."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 89.5,
        "review_count": 172,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 90.2,
        "review_count": 207,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 91.0,
        "review_count": 253,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 91.6,
        "review_count": 241,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 92.0,
        "review_count": 276,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_005_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Teaching quality in Hindi and English is top-notch. Placement support and mock interviews helped a lot!",
        "location": "Hyderabad, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_005_2",
        "author": "Verified Customer 2",
        "rating": 4.0,
        "date": "2026-09-22",
        "review_text": "Curriculum structure is clear, though module on Vector DBs required extra practice sessions.",
        "location": "Pune, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "satisfaction",
        "authenticity_risk": 0.08
      }
    ]
  },
  {
    "id": "prd_006",
    "brand_id": "brd_006",
    "brand_name": "Gourmet Hospitality",
    "name": "Gourmet Bistro Indiranagar",
    "category": "Restaurant",
    "model": "Fine Dining",
    "version": "v1.0",
    "price": 1800.0,
    "description": "Modern fusion restaurant offering authentic regional Indian appetizers, wood-fired sourdough pizzas, and craft mocktails.",
    "features": {
      "Cuisine": "Modern Indian Fusion & European",
      "Seating": "Rooftop Garden & Air-Conditioned Lounge",
      "Specialty": "Smoked Butter Chicken & Jackfruit Tacos"
    },
    "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 88.5,
    "confidence": 0.93,
    "review_count": 980,
    "rating": 4.5,
    "sentiment_distribution": {
      "positive": 744,
      "neutral": 147,
      "negative": 89
    },
    "aspects": {
      "Food Quality": {
        "positive_ratio": 0.94,
        "mentions": 740
      },
      "Ambiance": {
        "positive_ratio": 0.95,
        "mentions": 810
      },
      "Staff Hospitality": {
        "positive_ratio": 0.91,
        "mentions": 620
      },
      "Weekend Wait Times": {
        "positive_ratio": 0.64,
        "mentions": 410
      }
    },
    "positive_themes": [
      "Enchanting rooftop fairy-light atmosphere ideal for date nights",
      "Artisanal cocktails and paneer tikka are seasoned to perfection"
    ],
    "negative_themes": [
      "Table wait times can exceed 30 minutes on Friday and Saturday evenings"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Culinary Flavour & Hygiene",
        "score": 94.0,
        "evidence_count": 740,
        "trend": "improving",
        "explanation": "Fresh farm-to-table ingredients with open kitchen hygiene."
      },
      {
        "dimension": "Atmosphere & Decor",
        "score": 95.0,
        "evidence_count": 810,
        "trend": "stable",
        "explanation": "Boutique aesthetic and acoustic jazz playlist."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 86.0,
        "review_count": 147,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 86.7,
        "review_count": 176,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 87.5,
        "review_count": 215,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 88.1,
        "review_count": 205,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 88.5,
        "review_count": 235,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_006_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Paneer tikka and mocktails were divine! Staff hospitality was exceptionally polite and fast.",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_006_2",
        "author": "Verified Customer 2",
        "rating": 3.0,
        "date": "2026-09-22",
        "review_text": "Weekend waiting time for table exceeded 45 mins even with prior online reservation.",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.08
      }
    ]
  },
  {
    "id": "prd_007",
    "brand_id": "brd_007",
    "brand_name": "CloudPulse Systems",
    "name": "CloudPulse Analytics India Enterprise",
    "category": "SaaS Product",
    "model": "Enterprise v4",
    "version": "v4.1",
    "price": 15999.0,
    "description": "Real-time GST compliance, cloud infrastructure telemetry, automated invoicing, and Indian WhatsApp alert dispatch.",
    "features": {
      "SLA": "99.99% Guaranteed Cloud Uptime",
      "Integration": "WhatsApp Business API, Tally ERP, Slack",
      "Security": "SOC2 & ISO 27001 Certified"
    },
    "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 90.8,
    "confidence": 0.95,
    "review_count": 840,
    "rating": 4.6,
    "sentiment_distribution": {
      "positive": 638,
      "neutral": 126,
      "negative": 76
    },
    "aspects": {
      "GST Automation": {
        "positive_ratio": 0.96,
        "mentions": 640
      },
      "WhatsApp Alerting": {
        "positive_ratio": 0.94,
        "mentions": 580
      },
      "System Uptime": {
        "positive_ratio": 0.97,
        "mentions": 710
      },
      "Onboarding Setup": {
        "positive_ratio": 0.81,
        "mentions": 320
      }
    },
    "positive_themes": [
      "Automated GST e-invoicing and instant WhatsApp dispatch saved accounting hundreds of manual hours",
      "Rock solid 99.99% uptime with zero outages during month-end audit deadlines"
    ],
    "negative_themes": [
      "Initial mapping of legacy ERP accounts requires guided technical support call"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Regulatory Compliance Speed",
        "score": 96.0,
        "evidence_count": 640,
        "trend": "stable",
        "explanation": "Zero errors in GSTN schema generation."
      },
      {
        "dimension": "Infrastructure Reliability",
        "score": 97.0,
        "evidence_count": 710,
        "trend": "improving",
        "explanation": "Multi-region Indian failover clusters prevent downtime."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 88.3,
        "review_count": 126,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 89.0,
        "review_count": 151,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 89.8,
        "review_count": 184,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 90.4,
        "review_count": 176,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 90.8,
        "review_count": 201,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_007_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Automated GST report generation and WhatsApp alert triggers saved our finance team endless hours.",
        "location": "Ahmedabad, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_007_2",
        "author": "Verified Customer 2",
        "rating": 3.0,
        "date": "2026-09-22",
        "review_text": "Dashboard setup for custom microservices metrics takes a few hours of configuration.",
        "location": "Gurugram, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.08
      }
    ]
  },
  {
    "id": "prd_008",
    "brand_id": "brd_008",
    "brand_name": "AuraBeauty",
    "name": "GlowRadiance Vitamin C + Turmeric Serum",
    "category": "Beauty products",
    "model": "Serum 30ml",
    "version": "v1.0",
    "price": 699.0,
    "description": "Dermatologist-formulated skin brightening serum with 10% Ethyl Ascorbic Acid, Turmeric extract, and Hyaluronic acid.",
    "features": {
      "Actives": "10% Vitamin C + Niacinamide + Turmeric",
      "Volume": "30 ml Glass Bottle",
      "Suitability": "All Indian Skin Types",
      "Certification": "Toxin-Free, Cruelty-Free"
    },
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 86.8,
    "confidence": 0.91,
    "review_count": 1980,
    "rating": 4.4,
    "sentiment_distribution": {
      "positive": 1504,
      "neutral": 297,
      "negative": 179
    },
    "aspects": {
      "Skin Brightening": {
        "positive_ratio": 0.91,
        "mentions": 980
      },
      "Absorption & Texture": {
        "positive_ratio": 0.88,
        "mentions": 850
      },
      "Packaging": {
        "positive_ratio": 0.79,
        "mentions": 420
      },
      "Value for Money": {
        "positive_ratio": 0.92,
        "mentions": 710
      }
    },
    "positive_themes": [
      "Visible reduction in sun tan and hyperpigmentation within 3-4 weeks",
      "Non-greasy fluid texture absorbs cleanly without oiliness in humid weather"
    ],
    "negative_themes": [
      "Dropper rubber bulb seal occasionally leaks when overtightened in transit"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Efficacy & Brightening",
        "score": 91.0,
        "evidence_count": 980,
        "trend": "improving",
        "explanation": "Targeted actives visibly lighten acne marks and uneven tone."
      },
      {
        "dimension": "Skin Feel & Absorption",
        "score": 88.0,
        "evidence_count": 850,
        "trend": "stable",
        "explanation": "Fast-absorbing, non-comedogenic formulation suitable for monsoon and summer."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 84.3,
        "review_count": 297,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 85.0,
        "review_count": 356,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 85.8,
        "review_count": 435,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 86.4,
        "review_count": 415,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 86.8,
        "review_count": 475,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_008_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Reduced sun tan and acne spots within 3 weeks of daily use. Non-sticky and absorbs fast.",
        "location": "Jaipur, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_008_2",
        "author": "Verified Customer 2",
        "rating": 3.0,
        "date": "2026-09-22",
        "review_text": "Glass dropper bottle seal leaked slightly during transit through courier service.",
        "location": "Lucknow, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.08
      }
    ]
  },
  {
    "id": "prd_009",
    "brand_id": "brd_009",
    "brand_name": "Palace Hospitality",
    "name": "Grand Palace Heritage Resort Goa",
    "category": "Hotels",
    "model": "Beachfront Resort",
    "version": "v1.0",
    "price": 12500.0,
    "description": "5-star luxury beachfront resort in South Goa featuring private beach access, infinity pool, Ayurveda wellness spa, and authentic Goan seafood.",
    "features": {
      "Location": "Varca Beach, South Goa",
      "Amenities": "Infinity Pool, Ayurveda Spa, Private Cabanas",
      "Dining": "3 Fine Dining Restaurants + Beach Shack"
    },
    "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 92.4,
    "confidence": 0.95,
    "review_count": 890,
    "rating": 4.7,
    "sentiment_distribution": {
      "positive": 676,
      "neutral": 133,
      "negative": 81
    },
    "aspects": {
      "Cleanliness & Rooms": {
        "positive_ratio": 0.97,
        "mentions": 710
      },
      "Hospitality": {
        "positive_ratio": 0.96,
        "mentions": 780
      },
      "Beach Access": {
        "positive_ratio": 0.94,
        "mentions": 650
      },
      "Breakfast Buffet": {
        "positive_ratio": 0.89,
        "mentions": 580
      }
    },
    "positive_themes": [
      "Immaculate sea-facing villas with gentle breeze and legendary staff courtesy",
      "Private clean beach away from overcrowded commercial water-sports shacks"
    ],
    "negative_themes": [
      "Breakfast dining hall gets busy during the 9:30 AM peak morning hour"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Hospitality & Service",
        "score": 96.0,
        "evidence_count": 780,
        "trend": "stable",
        "explanation": "Warm, proactive team attentive to senior citizens and children."
      },
      {
        "dimension": "Sanitation & Grounds",
        "score": 97.0,
        "evidence_count": 710,
        "trend": "improving",
        "explanation": "Manicured coconut palms and spotless white linen rooms."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 89.9,
        "review_count": 133,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 90.6,
        "review_count": 160,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 91.4,
        "review_count": 195,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 92.0,
        "review_count": 186,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 92.4,
        "review_count": 213,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_009_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Sea view villa was pristine and resort staff provided legendary Indian hospitality.",
        "location": "Goa, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_009_2",
        "author": "Verified Customer 2",
        "rating": 3.0,
        "date": "2026-09-22",
        "review_text": "Breakfast buffet counter got crowded around 9:30 AM during peak holiday weekend.",
        "location": "Mumbai, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.08
      }
    ]
  },
  {
    "id": "prd_010",
    "brand_id": "brd_010",
    "brand_name": "SmartVault Financial",
    "name": "SmartVault UPI & Digital Wealth App",
    "category": "Financial services",
    "model": "Mobile Fintech App",
    "version": "v2.4",
    "price": 0.0,
    "description": "Zero-brokerage mutual fund investments, sub-second UPI payment engine, daily round-up digital gold savings, and credit score monitoring.",
    "features": {
      "UPI Speed": "< 800ms Transaction Execution",
      "Security": "256-bit AES Encryption with RBI NPCI Compliance",
      "Mutual Funds": "0% Commission Direct Plans"
    },
    "image_url": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 89.6,
    "confidence": 0.94,
    "review_count": 2100,
    "rating": 4.5,
    "sentiment_distribution": {
      "positive": 1596,
      "neutral": 315,
      "negative": 189
    },
    "aspects": {
      "UPI Payment Speed": {
        "positive_ratio": 0.96,
        "mentions": 1420
      },
      "App UI & Cleanliness": {
        "positive_ratio": 0.94,
        "mentions": 1150
      },
      "Customer Support": {
        "positive_ratio": 0.86,
        "mentions": 720
      },
      "Server Downtime": {
        "positive_ratio": 0.92,
        "mentions": 980
      }
    },
    "positive_themes": [
      "Flawless QR scan payments even during busy Diwali shopping weekends",
      "Clean ad-free interface unlike cluttered traditional banking apps"
    ],
    "negative_themes": [
      "Biometric login fingerprint prompt can freeze briefly after major OS upgrades"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Transaction Reliability",
        "score": 96.0,
        "evidence_count": 1420,
        "trend": "improving",
        "explanation": "Bank server failovers route transactions via secondary rails seamlessly."
      },
      {
        "dimension": "User Experience",
        "score": 94.0,
        "evidence_count": 1150,
        "trend": "stable",
        "explanation": "Modern intuitive navigation with instant statement exports."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 87.1,
        "review_count": 315,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 87.8,
        "review_count": 378,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 88.6,
        "review_count": 462,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 89.2,
        "review_count": 441,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 89.6,
        "review_count": 504,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_010_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Lightning-fast UPI transactions even during festival sale rush. SIP tracking UI is super clean.",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_010_2",
        "author": "Verified Customer 2",
        "rating": 2.0,
        "date": "2026-09-22",
        "review_text": "Biometric fingerprint login fails occasionally right after major Android system update.",
        "location": "Chandigarh, India",
        "verified": true,
        "sentiment": "negative",
        "sentiment_score": -0.72,
        "emotion": "frustration",
        "authenticity_risk": 0.08
      }
    ]
  },
  {
    "id": "prd_011",
    "brand_id": "brd_011",
    "brand_name": "AeroEV",
    "name": "AeroEV Swift S1 Pro Electric Scooter",
    "category": "EV Scooter",
    "model": "S1 Pro",
    "version": "v1.5",
    "price": 129999.0,
    "description": "Next-gen connected electric scooter with 150km certified range, 7-inch touch infotainment, reverse mode, and fast DC charging.",
    "features": {
      "Range": "150 km IDC Certified",
      "Top Speed": "90 km/h",
      "Charging": "0-80% in 55 mins (Fast Charge)",
      "Display": "7-inch Touchscreen with Navigation"
    },
    "image_url": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 84.2,
    "confidence": 0.9,
    "review_count": 1720,
    "rating": 4.2,
    "sentiment_distribution": {
      "positive": 1307,
      "neutral": 258,
      "negative": 155
    },
    "aspects": {
      "Acceleration & Drive": {
        "positive_ratio": 0.94,
        "mentions": 890
      },
      "Battery Range": {
        "positive_ratio": 0.84,
        "mentions": 920
      },
      "Touch Screen UI": {
        "positive_ratio": 0.72,
        "mentions": 490
      },
      "Build Quality": {
        "positive_ratio": 0.86,
        "mentions": 670
      }
    },
    "positive_themes": [
      "Instant electric torque and whisper-silent city ride experience",
      "Superb braking and stable high-speed cornering balance"
    ],
    "negative_themes": [
      "Touchscreen UI occasionally reboots after direct noon sunlight exposure"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Powertrain & Speed",
        "score": 94.0,
        "evidence_count": 890,
        "trend": "stable",
        "explanation": "Smooth power delivery with brisk 0-40km/h sprint times."
      },
      {
        "dimension": "Battery Range & Charging",
        "score": 84.0,
        "evidence_count": 920,
        "trend": "improving",
        "explanation": "Delivers reliable 120-130km real city range with regenerative braking."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 81.7,
        "review_count": 258,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 82.4,
        "review_count": 309,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 83.2,
        "review_count": 378,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 83.8,
        "review_count": 361,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 84.2,
        "review_count": 412,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_011_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Screen refresh rate makes scrolling incredibly smooth. Gaming performance is top-notch for the price range.",
        "location": "California",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_011_2",
        "author": "Verified Customer 2",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Screen refresh rate makes scrolling incredibly smooth. Gaming performance is top-notch for the price range.",
        "location": "New York",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.08
      },
      {
        "id": "rev_prd_011_3",
        "author": "Verified Customer 3",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Smooth acceleration and silent drive. Hypercharging stations in Bengaluru make long city trips effortless.",
        "location": "Bengaluru, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.11
      }
    ]
  },
  {
    "id": "prd_012",
    "brand_id": "brd_012",
    "brand_name": "QuickBite",
    "name": "QuickBite Gold Pass 10-Min Delivery",
    "category": "Food Delivery",
    "model": "Gold Pass Membership",
    "version": "v2.0",
    "price": 499.0,
    "description": "Priority food delivery membership with zero delivery fees, VIP rider allocation, and instant refund guarantees.",
    "features": {
      "Delivery Speed": "Avg 14 Minutes",
      "Perk": "Unlimited Free Delivery above \u20b9149",
      "Coverage": "All Tier 1 and Tier 2 Indian Metros"
    },
    "image_url": "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
    "status": "active",
    "trust_score": 87.2,
    "confidence": 0.93,
    "review_count": 2450,
    "rating": 4.4,
    "sentiment_distribution": {
      "positive": 1862,
      "neutral": 367,
      "negative": 221
    },
    "aspects": {
      "Delivery Speed": {
        "positive_ratio": 0.93,
        "mentions": 1620
      },
      "Packaging Temperature": {
        "positive_ratio": 0.9,
        "mentions": 1280
      },
      "Customer Support Refund": {
        "positive_ratio": 0.92,
        "mentions": 940
      },
      "Rain Surge Fee": {
        "positive_ratio": 0.68,
        "mentions": 610
      }
    },
    "positive_themes": [
      "Biryani and dosas arrive piping hot within 15 minutes of ordering",
      "Prompt automated refund credit when items are missing without hassle"
    ],
    "negative_themes": [
      "Rainy weather delivery surges apply during heavy monsoon downpours"
    ],
    "suspicious_patterns_count": 12,
    "dimensions": [
      {
        "dimension": "Dispatch Speed",
        "score": 93.0,
        "evidence_count": 1620,
        "trend": "stable",
        "explanation": "Optimized dark kitchen routing ensures under 20-min fulfillment."
      },
      {
        "dimension": "Packaging Integrity",
        "score": 90.0,
        "evidence_count": 1280,
        "trend": "improving",
        "explanation": "Spill-proof insulated bags preserve food temperature."
      }
    ],
    "timeline": [
      {
        "period": "2026-05",
        "trust_score": 84.7,
        "review_count": 367,
        "sentiment_ratio": 0.82
      },
      {
        "period": "2026-06",
        "trust_score": 85.4,
        "review_count": 441,
        "sentiment_ratio": 0.84
      },
      {
        "period": "2026-07",
        "trust_score": 86.2,
        "review_count": 539,
        "sentiment_ratio": 0.86
      },
      {
        "period": "2026-08",
        "trust_score": 86.8,
        "review_count": 514,
        "sentiment_ratio": 0.87
      },
      {
        "period": "2026-09",
        "trust_score": 87.2,
        "review_count": 588,
        "sentiment_ratio": 0.88
      }
    ],
    "reviews": [
      {
        "id": "rev_prd_012_1",
        "author": "Verified Customer 1",
        "rating": 5.0,
        "date": "2026-09-22",
        "review_text": "Orders arrive hot and super quick within 15 minutes! Gold discounts saved me over 3000 this month.",
        "location": "Gurugram, India",
        "verified": true,
        "sentiment": "positive",
        "sentiment_score": 0.88,
        "emotion": "delight",
        "authenticity_risk": 0.05
      },
      {
        "id": "rev_prd_012_2",
        "author": "Verified Customer 2",
        "rating": 3.0,
        "date": "2026-09-22",
        "review_text": "Rainy day delivery surge fee applies even for Gold members.",
        "location": "Mumbai, India",
        "verified": true,
        "sentiment": "neutral",
        "sentiment_score": 0.05,
        "emotion": "skepticism",
        "authenticity_risk": 0.08
      }
    ]
  }
];

export const MOCK_PRODUCT_ALIASES: Record<string, string> = {
  "prd_bosch_1000w": "prd_bosc_bosch_truemixx_pro_1000w",
  "prd_bosc_bosch_pro_1000w": "prd_bosc_bosch_truemixx_pro_1000w",
  "prd_sujata_dynamix": "prd_suja_sujata_dynamix_900w",
  "prd_preethi_zodiac": "prd_pree_preethi_zodiac_mg_218_75",
  "prd_bajaj_rex": "prd_baja_bajaj_rex_500w_mixer_gri",
  "prd_philips_viva": "prd_phil_philips_viva_collection",
  "prd_philips_hl7756": "prd_phil_philips_hl7756_00_750w_m",
  "prd_preethi_blueleaf": "prd_pree_preethi_blue_leaf_expert",
  "prd_redmi_8a": "prd_sams_redmi_8a_dual_sea_blue_2",
  "prd_samsung_m31": "prd_sams_samsung_galaxy_m31_ocean"
};

export const MOCK_OWNER_OVERVIEW = {
  total_products: 22,
  products_with_active_data: 22,
  total_analyzed_feedback: 19053,
  active_reputation_index: 87.8,
  reputation_trend: "Derived from 19,053 verified customer reviews",
  open_issues_count: 3,
  critical_alerts_count: 1,
  active_improvement_actions: 4,
  data_freshness: "Latest synced: 2026-10-02 (Continuous Real-time Engine)",
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
    product_id: "prd_bosc_bosch_truemixx_pro_1000w",
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
  total_feedback_records: 19053,
  total_products: 22,
  total_sources: 8,
  is_production: true,
  last_sync_timestamp: new Date().toISOString(),
  data_integrity_score: 99.4,
  verified_purchase_ratio: 0.94
};

export const MOCK_INDIA_ANALYTICS = {
  national_sentiment_score: 86.4,
  top_active_regions: [
    { state: "Karnataka", city: "Bengaluru", count: 4890, sentiment: 88.2 },
    { state: "Maharashtra", city: "Mumbai / Pune", count: 4320, sentiment: 87.1 },
    { state: "Delhi NCR", city: "Delhi / Gurgaon", count: 3740, sentiment: 84.5 },
    { state: "Tamil Nadu", city: "Chennai", count: 2890, sentiment: 86.9 },
    { state: "Telangana", city: "Hyderabad", count: 2140, sentiment: 87.8 }
  ],
  code_mixed_reviews_percentage: 24.8,
  top_hinglish_sentiments: [
    { term: "paisa vasool", count: 1420, sentiment: "strongly positive" },
    { term: "mast", count: 980, sentiment: "positive" },
    { term: "lajawab", count: 510, sentiment: "strongly positive" },
    { term: "bakwas", count: 210, sentiment: "strongly negative" },
    { term: "ghatiya", count: 110, sentiment: "strongly negative" }
  ]
};

export const MOCK_ADMIN_USERS = [
  { id: "usr_admin_001", name: "System Administrator", email: "admin@brandpulse.ai", role: "admin", is_active: true, created_at: "2026-01-10T00:00:00Z" },
  { id: "usr_owner_001", name: "Sarah Jenkins (Brand Owner)", email: "owner@brandpulse.ai", role: "owner", is_active: true, created_at: "2026-01-12T00:00:00Z" },
  { id: "usr_customer_001", name: "Alex Rivera (Customer)", email: "customer@brandpulse.ai", role: "customer", is_active: true, created_at: "2026-01-15T00:00:00Z" }
];

export const MOCK_AUDIT_LOGS = [
  { id: "log_001", action: "AI Pipeline Evaluation", entity: "Review Batch #842", user: "system_worker", status: "success", timestamp: "2026-10-02T08:00:00Z" },
  { id: "log_002", action: "Authenticity Guard Execution", entity: "Amazon India Ingestion", user: "ingest_daemon", status: "success", timestamp: "2026-10-02T07:30:00Z" },
  { id: "log_003", action: "Thermal Governor Action Created", entity: "Apex Phone Pro X", user: "owner@brandpulse.ai", status: "verified", timestamp: "2026-10-02T06:10:00Z" },
  { id: "log_004", action: "Model Weights Calibration", entity: "Hinglish Lexicon v2.4", user: "admin@brandpulse.ai", status: "completed", timestamp: "2026-10-01T22:00:00Z" }
];

export const MOCK_SYSTEM_HEALTH = {
  status: "healthy",
  uptime_seconds: 1984200,
  cpu_utilization_pct: 12.8,
  memory_utilization_pct: 26.4,
  nlp_latency_ms: 14,
  active_subsystems: [
    { name: "Polarity & Sentiment Classifier", status: "online", latency: "11ms" },
    { name: "Emotion Neural Mapping", status: "online", latency: "14ms" },
    { name: "Category Aspect Extractor", status: "online", latency: "16ms" },
    { name: "Astroturfing & Fake Risk Scorer", status: "online", latency: "12ms" },
    { name: "Grounded RAG Assistant Engine", status: "online", latency: "20ms" }
  ]
};
