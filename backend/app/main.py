import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config import settings
from app.database import engine, Base, get_db
from app.services.demo_data import seed_demo_data
from app.api import (
    auth_router,
    products_router,
    feedback_router,
    ai_router,
    owner_router,
    admin_router,
    data_management_router,
    search_router
)

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Universal AI-Powered Product & Brand Reputation Intelligence Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for local Vite frontend dev server & container hosts
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth_router)
app.include_router(products_router)
app.include_router(feedback_router)
app.include_router(ai_router)
app.include_router(owner_router)
app.include_router(admin_router)
app.include_router(data_management_router)
app.include_router(search_router)

@app.on_event("startup")
def on_startup():
    db = next(get_db())
    try:
        if settings.DEMO_MODE:
            seed_demo_data(db)
    finally:
        db.close()

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "app_name": settings.APP_NAME,
        "demo_mode": settings.DEMO_MODE,
        "environment": settings.APP_ENV
    }

@app.get("/health/database")
def health_database(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@app.get("/health/ai")
def health_ai():
    return {
        "status": "ready",
        "engine": "BrandPulse Universal AI Engine v1.0",
        "mock_ai_mode": settings.USE_MOCK_AI
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.APP_HOST, port=settings.APP_PORT, reload=settings.DEBUG)
