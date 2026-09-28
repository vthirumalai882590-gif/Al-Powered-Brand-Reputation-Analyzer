# BrandPulse AI — Product & Brand Reputation Intelligence Platform

> **Project Tagline:** *“From Public Feedback to Trusted Decisions.”*  
> **Concept:** A universal, two-sided AI-powered product and brand reputation intelligence platform serving both consumers and product owners through evidence-grounded AI intelligence.

---

## 🌟 Key Features & Highlights

- **Universal Intelligence Engine:** Multi-category taxonomy support (Smartphones, Laptops, Shoes, Online Courses, Restaurants, SaaS).
- **Multi-Dimensional Trust Lens:** Grounded in review snippets, confidence intervals, sample size, and data freshness.
- **Review Reality Check:** Statistical anomaly detection evaluating phrasing, burst timing, and generic content without defamatory labeling.
- **Personal Fit Finder:** Matches budget, primary use cases, and deal-breaker non-negotiables against observed evidence.
- **Reputation DNA Graph:** Graph mapping Products → Features → Issues → Versions → Remediation Actions.
- **Closed-Loop Action & Impact Tracker:** Tracks pre-action vs post-action sentiment recovery after owner remediation.
- **Autonomous Demo Mode:** Operates completely out-of-the-box with synthetic datasets without requiring external paid API keys.

---

## 🛠️ Quick Start Guide

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### 1. Backend Setup & Local Server
```bash
cd backend
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1

pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API OpenAPI Documentation: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

### 2. Frontend Setup & Local Development Server
```bash
cd frontend
npm install
npm run dev
```
- Local Application Interface: `http://localhost:3000`

---

## 👤 Development & Demo Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@brandpulse.ai` | `customer123` | Search, Trust Lens, Reality Check, Fit Finder, Compare |
| **Product Owner** | `owner@brandpulse.ai` | `owner123` | Command Center, DNA Graph, Action Tracker, Copilot |
| **Administrator** | `admin@brandpulse.ai` | `admin123` | User directory, audit logs, system health |

---

## 🐳 Docker Container Orchestration

To run the complete system (Backend, Frontend, PostgreSQL, Redis) via Docker Compose:
```bash
docker-compose up --build -d
```

---

## 🧪 Running Automated Tests
```bash
cd backend
pytest tests/
```

---

## 📄 License
Released under the MIT License.
