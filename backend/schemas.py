from pydantic import BaseModel
from models import DefaultCurrencyEnum
from pydantic.alias_generators import to_camel


class Settings(BaseModel):
    budget: float
    default_currency: DefaultCurrencyEnum

    class Config:
        from_attributes = True  # Enables SQLAlchemy → JSON conversion
        alias_generator = to_camel
        validate_by_name = True
