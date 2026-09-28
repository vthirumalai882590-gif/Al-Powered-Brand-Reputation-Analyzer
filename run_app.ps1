# BrandPulse AI Platform PowerShell Launcher
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "               Starting BrandPulse AI Platform" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "`n[1/2] Launching FastAPI Backend Server on port 8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\backend'; if (Test-Path 'venv\Scripts\Activate.ps1') { . 'venv\Scripts\Activate.ps1' }; python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

Write-Host "[2/2] Launching Vite Frontend Server on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\frontend'; npm run dev"

Write-Host "`n=====================================================================" -ForegroundColor Cyan
Write-Host " Platform is running!" -ForegroundColor Yellow
Write-Host " - Frontend Web UI:  http://localhost:3000" -ForegroundColor White
Write-Host " - Backend API:      http://localhost:8000" -ForegroundColor White
Write-Host " - API Swagger Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host " - Health Endpoint:  http://localhost:8000/health" -ForegroundColor White
Write-Host "=====================================================================" -ForegroundColor Cyan

Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"
