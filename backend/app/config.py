import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = os.environ.get("DATABASE_URL", "sqlite:///./surekhas_kitchen.db")
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = os.environ.get("JWT_SECRET", "surekhas-kitchen-super-secret-key-2026")
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7
    cors_origins: list[str] = ["*"]
    whatsapp_number: str = "918712023665"

    class Config:
        env_file = ".env"


settings = Settings()
