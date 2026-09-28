# BrandPulse AI — Dataset Inventory & Provenance Registry

**Generated:** 2026-09-23  
**Total Registered Datasets:** 26

This document lists all legally usable, public, and Kaggle datasets verified in the BrandPulse data pipeline.

## Dataset Summary Table

| Dataset File | Format | Rows | Size | Detected Product Col | Detected Review Col | Detected Rating Col | License |
|---|---|---|---|---|---|---|---|
| `brandpulse_full_corpus.jsonl` | JSONL | 83,173 | 58635.0 KB | `﻿Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `current_amazon_product_observations_2026-09-22.jsonl` | JSONL | 13 | 6.9 KB | `N/A` | `content` | `N/A` | Public Kaggle Dataset / Open Research |
| `current_web_snapshot_2026-09-22.jsonl` | JSONL | 28 | 16.4 KB | `N/A` | `content` | `N/A` | Public Kaggle Dataset / Open Research |
| `sample_reviews.csv` | CSV | 12 | 1.4 KB | `product_id` | `review_text` | `rating` | Public Kaggle Dataset / Open Research |
| `amazon_laptop_prices_v01 (1).csv` | CSV | 4,446 | 596.5 KB | `Sale Product Count` | `N/A` | `rating` | Public Kaggle Dataset / Open Research |
| `amazon_vfl_reviews.csv` | CSV | 2,782 | 778.6 KB | `name` | `review` | `rating` | Public Kaggle Dataset / Open Research |
| `bajaj rex 500w.csv` | CSV | 2,039 | 339.0 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `Bosch Pro 1000W.csv` | CSV | 1,941 | 319.1 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `Mobile Reviews Sentiment.csv` | CSV | 50,000 | 9821.0 KB | `customer_name` | `review_text` | `rating` | Public Kaggle Dataset / Open Research |
| `Philips Viva.csv` | CSV | 1,485 | 239.0 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `philips_hl7756.csv` | CSV | 1,732 | 309.0 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `phone_reviews.csv` | CSV | 51,744 | 7570.7 KB | `mobile_names` | `body` | `star` | Public Kaggle Dataset / Open Research |
| `preeti blueleaf.csv` | CSV | 1,235 | 229.3 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `preeti zodiac.csv` | CSV | 2,048 | 377.2 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `Sujata Dynamix.csv` | CSV | 2,303 | 367.6 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `amazon_laptop_prices_v01 (1).csv` | CSV | 4,446 | 596.5 KB | `Sale Product Count` | `N/A` | `rating` | Public Kaggle Dataset / Open Research |
| `Mobile Reviews Sentiment.csv` | CSV | 50,000 | 9821.0 KB | `customer_name` | `review_text` | `rating` | Public Kaggle Dataset / Open Research |
| `phone_reviews.csv` | CSV | 51,744 | 7570.7 KB | `mobile_names` | `body` | `star` | Public Kaggle Dataset / Open Research |
| `amazon_vfl_reviews.csv` | CSV | 2,782 | 778.6 KB | `name` | `review` | `rating` | Public Kaggle Dataset / Open Research |
| `bajaj rex 500w.csv` | CSV | 2,039 | 339.0 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `Bosch Pro 1000W.csv` | CSV | 1,941 | 319.1 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `Philips Viva.csv` | CSV | 1,485 | 239.0 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `philips_hl7756.csv` | CSV | 1,732 | 309.0 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `preeti blueleaf.csv` | CSV | 1,235 | 229.3 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `preeti zodiac.csv` | CSV | 2,048 | 377.2 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |
| `Sujata Dynamix.csv` | CSV | 2,303 | 367.6 KB | `Name` | `View1` | `aiconalt` | Public Kaggle Dataset / Open Research |

---

## Detailed Dataset Profiles

### brandpulse_full_corpus.jsonl
- **File Path:** `data/brandpulse_full_corpus.jsonl`
- **Format:** JSONL
- **Rows:** 83,173
- **File Size:** 57.26 MB
- **Fingerprint (SHA-256):** `a38a518f878542857582b3ffdc6d38b5bd93eec053bb95e861079e9524884e23`
- **Columns:** `﻿Name, Title, aiconalt, View, State, View1, asizebase, _source_file, _record_type`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "\ufeffName",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "\ufeffName": "SAM",
  "Title": "It's absolutely not up to mark, don't buy.",
  "aiconalt": "1.0 out of 5 stars",
  "View": "Reviewed in India on 11 May 2019",
  "State": "Verified Purchase",
  "View1": "I have been using this machine for 3 wks and have found many fallacies to recomm",
  "asizebase": "1,214 people found this helpful",
  "_source_file": "data/kaggle_data/Bosch Pro 1000W.csv",
  "_record_type": "local_dataset_row"
}
```

### current_amazon_product_observations_2026-09-22.jsonl
- **File Path:** `data/current_amazon_product_observations_2026-09-22.jsonl`
- **Format:** JSONL
- **Rows:** 13
- **File Size:** 0.01 MB
- **Fingerprint (SHA-256):** `55754d717710f855f34838b116ada981196ee2fad010711c4b917b7190195158`
- **Columns:** `retrieved_at, query, provider, evidence_type, domain, title, url, snippet, content, metadata`
- **Detected Field Mapping:**
```json
{
  "review_text": "content",
  "review_title": "title"
}
```
- **Sample Record Extract:**
```json
{
  "retrieved_at": "2026-09-22T23:24:00+05:30",
  "query": "Amazfit Balance",
  "provider": "shopping_index",
  "evidence_type": "commerce",
  "domain": "amazon.in",
  "title": "Amazfit Balance",
  "url": "https://www.amazon.in/s?k=Amazfit+Balance",
  "snippet": "Live shopping discovery returned Amazon.in as a merchant for Amazfit Balance at ",
  "content": "Amazon merchant observation: price \u20b914,999; rating 3.5/5; 250 reviews. Refresh b",
  "metadata": "{'merchant': 'Amazon.in', 'price_inr': 14999, 'rating': 3.5, 'review_count': 250"
}
```

### current_web_snapshot_2026-09-22.jsonl
- **File Path:** `data/current_web_snapshot_2026-09-22.jsonl`
- **Format:** JSONL
- **Rows:** 28
- **File Size:** 0.02 MB
- **Fingerprint (SHA-256):** `fac699608b1f8d8b6ac422842e789cae402661be85fd1d4965c39deb63ed5916`
- **Columns:** `retrieved_at, query, provider, evidence_type, domain, title, url, snippet, content, metadata`
- **Detected Field Mapping:**
```json
{
  "review_text": "content",
  "review_title": "title"
}
```
- **Sample Record Extract:**
```json
{
  "retrieved_at": "2026-09-22T23:24:00+05:30",
  "query": "Amazon India current smartphone catalogue September 2026",
  "provider": "amazon_web_search",
  "evidence_type": "commerce",
  "domain": "amazon.in",
  "title": "Amazon India electronics shopping and new launches",
  "url": "https://www.amazon.in/",
  "snippet": "Current Amazon India pages include electronics categories, new launches, deals a",
  "content": "Current-source marker for Amazon India. Live product detail, price, seller and a",
  "metadata": "{'source_scope': 'amazon.in', 'freshness': 'live-on-query'}"
}
```

### sample_reviews.csv
- **File Path:** `data/sample_reviews.csv`
- **Format:** CSV
- **Rows:** 12
- **File Size:** 0.0 MB
- **Fingerprint (SHA-256):** `5d0986c5f9870a15fdf0734f106fba670960279a37168aeae2ee59b436768e7a`
- **Columns:** `product_id, review_text, rating, location, product_version`
- **Detected Field Mapping:**
```json
{
  "review_text": "review_text",
  "rating": "rating",
  "product_name": "product_id",
  "location": "location",
  "asin": "product_id"
}
```
- **Sample Record Extract:**
```json
{
  "product_id": "prd_001",
  "review_text": "The camera quality and OLED display are absolutely phenomenal! Best photo perfor",
  "rating": "5.0",
  "location": "USA",
  "product_version": "v2.1"
}
```

### amazon_laptop_prices_v01 (1).csv
- **File Path:** `data/kaggle_data/amazon_laptop_prices_v01 (1).csv`
- **Format:** CSV
- **Rows:** 4,446
- **File Size:** 0.58 MB
- **Fingerprint (SHA-256):** `109c16dcfc7d5932a6b0feafd76dd21d1dca3c81886a48157e73a9512bbf124f`
- **Columns:** `brand, model, screen_size, color, harddisk, cpu, ram, OS, special_features, graphics`...
- **Detected Field Mapping:**
```json
{
  "rating": "rating",
  "product_name": "Sale Product Count",
  "brand": "brand",
  "model": "model"
}
```
- **Sample Record Extract:**
```json
{
  "brand": "ROKC",
  "model": "",
  "screen_size": "14 Inches",
  "color": "Blue",
  "harddisk": "1000 GB",
  "cpu": "Intel Core i7",
  "ram": "8 GB",
  "OS": "Windows 11",
  "special_features": "",
  "graphics": "Integrated",
  "graphics_coprocessor": "Intel",
  "cpu_speed": "1.2 GHz",
  "rating": "",
  "Price": "$1,783.99",
  "Sale Product Count": "14",
  "Total Sales": "24975.86",
  "Available Stock": "81"
}
```

### amazon_vfl_reviews.csv
- **File Path:** `data/kaggle_data/amazon_vfl_reviews.csv`
- **Format:** CSV
- **Rows:** 2,782
- **File Size:** 0.76 MB
- **Fingerprint (SHA-256):** `392cc3ce0361dd6ae3dbf88196d2a6a9147ecf3468ed5800e99cebfc30cd6112`
- **Columns:** `asin, name, date, rating, review`
- **Detected Field Mapping:**
```json
{
  "review_text": "review",
  "rating": "rating",
  "product_name": "name",
  "review_date": "date",
  "asin": "asin"
}
```
- **Sample Record Extract:**
```json
{
  "asin": "B07W7CTLD1",
  "name": "Mamaearth-Onion-Growth-Control-Redensyl",
  "date": "2019-09-06",
  "rating": "1",
  "review": "I bought this hair oil after viewing so many good comments. But this product is "
}
```

### bajaj rex 500w.csv
- **File Path:** `data/kaggle_data/bajaj rex 500w.csv`
- **Format:** CSV
- **Rows:** 2,039
- **File Size:** 0.33 MB
- **Fingerprint (SHA-256):** `a0947a6aa3a87e3c1a32453e5c4e272f0e65207ace92c1d91c292a8449ffc7a1`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "vinay hinduja",
  "Title": "Very good",
  "aiconalt": "5.0 out of 5 stars",
  "View": "Reviewed in India on 1 October 2018",
  "State": "Verified Purchase",
  "View1": "I am writing this review after 3+ years of use. This has traveled with me to for",
  "asizebase": "446 people found this helpful"
}
```

### Bosch Pro 1000W.csv
- **File Path:** `data/kaggle_data/Bosch Pro 1000W.csv`
- **Format:** CSV
- **Rows:** 1,941
- **File Size:** 0.31 MB
- **Fingerprint (SHA-256):** `18d982e2540c3872d1000bd6856dd2a956ee89fd355ff9ce9b3f36f7cd6c08f9`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "SAM",
  "Title": "It's absolutely not up to mark, don't buy.",
  "aiconalt": "1.0 out of 5 stars",
  "View": "Reviewed in India on 11 May 2019",
  "State": "Verified Purchase",
  "View1": "I have been using this machine for 3 wks and have found many fallacies to recomm",
  "asizebase": "1,214 people found this helpful"
}
```

### Mobile Reviews Sentiment.csv
- **File Path:** `data/kaggle_data/Mobile Reviews Sentiment.csv`
- **Format:** CSV
- **Rows:** 50,000
- **File Size:** 9.59 MB
- **Fingerprint (SHA-256):** `c41f4bc0b7114383241eace756eb08d1d6927ffea6b4d2a6fe2f49252e7173a6`
- **Columns:** `review_id, customer_name, age, brand, model, price_usd, price_local, currency, exchange_rate_to_usd, rating`...
- **Detected Field Mapping:**
```json
{
  "review_text": "review_text",
  "rating": "rating",
  "product_name": "customer_name",
  "brand": "brand",
  "model": "model",
  "review_date": "review_date",
  "location": "country",
  "helpful_votes": "helpful_votes",
  "verified_flag": "verified_purchase"
}
```
- **Sample Record Extract:**
```json
{
  "review_id": "1",
  "customer_name": "Aryan Maharaj",
  "age": "45",
  "brand": "Realme",
  "model": "Realme 12 Pro",
  "price_usd": "337.31",
  "price_local": "\u20b927996.73",
  "currency": "INR",
  "exchange_rate_to_usd": "83.0",
  "rating": "2",
  "review_text": "Not worth the money spent. Wouldn\u2019t recommend.",
  "sentiment": "Negative",
  "country": "India",
  "language": "Hindi",
  "review_date": "2023-11-06",
  "verified_purchase": "True",
  "battery_life_rating": "1",
  "camera_rating": "1",
  "performance_rating": "3",
  "design_rating": "2",
  "display_rating": "1",
  "review_length": "46",
  "word_count": "7",
  "helpful_votes": "1",
  "source": "Amazon"
}
```

### Philips Viva.csv
- **File Path:** `data/kaggle_data/Philips Viva.csv`
- **Format:** CSV
- **Rows:** 1,485
- **File Size:** 0.23 MB
- **Fingerprint (SHA-256):** `7296a1dca7c5940337da3ffd00eb8a61ba14e90d9dab0f31f9291e3359a7d051`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Tanmay",
  "Title": "Worst product from a reputed brand",
  "aiconalt": "1.0 out of 5 stars",
  "View": "Reviewed in India on 28 December 2020",
  "State": "Verified Purchase",
  "View1": "------BEWARE!------\nI was in need of a hand mixer, As i trust Philips brand i ha",
  "asizebase": "100 people found this helpful"
}
```

### philips_hl7756.csv
- **File Path:** `data/kaggle_data/philips_hl7756.csv`
- **Format:** CSV
- **Rows:** 1,732
- **File Size:** 0.3 MB
- **Fingerprint (SHA-256):** `3e0f8f8b0953bc02e01089210ba13f4a1c6249bd07aaeb5f2f26e59e66d96783`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Kevin",
  "Title": "A good mixer grinder, could be better",
  "aiconalt": "4.0 out of 5 stars",
  "View": "Reviewed in India on 1 November 2018",
  "State": "Verified Purchase",
  "View1": "It is a good little mixer grinder. The  design of this thing is amazing, it look",
  "asizebase": "526 people found this helpful"
}
```

### phone_reviews.csv
- **File Path:** `data/kaggle_data/phone_reviews.csv`
- **Format:** CSV
- **Rows:** 51,744
- **File Size:** 7.39 MB
- **Fingerprint (SHA-256):** `066eff1e8316767dbd4c4962179ae6d67071cb19f11732a036aeb6a9dc3ab928`
- **Columns:** `, mobile_names, asin, title, body, star`
- **Detected Field Mapping:**
```json
{
  "review_text": "body",
  "review_title": "title",
  "rating": "star",
  "product_name": "mobile_names",
  "asin": "asin"
}
```
- **Sample Record Extract:**
```json
{
  "": "0",
  "mobile_names": "Samsung Galaxy M21 (Midnight Blue, 4GB RAM, 64GB Storage)",
  "asin": "B07HGJJ559",
  "title": "value money go it",
  "body": "update 15082020never give chance regret go aheadthe icons looks great set spherl",
  "star": "4"
}
```

### preeti blueleaf.csv
- **File Path:** `data/kaggle_data/preeti blueleaf.csv`
- **Format:** CSV
- **Rows:** 1,235
- **File Size:** 0.22 MB
- **Fingerprint (SHA-256):** `9d364112b35d77bddc389f2d06a5cb62fede2854a67234bec64768bb92c71d5e`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Simply",
  "Title": "Extremely poor quality mixer grinder product.",
  "aiconalt": "1.0 out of 5 stars",
  "View": "Reviewed in India on 1 August 2018",
  "State": "Verified Purchase",
  "View1": "As I am an experienced Electro/mechanical engineer, I can clearly see that the j",
  "asizebase": "283 people found this helpful"
}
```

### preeti zodiac.csv
- **File Path:** `data/kaggle_data/preeti zodiac.csv`
- **Format:** CSV
- **Rows:** 2,048
- **File Size:** 0.37 MB
- **Fingerprint (SHA-256):** `3d9df222164be14780f4fbd7c398b30eac9cc042c55013333b7ef20ffc217967`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Subhasis G.",
  "Title": "More than what is expected.demoralised now.",
  "aiconalt": "4.0 out of 5 stars",
  "View": "Reviewed in India on 27 August 2018",
  "State": "Verified Purchase",
  "View1": "This is the 3rd processor I am using in last 18 years. Singer, Kenstar and now t",
  "asizebase": "512 people found this helpful"
}
```

### Sujata Dynamix.csv
- **File Path:** `data/kaggle_data/Sujata Dynamix.csv`
- **Format:** CSV
- **Rows:** 2,303
- **File Size:** 0.36 MB
- **Fingerprint (SHA-256):** `a0347ce31acd525a9211dd45a87245cfe804f1443160c60880f2c0ccaf6a0d91`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Divakar",
  "Title": "Better not buy online",
  "aiconalt": "3.0 out of 5 stars",
  "View": "Reviewed in India on 16 July 2018",
  "State": "Verified Purchase",
  "View1": "We have faced problem with small jar, there is a leakage, better I suggest to go",
  "asizebase": "313 people found this helpful"
}
```

### amazon_laptop_prices_v01 (1).csv
- **File Path:** `data/kaggle_data/kamali2727_laptop-sales-by-amazon/amazon_laptop_prices_v01 (1).csv`
- **Format:** CSV
- **Rows:** 4,446
- **File Size:** 0.58 MB
- **Fingerprint (SHA-256):** `109c16dcfc7d5932a6b0feafd76dd21d1dca3c81886a48157e73a9512bbf124f`
- **Columns:** `brand, model, screen_size, color, harddisk, cpu, ram, OS, special_features, graphics`...
- **Detected Field Mapping:**
```json
{
  "rating": "rating",
  "product_name": "Sale Product Count",
  "brand": "brand",
  "model": "model"
}
```
- **Sample Record Extract:**
```json
{
  "brand": "ROKC",
  "model": "",
  "screen_size": "14 Inches",
  "color": "Blue",
  "harddisk": "1000 GB",
  "cpu": "Intel Core i7",
  "ram": "8 GB",
  "OS": "Windows 11",
  "special_features": "",
  "graphics": "Integrated",
  "graphics_coprocessor": "Intel",
  "cpu_speed": "1.2 GHz",
  "rating": "",
  "Price": "$1,783.99",
  "Sale Product Count": "14",
  "Total Sales": "24975.86",
  "Available Stock": "81"
}
```

### Mobile Reviews Sentiment.csv
- **File Path:** `data/kaggle_data/mohankrishnathalla_mobile-reviews-sentiment-and-specification/Mobile Reviews Sentiment.csv`
- **Format:** CSV
- **Rows:** 50,000
- **File Size:** 9.59 MB
- **Fingerprint (SHA-256):** `c41f4bc0b7114383241eace756eb08d1d6927ffea6b4d2a6fe2f49252e7173a6`
- **Columns:** `review_id, customer_name, age, brand, model, price_usd, price_local, currency, exchange_rate_to_usd, rating`...
- **Detected Field Mapping:**
```json
{
  "review_text": "review_text",
  "rating": "rating",
  "product_name": "customer_name",
  "brand": "brand",
  "model": "model",
  "review_date": "review_date",
  "location": "country",
  "helpful_votes": "helpful_votes",
  "verified_flag": "verified_purchase"
}
```
- **Sample Record Extract:**
```json
{
  "review_id": "1",
  "customer_name": "Aryan Maharaj",
  "age": "45",
  "brand": "Realme",
  "model": "Realme 12 Pro",
  "price_usd": "337.31",
  "price_local": "\u20b927996.73",
  "currency": "INR",
  "exchange_rate_to_usd": "83.0",
  "rating": "2",
  "review_text": "Not worth the money spent. Wouldn\u2019t recommend.",
  "sentiment": "Negative",
  "country": "India",
  "language": "Hindi",
  "review_date": "2023-11-06",
  "verified_purchase": "True",
  "battery_life_rating": "1",
  "camera_rating": "1",
  "performance_rating": "3",
  "design_rating": "2",
  "display_rating": "1",
  "review_length": "46",
  "word_count": "7",
  "helpful_votes": "1",
  "source": "Amazon"
}
```

### phone_reviews.csv
- **File Path:** `data/kaggle_data/msiddhu_phone-reviews/phone_reviews.csv`
- **Format:** CSV
- **Rows:** 51,744
- **File Size:** 7.39 MB
- **Fingerprint (SHA-256):** `066eff1e8316767dbd4c4962179ae6d67071cb19f11732a036aeb6a9dc3ab928`
- **Columns:** `, mobile_names, asin, title, body, star`
- **Detected Field Mapping:**
```json
{
  "review_text": "body",
  "review_title": "title",
  "rating": "star",
  "product_name": "mobile_names",
  "asin": "asin"
}
```
- **Sample Record Extract:**
```json
{
  "": "0",
  "mobile_names": "Samsung Galaxy M21 (Midnight Blue, 4GB RAM, 64GB Storage)",
  "asin": "B07HGJJ559",
  "title": "value money go it",
  "body": "update 15082020never give chance regret go aheadthe icons looks great set spherl",
  "star": "4"
}
```

### amazon_vfl_reviews.csv
- **File Path:** `data/kaggle_data/nehaprabhavalkar_indian-products-on-amazon/amazon_vfl_reviews.csv`
- **Format:** CSV
- **Rows:** 2,782
- **File Size:** 0.76 MB
- **Fingerprint (SHA-256):** `392cc3ce0361dd6ae3dbf88196d2a6a9147ecf3468ed5800e99cebfc30cd6112`
- **Columns:** `asin, name, date, rating, review`
- **Detected Field Mapping:**
```json
{
  "review_text": "review",
  "rating": "rating",
  "product_name": "name",
  "review_date": "date",
  "asin": "asin"
}
```
- **Sample Record Extract:**
```json
{
  "asin": "B07W7CTLD1",
  "name": "Mamaearth-Onion-Growth-Control-Redensyl",
  "date": "2019-09-06",
  "rating": "1",
  "review": "I bought this hair oil after viewing so many good comments. But this product is "
}
```

### bajaj rex 500w.csv
- **File Path:** `data/kaggle_data/sridharstreaks_reviews-of-top-mixer-grinders-in-amazon-india/bajaj rex 500w.csv`
- **Format:** CSV
- **Rows:** 2,039
- **File Size:** 0.33 MB
- **Fingerprint (SHA-256):** `a0947a6aa3a87e3c1a32453e5c4e272f0e65207ace92c1d91c292a8449ffc7a1`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "vinay hinduja",
  "Title": "Very good",
  "aiconalt": "5.0 out of 5 stars",
  "View": "Reviewed in India on 1 October 2018",
  "State": "Verified Purchase",
  "View1": "I am writing this review after 3+ years of use. This has traveled with me to for",
  "asizebase": "446 people found this helpful"
}
```

### Bosch Pro 1000W.csv
- **File Path:** `data/kaggle_data/sridharstreaks_reviews-of-top-mixer-grinders-in-amazon-india/Bosch Pro 1000W.csv`
- **Format:** CSV
- **Rows:** 1,941
- **File Size:** 0.31 MB
- **Fingerprint (SHA-256):** `18d982e2540c3872d1000bd6856dd2a956ee89fd355ff9ce9b3f36f7cd6c08f9`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "SAM",
  "Title": "It's absolutely not up to mark, don't buy.",
  "aiconalt": "1.0 out of 5 stars",
  "View": "Reviewed in India on 11 May 2019",
  "State": "Verified Purchase",
  "View1": "I have been using this machine for 3 wks and have found many fallacies to recomm",
  "asizebase": "1,214 people found this helpful"
}
```

### Philips Viva.csv
- **File Path:** `data/kaggle_data/sridharstreaks_reviews-of-top-mixer-grinders-in-amazon-india/Philips Viva.csv`
- **Format:** CSV
- **Rows:** 1,485
- **File Size:** 0.23 MB
- **Fingerprint (SHA-256):** `7296a1dca7c5940337da3ffd00eb8a61ba14e90d9dab0f31f9291e3359a7d051`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Tanmay",
  "Title": "Worst product from a reputed brand",
  "aiconalt": "1.0 out of 5 stars",
  "View": "Reviewed in India on 28 December 2020",
  "State": "Verified Purchase",
  "View1": "------BEWARE!------\nI was in need of a hand mixer, As i trust Philips brand i ha",
  "asizebase": "100 people found this helpful"
}
```

### philips_hl7756.csv
- **File Path:** `data/kaggle_data/sridharstreaks_reviews-of-top-mixer-grinders-in-amazon-india/philips_hl7756.csv`
- **Format:** CSV
- **Rows:** 1,732
- **File Size:** 0.3 MB
- **Fingerprint (SHA-256):** `3e0f8f8b0953bc02e01089210ba13f4a1c6249bd07aaeb5f2f26e59e66d96783`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Kevin",
  "Title": "A good mixer grinder, could be better",
  "aiconalt": "4.0 out of 5 stars",
  "View": "Reviewed in India on 1 November 2018",
  "State": "Verified Purchase",
  "View1": "It is a good little mixer grinder. The  design of this thing is amazing, it look",
  "asizebase": "526 people found this helpful"
}
```

### preeti blueleaf.csv
- **File Path:** `data/kaggle_data/sridharstreaks_reviews-of-top-mixer-grinders-in-amazon-india/preeti blueleaf.csv`
- **Format:** CSV
- **Rows:** 1,235
- **File Size:** 0.22 MB
- **Fingerprint (SHA-256):** `9d364112b35d77bddc389f2d06a5cb62fede2854a67234bec64768bb92c71d5e`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Simply",
  "Title": "Extremely poor quality mixer grinder product.",
  "aiconalt": "1.0 out of 5 stars",
  "View": "Reviewed in India on 1 August 2018",
  "State": "Verified Purchase",
  "View1": "As I am an experienced Electro/mechanical engineer, I can clearly see that the j",
  "asizebase": "283 people found this helpful"
}
```

### preeti zodiac.csv
- **File Path:** `data/kaggle_data/sridharstreaks_reviews-of-top-mixer-grinders-in-amazon-india/preeti zodiac.csv`
- **Format:** CSV
- **Rows:** 2,048
- **File Size:** 0.37 MB
- **Fingerprint (SHA-256):** `3d9df222164be14780f4fbd7c398b30eac9cc042c55013333b7ef20ffc217967`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Subhasis G.",
  "Title": "More than what is expected.demoralised now.",
  "aiconalt": "4.0 out of 5 stars",
  "View": "Reviewed in India on 27 August 2018",
  "State": "Verified Purchase",
  "View1": "This is the 3rd processor I am using in last 18 years. Singer, Kenstar and now t",
  "asizebase": "512 people found this helpful"
}
```

### Sujata Dynamix.csv
- **File Path:** `data/kaggle_data/sridharstreaks_reviews-of-top-mixer-grinders-in-amazon-india/Sujata Dynamix.csv`
- **Format:** CSV
- **Rows:** 2,303
- **File Size:** 0.36 MB
- **Fingerprint (SHA-256):** `a0347ce31acd525a9211dd45a87245cfe804f1443160c60880f2c0ccaf6a0d91`
- **Columns:** `Name, Title, aiconalt, View, State, View1, asizebase`
- **Detected Field Mapping:**
```json
{
  "review_text": "View1",
  "review_title": "Title",
  "rating": "aiconalt",
  "product_name": "Name",
  "review_date": "View",
  "location": "State",
  "helpful_votes": "asizebase",
  "verified_flag": "State"
}
```
- **Sample Record Extract:**
```json
{
  "Name": "Divakar",
  "Title": "Better not buy online",
  "aiconalt": "3.0 out of 5 stars",
  "View": "Reviewed in India on 16 July 2018",
  "State": "Verified Purchase",
  "View1": "We have faced problem with small jar, there is a leakage, better I suggest to go",
  "asizebase": "313 people found this helpful"
}
```
