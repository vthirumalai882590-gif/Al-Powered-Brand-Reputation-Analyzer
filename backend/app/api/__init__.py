from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.api.feedback import router as feedback_router
from app.api.ai import router as ai_router
from app.api.owner import router as owner_router
from app.api.admin import router as admin_router
from app.api.data_management import router as data_management_router
from app.api.search import router as search_router

__all__ = [
    "auth_router",
    "products_router",
    "feedback_router",
    "ai_router",
    "owner_router",
    "admin_router",
    "data_management_router",
    "search_router"
]
