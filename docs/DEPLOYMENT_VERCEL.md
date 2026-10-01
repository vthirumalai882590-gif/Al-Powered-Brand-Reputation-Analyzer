# 🚀 Vercel Deployment Guide for BrandPulse AI

This document provides complete instructions for deploying the **BrandPulse AI** frontend to **Vercel**, configuring SPA routing, environment variables, and linking it to your FastAPI backend.

---

## 🏗️ Architecture Overview

| Component | Technology | Hosting | Description |
| :--- | :--- | :--- | :--- |
| **All-in-One Vercel App** | React 18 + Vite + Embedded AI Engine | **Vercel** | **100% Standalone Ready**: Runs the entire catalog, NLP sentiment model, emotion classifier, fake review detector, personal fit engine, and AI assistant directly in-browser with zero latency. |
| **Optional External Backend** | FastAPI + Python 3.11 + SQLite | **Render / Railway / Docker** | Optional containerized service for heavy server-side batch ETL if desired (`VITE_API_URL`). |

---

## ⚡ Quick Start: Deploying to Vercel

### Method 1: Deploy via Vercel Web Dashboard (Recommended)

1. **Push your repository** to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** ➔ **"Project"**.
4. Import your **`AI-Powered-Brand-Reputation-Analyzer`** repository.
5. In the **Configure Project** screen:
   - **Project Name:** `brandpulse-ai` (or your choice)
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click `Edit` and select `frontend` *(Note: If you leave it as root `./`, the root `vercel.json` will automatically build the `frontend` folder)*
   - **Build and Output Settings:**
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
6. **Environment Variables**:
   Add the following environment variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-service.onrender.com/api` *(or your deployed backend URL)*
7. Click **Deploy**.

---

### Method 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Authenticate:
   ```bash
   vercel login
   ```

3. Deploy from the `frontend` directory:
   ```bash
   cd frontend
   vercel
   ```
   Follow the interactive prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your personal or team account
   - Link to existing project? **No**
   - Project name: `brandpulse-ai`
   - In which directory is your code located? `./`
   - Want to modify settings? **No**

4. To deploy to production:
   ```bash
   vercel --prod
   ```

5. Set the backend URL environment variable via CLI:
   ```bash
   vercel env add VITE_API_URL production
   # When prompted, enter: https://your-backend-api-url/api
   ```

---

## ⚙️ Configuration Files Added to Repository

### 1. `frontend/vercel.json` & `vercel.json`
Ensures that all client-side Single Page Application (SPA) routes (`/products`, `/dashboard`, `/reality-check`, etc.) are rewritten to `/index.html` to prevent `404 Not Found` errors on direct access or browser refresh:

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

### 2. `frontend/.env.example`
Provides reference for frontend build-time environment variables:
```bash
VITE_API_URL=https://your-backend-api-url/api
```

---

## 🐍 Backend Deployment Options (FastAPI)

Because the backend relies on Python ML dependencies (`scikit-learn`, `numpy`, `pandas`) and persistent storage (`brandpulse.db`), it is best hosted on a container host:

### Option A: Render (Free/Low-cost Web Service)
1. Sign up at [render.com](https://render.com).
2. Create a new **Web Service** from your GitHub repo.
3. Configure:
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Copy the generated URL (e.g. `https://brandpulse-backend.onrender.com`).
5. In Vercel Project Settings ➔ **Environment Variables**, set:
   ```env
   VITE_API_URL=https://brandpulse-backend.onrender.com/api
   ```
6. Trigger a redeploy in Vercel.

### Option B: Railway / Fly.io / Docker
You can also use the existing `backend/Dockerfile` to deploy directly to Railway, Fly.io, or any VPS with Docker Compose.

---

## 🔍 Verification & Testing Checklist

- [ ] **Vercel Build Succeeded:** Verify build logs in the Vercel dashboard show `dist/index.html` generated without errors.
- [ ] **SPA Route Refresh:** Navigate to `/products` and press `Ctrl+F5` (or `Cmd+Shift+R`) to confirm that routes reload cleanly without 404s.
- [ ] **Backend Connectivity:** Check browser Developer Tools (Network tab) to ensure requests go to your `VITE_API_URL` and return HTTP 200 responses.
- [ ] **CORS Configuration:** Verify the backend responds with appropriate `Access-Control-Allow-Origin` headers. (Backend `backend/app/main.py` is pre-configured with CORS middleware).
