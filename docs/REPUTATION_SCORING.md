# BrandPulse Reputation & Trust Scoring Methodology

## 1. Overview & Core Philosophy
The BrandPulse Reputation Engine transforms raw customer feedback into an objective, statistically sound, multi-dimensional **Evidence Trust Score** (0.0 to 100.0).

Unlike legacy review platforms that rely solely on crude average star ratings—which are easily distorted by review velocity fraud, bot bombardment, or sample bias—BrandPulse computes a composite trust index mathematically grounded in:
1. **Calibrated Star Rating Polarity** (35%)
2. **AI-Analyzed Review Sentiment** (30%)
3. **Category-Specific Aspect Performance** (25%)
4. **Verified Purchase Ratio** (10%)
5. **Multi-Signal Authenticity Penalization** (multiplicative discount)
6. **Bayesian Volume Damping** (sample size shrinkage)

---

## 2. Mathematical Formulation

### 2.1 Component Definitions

#### A. Scaled Rating Component ($R_{scaled}$)
Raw star ratings ($r \in [1.0, 5.0]$) are scaled linearly to a 0–100 baseline:
$$R_{scaled} = \left(\frac{\bar{r}}{5.0}\right) \times 100$$
Where $\bar{r} = \frac{1}{N} \sum_{i=1}^{N} r_i$.

#### B. Sentiment Polarity Component ($S_{comp}$)
AI sentiment analysis classifies each review into positive, neutral, or negative sentiment. The net polarity ratio is computed:
$$S_{ratio} = \frac{N_{pos} - N_{neg}}{N}$$
$$S_{comp} = \left(\frac{S_{ratio} + 1.0}{2.0}\right) \times 100$$
$S_{comp} \in [0.0, 100.0]$, where 50 represents perfectly neutral sentiment balance.

#### C. Aspect Performance Component ($A_{comp}$)
For each extracted category aspect $k$ (e.g., Motor Power, Noise Level, Fragrance, Battery Life):
- Aspect scores $s_k \in [-1.0, 1.0]$ are mapped to a 0–100 scale:
  $$A_k = \left(\frac{s_k + 1.0}{2.0}\right) \times 100$$
- Aspects are weighted logarithmically by their customer mention frequency $m_k$:
  $$A_{comp} = \frac{\sum_{k} A_k \cdot \ln(m_k + 1)}{\sum_{k} \ln(m_k + 1)}$$

#### D. Verified Purchase Ratio ($V_{pct}$)
$$V_{pct} = \left(\frac{N_{verified}}{N}\right) \times 100$$

---

### 2.2 Composite Raw Trust Score ($T_{raw}$)
$$T_{raw} = 0.35 \cdot R_{scaled} + 0.30 \cdot S_{comp} + 0.25 \cdot A_{comp} + 0.10 \cdot V_{pct}$$

---

### 2.3 Authenticity Discount Factor ($\Phi_{auth}$)
Each review is evaluated by the Authenticity Risk Scorer, producing a risk score $\rho_i \in [0.0, 1.0]$. The average risk $\bar{\rho} = \frac{1}{N} \sum \rho_i$ discounts the score:
$$\Phi_{auth} = \max(0.60, 1.0 - (\bar{\rho} \cdot 0.40))$$
$$T_{penalized} = T_{raw} \cdot \Phi_{auth}$$

---

### 2.4 Bayesian Volume Damping (Shrinkage Prior)
Products with very low review counts ($N < 30$) are susceptible to extreme variance. BrandPulse applies Bayesian shrinkage towards an uninformative prior ($T_{prior} = 50.0$) with prior weight $M = 15.0$:
$$T_{final} = \frac{T_{penalized} \cdot N + T_{prior} \cdot M}{N + M}$$

- When $N \to 0$, $T_{final} \to 50.0$ (Neutral baseline).
- When $N \ge 1,000$, $\frac{M}{N+M} < 0.015$, and empirical evidence completely governs the score.

---

### 2.5 Statistical Confidence & Confidence Intervals
To communicate evidence uncertainty, BrandPulse reports a 95% Confidence Interval based on the standard error of the mean:
$$p = \frac{T_{final}}{100.0}$$
$$SE = \sqrt{\frac{p(1 - p)}{N}} \times 100$$
$$CI_{lower} = \max(0.0, T_{final} - 1.96 \cdot SE)$$
$$CI_{upper} = \min(100.0, T_{final} + 1.96 \cdot SE)$$

**Confidence Metric ($C$):**
$$C = \min\left(0.99, \max\left(0.50, 1.0 - \frac{1}{\sqrt{N + 1}}\right)\right)$$

---

## 3. Data Quorum & Sufficient Data Policy
- **Minimum Quorum:** BrandPulse enforces a minimum of **5 verified reviews** before publishing a production Trust Score.
- **Below Quorum:** Products with $N < 5$ return `has_sufficient_data: false`, `trust_score: null`, and explicit guidance that the item is under ongoing evaluation.
- **Zero Hallucination Guarantee:** The platform strictly prohibits synthetic baseline fallbacks (such as default 85% or 92%).

---

## 4. Production vs. Demo Isolation
In production mode (`APP_DATA_MODE=production`):
- All records linked to `source_id == 'src_demo_001'` or `source_type == 'demo'` are filtered at query execution time.
- All scores, aspect mentions, and timelines are reconstructed strictly from genuine ingested data.
