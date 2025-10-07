from models import Estimate as EstimateModel
from models import Expense as ExpenseModel
from schemas import (
    BudgetItemsRead,
    ExpenseRead,
    EstimateRead,
    EstimateCreate,
    SourceType,
)
from fastapi import APIRouter, Depends
from db.session import get_session
from sqlalchemy.orm import Session
from typing import List


router = APIRouter()


@router.get("", response_model=List[EstimateRead])
def get_Estimates(db: Session = Depends(get_session)):
    return db.query(EstimateModel).all()


"""
Combine both expenses and estimates to one "what-if" scenario
"""


@router.get("/all", response_model=List[BudgetItemsRead])
def get_estimates_combined(db: Session = Depends(get_session)):
    budget_items: List[EstimateRead] = []
    # locked in transactions
    expenses = db.query(ExpenseModel).all()

    for exp in expenses:
        budget_items.append(
            ExpenseRead(
                id=exp.id,
                description=exp.description,
                amount=exp.amount,
                currency=exp.currency,
                category=exp.category,
                date=exp.date,
                source=SourceType.EXPENSE,
            )
        )

    # what if scenarios
    estimates = db.query(EstimateModel).all()
    for est in estimates:
        budget_items.append(
            EstimateRead(
                id=est.id,
                description=est.description,
                amount=est.amount,
                currency=est.currency,
                category=est.category,
                date=est.date,
                source=SourceType.ESTIMATE,
            )
        )

    # sort by date
    budget_items.sort(key=lambda est: est.date)
    return budget_items


@router.post("", response_model=EstimateRead, status_code=201)
def add_estimate(estimate: EstimateCreate, db: Session = Depends(get_session)):
    estimate = EstimateModel(**estimate.dict())
    db.add(estimate)
    db.commit()
    db.refresh(estimate)
    return estimate
