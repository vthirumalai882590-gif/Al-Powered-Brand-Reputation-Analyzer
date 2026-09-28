import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "BrandPulse AI"
    APP_ENV: str = "development"
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    DEBUG: bool = True

    # Application Data Mode: 'production' (strictly real data) or 'demo'
    APP_DATA_MODE: str = "production"

    SECRET_KEY: str = "brandpulse_super_secret_jwt_key_2026_change_in_production!"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    DATABASE_URL: str = "sqlite:///./brandpulse.db"
    REDIS_URL: str = "redis://localhost:6379/0"

    # Batching & Performance Settings
    IMPORT_BATCH_SIZE: int = 500
    AI_BATCH_SIZE: int = 100
    MAX_UPLOAD_SIZE_MB: int = 100

    # AI Configuration
    ENABLE_AI: bool = True
    AI_PROVIDER: str = "local_rule_based" # local_rule_based, huggingface, openai, anthropic
    AI_MODEL: str = "BrandPulse-Universal-v2"
    USE_MOCK_AI: bool = False

    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""

    LOG_LEVEL: str = "INFO"

    @property
    def is_demo_mode(self) -> bool:
        return self.APP_DATA_MODE.lower() == "demo"

    @property
    def DEMO_MODE(self) -> bool:
        return self.is_demo_mode

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
APP_DATA_MODE = settings.APP_DATA_MODE
