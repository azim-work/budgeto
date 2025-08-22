from pydantic import BaseModel
from enum import Enum


class DefaultCurrency(str, Enum):
    CAD = "CAD"
    INR = "INR"
    AED = "AED"


class Settings(BaseModel):
    budget: float
    default_currency: DefaultCurrency
