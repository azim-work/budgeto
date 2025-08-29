from pydantic import BaseModel
from models import DefaultCurrencyEnum
from pydantic.alias_generators import to_camel
from datetime import date


class Settings(BaseModel):
    budget: float
    default_currency: DefaultCurrencyEnum

    class Config:
        from_attributes = True  # Enables SQLAlchemy → JSON conversion
        alias_generator = to_camel
        validate_by_name = True


class ExpenseCreate(BaseModel):
    description: str
    amount: float
    date: date
    currency: str
    category: str

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True


class ExpenseRead(ExpenseCreate):
    id: int
