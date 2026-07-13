from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://postgres:postgres@localhost:5432/surekhas_kitchen"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "change-this-secret-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24
    cors_origins: list[str] = ["http://localhost:3000"]
    whatsapp_number: str = "918712023665"

    class Config:
        env_file = ".env"


settings = Settings()
