import sys
import os

# Add backend directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.database import SessionLocal, engine, Base
from app.services.demo_data import seed_demo_data

def run_seed():
    print("[BrandPulse Seeder] Re-initializing database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_demo_data(db)
        print("[BrandPulse Seeder] Database successfully populated!")
    finally:
        db.close()

if __name__ == "__main__":
    run_seed()
