import enum
from sqlalchemy import Column, Integer, Float, Enum as SQLEnum
from db import Base


class DefaultCurrencyEnum(str, enum.Enum):
    CAD = "CAD"
    INR = "INR"
    AED = "AED"


class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, default=1)
    budget = Column(Float, nullable=False)
    default_currency = Column(SQLEnum(DefaultCurrencyEnum), nullable=False)
