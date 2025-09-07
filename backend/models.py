import enum
from sqlalchemy import Column, Integer, String, Float, Date, Enum as SQLEnum
from db.session import Base


class DefaultCurrencyEnum(str, enum.Enum):
    CAD = "CAD"
    INR = "INR"
    AED = "AED"


class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, default=1)
    budget = Column(Float, nullable=False)
    default_currency = Column(SQLEnum(DefaultCurrencyEnum), nullable=False)


class ExpenseCategory(str, enum.Enum):
    TRAVEL = "TRAVEL"
    FOOD = "FOOD"
    TRANSPORT = "TRANSPORT"
    TOUR = "TOUR"
    TIPS = "TIPS"
    SHOPPING = "SHOPPING"
    MISCELLANEOUS = "MISCELLANEOUS"


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(SQLEnum(DefaultCurrencyEnum), nullable=False)
    category = Column(SQLEnum(ExpenseCategory), nullable=False)
    date = Column(Date)


class Estimate(Base):
    __tablename__ = "estimates"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(SQLEnum(DefaultCurrencyEnum), nullable=False)
    category = Column(SQLEnum(ExpenseCategory), nullable=False)
    date = Column(Date)
