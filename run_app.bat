@echo off
TITLE BrandPulse AI Platform Launcher
echo =====================================================================
echo                Starting BrandPulse AI Platform
echo =====================================================================
echo.

set ROOT_DIR=%~dp0
cd /d "%ROOT_DIR%"

echo [1/2] Launching FastAPI Backend Server on port 8000...
start "BrandPulse Backend" cmd /k "cd /d "%ROOT_DIR%backend" && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo [2/2] Launching Vite Frontend Server on port 3000...
start "BrandPulse Frontend" cmd /k "cd /d "%ROOT_DIR%frontend" && npm run dev"

echo.
echo =====================================================================
echo  Platform is launching!
echo  - Frontend Web UI:  http://localhost:3000
echo  - Backend API:      http://localhost:8000
echo  - API Swagger Docs: http://localhost:8000/docs
echo  - Health Endpoint:  http://localhost:8000/health
echo =====================================================================
echo.
timeout /t 3 /nobreak >nul
start http://localhost:3000
