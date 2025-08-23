from pydantic import BaseModel
from models import DefaultCurrencyEnum


class Settings(BaseModel):
    budget: float
    default_currency: DefaultCurrencyEnum

    class Config:
        orm_mode = True  # Enables SQLAlchemy → JSON conversion
