# BrandPulse AI — Product & Brand Reputation Intelligence Platform

[![Vercel Deployment](https://img.shields.io/badge/Deploy%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.1-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)](https://python.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Project Tagline:** *“From Public Feedback to Trusted Decisions.”*  
> **Concept:** A universal, two-sided AI-powered product and brand reputation intelligence platform serving both consumers and product owners through evidence-grounded AI intelligence.

---

## 📑 Table of Contents

- [🌟 Key Features & Capabilities](#-key-features--capabilities)
- [🏗️ System Architecture](#️-system-architecture)
- [📂 Project Structure](#-project-structure)
- [🌐 Deploying to Vercel](#-deploying-to-vercel)
  - [Method 1: Vercel Web Dashboard (Recommended)](#method-1-vercel-web-dashboard-recommended)
  - [Method 2: Vercel CLI](#method-2-vercel-cli)
  - [Vercel SPA Route Rewrites](#vercel-spa-route-rewrites)
- [🐍 Backend Deployment (FastAPI)](#-backend-deployment-fastapi)
- [🛠️ Local Development Setup](#️-local-development-setup)
- [🐳 Docker Orchestration](#-docker-orchestration)
- [⚙️ Environment Variables](#️-environment-variables)
- [👤 Demo Accounts & Credentials](#-demo-accounts--credentials)
- [📡 API Endpoints Reference](#-api-endpoints-reference)
- [🧪 Running Automated Tests](#-running-automated-tests)
- [📄 License & Authors](#-license--authors)

---

## 🌟 Key Features & Capabilities

- **Universal Intelligence Engine:** Multi-category taxonomy support covering Smartphones, Laptops, Audio Gear, Shoes, Online Courses, Restaurants, and SaaS products.
- **Multi-Dimensional Trust Lens:** Sentiment scoring grounded in review snippets, confidence intervals, sample size, and data freshness metrics.
- **Review Reality Check:** Statistical anomaly detection evaluating phrasing patterns, burst timing, and generic marketing copy without defamatory labeling.
- **Personal Fit Finder:** Matches user budget, primary use cases, and deal-breaker non-negotiables against verified observed evidence.
- **Reputation DNA Graph:** Interactive graph mapping Products $\rightarrow$ Features $\rightarrow$ Issues $\rightarrow$ Versions $\rightarrow$ Remediation Actions.
- **Closed-Loop Action & Impact Tracker:** Tracks pre-action vs. post-action sentiment recovery after owner remediation.
- **Autonomous Demo Mode:** Operates completely out-of-the-box with synthetic datasets without requiring external paid API keys.

---

## 🏗️ System Architecture

```text
                     +---------------------------------------+
                     |         Browser / Client Devices      |
                     +---------------------------------------+
                                         |
                                         | HTTPS
                                         v
                     +---------------------------------------+
                     |         Vercel Edge Global CDN        |
                     |      React 18 + Vite + Tailwind       |
                     +---------------------------------------+
                                         |
                                         | API Calls (VITE_API_URL)
                                         v
                     +---------------------------------------+
                     |         FastAPI Backend (ASGI)        |
                     |      Render / Railway / Fly.io / VPS  |
                     +---------------------------------------+
                       /                 |                 \
                      v                  v                  v
            +-------------------+ +---------------+ +------------------+
            | SQLite / Postgres | | AI Sentiment  | | Redis Cache &    |
            | Relational Store  | | Scikit-Learn  | | Batch Processing |
            +-------------------+ +---------------+ +------------------+
```

---

## 📂 Project Structure

```text
AI_Brand_Analyser/
├── docs/                           # Architecture, audit, and deployment documentation
│   ├── DEPLOYMENT_VERCEL.md        # Complete Vercel deployment walkthrough
│   ├── ARCHITECTURE.md             # High-level architecture documentation
│   ├── API_DATA_CONTRACT.md        # API contracts & schemas
│   └── DATASET_INVENTORY.md        # Data catalog & taxonomy specs
├── frontend/                       # React 18 + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/             # Reusable UI components & layouts
│   │   ├── pages/                  # Page routes (Customer & Owner dashboards)
│   │   ├── services/api.ts         # Axios API client with dynamic VITE_API_URL
│   │   └── types/                  # TypeScript interface declarations
│   ├── vercel.json                 # Vercel configuration for frontend directory
│   ├── .env.example                # Frontend environment variable template
│   ├── package.json                # Frontend dependencies and scripts
│   └── vite.config.ts              # Vite bundling & alias settings
├── backend/                        # FastAPI Python 3.11 Backend
│   ├── app/
│   │   ├── api/                    # API route handlers (Auth, Products, AI, Owner)
│   │   ├── models/                 # SQLAlchemy ORM models
│   │   ├── services/               # Sentiment, anomaly detection & data generation
│   │   └── main.py                 # FastAPI application root & CORS configuration
│   ├── requirements.txt            # Python dependencies
│   └── Dockerfile                  # Container build instructions for backend
├── vercel.json                     # Root Vercel config for monorepo deployments
├── docker-compose.yml              # Multi-container orchestration (App, DB, Redis)
└── README.md                       # Main repository documentation
```

---

## 🌐 Deploying to Vercel

The frontend is fully optimized for **Vercel** with SPA client-side route rewrites and automated production builds.

### Method 1: Vercel Web Dashboard (Recommended)

1. Push your changes to GitHub:
   ```bash
   git push origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** ➔ **"Project"** and import `Al-Powered-Brand-Reputation-Analyzer`.
4. In the Project Configuration:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Select `frontend` *(or leave `./` to use root `vercel.json`)*
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Under **Environment Variables**, add:
   | Key | Value Example | Description |
   | :--- | :--- | :--- |
   | `VITE_API_URL` | `https://your-backend.onrender.com/api` | Deployed FastAPI backend URL |
6. Click **Deploy**.

### Method 2: Vercel CLI

```bash
# 1. Install CLI
npm install -g vercel

# 2. Deploy from frontend directory
cd frontend
vercel

# 3. Add production environment variable
vercel env add VITE_API_URL production

# 4. Deploy to production
vercel --prod
```

### Vercel SPA Route Rewrites

Both [`frontend/vercel.json`](frontend/vercel.json) and [`vercel.json`](vercel.json) include SPA rewrite rules so client routes (`/products`, `/dashboard`, `/reality-check`, etc.) resolve cleanly without `404` errors:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

For full details, see the [Vercel Deployment Guide](docs/DEPLOYMENT_VERCEL.md).

---

## 🐍 Backend Deployment (FastAPI)

The backend runs on Python with machine learning libraries (`scikit-learn`, `numpy`, `pandas`) and persistent storage (`brandpulse.db` or PostgreSQL). Recommended free/low-cost platforms:

### Deploying to Render
1. Create a new **Web Service** on [render.com](https://render.com) pointing to your repo.
2. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Copy your service URL (e.g., `https://brandpulse-api.onrender.com`) and add `/api` to set `VITE_API_URL` on Vercel.

---

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js**: v18+ & npm
- **Python**: v3.11+
- **Git**

### 1. Backend Setup
```bash
cd backend
python -m venv venv

# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Application UI: `http://localhost:3000`

---

## 🐳 Docker Orchestration

Run the entire system (Frontend, Backend, PostgreSQL, Redis) locally using Docker Compose:

```bash
docker-compose up --build -d
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`)
| Variable | Default (Local) | Production (Vercel) | Description |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | `/api` (proxied to `localhost:8000`) | `https://api.yourdomain.com/api` | Base URL for API requests |

### Backend (`backend/.env`)
| Variable | Default | Description |
| :--- | :--- | :--- |
| `APP_ENV` | `development` | Environment mode (`development` or `production`) |
| `APP_PORT` | `8000` | Port for the FastAPI server |
| `DATABASE_URL` | `sqlite:///./brandpulse.db` | Database connection URI |
| `SECRET_KEY` | `brandpulse_super_secret_jwt_key...` | JWT token signing key |
| `DEMO_MODE` | `True` | Pre-seeds demo products and reviews |

---

## 👤 Demo Accounts & Credentials

| Role | Email | Password | Accessible Capabilities |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@brandpulse.ai` | `customer123` | Search, Trust Lens, Reality Check, Fit Finder, Compare |
| **Product Owner** | `owner@brandpulse.ai` | `owner123` | Command Center, DNA Graph, Action Tracker, Copilot |
| **Administrator** | `admin@brandpulse.ai` | `admin123` | User directory, audit logs, system health monitoring |

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT token |
| `GET` | `/api/products` | Retrieve catalog with reputation scores |
| `GET` | `/api/products/{id}/reputation` | Detailed multi-dimensional Trust Lens |
| `POST` | `/api/ai/analyze-review` | Run anomaly & authenticity detection |
| `POST` | `/api/ai/personal-fit` | Calculate personal match score & trade-offs |
| `GET` | `/api/owner/reputation-dna/{id}` | Graph of features, issues, and remediations |
| `GET` | `/api/health` | Service health status |

---

## 🧪 Running Automated Tests

```bash
cd backend
pytest tests/
```

---

## 📄 License & Authors

Distributed under the **MIT License**. See `LICENSE` for more information.

Developed by [vthirumalai882590-gif](https://github.com/vthirumalai882590-gif).
