from enum import Enum
from typing import Literal
from pydantic import BaseModel
from models import DefaultCurrencyEnum
from pydantic.alias_generators import to_camel
from datetime import date
from typing import Union


class Settings(BaseModel):
    budget: float
    default_currency: DefaultCurrencyEnum

    class Config:
        from_attributes = True  # Enables SQLAlchemy → JSON conversion
        alias_generator = to_camel
        validate_by_name = True


class ItemBase(BaseModel):
    description: str
    amount: float
    date: date
    currency: str
    category: str

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True


class ExpenseRead(ItemBase):
    id: int
    source: Literal["expense"] = "expense"


class ExpenseCreate(ItemBase):
    pass


class EstimateRead(ItemBase):
    id: int
    source: Literal["estimate"] = "estimate"


class EstimateCreate(ItemBase):
    pass


BudgetItemsRead = Union[ExpenseRead, EstimateRead]


class SourceType(str, Enum):
    EXPENSE = "expense"
    ESTIMATE = "estimate"
